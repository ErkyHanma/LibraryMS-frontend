import { Info, X } from "lucide-react";
import { useState } from "react";

const DemoBanner = () => {
  const [close, setClose] = useState(false);

  return (
    <div className="flex w-full items-center justify-center px-4 md:px-0">
      <div
        className={`mt-2 flex w-full items-center justify-center gap-2.5 rounded-md border border-red-300 bg-red-50 px-5 py-2.5 md:max-w-[80%] ${close && "hidden"}`}
      >
        <Info className="shrink-0 text-red-600" size={17} />
        <span className="text-xs text-red-900">
          You're exploring a <span className="font-medium">demo account</span> —
          feel free to browse the catalog. Creating, editing, and deleting
          actions are disabled.
        </span>

        <button
          className="cursor-pointer rounded-full p-2 hover:bg-red-100"
          onClick={() => setClose(true)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;
