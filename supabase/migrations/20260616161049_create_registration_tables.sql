
CREATE TABLE IF NOT EXISTS course_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college_name text NOT NULL,
  department text NOT NULL,
  year text NOT NULL,
  course_name text NOT NULL,
  registration_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE course_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_course_registrations" ON course_registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "select_course_registrations" ON course_registrations FOR SELECT
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS internship_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college_name text NOT NULL,
  department text NOT NULL,
  year text NOT NULL,
  internship_name text NOT NULL,
  domain text,
  registration_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE internship_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_internship_registrations" ON internship_registrations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "select_internship_registrations" ON internship_registrations FOR SELECT
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "select_contact_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);
