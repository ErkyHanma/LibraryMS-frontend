import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./pages/books/Home.tsx";
import Search from "./pages/books/Search.tsx";
import BookDetails from "./pages/books/BookDetails.tsx";

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
          { path: "search", Component: Search },
          { path: "book/:id", Component: BookDetails },
        ],
      },
    ],
  },
]);

export default router;
