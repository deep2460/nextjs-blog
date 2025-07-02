
# 📝 Next.js Blog Admin Panel

A secure, responsive blog management system built with **Next.js 15 App Router**, **MongoDB**, **JWT Authentication**, and **Tailwind CSS**.  
Includes rich admin features and deploys seamlessly on **Vercel**.

---

## 🚀 Features

- 🔐 Admin login/signup with JWT in HttpOnly cookies
- ✅ Protected `/admin/*` routes using middleware
- 📝 Post CRUD (Create, Read, Update, Delete)
- ✍️ Rich Text Editor (React Quill)
- 🧠 Custom hooks (`useSecurePage`, `useAdminAuthRedirect`)
- 💅 TailwindCSS styling with full responsiveness
- 🧾 Toast notifications (react-hot-toast)
- 🌍 Vercel production deployment
- ⚙️ MongoDB via Mongoose ODM

---

## 📂 Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── signup/route.js
│   │   │   ├── logout/route.js
│   │   │   └── me/route.js
│   │   └── posts/
│   │       ├── create/route.js
│   │       ├── [slug]/route.js
│   │       └── route.js
│   ├── admin/
│   │   ├── login/page.js
│   │   ├── signup/page.js
│   │   ├── create/page.js
│   │   ├── edit/[slug]/page.js
│   │   └── page.js             # Admin Dashboard
│   ├── posts/[slug]/page.js    # Public post view
│   └── page.js                 # Homepage
│
├── components/
│   └── RichTextEditor.jsx
│
├── hooks/
│   ├── useSecurePage.js
│   └── useAdminAuthRedirect.js
│
├── lib/
│   ├── dbConnect.js
│   └── verifyAdmin.js
│
├── models/
│   └── Post.js
│   └── Admin.js
│
├── middleware.js
├── styles/globals.css
```

---

## ⚙️ Environment Variables

Create `.env.local` in root with:

```env
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=someverysecurekey
```

If using custom domain:

```env
NEXT_PUBLIC_BASE_URL=https://nextjs-blog-six-ochre-44.vercel.app


---

## 🧪 Local Development

```bash
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment to Vercel

1. Push project to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import the repo
3. Set Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Click **Deploy**

✅ Vercel will build and deploy automatically

---

## 🔁 How to Update the Project

1. **Make code changes locally**
2. **Commit & push to GitHub**:

```bash
git add .
git commit -m "your message"
git push
```

3. ✅ Vercel will auto-deploy your updated site.

---

## ✅ Login Demo

- Visit `/admin/login`
- Signup via `/admin/signup`
- After login, access:
  - `/admin` (dashboard)
  - `/admin/create`
  - `/admin/edit/[slug]`

---

## 📄 License

MIT License — Feel free to use and modify.

---
