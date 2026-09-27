# Handoff: Úvodní stránka Basketbal (NBA / NBL rozcestník) — varianta 4A

## Overview
Úvodní rozcestník basketbalového webu. Obrazovka je svisle rozdělená na dvě poloviny: levá = NBA (zámořská liga), pravá = NBL (Národní basketbalová liga, Česko). Uživatel si vybere ligu. Po najetí myší na jednu polovinu se druhá ztlumí a odbarví.

## About the Design Files
Soubory v tomto balíčku jsou **referenční návrhy v HTML**. Ukazují, jak má stránka vypadat a chovat se, ale nejsou to produkční kód. Úkolem je **postavit tento návrh znovu v prostředí cílového projektu** (React, Vue, Astro, …) podle jeho zavedených vzorů. Pokud projekt zatím neexistuje, zvol vhodný framework (doporučení: čisté HTML/CSS + trocha JS, nebo React/Next).

`Basket Homepage.dc.html` je plátno se všemi prozkoumanými variantami. **Implementovat se má jen varianta 4A** (sekce nahoře, `id="4a"`). Varianty 1A–3C slouží jen jako kontext.

## Fidelity
**High-fidelity.** Barvy, typografie, rozestupy i hover chování jsou finální. Návrh je nakreslený v rámu 1120×660 px — v produkci má stránka zabírat celou výšku okna (`100vh`, resp. `100dvh`) a proporce se mají přizpůsobit.

## Screen: Rozcestník (varianta 4A)

### Layout
- Kontejner: `position: relative; width: 100%; height: 100dvh; overflow: hidden; background: #07101a`.
- Dva panely vedle sebe, každý `width: 50%; height: 100%`.
- Obsah každého panelu: flex column, `align-items: center; justify-content: center; text-align: center; gap: 22px; padding: 96px 72px 56px`.
- Svislý šev uprostřed: `left: 50%; top: 110px; bottom: 0; width: 2px; margin-left: -1px; background: rgba(255,255,255,0.16)` (začíná pod titulkem, aby jím neprocházel).
- Horní titulek (vystředěný přes obě poloviny, `top: 42px`, `pointer-events: none`): flex column, gap 4px.

### Panel NBA (vlevo)
- Pozadí: `linear-gradient(200deg, #12304e 0%, #0a1b2c 70%)`
- Nadpis nad názvem „Zámoří“: Barlow Condensed 600, 16px, letter-spacing 0.28em, uppercase, `#6fb3dc`
- Název „NBA“: Barlow Condensed 700, 168px, line-height 0.85, letter-spacing -0.01em, `#ffffff`
- Oddělovač: 54×2px, `rgba(111,179,220,0.55)`
- Popis: Source Sans 3 400, 17px, line-height 1.5, `#b9cddd`, max-width 320px — „Výsledky, statistiky hráčů a noční přenosy v českém čase.“
- Tlačítko „Vstoupit do NBA“: Barlow Condensed 700, 17px, letter-spacing 0.1em, uppercase, bílý text, pozadí `#3c8dbc`, hover `#2f7297`, padding 12px 28px, radius 3px, `white-space: nowrap`

### Panel NBL (vpravo)
- Pozadí: `linear-gradient(160deg, #5a1119 0%, #2a070c 70%)`
- Nadpis nad názvem „Česko“: stejný styl, barva `#e8a0a0`
- Název „NBL“: stejný styl jako NBA
- Oddělovač: `rgba(232,160,160,0.55)`
- Popis: barva `#f0cdcd` — „Tabulky, soupisky, přestupy a play-off české ligy.“
- Tlačítko „Vstoupit do NBL“: pozadí `#e40000`, hover `#b80000`, jinak stejné jako NBA

### Horní titulek
- „Basketbal“: Barlow Condensed 700, 22px, letter-spacing 0.34em, uppercase, `#ffffff`
- „dvě ligy, jeden web“: Source Sans 3, 13px, letter-spacing 0.16em, uppercase, `rgba(255,255,255,0.55)`

## Interactions & Behavior
- **Hover na panel:** aktivní panel dostane `filter: saturate(1.05) brightness(1.02); opacity: 1`. Druhý panel dostane `opacity: 0.3; filter: saturate(0.2) brightness(0.72)`.
- **Bez hoveru** (myš mimo kontejner): oba panely jsou plně viditelné.
- Přechod: `transition: opacity .35s ease, filter .35s ease`.
- V CSS jde hover udělat i bez JS, např. `.split:has(.nba:hover) .nbl { … }` a naopak.
- Klik na celý panel (nejen na tlačítko) má vést do sekce ligy — doporučené routy `/nba` a `/nbl`.
- Ztlumení 0.3 je v návrhu nastavitelné (rozsah 0.1–0.9), výchozí hodnota 0.3.
- Dotyková zařízení: hover efekt vypnout (`@media (hover: none)`).
- **Responzivita (není v návrhu nakreslená, doporučení):** pod ~768px skládat panely pod sebe (NBA nahoře, NBL dole, každý 50dvh), název zmenšit na ~96px, popis a tlačítko ponechat.
- Přístupnost: panely jako `<a>` s viditelným stylem `:focus-visible` (stejný jako hover); zajistit `prefers-reduced-motion` (bez transition).

## State Management
Jen jedna hodnota: který panel je aktivní — `null | 'nba' | 'nbl'`. `mouseenter` na panelu ji nastaví, `mouseleave` na kontejneru ji vrátí na `null`. (Při řešení přes CSS `:has()` žádný stav není potřeba.)

## Design Tokens
- Pozadí stránky: `#07101a`
- NBA: gradient `#12304e → #0a1b2c`, akcent `#3c8dbc` / hover `#2f7297`, doplňkové `#6fb3dc`, `#b9cddd`
- NBL: gradient `#5a1119 → #2a070c`, akcent `#e40000` / hover `#b80000`, doplňkové `#e8a0a0`, `#f0cdcd`
- Šev: `rgba(255,255,255,0.16)`
- Písma (Google Fonts): **Barlow Condensed** 500/600/700 (nadpisy, tlačítka), **Source Sans 3** 400/600/700 (text)
- Velikost textu: 13 / 16 / 17 / 22 / 168 px
- Radius: 3px (tlačítka)
- Mezery: gap 22px, padding panelu 96/72/56px

## Assets
Nepoužívají se žádné obrázky ani loga. Loga NBA/NBL jsou ochranné známky — varianta 4A je záměrně čistě typografická.

## Screenshots
- `screenshots/01-vychozi.png` — výchozí stav
- `screenshots/02-hover-nba.png` — myš na NBA, NBL ztlumená
- `screenshots/03-hover-nbl.png` — myš na NBL, NBA ztlumená

## Files
- `Basket Homepage.dc.html` — plátno se všemi variantami; implementovat sekci `#4a`
- `support.js` — runtime potřebný k otevření návrhu v prohlížeči (není součástí implementace)
- `image-slot.js` — používají ho jen starší varianty
