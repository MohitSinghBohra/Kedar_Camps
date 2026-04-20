import React, { useState, useEffect } from 'react'
import { CAMPS, fmtDate, nights, inr } from '../utils.js'
import { fetchAdminBookings, updateBooking } from '../api/booking.js'

const ADMIN_KEY = 'Raghav@123'

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false)
  const [pwd, setPwd]             = useState('')
  const [loginErr, setLoginErr]   = useState('')
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [search, setSearch]       = useState('')
  const [filter, setFilter]       = useState('all')
  const [editing, setEditing]     = useState(null)
  const [editData, setEditData]   = useState({})
  const [saving, setSaving]       = useState(false)
  const [msg, setMsg]             = useState('')

  const login = () => {
    if (pwd === ADMIN_KEY) { setAuthed(true); setLoginErr('') }
    else setLoginErr('Incorrect password')
  }

  const load = async () => {
    setLoading(true)
    try { setBookings(await fetchAdminBookings(ADMIN_KEY)) }
    catch (e) { setMsg('Failed to load bookings') }
    finally { setLoading(false) }
  }

  useEffect(() => { if (authed) load() }, [authed])

  const startEdit = (b) => {
    setEditing(b.id)
    setEditData({ name: b.name, phone: b.phone, email: b.email || '', checkIn: b.checkIn, checkOut: b.checkOut, persons: b.persons, notes: b.notes || '', status: b.status })
  }

  const saveEdit = async () => {
    setSaving(true)
    try {
      const updated = await updateBooking(editing, editData, ADMIN_KEY)
      setBookings(p => p.map(b => b.id === updated.id ? updated : b))
      setEditing(null)
      setMsg('Booking updated ✓')
      setTimeout(() => setMsg(''), 3000)
    } catch (e) { setMsg('Update failed: ' + e.message) }
    finally { setSaving(false) }
  }

  const cancelBooking = async (id) => {
    if (!confirm('Cancel this booking?')) return
    try {
      const updated = await updateBooking(id, { status: 'cancelled' }, ADMIN_KEY)
      setBookings(p => p.map(b => b.id === updated.id ? updated : b))
      setMsg('Booking cancelled ✓')
      setTimeout(() => setMsg(''), 3000)
    } catch (e) { setMsg('Failed: ' + e.message) }
  }

  const today = new Date().toISOString().slice(0, 10)

  const filtered = bookings.filter(b => {
    const s = search.toLowerCase()
    const ms = !s || b.name.toLowerCase().includes(s) || b.code.toLowerCase().includes(s) || b.phone.includes(s) || b.campId.includes(s)
    const mf = filter === 'all' || b.status === filter
    return ms && mf
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    todayGuests: bookings.filter(b => b.status === 'confirmed' && b.checkIn <= today && b.checkOut > today).reduce((s, b) => s + (b.persons || 0), 0),
  }

  // Login screen
  if (!authed) return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '40px', maxWidth: 400, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,.1)', border: '1.5px solid #d1fae5' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 26, color: '#064e3b', marginBottom: 6 }}>Admin Access</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Kedar Camps Management Panel</p>
        </div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>Password</label>
        <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Enter admin password"
          style={{ border: `1.5px solid ${loginErr ? '#ef4444' : '#d1fae5'}`, borderRadius: 8, padding: '12px 14px', fontSize: 14, width: '100%', outline: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 8 }} />
        {loginErr && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{loginErr}</p>}
        <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg,#064e3b,#065f46)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: '13px', borderRadius: 10, cursor: 'pointer', marginTop: 4 }}>
          Login →
        </button>
        <p style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: '#9ca3af' }}>Password should be Correct</p>
      </div>
    </div>
  )

  // Dashboard
  return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#064e3b,#022c22)', padding: '36px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, color: '#fff' }}>Admin Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 13 }}>Kedar Camps · Booking Management</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={load} style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.2)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, padding: '9px 16px', borderRadius: 8, cursor: 'pointer' }}>
              🔄 Refresh
            </button>
            <button onClick={() => setAuthed(false)} style={{ background: 'rgba(239,68,68,.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,.3)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, padding: '9px 16px', borderRadius: 8, cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
        {msg && <div style={{ background: msg.includes('✓') ? '#ecfdf5' : '#fef2f2', border: `1px solid ${msg.includes('✓') ? '#a7f3d0' : '#fecaca'}`, borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: msg.includes('✓') ? '#065f46' : '#b91c1c', fontSize: 14 }}>{msg}</div>}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Total Bookings',   value: stats.total,       color: '#064e3b', bg: '#ecfdf5' },
            { label: 'Confirmed',        value: stats.confirmed,    color: '#059669', bg: '#d1fae5' },
            { label: 'Cancelled',        value: stats.cancelled,    color: '#dc2626', bg: '#fef2f2' },
            { label: "Today's Guests",   value: stats.todayGuests,  color: '#d97706', bg: '#fffbeb' },
          ].map(s => (
            <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '18px 20px', border: `1.5px solid ${s.color}22` }}>
              <p style={{ fontSize: 11, color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>{s.label}</p>
              <p style={{ fontFamily: "'Fraunces',serif", fontSize: 32, color: s.color, fontWeight: 700 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Today's camp availability */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', padding: '18px 22px', marginBottom: 20 }}>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 16, color: '#064e3b', marginBottom: 14 }}>Today's Camp Status</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CAMPS.map(camp => {
              const booked = bookings.filter(b => b.campId === camp.id && b.status === 'confirmed' && b.checkIn <= today && b.checkOut > today).length
              const avail  = camp.total - booked
              return (
                <div key={camp.id} style={{ background: avail > 0 ? '#ecfdf5' : '#fef2f2', border: `1px solid ${avail > 0 ? '#a7f3d0' : '#fecaca'}`, borderRadius: 10, padding: '10px 14px', minWidth: 140 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{camp.name}</p>
                  <p style={{ fontSize: 13, color: avail > 0 ? '#059669' : '#dc2626', fontWeight: 700 }}>{avail}/{camp.total} free</p>
                  <div style={{ background: '#e5e7eb', borderRadius: 3, height: 4, overflow: 'hidden', marginTop: 6 }}>
                    <div style={{ width: `${(booked / camp.total) * 100}%`, height: '100%', background: avail > 0 ? camp.color : '#ef4444' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Search & filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, code, phone..."
            style={{ flex: 1, minWidth: 200, border: '1.5px solid #d1fae5', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none' }} />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ border: '1.5px solid #d1fae5', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none', background: '#fff', minWidth: 140 }}>
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <p style={{ alignSelf: 'center', fontSize: 13, color: '#6b7280' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #e5e7eb', overflow: 'hidden' }}>
          {loading ? (
            <p style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>Loading bookings...</p>
          ) : filtered.length === 0 ? (
            <p style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No bookings found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    {['Code', 'Guest', 'Phone', 'Camp', 'Check-In', 'Check-Out', 'Pax', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .5, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => {
                    const camp = CAMPS.find(c => c.id === b.campId)
                    if (editing === b.id) {
                      // Edit row
                      const inp = (k, type = 'text', extra = {}) => (
                        <input type={type} value={editData[k]} onChange={e => setEditData(d => ({ ...d, [k]: e.target.value }))} {...extra}
                          style={{ border: '1.5px solid #d1fae5', borderRadius: 6, padding: '6px 8px', fontSize: 12, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none', width: '100%', minWidth: 80 }} />
                      )
                      return (
                        <tr key={b.id} style={{ background: '#fff8f0', borderTop: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 11, color: '#f97316', fontWeight: 700 }}>{b.code}</td>
                          <td style={{ padding: '6px 8px' }}>{inp('name')}</td>
                          <td style={{ padding: '6px 8px' }}>{inp('phone')}</td>
                          <td style={{ padding: '8px 14px', color: '#6b7280' }}>{camp?.name}</td>
                          <td style={{ padding: '6px 8px' }}>{inp('checkIn', 'date')}</td>
                          <td style={{ padding: '6px 8px' }}>{inp('checkOut', 'date')}</td>
                          <td style={{ padding: '6px 8px' }}>{inp('persons', 'number', { min: 1, max: camp?.cap || 20, style: { width: 60 } })}</td>
                          <td style={{ padding: '6px 8px' }}>
                            <select value={editData.status} onChange={e => setEditData(d => ({ ...d, status: e.target.value }))}
                              style={{ border: '1.5px solid #d1fae5', borderRadius: 6, padding: '6px 8px', fontSize: 12, fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none' }}>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
                            <button onClick={saveEdit} disabled={saving} style={actionBtn('#059669')}>{saving ? '...' : 'Save'}</button>
                            <button onClick={() => setEditing(null)} style={{ ...actionBtn('#6b7280'), marginLeft: 4 }}>✕</button>
                          </td>
                        </tr>
                      )
                    }
                    return (
                      <tr key={b.id} style={{ borderTop: '1px solid #f9fafb' }}>
                        <td style={{ padding: '13px 14px', fontFamily: 'monospace', fontSize: 11, color: '#f97316', fontWeight: 700 }}>{b.code}</td>
                        <td style={{ padding: '13px 14px', fontWeight: 600, color: '#111827' }}>{b.name}</td>
                        <td style={{ padding: '13px 14px', color: '#6b7280' }}>{b.phone}</td>
                        <td style={{ padding: '13px 14px' }}>
                          <span style={{ background: camp?.light || '#f3f4f6', color: camp?.color || '#374151', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10 }}>{camp?.name}</span>
                        </td>
                        <td style={{ padding: '13px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(b.checkIn)}</td>
                        <td style={{ padding: '13px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>{fmtDate(b.checkOut)}</td>
                        <td style={{ padding: '13px 14px', textAlign: 'center', color: '#374151' }}>{b.persons}</td>
                        <td style={{ padding: '13px 14px' }}>
                          <span style={{ background: b.status === 'confirmed' ? '#ecfdf5' : '#fef2f2', color: b.status === 'confirmed' ? '#059669' : '#dc2626', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10 }}>
                            {b.status?.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '13px 14px', whiteSpace: 'nowrap' }}>
                          <button onClick={() => startEdit(b)} style={actionBtn('#0ea5e9')}>Edit</button>
                          {b.status === 'confirmed' && (
                            <button onClick={() => cancelBooking(b.id)} style={{ ...actionBtn('#ef4444'), marginLeft: 4 }}>Cancel</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const actionBtn = (color) => ({
  background: color + '15', color, border: `1px solid ${color}33`,
  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 700,
  padding: '5px 12px', borderRadius: 6, cursor: 'pointer'
})
