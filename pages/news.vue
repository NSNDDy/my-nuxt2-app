<template>
  <div class="news-page">
    <link rel="stylesheet" href="/css/news.css">
    <div class="container">
      <!-- Header -->
      <div class="news-header">
        <h1>📰 Latest News</h1>
        <p>Stay updated with the latest posts and articles</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading news...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button @click="fetchNews" class="retry-btn">Try Again</button>
      </div>

      <!-- News List -->
      <div v-else class="news-grid">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="news-card"
          @click="viewPost(post)"
        >
          <div class="card-image">
            <img :src="`https://picsum.photos/400/200?random=${post.id}`" :alt="post.title">
            <div class="card-overlay">
              <i class="fas fa-eye"></i>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-excerpt">{{ truncateText(post.body, 100) }}</p>
            <div class="card-meta">
              <span class="post-id">#{{ post.id }}</span>
              <span class="read-more">Read More →</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="posts.length > 0" class="load-more">
        <button 
          @click="loadMore" 
          :disabled="loadingMore"
          class="load-more-btn"
        >
          <span v-if="!loadingMore">Load More Posts</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>
      </div>
    </div>

    <!-- Post Detail Modal -->
    <div v-if="selectedPost" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedPost.title }}</h2>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <img :src="`https://picsum.photos/600/300?random=${selectedPost.id}`" :alt="selectedPost.title">
          <p>{{ selectedPost.body }}</p>
          <div class="post-details">
            <span>Post ID: {{ selectedPost.id }}</span>
            <span>User ID: {{ selectedPost.userId }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  head() {
    return {
      title: 'Latest News - My App',
      meta: [
        { hid: 'description', name: 'description', content: 'Latest news and articles from our blog' }
      ]
    }
  },
  data() {
    return {
      posts: [],
      loading: true,
      loadingMore: false,
      error: null,
      selectedPost: null,
      currentPage: 1,
      postsPerPage: 10
    }
  },
  async mounted() {
    await this.fetchNews()
  },
  methods: {
    async fetchNews() {
      this.loading = true
      this.error = null
      
      try {
        // Sử dụng API JSONPlaceholder để lấy posts
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.currentPage}&_limit=${this.postsPerPage}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const data = await response.json()
        
        if (this.currentPage === 1) {
          this.posts = data
        } else {
          this.posts = [...this.posts, ...data]
        }
        
      } catch (error) {
        console.error('Error fetching news:', error)
        this.error = 'Failed to load news. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async loadMore() {
      this.loadingMore = true
      this.currentPage += 1
      
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.currentPage}&_limit=${this.postsPerPage}`)
        const data = await response.json()
        
        if (data.length > 0) {
          this.posts = [...this.posts, ...data]
        }
      } catch (error) {
        console.error('Error loading more posts:', error)
        this.currentPage -= 1 // Rollback page number
      } finally {
        this.loadingMore = false
      }
    },

    viewPost(post) {
      this.selectedPost = post
    },

    closeModal() {
      this.selectedPost = null
    },

    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    }
  }
}
</script> 