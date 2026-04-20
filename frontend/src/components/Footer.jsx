import React from 'react'

export default function Footer() {
  return (
    <footer style={{ background: '#022c22', padding: '48px 24px 24px', color: 'rgba(255,255,255,.6)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: '#6ee7b7', marginBottom: 10 }}>⛰ Kedar Camps</p>
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>Premium tented camps in the sacred Kedarnath Valley at 3,583m elevation — where the Himalayas meet the divine.</p>
          </div>
          <div>
            <p style={{ color: '#a7f3d0', fontWeight: 600, marginBottom: 12, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Location</p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>Kedarnath, Rudraprayag<br />Uttarakhand — 246 445<br />Near Kedarnath Temple Trek</p>
          </div>
          <div>
            <p style={{ color: '#a7f3d0', fontWeight: 600, marginBottom: 12, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Season</p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>Open: May – June &amp; Sept – Nov<br />Best time: June &amp; October<br />Altitude: 3,583m above sea level</p>
          </div>
          <div>
            <p style={{ color: '#a7f3d0', fontWeight: 600, marginBottom: 12, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Contact</p>
            <p style={{ fontSize: 13, lineHeight: 1.8 }}>📞 +91 98765 43210<br />✉ hello@kedarcamps.in<br />Payment collected at camp</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 20, textAlign: 'center', fontSize: 12 }}>
          © {new Date().getFullYear()} Kedar Camps. All rights reserved. | Kedarnath, Uttarakhand
        </div>
      </div>
    </footer>
  )
}
