<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import LeagueHeader from '@/components/LeagueHeader.vue'
import { leagues, formatDate } from '@/data/leagues'
import { findArticle, renderBody } from '@/data/articles'

const props = defineProps({
  league: { type: String, required: true },
  slug: { type: String, required: true },
})

const data = computed(() => leagues[props.league])
const article = computed(() => findArticle(props.league, props.slug))
// Obsah pochází z Markdownu v repozitáři (bez povoleného HTML), proto v-html.
const body = computed(() => (article.value ? renderBody(article.value) : ''))
</script>

<template>
  <div class="league-page" :class="`theme-${data.id}`">
    <LeagueHeader :league="data" />

    <main class="article">
      <RouterLink class="article__back" :to="{ name: 'league', params: { league } }">← Všechny články</RouterLink>

      <article v-if="article">
        <header class="article__head">
          <span class="article__tag">{{ article.category }}</span>
          <h1 class="article__title">{{ article.title }}</h1>
          <div class="article__meta">
            <time :datetime="article.date">{{ formatDate(article.date) }}</time>
            <span v-if="article.series">· {{ article.series }}</span>
          </div>
          <p v-if="article.perex" class="article__perex">{{ article.perex }}</p>
        </header>

        <div class="article__body" v-html="body"></div>
      </article>

      <div v-else class="article__missing">
        <h1 class="article__title">Článek nenalezen</h1>
        <p>Tento článek neexistuje nebo byl odstraněn.</p>
      </div>
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

.article {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

.article__back {
  display: inline-block;
  margin-bottom: 32px;
  color: var(--accent);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  transition: color .2s ease;
}

.article__back:hover,
.article__back:focus-visible { color: var(--accent-hover); }

.article__head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-bottom: 28px;
  margin-bottom: 32px;
  border-bottom: 2px solid var(--heading);
}

.article__tag {
  color: var(--accent);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
}

.article__title {
  margin: 0;
  color: var(--heading);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 52px;
  font-weight: 700;
  line-height: 1.02;
  text-wrap: balance;
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  color: var(--muted);
  font-size: 15px;
}

.article__perex {
  margin: 8px 0 0;
  color: var(--heading);
  font-size: 21px;
  font-weight: 600;
  line-height: 1.5;
  text-wrap: pretty;
}

.article__body {
  font-size: 18px;
  line-height: 1.7;
}

.article__body :deep(h2) {
  margin: 44px 0 12px;
  color: var(--heading);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
}

.article__body :deep(p),
.article__body :deep(ul),
.article__body :deep(ol) { margin: 0 0 18px; }

.article__body :deep(ul),
.article__body :deep(ol) { padding-left: 24px; }

.article__body :deep(li) { margin-bottom: 8px; }

.article__body :deep(strong) { color: var(--heading); }

.article__body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
}

.article__missing p { font-size: 18px; }

@media (max-width: 639px) {
  .article { padding: 32px 20px 56px; }
  .article__title { font-size: 36px; }
  .article__perex { font-size: 19px; }
  .article__body { font-size: 17px; }
  .article__body :deep(h2) { font-size: 26px; margin-top: 36px; }
}

@media (prefers-reduced-motion: reduce) {
  .article__back { transition: none; }
}
</style>
