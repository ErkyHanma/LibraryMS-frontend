import UserCard from "@/components/shared/UserCard";
import { useGetAccountRequest } from "@/services/admin/queries";
import { UserRound } from "lucide-react";
import { Link } from "react-router";
import UserCardSkeleton from "../../shared/UserCardSkeleton";
import type { AccountRequest } from "@/types";

const AccountRequestSection = () => {
  const { data: accountRequest, isFetching } = useGetAccountRequest("", {
    status: "pending",
  });

  return (
    <section className="flex max-h-50 w-full flex-col rounded-lg bg-white px-4 py-4 shadow-sm">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-xl font-[550]">Account Requests</h1>
        <Link
          to={"/admin/account-requests"}
          className="text-primary cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-sm font-medium shadow transition-colors duration-100 hover:opacity-65 active:scale-95"
        >
          View All
        </Link>
      </div>

      {isFetching ? (
        <div className="hide-scrollbar grid grid-cols-2 gap-4 overflow-y-auto lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      ) : accountRequest.data.length > 0 ? (
        <div className="hide-scrollbar grid grid-cols-2 gap-4 overflow-y-auto lg:grid-cols-3">
          {accountRequest.data.map((request: AccountRequest) => {
            if (!request.user) return null;

            const { id, profileImageUrl, name, lastName, email } = request.user;

            return (
              <UserCard
                key={id}
                name={name}
                lastName={lastName}
                email={email}
                profileImageUrl={profileImageUrl ?? ""}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
            <UserRound className="size-10 text-white" />
          </div>
          <h3 className="mt-2 mb-1 text-xl font-semibold text-gray-900">
            No Pending Account Requests
          </h3>
          <p className="text-sm text-gray-500">
            There are currently no account requests awaiting approval.
          </p>
        </div>
      )}
    </section>
  );
};

export default AccountRequestSection;
