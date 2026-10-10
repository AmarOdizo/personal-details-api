DROP TABLE IF EXISTS personal_details;

CREATE TABLE personal_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Personal Details
  full_name TEXT NOT NULL,
  fathers_name TEXT NOT NULL,
  mothers_name TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  gender TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  -- Contact Details
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  alternate_mobile_number TEXT,
  full_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  country TEXT NOT NULL,
  -- Education Details
  qualification_10th TEXT NOT NULL,
  percentage_10th TEXT NOT NULL,
  qualification_12th TEXT NOT NULL,
  percentage_12th TEXT NOT NULL,
  graduation_qualification TEXT NOT NULL,
  college_university TEXT NOT NULL,
  passing_year TEXT NOT NULL,
  -- Professional Details
  current_occupation TEXT NOT NULL,
  company_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  work_experience TEXT NOT NULL,
  annual_salary TEXT,
  -- Additional Details
  profile_photo_url TEXT,
  skills TEXT NOT NULL,
  hobbies TEXT NOT NULL,
  about_yourself TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT 1,
  -- Meta
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
