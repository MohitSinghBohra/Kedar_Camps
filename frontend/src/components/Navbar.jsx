import React from 'react'

const S = {
  nav: { background: 'linear-gradient(135deg,#064e3b 0%,#065f46 100%)', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 20px rgba(0,0,0,.25)' },
  inner: { maxWidth: 1140, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  logo: { fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: '#6ee7b7', cursor: 'pointer', letterSpacing: '.5px' },
  links: { display: 'flex', gap: 6, alignItems: 'center' },
  link: { background: 'transparent', border: 'none', color: 'rgba(255,255,255,.75)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, cursor: 'pointer', padding: '7px 14px', borderRadius: 8, transition: 'all .2s' },
  bookBtn: { background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: '9px 22px', borderRadius: 8, transition: 'all .2s', boxShadow: '0 2px 10px rgba(249,115,22,.4)' },
  adminBtn: { background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.55)', border: '1px solid rgba(255,255,255,.2)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, cursor: 'pointer', padding: '6px 12px', borderRadius: 6 }
}

export default function Navbar({ page, onNav }) {
  return (
    <nav style={S.nav}>
      <div style={S.inner}>
        <span style={S.logo} onClick={() => onNav('home')}>⛰ Kedar Camps</span>
        <div style={S.links}>
          {[['home','Home'],['camps','Camps'],['book','Book Now']].map(([p,label]) => (
            <button key={p} style={p === 'book' ? S.bookBtn : { ...S.link, color: page === p ? '#6ee7b7' : 'rgba(255,255,255,.75)', fontWeight: page === p ? 600 : 400 }} onClick={() => onNav(p)}>{label}</button>
          ))}
          <button style={S.adminBtn} onClick={() => onNav('admin')}>Admin</button>
        </div>
      </div>
    </nav>
  )
}
