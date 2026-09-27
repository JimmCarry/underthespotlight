<script setup>
import { computed } from 'vue'
import LeagueHeader from '@/components/LeagueHeader.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { leagues } from '@/data/leagues'
import { articlesFor } from '@/data/articles'

const props = defineProps({
  league: { type: String, required: true },
})

const data = computed(() => leagues[props.league])
const articles = computed(() => articlesFor(props.league))
const featured = computed(() => articles.value[0])
const rest = computed(() => articles.value.slice(1))

const articleLink = (slug) => ({ name: 'article', params: { league: props.league, slug } })
</script>

<template>
  <div class="league-page" :class="`theme-${data.id}`">
    <LeagueHeader :league="data" />

    <main class="articles" aria-labelledby="articles-title">
      <div class="articles__head">
        <h2 id="articles-title" class="articles__title">Články</h2>
        <span class="articles__sort">Nejnovější</span>
      </div>

      <p v-if="!featured" class="articles__empty">První články připravujeme.</p>

      <ArticleCard v-if="featured" :article="featured" :to="articleLink(featured.slug)" featured />

      <ul v-if="rest.length" class="article-grid">
        <li v-for="article in rest" :key="article.slug">
          <ArticleCard :article="article" :to="articleLink(article.slug)" />
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.league-page {
  --content-max: 1280px;
  min-height: 100dvh;
  background: var(--page);
  color: var(--copy);
}

.league-page :deep(a:focus-visible) {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 2px;
}

.articles {
  display: flex;
  max-width: var(--content-max);
  flex-direction: column;
  gap: 40px;
  margin: 0 auto;
  padding: 56px 64px 72px;
}

.articles__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--heading);
}

.articles__title {
  margin: 0;
  color: var(--heading);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: .02em;
  text-transform: uppercase;
}

.articles__sort {
  color: var(--muted-strong);
  font-size: 15px;
}

.articles__empty {
  margin: 0;
  padding: 48px 0;
  color: var(--muted-strong);
  font-size: 18px;
  text-align: center;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 1023px) {
  .articles { padding-right: 40px; padding-left: 40px; }
  .article-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 639px) {
  .articles {
    gap: 32px;
    padding: 36px 20px 56px;
  }

  .articles__title { font-size: 28px; }
  .article-grid { grid-template-columns: 1fr; gap: 32px; }
}
</style>
