// /src/pages/api/auth/me.js
import { jwtVerify } from 'jose';

export default async function handler(req, res) {
  const token = req.cookies['admin-token'];

  if (!token) {
    res.status(401).end(); // ✅ no return
    return;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    res.status(200).json({ authenticated: true }); // ✅ no return
  } catch (err) {
    res.status(401).end(); // ✅ no return
  }
}