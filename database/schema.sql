-- =================================================================
-- KEDAR CAMPS DATABASE
-- Run on Neon PostgreSQL dashboard → SQL Editor
-- =================================================================

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id          BIGSERIAL PRIMARY KEY,
    code        VARCHAR(30)  NOT NULL UNIQUE,
    name        VARCHAR(150) NOT NULL,
    phone       VARCHAR(15)  NOT NULL,
    email       VARCHAR(150),
    camp_id     VARCHAR(10)  NOT NULL,
    check_in    DATE         NOT NULL,
    check_out   DATE         NOT NULL,
    persons     INT          NOT NULL DEFAULT 1,
    notes       TEXT,
    status      VARCHAR(20)  NOT NULL DEFAULT 'confirmed',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT chk_checkout_after_checkin CHECK (check_out > check_in),
    CONSTRAINT chk_persons_positive       CHECK (persons > 0),
    CONSTRAINT chk_status                 CHECK (status IN ('confirmed', 'cancelled')),
    CONSTRAINT chk_camp_id                CHECK (camp_id IN ('c2','c3','c5','c6','c10','c20'))
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_bookings_code      ON bookings (code);
CREATE INDEX IF NOT EXISTS idx_bookings_camp_date ON bookings (camp_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status    ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone     ON bookings (phone);
CREATE INDEX IF NOT EXISTS idx_bookings_created   ON bookings (created_at DESC);

-- =================================================================
-- SAMPLE DATA  (optional — remove before production)
-- =================================================================

INSERT INTO bookings (code, name, phone, email, camp_id, check_in, check_out, persons, notes, status) VALUES
  ('KC-20250601-DEMO', 'Ravi Kumar',       '9876543210', 'ravi@example.com',   'c2',  '2025-06-01', '2025-06-04', 2, 'Honeymoon trip',           'confirmed'),
  ('KC-20250601-DM02', 'Priya Sharma',     '8765432109', 'priya@example.com',  'c3',  '2025-06-01', '2025-06-03', 3, 'Friends trip',             'confirmed'),
  ('KC-20250605-DM03', 'Amit Singh',       '7654321098', 'amit@example.com',   'c5',  '2025-06-05', '2025-06-08', 5, 'Office outing',            'confirmed'),
  ('KC-20250610-DM04', 'Sunita Patel',     '9988776655', 'sunita@example.com', 'c6',  '2025-06-10', '2025-06-14', 6, 'Family vacation',          'confirmed'),
  ('KC-20250615-DM05', 'Deepak Joshi',     '9123456780', NULL,                 'c10', '2025-06-15', '2025-06-17', 10,'Corporate team building',  'confirmed'),
  ('KC-20250620-DM06', 'Meena Rawat',      '8012345679', 'meena@example.com',  'c2',  '2025-06-20', '2025-06-22', 2, NULL,                       'cancelled'),
  ('KC-20250701-DM07', 'Vikram Thakur',    '9900112233', NULL,                 'c20', '2025-07-01', '2025-07-05', 18,'Annual college reunion',   'confirmed'),
  ('KC-20250710-DM08', 'Anita Verma',      '8811223344', 'anita@example.com',  'c3',  '2025-07-10', '2025-07-12', 3, 'Sisters trip',             'confirmed')
ON CONFLICT (code) DO NOTHING;

-- =================================================================
-- USEFUL QUERIES FOR ADMIN REFERENCE
-- =================================================================

-- View all bookings:
-- SELECT * FROM bookings ORDER BY created_at DESC;

-- Check availability for a camp type on a date range:
-- SELECT COUNT(*) FROM bookings
-- WHERE camp_id = 'c5' AND status != 'cancelled'
--   AND check_in < '2025-07-15' AND check_out > '2025-07-10';

-- Today's active guests:
-- SELECT b.*, COUNT(*) OVER () AS total_active
-- FROM bookings b
-- WHERE status = 'confirmed'
--   AND check_in <= CURRENT_DATE AND check_out > CURRENT_DATE;

-- Revenue summary by camp:
-- SELECT camp_id, COUNT(*) AS bookings FROM bookings
-- WHERE status = 'confirmed' GROUP BY camp_id ORDER BY camp_id;
