import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { Toaster } from "sonner";

const App = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="bg-primary fixed top-0 right-0 left-0 z-50 h-1 animate-pulse" />
      )}
      <Outlet />
      <ScrollRestoration />
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
      />
    </>
  );
};

export default App;
