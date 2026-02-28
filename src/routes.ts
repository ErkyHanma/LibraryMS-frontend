import { createBrowserRouter, redirect } from "react-router";
import App from "./App.tsx";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import MainLayout from "./pages/books/MainLayout.tsx";
import Home from "./pages/books/Home.tsx";
import Search from "./pages/books/Search.tsx";
import BookDetails from "./pages/books/BookDetails.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import Profile from "./pages/books/Profile.tsx";
import Users from "./pages/admin/Users.tsx";
import Books from "./pages/admin/Books.tsx";
import BorrowedBooks from "./pages/admin/BorrowedBooks.tsx";
import AccountRequest from "./pages/admin/AccountRequest.tsx";
import AdminBookDetails from "./pages/admin/AdminBookDetails.tsx";
import CreateBook from "./pages/admin/CreateBook.tsx";
import EditBook from "./pages/admin/EditBook.tsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.tsx";
import AccountRequestDetail from "./pages/admin/AccountRequestDetail.tsx";
import Categories from "./pages/admin/Categories.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, loader: () => redirect("/auth/login") },

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
          { index: true, path: "/admin", Component: Dashboard },
          { path: "admin/users", Component: Users },
          { path: "admin/books", Component: Books },
          { path: "admin/books/:id", Component: AdminBookDetails },
          { path: "admin/books/create", Component: CreateBook },
          { path: "admin/books/edit/:id", Component: EditBook },
          { path: "admin/borrowed-books", Component: BorrowedBooks },
          { path: "admin/account-requests", Component: AccountRequest },
          {
            path: "admin/account-requests/:id",
            Component: AccountRequestDetail,
          },
          { path: "admin/books/categories", Component: Categories },
        ],
      },
    ],
  },
]);

export default router;
