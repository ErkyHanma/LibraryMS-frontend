import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import AuthLayout from "./pages/auth/AuthLayout.tsx";
import Login from "./pages/auth/Login.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

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
    ],
  },
]);

export default router;
