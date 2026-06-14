import PublicHeader from "@/components/shared/PublicHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowUpRightIcon, BookOpen, Search, User } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Landing = () => {
  const { isAuthenticated, isLoggingIn, login, demoEmail, demoPassword } =
    useAuth();
  const navigate = useNavigate();

  // Redirect Logic
  useEffect(() => {
    if (!isLoggingIn && isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoggingIn, navigate]);

  if (isLoggingIn) {
    return (
      <div className="bg-background text-foreground flex h-screen items-center justify-center">
        <Spinner className="size-15" />
      </div>
    );
  }

  // Auto-login handler for the demo
  const handleDemoLogin = async () => {
    try {
      await login({
        email: demoEmail,
        password: demoPassword,
      });

      // Success redirects to /home
      navigate("/home");
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
      console.error("Demo login error:", error);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col overflow-hidden">
      <PublicHeader />
      <div className="animate-fade-in w-full p-8 pt-16">
        <div className="mx-auto mt-6 flex max-w-6xl flex-col md:mt-18 lg:flex-row">
          <section className="animate-slide-up mt-6 flex flex-1 flex-col items-center space-y-2 md:mt-0 lg:mr-36 lg:items-start">
            <h1 className="text-center text-5xl font-bold md:text-6xl lg:text-start xl:text-7xl">
              Empower Your Learning with LibraryMs
            </h1>
            <p className="max-w-md text-center lg:text-start">
              Discover, organize, and access academic resources effortlessly
              with our comprehensive university library management system.
            </p>
            <div className="mt-4 flex justify-center space-x-4 md:items-center lg:justify-start">
              <Link to="/auth/signup">
                <Button className="text-md cursor-pointer p-5">
                  Get Started
                </Button>
              </Link>
              <Button
                className="text-md cursor-pointer p-5"
                variant="outline"
                onClick={handleDemoLogin}
              >
                Try Demo <ArrowUpRightIcon />
              </Button>
            </div>

            {/* Features Section */}
            <div className="hidden grid-cols-3 gap-3 pt-8 lg:grid">
              <div className="animate-slide-up space-y-3 opacity-0 [animation-delay:200ms]">
                <BookOpen className="text-primary size-8" />
                <h3 className="font-bold text-slate-900">Smart Search</h3>
                <p className="text-sm text-slate-500">
                  Easily find and borrow books with our intelligent search
                  system.
                </p>
              </div>
              <div className="animate-slide-up space-y-3 opacity-0 [animation-delay:400ms]">
                <Search className="text-primary size-8" />
                <h3 className="font-bold text-slate-900">Recommendations</h3>
                <p className="text-sm text-slate-500">
                  Get tailored book suggestions based on your reading
                  preferences.
                </p>
              </div>
              <div className="animate-slide-up space-y-3 opacity-0 [animation-delay:600ms]">
                <User className="text-primary size-8" />
                <h3 className="font-bold text-slate-900">User Dashboard</h3>
                <p className="text-sm text-slate-500">
                  Manage your borrowed books and history through an intuitive
                  interface.
                </p>
              </div>
            </div>
          </section>

          {/* Product Showcase Section */}
          <section className="animate-fade-in relative mt-12 flex flex-1 items-center justify-center opacity-0 [animation-delay:800ms]">
            {/* Background Glow */}
            <div className="bg-primary/20 absolute h-75 w-125 rounded-full blur-3xl" />

            {/* Floating Stats */}
            <div className="absolute -left-10 z-20 hidden flex-col items-center rounded-xl border bg-white p-4 shadow-lg lg:flex xl:top-10">
              <p className="text-muted-foreground text-xs">Books Available</p>
              <p className="text-primary text-2xl font-bold">500+</p>
            </div>

            <div className="absolute -right-10 z-20 hidden flex-col items-center rounded-xl border bg-white p-4 shadow-lg lg:flex xl:bottom-10">
              <p className="text-muted-foreground text-xs">Active Users</p>
              <p className="text-primary text-2xl font-bold">100+</p>
            </div>

            {/* Tablet Mockup */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] border-12 border-black bg-black shadow-2xl transition-transform duration-300 hover:-translate-y-2 md:mt-0">
              <div className="absolute top-3 left-1/2 z-20 h-2 w-16 -translate-x-1/2 rounded-full bg-zinc-700" />

              <img
                src="public/images/books_feed.webp"
                alt="LibraryMS Dashboard"
                className="h-auto w-162.5 rounded-xl"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Landing;
