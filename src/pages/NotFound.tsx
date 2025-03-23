
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-skill-lightBlue/30 to-white page-transition">
      <div className="text-center glass-card p-12 max-w-md">
        <h1 className="text-6xl font-bold text-skill-blue mb-4">404</h1>
        <p className="text-xl text-skill-charcoal mb-8">
          Oops! We couldn't find this page
        </p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-skill-blue hover:bg-skill-blue/90">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
