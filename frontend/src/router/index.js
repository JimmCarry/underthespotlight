import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { leagues } from '../data/leagues'
import { findArticle } from '../data/articles'

const leagueParam = Object.keys(leagues).join('|')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Basketbal | NBA a NBL' },
    },
    {
      path: `/:league(${leagueParam})`,
      name: 'league',
      component: () => import('../views/LeagueHomeView.vue'),
      props: true,
    },
    {
      path: `/:league(${leagueParam})/clanky/:slug`,
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior: (to, from, savedPosition) => savedPosition ?? { top: 0 },
})

router.afterEach((to) => {
  const league = leagues[to.params.league]
  const article = to.name === 'article' ? findArticle(to.params.league, to.params.slug) : null
  document.title = article
    ? `${article.title} | ${league.name}`
    : league ? `${league.name} | Články` : (to.meta.title ?? 'Basketbal')
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', league?.themeColor ?? '#07101a')
})

export default router
