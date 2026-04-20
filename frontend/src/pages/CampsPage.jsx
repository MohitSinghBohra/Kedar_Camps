import React from 'react'
import { CAMPS, inr } from '../utils.js'

export default function CampsPage({ onBook }) {
  return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <p style={{ color: '#6ee7b7', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Our Camp Types</p>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(30px,5vw,50px)', color: '#fff', marginBottom: 14 }}>Find Your Perfect Camp</h1>
        <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Six carefully designed tent types accommodating 2 to 20 guests — each offering the same breathtaking Himalayan experience.
        </p>
      </div>

      {/* Camps grid */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 28 }}>
          {CAMPS.map(c => (
            <div key={c.id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08)', border: '1.5px solid #e5e7eb', transition: 'all .25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}33` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,.08)' }}
            >
              {/* Color hero */}
              <div style={{ height: 10, background: c.color }} />
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: '#111827', fontWeight: 700, marginBottom: 4 }}>{c.name}</p>
                    <p style={{ fontSize: 13, color: '#6b7280' }}>{c.desc}</p>
                  </div>
                  <span style={{ background: c.color, color: '#fff', fontSize: 10, padding: '4px 10px', borderRadius: 20, fontWeight: 800, letterSpacing: 1, flexShrink: 0, marginLeft: 12 }}>{c.badge}</span>
                </div>

                {/* Specs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '20px 0', background: c.light, borderRadius: 12, padding: '16px' }}>
                  {[
                    ['👥', 'Capacity',    `${c.cap} persons`],
                    ['🏕', 'Total Units', `${c.total} camps`],
                    ['💰', 'Price',       `${inr(c.price)}/night`],
                    ['📍', 'Location',    'Kedarnath Valley'],
                  ].map(([icon, label, value]) => (
                    <div key={label}>
                      <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>{icon} {label}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Inclusions */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: .5 }}>Inclusions</p>
                  {['Cozy sleeping bags & mats', 'Evening bonfire & mountain views', 'Breakfast & dinner included', 'Guide for local trails'].map(item => (
                    <p key={item} style={{ fontSize: 13, color: '#4b5563', marginBottom: 5 }}>
                      <span style={{ color: c.color, fontWeight: 700, marginRight: 6 }}>✓</span>{item}
                    </p>
                  ))}
                </div>

                <button onClick={onBook} style={{ width: '100%', background: c.color, color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, padding: '13px', borderRadius: 10, cursor: 'pointer', transition: 'opacity .2s' }}
                  onMouseEnter={e => e.target.style.opacity = '.88'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  Book {c.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
