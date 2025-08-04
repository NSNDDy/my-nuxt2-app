<template>
  <div>
    <h1>Tin tức đơn giản</h1>
    
    <!-- Hiển thị danh sách tin tức -->
    <div class="news-list">
      <div v-for="post in posts" :key="post.id" class="news-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleNewsPage',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => response.json())
        .then(data => {
          this.posts = data
        })
        .catch(error => {
          console.error('Lỗi:', error)
        })
    }
  }
}
</script>

<style scoped>
.news-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.news-item {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
}

.news-item h3 {
  color: #333;
  margin-bottom: 10px;
}

.news-item p {
  color: #666;
  line-height: 1.6;
}
</style> 