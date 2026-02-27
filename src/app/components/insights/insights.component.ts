import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, orderBy, getDocs, limit } from '@angular/fire/firestore';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class InsightsComponent implements OnInit {
  private firestore = inject(Firestore);

  featuredArticle: any = null;
  recentArticles: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadInsights();
  }

  async loadInsights() {
    try {
      const insightsRef = collection(this.firestore, 'insights');
      const q = query(insightsRef, orderBy('createdAt', 'desc'), limit(4));
      const snapshot = await getDocs(q);

      const articles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (articles.length > 0) {
        this.featuredArticle = articles[0];
        this.recentArticles = articles.slice(1);
      }
    } catch (error) {
      console.error("Error loading insights from database:", error);
    } finally {
      this.isLoading = false;
    }
  }
}
