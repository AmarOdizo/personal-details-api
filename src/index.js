import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create new form record
app.post('/api/forms', async (c) => {
  try {
    const data = await c.req.json();
    
    // Basic validation
    if (!data.full_name || !data.email || !data.mobile_number) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    if (data.terms_accepted !== true) {
      return c.json({ error: 'Terms must be accepted' }, 400);
    }

    const {
      full_name, fathers_name, mothers_name, date_of_birth, gender, marital_status,
      email, mobile_number, alternate_mobile_number, full_address, city, state, pin_code, country,
      qualification_10th, percentage_10th, qualification_12th, percentage_12th, graduation_qualification, college_university, passing_year,
      current_occupation, company_name, designation, work_experience, annual_salary,
      profile_photo_url, skills, hobbies, about_yourself, terms_accepted
    } = data;

    const query = `
      INSERT INTO personal_details (
        full_name, fathers_name, mothers_name, date_of_birth, gender, marital_status,
        email, mobile_number, alternate_mobile_number, full_address, city, state, pin_code, country,
        qualification_10th, percentage_10th, qualification_12th, percentage_12th, graduation_qualification, college_university, passing_year,
        current_occupation, company_name, designation, work_experience, annual_salary,
        profile_photo_url, skills, hobbies, about_yourself, terms_accepted
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      ) RETURNING id;
    `;
    
    const db = c.env.DB;
    
    const result = await db.prepare(query).bind(
      full_name, fathers_name, mothers_name, date_of_birth, gender, marital_status,
      email, mobile_number, alternate_mobile_number || null, full_address, city, state, pin_code, country,
      qualification_10th, percentage_10th, qualification_12th, percentage_12th, graduation_qualification, college_university, passing_year,
      current_occupation, company_name, designation, work_experience, annual_salary || null,
      profile_photo_url || null, skills, hobbies, about_yourself, terms_accepted ? 1 : 0
    ).first();

    return c.json({ success: true, message: 'Record saved successfully', id: result.id }, 201);
  } catch (error) {
    console.error('Save error:', error);
    return c.json({ error: 'Failed to save record', details: error.message }, 500);
  }
});

// Retrieve all records
app.get('/api/forms', async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare('SELECT * FROM personal_details ORDER BY created_at DESC').all();
    return c.json({ success: true, records: results });
  } catch (error) {
    console.error('Fetch error:', error);
    return c.json({ error: 'Failed to retrieve records' }, 500);
  }
});

export default app;
