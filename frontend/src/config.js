export const API_BASE = import.meta.env.VITE_API_URL || '';

export const ADMIN_KEY = 'kedar@123';

export const CAMPS = [
  { id:'c2',  cap:2,  total:4, name:'Duo Tent',      desc:'Perfect for couples & pairs',   price:1800,
    gradient:'linear-gradient(135deg,#f97316,#ea580c)', light:'#fff7ed', dark:'#c2410c' },
  { id:'c3',  cap:3,  total:4, name:'Trio Tent',     desc:'Great for a trio of friends',   price:2400,
    gradient:'linear-gradient(135deg,#10b981,#059669)', light:'#ecfdf5', dark:'#047857' },
  { id:'c5',  cap:5,  total:6, name:'Explorer Camp', desc:'Best for small groups of 5',    price:3500,
    gradient:'linear-gradient(135deg,#8b5cf6,#7c3aed)', light:'#f5f3ff', dark:'#5b21b6' },
  { id:'c6',  cap:6,  total:4, name:'Family Camp',   desc:'Ideal for families of 6',       price:4200,
    gradient:'linear-gradient(135deg,#0ea5e9,#0284c7)', light:'#f0f9ff', dark:'#075985' },
  { id:'c10', cap:10, total:2, name:'Group Camp',    desc:'Large group retreats — 10 pax', price:7000,
    gradient:'linear-gradient(135deg,#f43f5e,#e11d48)', light:'#fff1f2', dark:'#9f1239' },
  { id:'c20', cap:20, total:2, name:'Mega Camp',     desc:'Events & bulk bookings (20)',   price:12000,
    gradient:'linear-gradient(135deg,#f59e0b,#d97706)', light:'#fffbeb', dark:'#92400e' },
];

export const genCode = (checkIn) => {
  const ds = String(checkIn).replace(/-/g, '');
  const r  = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `KC-${ds}-${r}`;
};

export const today    = () => new Date().toISOString().slice(0,10);
export const tomorrow = () => { const d=new Date(); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); };
export const nights   = (ci, co) => Math.max(1, Math.round((new Date(co)-new Date(ci))/864e5));
export const fmtDate  = (ds) => ds ? new Date(ds+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '';
export const inrFmt   = (n) => '₹' + Number(n).toLocaleString('en-IN');
