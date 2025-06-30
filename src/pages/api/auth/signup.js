// src/pages/api/auth/signup.js

import dbConnect from '@/lib/dbconnect';
import Admin from '@/models/Admin';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  await dbConnect();

  const existing = await Admin.findOne({ username });
  if (existing) {
    return res.status(409).json({ error: 'Admin already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, passwordHash });
  await admin.save();

  return res.status(201).json({ message: 'Admin created successfully' });
}
