import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  iconColor: string;
  iconBgColor: string;
  value: number | string;
  label: string;
};

const StatCard = ({
  icon,
  iconBgColor,
  iconColor,
  value,
  label,
}: StatCardProps) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgColor}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
