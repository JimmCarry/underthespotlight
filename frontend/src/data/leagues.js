// Údaje o ligách. Články se načítají z /content (viz articles.js).

export const leagues = {
  nba: {
    id: 'nba',
    name: 'NBA',
    fullName: 'National Basketball Association',
    themeColor: '#0a1b2c',
    logo: null, // dodá klient
  },
  nbl: {
    id: 'nbl',
    name: 'NBL',
    fullName: 'Národní basketbalová liga',
    themeColor: '#2a070c',
    logo: null, // dodá klient
  },
}

// ISO datum → „23. 9. 2026“
export function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day}. ${month}. ${year}`
}
