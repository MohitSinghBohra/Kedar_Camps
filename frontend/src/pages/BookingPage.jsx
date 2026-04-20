import React, { useState, useEffect } from 'react'
import { CAMPS, today, tomorrow, nights, inr, fmtDate } from '../utils.js'
import { fetchAvailability, createBooking } from '../api/booking.js'
import CampCard from '../components/CampCard.jsx'

export default function BookingPage({ onSuccess }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', email: '', campId: '', checkIn: tomorrow(), checkOut: '', persons: 1, notes: '' })
  const [availability, setAvailability] = useState([])
  const [avLoading, setAvLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Load availability when dates change
  useEffect(() => {
    if (form.checkIn && form.checkOut && form.checkOut > form.checkIn) {
      setAvLoading(true)
      fetchAvailability(form.checkIn, form.checkOut)
        .then(data => setAvailability(data))
        .catch(() => setAvailability([]))
        .finally(() => setAvLoading(false))
    }
  }, [form.checkIn, form.checkOut])

  const getAvail = (campId) => availability.find(a => a.campId === campId)

  const selectedCamp = CAMPS.find(c => c.id === form.campId)
  const nightCount   = form.checkIn && form.checkOut ? nights(form.checkIn, form.checkOut) : 0
  const totalPrice   = selectedCamp && nightCount > 0 ? selectedCamp.price * nightCount : 0

  const validateStep1 = () => {
    const e = {}
    if (!form.checkIn)  e.checkIn  = 'Check-in date required'
    if (!form.checkOut) e.checkOut = 'Check-out date required'
    if (form.checkOut && form.checkIn && form.checkOut <= form.checkIn) e.checkOut = 'Check-out must be after check-in'
    if (!form.campId) e.campId = 'Please select a camp type'
    if (form.campId) {
      const av = getAvail(form.campId)
      if (av && av.availableUnits <= 0) e.campId = 'Camp fully booked for these dates'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit mobile number'
    if (form.persons < 1) e.persons = 'At least 1 person required'
    if (selectedCamp && form.persons > selectedCamp.cap) e.persons = `Max ${selectedCamp.cap} persons for this camp`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return
    setSubmitting(true)
    setApiError('')
    try {
      const booking = await createBooking(form)
      onSuccess(booking)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = (err) => ({
    border: `1.5px solid ${err ? '#ef4444' : '#d1fae5'}`,
    borderRadius: 8, padding: '11px 14px', fontSize: 14, width: '100%',
    fontFamily: "'Plus Jakarta Sans',sans-serif", outline: 'none',
    background: err ? '#fef2f2' : '#fff', color: '#111827'
  })

  const errTxt = (key) => errors[key] && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors[key]}</p>

  const Label = ({ children }) => <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: .5, display: 'block', marginBottom: 6 }}>{children}</label>

  return (
    <div style={{ minHeight: '80vh', background: '#f0fdf8' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)', padding: '48px 24px 36px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 36, color: '#fff', marginBottom: 8 }}>Book Your Camp</h1>
        <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15 }}>Secure your Himalayan experience — payment at camp</p>
        {/* Progress */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= s ? '#f97316' : 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{s}</div>
              <span style={{ color: step >= s ? '#fff' : 'rgba(255,255,255,.5)', fontSize: 13, fontWeight: step === s ? 700 : 400 }}>{s === 1 ? 'Select Camp & Dates' : 'Guest Details'}</span>
              {s < 2 && <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 18 }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '36px 24px' }}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            {/* Dates */}
            <div style={card}>
              <p style={cardTitle}>1. Choose Your Dates</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <Label>Check-In Date *</Label>
                  <input style={inputStyle(errors.checkIn)} type="date" value={form.checkIn} min={today()} onChange={e => set('checkIn', e.target.value)} />
                  {errTxt('checkIn')}
                </div>
                <div>
                  <Label>Check-Out Date *</Label>
                  <input style={inputStyle(errors.checkOut)} type="date" value={form.checkOut} min={form.checkIn || today()} onChange={e => set('checkOut', e.target.value)} />
                  {errTxt('checkOut')}
                </div>
              </div>
              {nightCount > 0 && (
                <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: '8px 14px' }}>
                  <span style={{ fontSize: 16 }}>🌙</span>
                  <span style={{ fontSize: 14, color: '#065f46', fontWeight: 600 }}>{nightCount} night{nightCount > 1 ? 's' : ''} selected</span>
                </div>
              )}
            </div>

            {/* Camp selection */}
            <div style={card}>
              <p style={cardTitle}>2. Select Camp Type</p>
              {avLoading && <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>⏳ Checking availability...</p>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14 }}>
                {CAMPS.map(camp => {
                  const av = getAvail(camp.id)
                  return (
                    <CampCard
                      key={camp.id}
                      camp={camp}
                      available={av ? av.availableUnits : camp.total}
                      total={camp.total}
                      booked={av ? av.bookedUnits : 0}
                      selected={form.campId === camp.id}
                      onClick={id => set('campId', id)}
                    />
                  )
                })}
              </div>
              {errTxt('campId')}
            </div>

            <button onClick={() => validateStep1() && setStep(2)} style={primaryBtn}>
              Continue to Guest Details →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            {/* Booking summary */}
            {selectedCamp && (
              <div style={{ background: `linear-gradient(135deg,${selectedCamp.color},${selectedCamp.color}cc)`, borderRadius: 14, padding: '20px 24px', marginBottom: 24, color: '#fff', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontSize: 11, opacity: .75, textTransform: 'uppercase', letterSpacing: 1 }}>Selected Camp</p>
                  <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700 }}>{selectedCamp.name}</p>
                  <p style={{ opacity: .85, fontSize: 13 }}>{fmtDate(form.checkIn)} → {fmtDate(form.checkOut)} · {nightCount} nights</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, opacity: .75 }}>Estimated Total</p>
                  <p style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 900 }}>{inr(totalPrice)}</p>
                  <p style={{ opacity: .7, fontSize: 11 }}>Pay at camp · {inr(selectedCamp.price)}/night</p>
                </div>
              </div>
            )}

            <div style={card}>
              <p style={cardTitle}>Guest Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <Label>Full Name *</Label>
                  <input style={inputStyle(errors.name)} value={form.name} placeholder="Your full name" onChange={e => set('name', e.target.value)} />
                  {errTxt('name')}
                </div>
                <div>
                  <Label>Mobile Number *</Label>
                  <input style={inputStyle(errors.phone)} value={form.phone} placeholder="10-digit mobile" maxLength={10} onChange={e => set('phone', e.target.value)} />
                  {errTxt('phone')}
                </div>
                <div>
                  <Label>Email Address</Label>
                  <input style={inputStyle()} value={form.email} placeholder="your@email.com" type="email" onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <Label>Number of Persons *</Label>
                  <input style={inputStyle(errors.persons)} type="number" value={form.persons} min={1} max={selectedCamp?.cap || 20}
                    onChange={e => set('persons', parseInt(e.target.value) || 1)} />
                  {errTxt('persons')}
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <input style={inputStyle()} value={form.notes} placeholder="Dietary needs, accessibility..." onChange={e => set('notes', e.target.value)} />
                </div>
              </div>
            </div>

            {apiError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '14px', marginBottom: 16, color: '#b91c1c', fontSize: 14 }}>
                ⚠️ {apiError}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ ...primaryBtn, background: '#fff', color: '#374151', border: '1.5px solid #d1d5db', boxShadow: 'none', flex: '0 0 auto' }}>
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={submitting} style={{ ...primaryBtn, flex: 1, opacity: submitting ? .75 : 1 }}>
                {submitting ? '⏳ Confirming...' : '✓ Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const card = { background: '#fff', borderRadius: 14, padding: '24px', marginBottom: 20, border: '1.5px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }
const cardTitle = { fontFamily: "'Fraunces',serif", fontSize: 20, color: '#064e3b', marginBottom: 18, fontWeight: 700 }
const primaryBtn = { background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', border: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 10, cursor: 'pointer', display: 'block', width: '100%', boxShadow: '0 4px 16px rgba(249,115,22,.35)' }
