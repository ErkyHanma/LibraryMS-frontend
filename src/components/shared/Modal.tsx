import { useEffect, type ReactNode } from "react";
import { Button } from "../ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  // close modal if window size is > 1024px
  useEffect(() => {
    const handleResize = () => {
      const BREAKPOINT = 1024;

      if (window.innerWidth >= BREAKPOINT && open) {
        onClose();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [open, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }


    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-between space-y-8 bg-white p-8 transition-all duration-300 ease-out lg:invisible ${
        open ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <div className="w-full">{children}</div>
      <div className="flex w-full gap-3 border-t-1 pt-4">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 cursor-pointer"
        >
          Cancel
        </Button>
        <Button onClick={onClose} className="form-btn flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Modal;
