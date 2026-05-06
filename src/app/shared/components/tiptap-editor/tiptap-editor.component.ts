import {
  Component, Input, Output, EventEmitter,
  ElementRef, ViewChild, AfterViewInit, OnDestroy,
  OnChanges, SimpleChanges, inject, signal,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { StorageService } from '../../../core/services/storage.service';

/** Custom ProseMirror plugin that intercepts image paste and drop events */
function buildImagePlugin(uploadFn: (file: File) => Promise<string>) {
  return Extension.create({
    name: 'imagePasteAndDrop',
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('imagePasteAndDrop'),
          props: {
            handlePaste(_view, event) {
              const items = Array.from(event.clipboardData?.items ?? []);
              const img = items.find((i) => i.type.startsWith('image/'));
              if (!img) return false;
              event.preventDefault();
              const file = img.getAsFile();
              if (!file) return false;
              uploadFn(file).then((url) => {
                const node = _view.state.schema.nodes['image'].create({ src: url });
                _view.dispatch(_view.state.tr.replaceSelectionWith(node));
              });
              return true;
            },
            handleDrop(_view, event) {
              const files = Array.from((event as DragEvent).dataTransfer?.files ?? []);
              const img = files.find((f) => f.type.startsWith('image/'));
              if (!img) return false;
              event.preventDefault();
              uploadFn(img).then((url) => {
                const node = _view.state.schema.nodes['image'].create({ src: url });
                _view.dispatch(_view.state.tr.replaceSelectionWith(node));
              });
              return true;
            },
          },
        }),
      ];
    },
  });
}

@Component({
  selector: 'app-tiptap-editor',
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.scss',
})
export class TiptapEditorComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('editorEl') editorEl!: ElementRef<HTMLDivElement>;

  @Input() content: Record<string, unknown> | null = null;
  @Input() slug = '';
  @Input() placeholder = 'Start writing…';

  @Output() contentChange = new EventEmitter<Record<string, unknown>>();

  private storage = inject(StorageService);
  private editor?: Editor;

  readonly isUploading = signal(false);

  ngAfterViewInit(): void {
    this.initEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && this.editor && !this.editor.isDestroyed) {
      const incoming = changes['content'].currentValue;
      if (incoming && Object.keys(incoming).length > 0) {
        const current = JSON.stringify(this.editor.getJSON());
        if (current !== JSON.stringify(incoming)) {
          this.editor.commands.setContent(incoming);
        }
      }
    }
  }

  private initEditor(): void {
    const uploadImage = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        if (!this.slug) { reject('No slug'); return; }
        this.isUploading.set(true);
        this.storage.uploadImage(this.slug, file).subscribe({
          next: (url) => { this.isUploading.set(false); resolve(url); },
          error: (err) => { this.isUploading.set(false); reject(err); },
        });
      });

    this.editor = new Editor({
      element: this.editorEl.nativeElement,
      extensions: [
        StarterKit,
        Image.configure({ inline: false, allowBase64: false }),
        Link.configure({ openOnClick: false, autolink: true }),
        Placeholder.configure({ placeholder: this.placeholder }),
        buildImagePlugin(uploadImage),
      ],
      content: this.content ?? {},
      onUpdate: ({ editor }) => {
        this.contentChange.emit(editor.getJSON() as Record<string, unknown>);
      },
    });
  }

  // ---- Toolbar commands ----
  run(cmd: () => boolean): void { cmd(); }
  bold()          { this.editor?.chain().focus().toggleBold().run(); }
  italic()        { this.editor?.chain().focus().toggleItalic().run(); }
  strike()        { this.editor?.chain().focus().toggleStrike().run(); }
  code()          { this.editor?.chain().focus().toggleCode().run(); }
  codeBlock()     { this.editor?.chain().focus().toggleCodeBlock().run(); }
  blockquote()    { this.editor?.chain().focus().toggleBlockquote().run(); }
  bulletList()    { this.editor?.chain().focus().toggleBulletList().run(); }
  orderedList()   { this.editor?.chain().focus().toggleOrderedList().run(); }
  hr()            { this.editor?.chain().focus().setHorizontalRule().run(); }
  heading(level: 1 | 2 | 3) {
    this.editor?.chain().focus().toggleHeading({ level }).run();
  }
  setLink(): void {
    const prev = this.editor?.getAttributes('link')['href'] ?? '';
    const url = prompt('Link URL:', prev);
    if (url === null) return;
    if (url === '') { this.editor?.chain().focus().unsetLink().run(); return; }
    this.editor?.chain().focus().setLink({ href: url }).run();
  }

  isActive(name: string, attrs?: Record<string, unknown>): boolean {
    return this.editor?.isActive(name, attrs) ?? false;
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
