import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

export interface Publication {
  slug: string;
  title: string | null;
  summary: string;
  content: Record<string, unknown>;
  coverImage: string | null;
  attachments: Attachment[];
  status: 'draft' | 'published';
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  publishedAt: Timestamp | null;
}

export interface Attachment {
  name: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
}

export type PublicationInput = Omit<Publication, 'createdAt' | 'updatedAt' | 'publishedAt'>;

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private firestore = inject(Firestore);
  private colRef = collection(this.firestore, 'publications');

  /** Get all published publications, ordered by publishedAt desc */
  getPublished(): Observable<Publication[]> {
    const q = query(
      this.colRef,
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    return from(getDocs(q).then((snap) => snap.docs.map((d) => d.data() as Publication)));
  }

  /** Get all publications (owner admin dashboard) */
  getAll(): Observable<Publication[]> {
    const q = query(this.colRef, orderBy('updatedAt', 'desc'));
    return from(getDocs(q).then((snap) => snap.docs.map((d) => d.data() as Publication)));
  }

  /** Get a single publication by slug */
  getBySlug(slug: string): Observable<Publication | null> {
    return from(
      getDoc(doc(this.colRef, slug)).then((snap) =>
        snap.exists() ? (snap.data() as Publication) : null
      )
    );
  }

  /** Create a new publication (slug as doc ID) */
  create(slug: string, data: Partial<PublicationInput>): Observable<void> {
    return from(
      setDoc(doc(this.colRef, slug), {
        slug,
        title: '',
        summary: '',
        content: {},
        coverImage: null,
        attachments: [],
        status: 'draft',
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: null,
      })
    );
  }

  /** Update fields on an existing publication */
  update(slug: string, data: Partial<PublicationInput>): Observable<void> {
    return from(
      updateDoc(doc(this.colRef, slug), {
        ...data,
        updatedAt: serverTimestamp(),
      })
    );
  }

  /** Publish a publication */
  publish(slug: string): Observable<void> {
    return from(
      updateDoc(doc(this.colRef, slug), {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    );
  }

  /** Unpublish (revert to draft) */
  unpublish(slug: string): Observable<void> {
    return from(
      updateDoc(doc(this.colRef, slug), {
        status: 'draft',
        publishedAt: null,
        updatedAt: serverTimestamp(),
      })
    );
  }

  /** Delete a publication */
  delete(slug: string): Observable<void> {
    return from(deleteDoc(doc(this.colRef, slug)));
  }
}
