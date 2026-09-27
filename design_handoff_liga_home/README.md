# Handoff: Domovské stránky lig NBA a NBL (varianty 5A / 5B)

## Overview
Domovská stránka každé ligy, na kterou se uživatel dostane z úvodního rozcestníku (viz handoff `design_handoff_basketbal_homepage`, varianta 4A). Stránka obsahuje jen **header** (logo, název ligy, odkaz zpět) a **sekci článků**. NBA a NBL mají stejnou strukturu, liší se jen barvami a texty — implementovat jako **jednu šablonu s tématem** (`theme: 'nba' | 'nbl'`).

## About the Design Files
Soubory v tomto balíčku jsou **referenční návrhy v HTML**. Ukazují, jak má stránka vypadat a chovat se, ale nejsou produkční kód. Úkolem je postavit návrh znovu v prostředí cílového projektu podle jeho zavedených vzorů — ideálně ve stejném stacku jako rozcestník 4A.

## Fidelity
**High-fidelity.** Barvy, typografie a rozestupy jsou finální. Návrh je nakreslený v šířce 1280 px; v produkci má obsah `max-width: 1280px` vystředěný, header přes celou šířku okna.

## Struktura stránky

### 1. Header
- Výška 120px, padding `0 64px`, flex, `align-items: center; justify-content: space-between`.
- Pozadí: NBA `linear-gradient(200deg, #12304e 0%, #0a1b2c 70%)`, NBL `linear-gradient(160deg, #5a1119 0%, #2a070c 70%)`.
- Vlevo skupina (flex, gap 22px):
  - Logo: box 64×72px, `object-fit: contain`. Soubor loga dodá klient.
  - Svislý oddělovač 2×48px — NBA `rgba(111,179,220,0.45)`, NBL `rgba(232,160,160,0.45)`.
  - Název (flex column, gap 2px):
    - „NBA“ / „NBL“: Barlow Condensed 700, 44px, line-height 1, `#ffffff`
    - Plný název: Barlow Condensed 600, 14px, letter-spacing 0.24em, uppercase — NBA „National Basketball Association“ `#6fb3dc`, NBL „Národní basketbalová liga“ `#e8a0a0`
- Vpravo odkaz „← Rozcestník“ (vede na `/`): Barlow Condensed 600, 15px, letter-spacing 0.14em, uppercase; NBA `#b9cddd`, NBL `#f0cdcd`; hover `#ffffff`.

### 2. Sekce Články (`<main>`)
- Pozadí stránky: NBA `#f4f6f8`, NBL `#f7f4f4`.
- Padding `56px 64px 72px`, flex column, gap 40px.

**Nadpis sekce**
- Řádek flex, `justify-content: space-between; align-items: baseline`, `border-bottom: 2px solid` (NBA `#0a1b2c`, NBL `#2a070c`), padding-bottom 12px.
- „Články“: Barlow Condensed 700, 34px, letter-spacing 0.02em, uppercase, barva stejná jako border.
- Vpravo „Nejnovější“: Source Sans 3, 15px, NBA `#5b6b78`, NBL `#6b5a5c`.

**Hlavní článek**
- Grid `minmax(0,1.6fr) minmax(0,1fr)`, gap 40px, `align-items: center`, celý klikací.
- Foto: 16:9, radius 4px, placeholder pozadí NBA `#dde3e8`, NBL `#e6dcdc`, `object-fit: cover`.
- Text (flex column, gap 14px):
  - Štítek „Hlavní článek“: Barlow Condensed 700, 14px, letter-spacing 0.16em, uppercase; NBA `#3c8dbc`, NBL `#c00000`
  - Titulek: Barlow Condensed 700, 44px, line-height 1.02; NBA `#0a1b2c`, NBL `#2a070c`; hover NBA `#2f7297`, NBL `#b80000`
  - Perex: Source Sans 3, 18px, line-height 1.55; NBA `#3d4a55`, NBL `#4a3d3e`
  - Datum: 14px; NBA `#6b7a86`, NBL `#7a6a6c`

