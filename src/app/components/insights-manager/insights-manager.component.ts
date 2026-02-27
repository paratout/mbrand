import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from '@angular/fire/firestore';

interface Article {
  id?: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt?: any;
}

@Component({
  selector: 'app-insights-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insights-manager.component.html',
  styleUrl: './insights-manager.component.scss'
})
export class InsightsManagerComponent implements OnInit {
  private firestore = inject(Firestore);

  articles: Article[] = [];
  isLoading = true;
  isComposing = false;
  isSaving = false;
  saveSuccess = false;
  saveError = '';

  newArticle: Article = {
    title: '',
    category: '',
    excerpt: '',
    content: ''
  };

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    try {
      this.isLoading = true;
      const articlesRef = collection(this.firestore, 'insights');
      const q = query(articlesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      this.articles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];
    } catch (error) {
      console.error("Error loading articles:", error);
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
    this.newArticle = {
      title: '',
      category: '',
      excerpt: '',
      content: ''
    };
  }

  async publishArticle(event: Event) {
    event.preventDefault();
    if (!this.newArticle.title || !this.newArticle.content) return;

    this.isSaving = true;
    this.saveError = '';
    this.saveSuccess = false;

    try {
      const articlesRef = collection(this.firestore, 'insights');
      await addDoc(articlesRef, {
        ...this.newArticle,
        createdAt: serverTimestamp()
      });

      this.saveSuccess = true;
      setTimeout(() => {
        this.toggleCompose();
        this.loadArticles();
      }, 1500);

    } catch (error: any) {
      console.error("Error publishing article:", error);
      this.saveError = error.message || "Failed to publish article.";
    } finally {
      this.isSaving = false;
    }
  }

  async deleteArticle(id?: string) {
    if (!id || !confirm('Are you sure you want to delete this article?')) return;

    try {
      await deleteDoc(doc(this.firestore, `insights/${id}`));
      this.articles = this.articles.filter(a => a.id !== id);
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article.");
    }
  }
}
