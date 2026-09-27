<script setup>
import { RouterLink } from 'vue-router'
import { formatDate } from '@/data/leagues'

defineProps({
  article: { type: Object, required: true },
  to: { type: [String, Object], required: true },
  featured: { type: Boolean, default: false },
})
</script>

<template>
  <RouterLink :to="to" :class="featured ? 'featured' : 'card'">
    <span class="article-photo">
      <img v-if="article.image" :src="article.image" :alt="article.title">
    </span>
    <div class="article-body">
      <span class="article-tag">{{ article.category }}</span>
      <h3 class="article-heading">{{ article.title }}</h3>
      <p v-if="featured && article.perex" class="article-perex">{{ article.perex }}</p>
      <time class="article-date" :datetime="article.date">{{ formatDate(article.date) }}</time>
    </div>
  </RouterLink>
</template>

<style scoped>
.article-photo {
  display: block;
  overflow: hidden;
  border-radius: 4px;
  background: var(--placeholder);
}

.article-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .3s ease;
}

a:hover .article-photo img,
a:focus-visible .article-photo img { transform: scale(1.02); }

.article-body {
  display: flex;
  flex-direction: column;
}

.article-tag {
  color: var(--accent);
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
}

.article-heading {
  margin: 0;
  color: var(--heading);
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 700;
  text-wrap: pretty;
  transition: color .2s ease;
}

a:hover .article-heading,
a:focus-visible .article-heading { color: var(--accent-hover); }

.article-perex {
  margin: 0;
  color: var(--copy);
  font-size: 18px;
  line-height: 1.55;
  text-wrap: pretty;
}

.article-date {
  color: var(--muted);
  font-size: 14px;
}

/* Hlavní článek */

.featured {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  align-items: center;
  gap: 40px;
}

.featured .article-photo { aspect-ratio: 16 / 9; }
.featured .article-body { gap: 14px; }
.featured .article-tag { font-size: 14px; }

.featured .article-heading {
  font-size: 44px;
  line-height: 1.02;
}

/* Karta v mřížce */

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.card .article-photo { aspect-ratio: 16 / 10; }
.card .article-body { gap: 12px; }
.card .article-tag { font-size: 13px; }

.card .article-heading {
  font-size: 26px;
  line-height: 1.08;
}

@media (max-width: 1023px) {
  .featured { grid-template-columns: 1fr; gap: 24px; }
}

@media (max-width: 639px) {
  .featured .article-heading { font-size: 32px; }
  .article-perex { font-size: 17px; }
}

@media (prefers-reduced-motion: reduce) {
  .article-photo img,
  .article-heading { transition: none; }
}
</style>
