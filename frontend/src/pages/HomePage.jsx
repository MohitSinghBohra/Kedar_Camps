import React, { useState } from 'react'
import { CAMPS, inr } from '../utils.js'

const HERO_IMGS = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format',
]

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80', label: 'Himalayan Sunset' },
  { src: 'https://images.unsplash.com/photo-1537905569824-f89f14803cfe?w=600&q=80', label: 'Starlit Nights' },
  { src: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80', label: 'Morning Mist' },
  { src: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?w=600&q=80', label: 'Bonfire Evenings' },
  { src: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&q=80', label: 'Snow Peaks View' },
  { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', label: 'Trekking Trails' },
]

const FEATURES = [
  { icon: '🏔️', title: 'Himalayan Views',    desc: 'Breathtaking 360° panoramas of snow-capped Himalayan peaks from your camp door.' },
  { icon: '🔥', title: 'Bonfire Nights',     desc: 'Warm communal bonfires under a sea of stars at 3,583m elevation every night.' },
  { icon: '🍽️', title: 'Local Cuisine',      desc: 'Authentic Garhwali meals freshly prepared — Aloo Puri, Kafuli, Jhangora Kheer.' },
  { icon: '🛕', title: 'Temple Access',      desc: 'Prime location near Kedarnath Temple — one of the most sacred Jyotirlingas.' },
  { icon: '🌿', title: 'Eco Camps',          desc: 'Solar-powered, low-impact camps designed to protect the pristine ecosystem.' },
  { icon: '🧘', title: 'Meditation Decks',   desc: 'Dedicated yoga & meditation platforms with unobstructed mountain views.' },
]

export default function HomePage({ onBook, onCamps }) {
  const [heroIdx] = useState(0)

  return (
    <div>
      {/* ─ Hero ─ */}
      <section style={{ position: 'relative', minHeight: 580, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src={HERO_IMGS[heroIdx]} alt="Kedarnath"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(6,78,58,.88) 0%,rgba(2,44,34,.7) 60%,rgba(0,0,0,.4) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '80px 24px 60px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(16,185,129,.2)', border: '1px solid rgba(110,231,183,.4)', color: '#6ee7b7', fontSize: 11, fontWeight: 700, letterSpacing: 3, padding: '6px 18px', borderRadius: 20, marginBottom: 20, textTransform: 'uppercase' }}>
            Kedarnath, Uttarakhand · 3,583m
          </div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(40px,6vw,72px)', color: '#fff', marginBottom: 18, fontWeight: 900, textShadow: '0 2px 30px rgba(0,0,0,.5)' }}>
            Kedar Camps
          </h1>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 18, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Premium tented camps in the sacred Himalayan valley — where adventure meets spirituality.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onBook} style={btnPrimary}>Book Your Camp →</button>
            <button onClick={onCamps} style={btnGhost}>Explore Camps</button>
          </div>
          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 50, flexWrap: 'wrap' }}>
            {[['22','Tent Units'],['6','Camp Types'],['3,583m','Altitude'],['500+','Happy Guests']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Fraunces',serif", fontSize: 28, color: '#6ee7b7', fontWeight: 700 }}>{n}</p>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ Features ─ */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={sectionTag}>Why Choose Kedar Camps</p>
            <h2 style={sectionH2}>An Experience Unlike Any Other</h2>
            <p style={sectionSub}>Every detail crafted for your comfort in the Himalayas</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: '#f0fdf8', border: '1.5px solid #d1fae5', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <p style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: '#064e3b', marginBottom: 8, fontWeight: 700 }}>{f.title}</p>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ Camp Types Quick Overview ─ */}
      <section style={{ padding: '80px 24px', background: '#f0fdf8' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={sectionTag}>Our Camps</p>
            <h2 style={sectionH2}>Choose Your Perfect Camp</h2>
            <p style={sectionSub}>Six carefully designed tent types to match every group size</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {CAMPS.map(c => (
              <div key={c.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.06)', border: '1.5px solid #e5e7eb', transition: 'transform .2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: 6, background: c.color }} />
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <p style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: '#111827', fontWeight: 700 }}>{c.name}</p>
                    <span style={{ background: c.color, color: '#fff', fontSize: 9, padding: '3px 8px', borderRadius: 10, fontWeight: 800, letterSpacing: 1 }}>{c.badge}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 14 }}>{c.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: 12, color: '#9ca3af' }}>👥 {c.cap} persons · 🏕 {c.total} units</p>
                    </div>
                    <p style={{ fontWeight: 800, color: c.color, fontSize: 16 }}>{inr(c.price)}<span style={{ fontSize: 10, fontWeight: 400, color: '#9ca3af' }}>/night</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={onBook} style={btnPrimary}>Book a Camp Now →</button>
          </div>
        </div>
      </section>

      {/* ─ Gallery ─ */}
      <section style={{ padding: '80px 24px', background: '#022c22' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <p style={{ ...sectionTag, color: '#6ee7b7' }}>Gallery</p>
            <h2 style={{ ...sectionH2, color: '#fff' }}>Life at Kedar Camps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ borderRadius: 14, overflow: 'hidden', height: 220, position: 'relative', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.querySelector('.overlay').style.opacity = 1}
                onMouseLeave={e => e.currentTarget.querySelector('.overlay').style.opacity = 0}
              >
                <img src={g.src} alt={g.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  onError={e => { e.target.parentNode.style.background = '#064e3b'; e.target.style.display = 'none' }}
                />
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(6,78,58,.85) 0%,transparent 60%)', opacity: 0, transition: 'opacity .3s', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{g.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ CTA Banner ─ */}
      <section style={{ padding: '60px 24px', background: 'linear-gradient(135deg,#10b981,#059669)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, color: '#fff', marginBottom: 14 }}>Ready for the Himalayan Adventure?</h2>
          <p style={{ color: 'rgba(255,255,255,.85)', marginBottom: 28, fontSize: 16 }}>Limited camps available for this season. Book early to secure your spot at Kedarnath.</p>
          <button onClick={onBook} style={{ background: '#fff', color: '#059669', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, padding: '14px 40px', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,.2)' }}>
            Book Your Camp Now →
          </button>
        </div>
      </section>
    </div>
  )
}

const btnPrimary = { background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 20px rgba(249,115,22,.4)', transition: 'all .2s' }
const btnGhost   = { background: 'rgba(255,255,255,.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,.35)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 16, padding: '14px 36px', borderRadius: 10, cursor: 'pointer', transition: 'all .2s' }
const sectionTag = { color: '#10b981', fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }
const sectionH2  = { fontFamily: "'Fraunces',serif", fontSize: 'clamp(28px,4vw,42px)', color: '#064e3b', marginBottom: 12 }
const sectionSub = { color: '#6b7280', fontSize: 16, maxWidth: 480, margin: '0 auto' }
