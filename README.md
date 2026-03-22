<div align="center">
 
# LibraryMS — A Modern University Library Management System (Frontend)
 
  <div>
    <img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <br/>
    <img src="https://img.shields.io/badge/-shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
    <img src="https://img.shields.io/badge/-React_Router_v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
    <img src="https://img.shields.io/badge/-TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" /> <br/>
    <img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white" />
    <img src="https://img.shields.io/badge/-Azure_Container_Apps-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
    <img src="https://img.shields.io/badge/-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
  </div>
 
</div>

<br />
<br />

LibraryMS is a full-stack web application for managing University Library operations, featuring a public-facing app and a dedicated admin interface — from book discovery and borrowing workflows to full administrative oversight. It delivers a role-based experience tailored for both university library members and administrators, with a focus on type safety, efficient data fetching, and a modular component architecture.

This project was born from a real observation: back in high school, the library had no digital system to track borrowings — if someone took a book, there was no record of it. That got me thinking about how a modern university library system should work. LibraryMS is my answer to that question — a platform built for universities and educational institutions to efficiently manage their library, where students can explore the book catalog, borrow books, and track their borrowing history with real-time availability updates, while administrators can manage users (approve, block), maintain the full book catalog (add, update, delete), and oversee all borrowing activity. All of this wrapped in a clean, modern UI that keeps simplicity at its core.

The system also includes an **email notification** layer — users are automatically notified whether their account registration was approved or rejected, along with other key account and borrowing events.

<br />

