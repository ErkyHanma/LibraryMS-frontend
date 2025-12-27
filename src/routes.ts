import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./pages/books/Home.tsx";
import Search from "./pages/books/Search.tsx";
import BookDetails from "./pages/books/BookDetails.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Profile from "./pages/books/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: AuthLayout,
        children: [
          { index: true, path: "auth/login", Component: Login },
          { path: "auth/signup", Component: SignUp },
        ],
      },
      {
        Component: MainLayout,
        children: [
          { index: true, path: "home", Component: Home },
          { path: "profile", Component: Profile },
          { path: "search", Component: Search },
          { path: "book/:id", Component: BookDetails },
        ],
      },
      {
        Component: AdminLayout,
        children: [
          { index: true, path: "admin/dashboard", Component: Dashboard },
        ],
      },
    ],
  },
]);

export default router;
