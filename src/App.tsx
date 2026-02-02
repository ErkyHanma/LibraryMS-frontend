import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { Toaster } from "sonner";

const App = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="bg-primary fixed top-0 right-0 left-0 h-1 animate-pulse" />
      )}
      <Outlet />
      <ScrollRestoration />
      <Toaster />
    </>
  );
};

export default App;
