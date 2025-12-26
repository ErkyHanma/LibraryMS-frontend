import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="h-screen w-full">
      <div className="flex h-full justify-between">
        <section className="mx-auto flex w-full items-center justify-center px-6 lg:max-w-[50%]">
          <div className="w-full max-w-100 rounded-xl p-4">
            <img className="h-auto w-14 mb-3" src="/public/images/Logo.png" alt="Logo" />
            <h1 className="text-2xl font-semibold">Welcome to the LibraryMS</h1>
            <Outlet />
          </div>
        </section>
        <section className="hidden h-full w-full lg:block lg:w-[50%]">
          <img
            className="h-full w-full"
            src="/public/images/library.png"
            alt="Library image"
          />
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
