export const today = () => new Date().toISOString().slice(0, 10)

export const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export const nights = (ci, co) =>
  Math.max(1, Math.round((new Date(co) - new Date(ci)) / 864e5))

export const fmtDate = (ds) =>
  ds ? new Date(ds + 'T00:00').toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  }) : ''

export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')

export const CAMPS = [
  { id: 'c2',  cap: 2,  total: 4, name: 'Duo Tent',      desc: 'Perfect for couples & pairs',    price: 1800, color: '#f97316', light: '#fff7ed', badge: 'COUPLE'   },
  { id: 'c3',  cap: 3,  total: 4, name: 'Trio Tent',     desc: 'Great for a trio of friends',    price: 2400, color: '#10b981', light: '#ecfdf5', badge: 'FRIENDS'  },
  { id: 'c5',  cap: 5,  total: 6, name: 'Explorer Camp', desc: 'Best for small groups of 5',     price: 3500, color: '#8b5cf6', light: '#f5f3ff', badge: 'POPULAR'  },
  { id: 'c6',  cap: 6,  total: 4, name: 'Family Camp',   desc: 'Ideal for families of 6',        price: 4200, color: '#0ea5e9', light: '#f0f9ff', badge: 'FAMILY'   },
  { id: 'c10', cap: 10, total: 2, name: 'Group Camp',    desc: 'Large group retreats — 10 pax',  price: 7000, color: '#f43f5e', light: '#fff1f2', badge: 'GROUP'    },
  { id: 'c20', cap: 20, total: 2, name: 'Mega Camp',     desc: 'Events & bulk bookings — 20 pax',price: 12000,color: '#f59e0b', light: '#fffbeb', badge: 'EVENT'    },
]
