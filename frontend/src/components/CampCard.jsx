import React from 'react'
import { inr } from '../utils.js'

export default function CampCard({ camp, available, total, booked, selected, onClick, showSelect = true }) {
  const isFull = available !== undefined && available <= 0
  const border = selected ? `2px solid ${camp.color}` : '1.5px solid #e5e7eb'

  return (
    <div
      onClick={() => !isFull && showSelect && onClick && onClick(camp.id)}
      style={{
        background: selected ? camp.light : '#fff',
        border,
        borderRadius: 14,
        padding: '20px',
        cursor: isFull || !showSelect ? 'default' : 'pointer',
        opacity: isFull ? 0.55 : 1,
        transition: 'all .22s',
        position: 'relative',
        boxShadow: selected ? `0 4px 20px ${camp.color}33` : '0 2px 10px rgba(0,0,0,.05)',
      }}
    >
      {/* Color stripe top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: camp.color, borderRadius: '14px 14px 0 0' }} />

      {/* Badge */}
      <span style={{ position: 'absolute', top: 14, right: 12, background: camp.color, color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 20, letterSpacing: 1 }}>
        {camp.badge}
      </span>

      {/* Selected tick */}
      {selected && (
        <span style={{ position: 'absolute', top: 14, left: 12, background: camp.color, color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>✓</span>
      )}

      <div style={{ marginTop: 10 }}>
        <p style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{camp.name}</p>
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{camp.desc}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <Chip color={camp.color}>👥 {camp.cap} persons max</Chip>
          {total !== undefined && <Chip color={camp.color}>🏕 {total} units</Chip>}
        </div>

        {/* Availability bar */}
        {available !== undefined && (
          <>
            <div style={{ background: '#f3f4f6', borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ width: `${Math.max(0,(booked/total)*100)}%`, height: '100%', background: available > 0 ? camp.color : '#ef4444', transition: 'width .5s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginBottom: 10 }}>
              <span>{booked || 0} booked</span>
              <span style={{ color: available > 0 ? '#059669' : '#ef4444', fontWeight: 700 }}>
                {available > 0 ? `${available} available` : 'Fully Booked'}
              </span>
            </div>
          </>
        )}

        <p style={{ fontSize: 16, fontWeight: 800, color: camp.color }}>
          {inr(camp.price)}<span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af' }}>/night</span>
        </p>
      </div>
    </div>
  )
}

function Chip({ children, color }) {
  return (
    <span style={{ background: color + '15', color: color, fontSize: 11, padding: '3px 9px', borderRadius: 20, fontWeight: 600 }}>
      {children}
    </span>
  )
}
