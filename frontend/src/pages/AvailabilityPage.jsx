import React, { useState } from 'react'
import { CAMPS, today, tomorrow, fmtDate, inr } from '../utils.js'
import { fetchAvailability } from '../api/booking.js'

export default function AvailabilityPage({ onBook }) {
  const [checkIn, setCheckIn]   = useState(tomorrow())
  const [checkOut, setCheckOut] = useState('')
  const [data, setData]         = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const check = async () => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError('Please select valid check-in and check-out dates')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetchAvailability(checkIn, checkOut)
      setData(res)
    } catch (e) {
      setError('Failed to load availability. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { border: '1.5px solid #d1fae5', borderRadius: 8, padding: '11px 14px', fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none', background: '#fff', color: '#111827', width: '100%' }

  return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <p style={{ color: '#6ee7b7', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 12 }}>Live Status</p>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 'clamp(28px,5vw,46px)', color: '#fff', marginBottom: 14 }}>Camp Availability</h1>
        <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15, maxWidth: 440, margin: '0 auto 36px' }}>
          Check real-time availability and book your preferred camp for any date range.
        </p>

        {/* Date Picker */}
        <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 14, padding: '20px', maxWidth: 560, margin: '0 auto', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,.7)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Check-In</label>
              <input style={inputStyle} type="date" value={checkIn} min={today()} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,.7)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Check-Out</label>
              <input style={inputStyle} type="date" value={checkOut} min={checkIn || today()} onChange={e => setCheckOut(e.target.value)} />
            </div>
          </div>
          {error && <p style={{ color: '#fca5a5', fontSize: 13, marginBottom: 10 }}>{error}</p>}
          <button onClick={check} disabled={loading} style={{ width: '100%', background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, padding: '13px', borderRadius: 10, cursor: 'pointer', opacity: loading ? .75 : 1 }}>
            {loading ? '⏳ Checking...' : '🔍 Check Availability'}
          </button>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '48px 24px' }}>
        {!data && !loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🏕</div>
            <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: '#374151', marginBottom: 8 }}>Select your dates above</p>
            <p style={{ fontSize: 14 }}>We'll show you real-time availability across all camp types</p>
          </div>
        )}

        {data && (
          <>
            {/* Summary bar */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', marginBottom: 28, border: '1.5px solid #d1fae5', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: '#064e3b' }}>
                  Availability for {fmtDate(checkIn)} – {fmtDate(checkOut)}
                </p>
                <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                  {data.filter(a => a.availableUnits > 0).length} of {data.length} camp types available
                </p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <Stat label="Total Units"     value={data.reduce((s, a) => s + a.totalUnits, 0)}     color="#064e3b" />
                <Stat label="Available"       value={data.reduce((s, a) => s + a.availableUnits, 0)} color="#059669" />
                <Stat label="Booked"          value={data.reduce((s, a) => s + a.bookedUnits, 0)}    color="#f97316" />
              </div>
            </div>

            {/* Camp availability grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginBottom: 36 }}>
              {data.map(av => {
                const camp = CAMPS.find(c => c.id === av.campId)
                if (!camp) return null
                const pct  = (av.bookedUnits / av.totalUnits) * 100
                const full = av.availableUnits <= 0
                return (
                  <div key={av.campId} style={{ background: '#fff', borderRadius: 14, border: `1.5px solid ${full ? '#fecaca' : '#d1fae5'}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
                    <div style={{ height: 6, background: full ? '#ef4444' : camp.color }} />
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div>
                          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: '#111827', fontWeight: 700 }}>{av.campName}</p>
                          <p style={{ fontSize: 12, color: '#9ca3af' }}>👥 {av.capacity} persons · 🏕 {av.totalUnits} total</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ background: full ? '#fef2f2' : '#ecfdf5', color: full ? '#dc2626' : '#059669', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                            {full ? 'FULLY BOOKED' : `${av.availableUnits} FREE`}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div style={{ background: '#f3f4f6', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: full ? '#ef4444' : camp.color, borderRadius: 6, transition: 'width .5s' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>
                        <span>{av.bookedUnits} booked</span>
                        <span>{av.availableUnits} available of {av.totalUnits}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 16, fontWeight: 800, color: camp.color }}>{inr(av.pricePerNight)}<span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af' }}>/night</span></p>
                        <button onClick={onBook} disabled={full} style={{ background: full ? '#f3f4f6' : camp.color, color: full ? '#9ca3af' : '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, padding: '9px 18px', borderRadius: 8, cursor: full ? 'not-allowed' : 'pointer' }}>
                          {full ? 'Unavailable' : 'Book Now →'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Visual summary table */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6' }}>
                <p style={{ fontFamily: "'Fraunces',serif", fontSize: 16, color: '#064e3b', fontWeight: 700 }}>Full Availability Summary</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {['Camp Type','Capacity','Total','Booked','Available','Price/Night','Status'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .5 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((av, i) => {
                      const camp = CAMPS.find(c => c.id === av.campId)
                      return (
                        <tr key={av.campId} style={{ borderTop: '1px solid #f3f4f6', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '13px 16px', fontWeight: 600, color: '#111827' }}>
                            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: camp?.color, marginRight: 8 }} />
                            {av.campName}
                          </td>
                          <td style={{ padding: '13px 16px', color: '#374151' }}>{av.capacity} pax</td>
                          <td style={{ padding: '13px 16px', color: '#374151' }}>{av.totalUnits}</td>
                          <td style={{ padding: '13px 16px', color: '#f97316', fontWeight: 700 }}>{av.bookedUnits}</td>
                          <td style={{ padding: '13px 16px', color: av.availableUnits > 0 ? '#059669' : '#dc2626', fontWeight: 700 }}>{av.availableUnits}</td>
                          <td style={{ padding: '13px 16px', color: '#374151' }}>{inr(av.pricePerNight)}</td>
                          <td style={{ padding: '13px 16px' }}>
                            <span style={{ background: av.availableUnits > 0 ? '#ecfdf5' : '#fef2f2', color: av.availableUnits > 0 ? '#059669' : '#dc2626', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>
                              {av.availableUnits > 0 ? '✓ AVAILABLE' : '✕ FULL'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 700, color }}>{value}</p>
      <p style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>{label}</p>
    </div>
  )
}
