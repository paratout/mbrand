import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, orderBy, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent implements OnInit {
  private firestore = inject(Firestore);

  mediaItems: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadMedia();
  }

  async loadMedia() {
    try {
      const mediaRef = collection(this.firestore, 'media_appearances');
      const q = query(mediaRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      this.mediaItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error loading media from database:", error);
    } finally {
      this.isLoading = false;
    }
  }
}
