import {
  Component, inject, OnInit, OnDestroy, signal, computed, input, DestroyRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicationService, Publication, Attachment } from '../../core/services/publication.service';
import { StorageService } from '../../core/services/storage.service';
import { TiptapEditorComponent } from '../../shared/components/tiptap-editor/tiptap-editor.component';
import { slugify, formatBytes } from '../../core/utils/format.utils';

type SaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'error';

@Component({
  selector: 'app-editor',
  imports: [FormsModule, RouterLink, TiptapEditorComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit, OnDestroy {
  /** Route param — undefined when path is /admin/publications/new */
  readonly slug = input<string | undefined>(undefined);

  private pubService = inject(PublicationService);
  private storage = inject(StorageService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // ---- State ----
  readonly title        = signal('');
  readonly summary      = signal('');
  readonly content      = signal<Record<string, unknown>>({});
  readonly attachments  = signal<Attachment[]>([]);
  readonly pubStatus    = signal<'draft' | 'published'>('draft');
  readonly saveStatus   = signal<SaveStatus>('idle');
  readonly isLoading    = signal(true);
  readonly isPublishing = signal(false);
  readonly isDeleting   = signal(false);
  readonly isUploadingAttachment = signal(false);

  /** True when creating a brand-new publication */
  readonly isNew = computed(() => this.slug() === undefined);
  /** Slug being edited or the auto-generated one for a new pub */
  readonly generatedSlug = signal('');
  /** True after the new doc has been created in Firestore */
  private created = false;

  readonly effectiveSlug = computed(() =>
    this.isNew() ? this.generatedSlug() : (this.slug() ?? '')
  );

  readonly saveLabel = computed(() => {
    const s = this.saveStatus();
    if (s === 'saving') return 'Saving…';
    if (s === 'saved')  return 'Saved ✓';
    if (s === 'error')  return 'Error saving';
    if (s === 'unsaved') return 'Unsaved';
    return '';
  });

  private saveSubject = new Subject<void>();

  ngOnInit(): void {
    // Wire autosave
    this.saveSubject.pipe(
      debounceTime(2000),
      switchMap(() => this.performSave()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => this.saveStatus.set('saved'),
      error: () => this.saveStatus.set('error'),
    });

    // Load existing publication
    if (!this.isNew()) {
      this.pubService.getBySlug(this.slug()!).subscribe((pub) => {
        if (pub) { this.hydrate(pub); }
        this.isLoading.set(false);
      });
    } else {
      this.isLoading.set(false);
    }
  }

  private hydrate(pub: Publication): void {
    this.title.set(pub.title ?? '');
    this.summary.set(pub.summary ?? '');
    this.content.set(pub.content ?? {});
    this.attachments.set(pub.attachments ?? []);
    this.pubStatus.set(pub.status);
  }

  // ---- Field change handlers ----
  onTitleChange(value: string): void {
    this.title.set(value);
    if (this.isNew()) { this.generatedSlug.set(slugify(value)); }
    this.markUnsaved();
  }

  onSummaryChange(value: string): void {
    this.summary.set(value);
    this.markUnsaved();
  }

  onContentChange(json: Record<string, unknown>): void {
    this.content.set(json);
    this.markUnsaved();
  }

  private markUnsaved(): void {
    this.saveStatus.set('unsaved');
    this.saveSubject.next();
  }

  // ---- Save logic ----
  private performSave() {
    const slug = this.effectiveSlug();
    if (!slug) return new Subject<void>().asObservable(); // nothing to save without a slug

    this.saveStatus.set('saving');
    const payload = {
      title: this.title(),
      summary: this.summary(),
      content: this.content(),
      attachments: this.attachments(),
    };

    if (this.isNew() && !this.created) {
      return this.pubService.create(slug, payload).pipe(
        tap(() => {
          this.created = true;
          // Update the URL without adding a new browser history entry
          this.router.navigate(['/admin/publications', slug], { replaceUrl: true });
        })
      );
    }
    return this.pubService.update(slug, payload);
  }

  // ---- Publish / Unpublish ----
  publish(): void {
    const slug = this.effectiveSlug();
    if (!slug) return;
    this.isPublishing.set(true);
    this.pubService.publish(slug).subscribe(() => {
      this.pubStatus.set('published');
      this.isPublishing.set(false);
    });
  }

  unpublish(): void {
    const slug = this.effectiveSlug();
    if (!slug) return;
    this.isPublishing.set(true);
    this.pubService.unpublish(slug).subscribe(() => {
      this.pubStatus.set('draft');
      this.isPublishing.set(false);
    });
  }

  // ---- Delete ----
  async confirmDelete(): Promise<void> {
    if (!confirm('Delete this publication permanently?')) return;
    this.isDeleting.set(true);
    this.pubService.delete(this.effectiveSlug()).subscribe(() => {
      this.router.navigate(['/admin/dashboard']);
    });
  }

  // ---- Attachments ----
  onAttachmentSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // reset so same file can be re-selected
    const slug = this.effectiveSlug();
    if (!file || !slug) return;

    this.isUploadingAttachment.set(true);
    this.storage.uploadAttachment(slug, file).subscribe({
      next: (url) => {
        this.attachments.update((list) => [
          ...list,
          { name: file.name, url, sizeBytes: file.size, mimeType: file.type },
        ]);
        this.isUploadingAttachment.set(false);
        this.markUnsaved();
      },
      error: () => this.isUploadingAttachment.set(false),
    });
  }

  removeAttachment(index: number): void {
    this.attachments.update((list) => list.filter((_, i) => i !== index));
    this.markUnsaved();
  }

  formatBytes = formatBytes;

  ngOnDestroy(): void {
    this.saveSubject.complete();
  }
}
