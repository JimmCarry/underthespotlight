// Články se načítají z Markdown souborů v /content/<liga>/clanky/*.md (frontmatter + text).
// Nový článek = nový soubor, žádná další úprava kódu.

import MarkdownIt from 'markdown-it'

const files = import.meta.glob('../../../content/*/clanky/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const md = new MarkdownIt({ html: false, linkify: true })

// Jednoduchý frontmatter: řádky „klíč: hodnota“ mezi dvěma „---“.
function parse(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return null

  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i < 1) continue
    const value = line.slice(i + 1).trim()
    meta[line.slice(0, i).trim()] = value === 'null' || value === '' ? null : value
  }

  return { ...meta, body: match[2] }
}

// Díl seriálu „… (25/30)“ → 25. Seriál odpočítává, nižší číslo = novější díl.
const episode = (article) => Number(article.series?.match(/\((\d+)\/\d+\)/)?.[1] ?? Infinity)

const all = Object.values(files)
  .map(parse)
  .filter((article) => article?.slug && article.league && article.title && article.date)
  .sort((a, b) => b.date.localeCompare(a.date) || episode(a) - episode(b) || a.slug.localeCompare(b.slug))

export function articlesFor(league) {
  return all.filter((article) => article.league === league)
}

export function findArticle(league, slug) {
  return all.find((article) => article.league === league && article.slug === slug) ?? null
}

export function renderBody(article) {
  return md.render(article.body)
}
