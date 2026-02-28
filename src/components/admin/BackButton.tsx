import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

interface BackButtonProps {
  to: string;
  label?: string;
  variant?: "ghost" | "default" | "outline";
}

const BackButton = ({
  to,
  label = "Back",
  variant = "default",
}: BackButtonProps) => {
  return (
    <Link to={to}>
      <Button variant={variant} className="hover:bg-primary/5 mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
};

export default BackButton;
