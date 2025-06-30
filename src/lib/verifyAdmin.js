import { jwtVerify } from 'jose';

export async function verifyAdmin(req) {
  const token = req.cookies['admin-token'];
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
}
