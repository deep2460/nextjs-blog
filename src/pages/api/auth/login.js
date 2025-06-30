import dbConnect from '@/lib/dbconnect';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  await dbConnect();

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const cookie = serialize('admin-token', token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Login successful' });
}
