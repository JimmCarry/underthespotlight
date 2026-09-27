<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  league: { type: Object, required: true },
})
</script>

<template>
  <header class="league-header">
    <div class="league-header__inner">
      <div class="league-header__brand">
        <img v-if="league.logo" class="league-header__logo" :src="league.logo" :alt="`Logo ${league.name}`">
        <div v-else class="league-header__logo league-header__logo--empty" aria-hidden="true"></div>
        <div class="league-header__divider" aria-hidden="true"></div>
        <div class="league-header__names">
          <h1 class="league-header__title">{{ league.name }}</h1>
          <span class="league-header__full-name">{{ league.fullName }}</span>
        </div>
      </div>
      <RouterLink class="league-header__back" :to="{ name: 'home' }">← Rozcestník</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.league-header {
  background: linear-gradient(var(--header-angle), var(--header-top) 0%, var(--header-bottom) 70%);
}

.league-header__inner {
  display: flex;
  max-width: var(--content-max);
  height: 120px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 0 auto;
  padding: 0 64px;
}

.league-header__brand {
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
}

.league-header__logo {
  display: block;
  width: 64px;
  height: 72px;
  flex: none;
  object-fit: contain;
}

/* Dokud klient nedodá logo, necháme slot viditelný. */
.league-header__logo--empty {
  border: 1px dashed var(--header-divider);
  border-radius: 4px;
}

.league-header__divider {
  width: 2px;
  height: 48px;
  flex: none;
  background: var(--header-divider);
}

.league-header__names {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.league-header__title {
  margin: 0;
  color: #fff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
}

.league-header__full-name {
  color: var(--header-label);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .24em;
  text-transform: uppercase;
}

.league-header__back {
  flex: none;
  color: var(--header-link);
  font-family: "Barlow Condensed", sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  transition: color .2s ease;
}

.league-header__back:hover,
.league-header__back:focus-visible { color: #fff; }

@media (max-width: 1023px) {
  .league-header__inner { padding: 0 40px; }
}

@media (max-width: 639px) {
  .league-header__inner {
    height: 88px;
    padding: 0 20px;
  }

  .league-header__brand { gap: 14px; }
  .league-header__logo { width: 44px; height: 50px; }
  .league-header__divider { height: 36px; }
  .league-header__title { font-size: 34px; }
  .league-header__full-name { display: none; }
  .league-header__back { font-size: 14px; letter-spacing: .1em; }
}

@media (prefers-reduced-motion: reduce) {
  .league-header__back { transition: none; }
}
</style>
