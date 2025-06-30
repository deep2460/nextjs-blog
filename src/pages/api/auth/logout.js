import { serialize } from 'cookie';

export default function handler(req, res) {
  const cookie = serialize('admin-token', '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Logged out' });
}
