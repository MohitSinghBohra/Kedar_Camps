import React from 'react'
import { CAMPS, fmtDate, nights, inr } from '../utils.js'

export default function ConfirmationPage({ booking, onHome, onBook }) {
  if (!booking) return null

  const camp = CAMPS.find(c => c.id === booking.campId)
  const n    = nights(booking.checkIn, booking.checkOut)
  const total = camp ? camp.price * n : 0

  return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* Success badge */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 16px' }}>🎉</div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 32, color: '#064e3b', marginBottom: 8 }}>Booking Confirmed!</h1>
          <p style={{ color: '#6b7280', fontSize: 15 }}>Your Himalayan adventure is secured. Save your booking code below.</p>
        </div>

        {/* Booking Code Box */}
        <div style={{ background: 'linear-gradient(135deg,#064e3b,#022c22)', borderRadius: 16, padding: '28px', textAlign: 'center', marginBottom: 20 }}>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>Your Booking Code</p>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 34, color: '#6ee7b7', fontWeight: 700, letterSpacing: 4, marginBottom: 8 }}>{booking.code}</p>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 12 }}>Show this code at Kedar Camps for verification</p>
          <div style={{ marginTop: 14, display: 'inline-flex', gap: 6, background: 'rgba(255,255,255,.1)', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => navigator.clipboard?.writeText(booking.code)}>
            <span style={{ fontSize: 14 }}>📋</span>
            <span style={{ color: '#a7f3d0', fontSize: 13 }}>Copy Code</span>
          </div>
        </div>

        {/* Details */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', padding: '20px 24px', marginBottom: 20 }}>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 16, color: '#064e3b', marginBottom: 16, fontWeight: 700 }}>Booking Summary</p>
          {[
            ['Guest Name',  booking.name],
            ['Mobile',      booking.phone],
            ['Camp Type',   camp?.name],
            ['Check-In',    fmtDate(booking.checkIn)],
            ['Check-Out',   fmtDate(booking.checkOut)],
            ['Duration',    `${n} night${n > 1 ? 's' : ''}`],
            ['Persons',     booking.persons],
            ['Estimate',    inr(total)],
            ['Status',      booking.status?.toUpperCase()],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f3f4f6', fontSize: 14 }}>
              <span style={{ color: '#6b7280' }}>{k}</span>
              <span style={{ fontWeight: 700, color: k === 'Status' ? '#059669' : '#111827' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '14px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#92400e' }}>
            <strong>⚠️ Important:</strong> Payment is collected at the camp. Please carry a valid government ID and your booking code. Arrive before sunset.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onHome} style={{ flex: 1, background: '#fff', color: '#374151', border: '1.5px solid #d1d5db', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 14, padding: '13px', borderRadius: 10, cursor: 'pointer' }}>
            ← Back to Home
          </button>
          <button onClick={onBook} style={{ flex: 1, background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, padding: '13px', borderRadius: 10, cursor: 'pointer' }}>
            Book Another Camp
          </button>
        </div>
      </div>
    </div>
  )
}
