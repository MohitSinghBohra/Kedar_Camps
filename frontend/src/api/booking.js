const BASE = import.meta.env.VITE_API_URL || ''

const headers = (extra = {}) => ({ 'Content-Type': 'application/json', ...extra })

export const fetchAvailability = async (checkIn, checkOut) => {
  const r = await fetch(`${BASE}/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`)
  if (!r.ok) throw new Error('Failed to load availability')
  return r.json()
}

export const createBooking = async (data) => {
  const r = await fetch(`${BASE}/api/bookings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  })
  const json = await r.json()
  if (!r.ok) throw new Error(json.error || 'Booking failed')
  return json
}

export const verifyBooking = async (code) => {
  const r = await fetch(`${BASE}/api/bookings/verify/${code}`)
  const json = await r.json()
  if (!r.ok) throw new Error(json.error || 'Not found')
  return json
}

export const fetchAdminBookings = async (adminKey) => {
  const r = await fetch(`${BASE}/api/admin/bookings`, {
    headers: headers({ 'X-Admin-Key': adminKey })
  })
  const json = await r.json()
  if (!r.ok) throw new Error(json.error || 'Unauthorized')
  return json
}

export const updateBooking = async (id, data, adminKey) => {
  const r = await fetch(`${BASE}/api/admin/bookings/${id}`, {
    method: 'PUT',
    headers: headers({ 'X-Admin-Key': adminKey }),
    body: JSON.stringify(data)
  })
  const json = await r.json()
  if (!r.ok) throw new Error(json.error || 'Update failed')
  return json
}