**Mřížka článků**
- Grid `repeat(3, minmax(0,1fr))`, gap `40px 32px`. V návrhu 6 článků (2 řady).
- Karta (flex column, gap 12px, celá klikací):
  - Foto 16:10, radius 4px, `object-fit: cover`
  - Rubrika: Barlow Condensed 700, 13px, letter-spacing 0.16em, uppercase, barva akcentu (NBA `#3c8dbc`, NBL `#c00000`)
  - Titulek: Barlow Condensed 700, 26px, line-height 1.08, barva nadpisu, hover jako u hlavního článku
  - Datum: 14px, šedá dle tématu

Všechny titulky/perexy mají `text-wrap: pretty`.

## Interactions & Behavior
- Klik na kartu / hlavní článek → detail článku (`/nba/clanky/:slug`, `/nbl/clanky/:slug`).
- Hover: změna barvy titulku (viz výše). Doporučeno i jemné `transform: scale(1.02)` fotky uvnitř `overflow: hidden` (volitelné, v návrhu není).
- „Nejnovější“ je v návrhu jen popisek řazení, ne ovládací prvek.
- Pod mřížkou lze doplnit stránkování / „Načíst další“ — v návrhu není, konzultovat s klientem.
- **Responzivita (doporučení):** < 1024px mřížka 2 sloupce, hlavní článek pod sebe (foto nad textem); < 640px 1 sloupec, header výška 88px, název 34px, plný název skrýt nebo zmenšit, padding 20–24px, titulek hlavního článku 32px.
- Přístupnost: karta jako `<a>` obalující celý `<article>`, `:focus-visible` outline v barvě akcentu, `alt` u fotek.

## Data
```ts
type Article = {
  slug: string;
  title: string;
  perex?: string;      // jen u hlavního článku
  category: string;    // rubrika, např. „Zápasy“, „Přestupy“
  date: string;        // formát d. m. yyyy, např. „23. 9. 2026“
  image: string;
  league: 'nba' | 'nbl';
};
```
Hlavní článek = nejnovější (nebo označený `featured`), mřížka = dalších 6. Texty v návrhu jsou zástupné.

Rubriky použité v návrhu: NBA — Zápasy, Přestupy, Statistiky, Rozhovor, Analýza; NBL — Kolo, Kluby, Přestupy, Reprezentace, Rozhovor, Mládež.

## Design Tokens
- NBA: header gradient `#12304e → #0a1b2c`, akcent `#3c8dbc` / hover `#2f7297`, header doplňkové `#6fb3dc`, `#b9cddd`, nadpisy `#0a1b2c`, text `#3d4a55`, šedá `#6b7a86` / `#5b6b78`, pozadí `#f4f6f8`, placeholder `#dde3e8`
- NBL: header gradient `#5a1119 → #2a070c`, akcent `#c00000` (text) / `#e40000` (plochy, z rozcestníku) / hover `#b80000`, header doplňkové `#e8a0a0`, `#f0cdcd`, nadpisy `#2a070c`, text `#4a3d3e`, šedá `#7a6a6c` / `#6b5a5c`, pozadí `#f7f4f4`, placeholder `#e6dcdc`
- Písma: **Barlow Condensed** 600/700, **Source Sans 3** 400/600
- Typografie: 13 / 14 / 15 / 18 / 26 / 34 / 44 px
- Radius: 4px (fotky)
- Mezery: 12 / 14 / 22 / 32 / 40 / 56 / 64 / 72 px

## Assets
- Loga NBA a NBL: dodá klient (ochranné známky, nejsou součástí balíčku).
- Fotky článků: z CMS.

## Screenshots
- `screenshots/nba-home.png` — varianta 5A
- `screenshots/nbl-home.png` — varianta 5B

## Files
- `Liga Home.dc.html` — obě varianty (sekce `#5a` a `#5b`)
- `support.js`, `image-slot.js` — runtime k otevření návrhu v prohlížeči (nejsou součástí implementace)
