import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  /** Upload an inline image (from editor paste/drop) */
  uploadImage(slug: string, file: File): Observable<string> {
    const ext = file.name.split('.').pop() ?? 'png';
    const path = `publications/${slug}/images/${uuidv4()}.${ext}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap((snap) => from(getDownloadURL(snap.ref)))
    );
  }

  /** Upload an attachment file */
  uploadAttachment(slug: string, file: File): Observable<string> {
    const path = `publications/${slug}/attachments/${file.name}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap((snap) => from(getDownloadURL(snap.ref)))
    );
  }

  /** Upload a cover image */
  uploadCover(slug: string, file: File): Observable<string> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `publications/${slug}/cover.${ext}`;
    const storageRef = ref(this.storage, path);
    return from(uploadBytes(storageRef, file)).pipe(
      switchMap((snap) => from(getDownloadURL(snap.ref)))
    );
  }

  /** Delete a file by its full Storage path */
  deleteFile(path: string): Observable<void> {
    return from(deleteObject(ref(this.storage, path)));
  }
}