🌐 **Live Site:** [https://libraryms-zeta.vercel.app/](https://libraryms-zeta.vercel.app/)

---

## 📔 Table of Contents

- [Demo Account](#demo-account)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Infrastructure & Deployment](#infrastructure--deployment)
- [Local Development Setup](#local-development-setup)

---

## 🔑 Demo Account <a id="demo-account"></a>

Don't have an account? No problem. A read-only demo account is available for anyone who wants to explore the library's user-facing features — perfect for visitors who want a quick look without going through the registration and approval flow.

| Field        | Value              |
| :----------- | :----------------- |
| **Email**    | `demo@example.com` |
| **Password** | `DemoPa$$word123`  |

> ⚠️ **This is a restricted demo account.** It is limited to **read-only actions** only. Users signed in with this account **cannot** perform any write operations — this includes creating, updating, or deleting any data such as borrowing books, modifying profile information, or any other state-changing action. It is intended solely for browsing and exploring the platform's UI and features.

---

## ✨ Features <a id="features"></a>

### For Library Users

- **Browse & Search Books:** Explore the full library catalog, search by title or author, and filter by category or availability.
- **Book Details:** View rich book information including descriptions, categories, and real-time availability status.
- **Borrow Books:** Borrow books with a 14-day borrowing period; confirmation dialogs display the exact due date before confirming.
- **Personal Profile:** Track your borrowing history, view currently borrowed books, and monitor any overdue items.

### For Library Administrators

- **Dashboard Overview:** Real-time statistics covering total books, registered users, currently borrowed books, and pending requests.
- **Book Management:** Add, edit, and manage the full book inventory including cover images and category assignments.
- **User Management:** View and manage user accounts, approve new registrations, and control user statuses.
- **Borrowing Tracking:** Monitor all active loans, track due dates, and process book returns.
- **Account Requests:** Review and approve or reject new member applications directly from the admin sidebar.

### System-Wide

- **Role-Based Access Control:** Separate interfaces for regular users and administrators, with admin-only routes and features protected at the layout level.
- **Responsive Design:** Fully optimised for both desktop and mobile devices.
- **Real-time Updates:** Live tracking of book availability and borrowing status powered by TanStack Query.
- **Approval Workflow:** Complete registration-to-borrowing lifecycle — new users require admin approval before accessing borrowing features.
- **Email Notifications:** Users receive automated email notifications when their account is approved or rejected, as well as for other key account and borrowing events.

---

## 📸 Screenshots <a id="screenshots"></a>

### Login Page

The entry point of the application — where users sign in or navigate to register.

<div align="center">
  <img src="/public/images/LoginPageScreenshot.png" alt="LibraryMS Login Page" width="600">
</div>
 
---
 
### Home Page
 
The main user-facing interface after login, giving members access to the book catalog and key library information.
 
**1. Home**
 
The initial landing view after login, presenting a feature book.
 
<div align="center">
  <img src="/public/images/HomePageScreenshot2.png" alt="LibraryMS Home Page Initial View" width="600">
</div>
 
<br>
 
**2. Home — Books Catalog**
 
Some features book where users can discover popular titles across all categories.
 
<div align="center">
  <img src="/public/images/HomePageBooksScreenshot.png" alt="LibraryMS Home Page Books Catalog" width="600">
</div>
 
---
 
### Profile Page
 
The personal profile view where users can track their borrowing history, see currently borrowed books, and monitor any overdue items.
 
<div align="center">
  <img src="/public/images/ProfilePageScreenshot.png" alt="LibraryMS Profile Page" width="600">
</div>
 
---
 
### Search Page
 
The search and discovery interface, allowing users to filter the catalog by title, author, category, or availability.
 
<div align="center">
  <img src="/public/images/SearchPageScreenshot.png" alt="LibraryMS Search Page" width="600">
</div>
 
---
 
### Admin Interface
 
The dedicated admin environment for managing all library operations — users, books, and borrowing activity.
 
**1. Dashboard**
 
A real-time overview of library activity, displaying key statistics such as total books, registered users, active loans, and pending account requests.
 
<div align="center">
  <img src="/public/images/DashboardPageScreenshot.png" alt="LibraryMS Admin Dashboard" width="600">
</div>
 
<br>
 
**2. Books Table**
 
The full book inventory management view, where admins can browse and filter all catalog entries and perform add, edit, or delete operations.
 
<div align="center">
  <img src="/public/images/AdminBooksScreeshot.png" alt="LibraryMS Admin Books Table" width="600">
</div>
 
<br>
 
**3. Book Details**
 
The individual book detail panel within the admin interface, showing full metadata and allowing targeted edits to a specific catalog entry.
 
<div align="center">
  <img src="/public/images/AdminBookDetailsScreenshot.png" alt="LibraryMS Admin Book Details" width="600">
</div>
 
---
 
### Email Notifications
 
Automated emails sent to users upon account review — notifying them whether their registration was **approved** or **rejected** by an administrator.
 
<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 16px;">
  <img src="/public/images/ApprovedEmail.png" alt="Account Approved Email" width="300">
  <img src="/public/images/RejectedEmail.png" alt="Account Rejected Email" width="300">
</div>
 
---

## 💻 Tech Stack <a id="tech-stack"></a>

| Component          | Technology                             | Notes                                                 |
| :----------------- | :------------------------------------- | :---------------------------------------------------- |
| **Frontend**       | `React 19`, `TypeScript`, `Vite + SWC` | Layout-based routing strategy via React Router v7     |
| **Styling**        | `Tailwind CSS`, `shadcn/ui`            | OKLCH color tokens, utility-first styling             |
| **Data Fetching**  | `TanStack Query (React Query)`         | Server state management with caching and invalidation |
| **Forms**          | `React Hook Form`, `Zod`               | Type-safe form validation schemas                     |
| **Backend**        | `ASP.NET Core 9`, `C#`                 | RESTful Web API                                       |
| **Database**       | `PostgreSQL` via EF Core               | Hosted on **Neon** (serverless PostgreSQL)            |
| **Authentication** | `JWT`                                  | Secure password hashing, protected routes             |
| **Cloud Storage**  | `Cloudinary`                           | Book cover image uploads and delivery                 |

---

## ☁️ Infrastructure & Deployment <a id="infrastructure--deployment"></a>

- **Frontend:** Hosted on **Vercel**.
- **Backend:** Containerised and deployed on **Azure Container Apps**.
- **Database:** **Neon PostgreSQL** (serverless).
- **CI/CD:** Automated deployment pipeline via **GitHub Actions**.
- **Cloud Storage:** **Cloudinary** for book cover images.

---

## ⚙️ Local Development Setup <a id="local-development-setup"></a>
 
This repository contains the **frontend only**. The backend is maintained in a separate repository — make sure it is running locally before starting the frontend.
 
> 🔗 **Backend Repository:** [LibraryMS-backend](https://github.com/ErkyHanma/LibraryMS-backend)
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) (v18+)
 
### Configuration
 
Create a `.env` file in the project root and set the backend API base URL:
 
```env
VITE_API_BASE_URL=http://localhost:<port>
```
 
Replace `<port>` with the port your local backend instance is running on.
 
---
 
### 1. Install Dependencies
 
```bash
npm install
```
 
---
 
### 2. Start the Development Server
 
```bash
npm run dev
```
 
The application will be available at `http://localhost:5173`.
 
---

## ⚠️ Disclaimer

All books, user data, and any other content present in this application are **entirely fictional and for demonstration purposes only**. I do not own, claim ownership of, or have any affiliation with any of the books or entities referenced within the platform. LibraryMS is not a real library or registered organization of any kind — it is a **personal portfolio project** built purely for educational purposes and to demonstrate full-stack software development skills. Any resemblance to real institutions, persons, or published works is coincidental.

---

## 📃 License

This project is licensed under the [MIT License](./LICENSE).
