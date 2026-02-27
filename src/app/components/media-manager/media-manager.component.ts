import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from '@angular/fire/firestore';

interface MediaItem {
  id?: string;
  title: string;
  tag: string;
  publisher: string;
  duration: string;
  videoUrl: string;
  createdAt?: any;
}

@Component({
  selector: 'app-media-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media-manager.component.html',
  styleUrl: './media-manager.component.scss'
})
export class MediaManagerComponent implements OnInit {
  private firestore = inject(Firestore);

  mediaItems: MediaItem[] = [];
  isLoading = true;
  isComposing = false;
  isSaving = false;
  saveSuccess = false;
  saveError = '';

  newMedia: MediaItem = {
    title: '',
    tag: 'Keynote',
    publisher: '',
    duration: '',
    videoUrl: ''
  };

  ngOnInit() {
    this.loadMedia();
  }

  async loadMedia() {
    try {
      this.isLoading = true;
      const mediaRef = collection(this.firestore, 'media_appearances');
      const q = query(mediaRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      this.mediaItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaItem[];
    } catch (error) {
      console.error("Error loading media:", error);
    } finally {
      this.isLoading = false;
    }
  }

  toggleCompose() {
    this.isComposing = !this.isComposing;
    this.saveSuccess = false;
    this.saveError = '';

    if (!this.isComposing) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newMedia = {
      title: '',
      tag: 'Keynote',
      publisher: '',
      duration: '',
      videoUrl: ''
    };
  }

  async saveMedia(event: Event) {
    event.preventDefault();
    if (!this.newMedia.title || !this.newMedia.videoUrl) return;

    this.isSaving = true;
    this.saveError = '';
    this.saveSuccess = false;

    try {
      const mediaRef = collection(this.firestore, 'media_appearances');
      await addDoc(mediaRef, {
        ...this.newMedia,
        createdAt: serverTimestamp()
      });

      this.saveSuccess = true;
      setTimeout(() => {
        this.toggleCompose();
        this.loadMedia();
      }, 1500);

    } catch (error: any) {
      console.error("Error saving media:", error);
      this.saveError = error.message || "Failed to log media appearance.";
    } finally {
      this.isSaving = false;
    }
  }

  async deleteMedia(id?: string) {
    if (!id || !confirm('Are you sure you want to delete this log?')) return;

    try {
      await deleteDoc(doc(this.firestore, `media_appearances/${id}`));
      this.mediaItems = this.mediaItems.filter(m => m.id !== id);
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media.");
    }
  }
}
