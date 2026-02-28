import { useGetAccountRequestById } from "@/services/admin/queries";
import BackButton from "../../components/admin/BackButton";
import { useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { User, TrendingUp, IdCard, Calendar, Shield, Mail } from "lucide-react";
import { cn, formatDate, formatDateTime } from "@/lib/utils";

const AccountRequestDetail = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetAccountRequestById(parseInt(id ?? "0"));

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen w-full pt-20 pb-8 lg:pt-8">
        <div className="mx-auto max-w-7xl px-4">
          <BackButton
            to="/admin/account-requests"
            label="Back to list"
            variant="ghost"
          />
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">Request not found</p>
          </div>
        </div>
      </div>
    );
  }

  console.log(data);

  const {
    user,
    status,
    createdAt,
    reviewedAt,
    reviewedBy,
    rejectionReason,
    accountRequestId,
  } = data;
  const fullName = `${user.name} ${user.lastName}`;

  return (
    <div className="min-h-screen w-full pt-20 pb-8 lg:pt-8">
      <div className="mx-auto max-w-7xl px-4">
        <BackButton
          to="/admin/account-requests"
          label="Back to list"
          variant="ghost"
        />

        {/* Header with Status Badge */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Request #{accountRequestId}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              Submitted {formatDate(createdAt)} • Account Registration
            </p>
          </div>
          <span
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold md:px-6 md:text-lg",
              {
                "bg-red-100 text-red-700": status.toUpperCase() === "REJECTED",
                "bg-green-100 text-green-700":
                  status.toUpperCase() === "APPROVED",
                "bg-gray-200 text-gray-700": status.toUpperCase() === "PENDING",
              },
            )}
          >
            {status}
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* User Information Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <IdCard className="h-6 w-6 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  User Information
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 border-b border-gray-50 pb-4">
                  <User className="mt-1 h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Full Name
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-gray-50 pb-4">
                  <Mail className="mt-1 h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Email Address
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      University ID
                    </p>
                    <p className="mt-1 font-mono text-base font-bold text-gray-900">
                      {user.universityId}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Registration Date
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Account Status
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {user.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Role
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection Reason Section */}
            {rejectionReason && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                    <span className="text-sm font-bold text-red-600">!</span>
                  </div>
                  <h2 className="text-lg font-bold text-red-900">
                    Rejection Reason
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-red-800">
                  {rejectionReason}
                </p>
              </div>
            )}

            {/* Request Metadata */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <Shield className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  Request Details
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                    Request ID
                  </p>
                  <p className="mt-2 font-mono text-base font-bold text-gray-900">
                    #{accountRequestId}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                    Submitted On
                  </p>
                  <p className="mt-2 text-base font-medium text-gray-900">
                    {formatDate(createdAt)} at {formatDateTime(createdAt)}
                  </p>
                </div>

                {reviewedAt && reviewedAt !== "0001-01-01T00:00:00" && (
                  <>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                        Reviewed On
                      </p>
                      <p className="mt-2 text-base font-medium text-gray-900">
                        {formatDate(reviewedAt)} at {formatDateTime(reviewedAt)}
                      </p>
                    </div>

                    {reviewedBy && (
                      <div>
                        <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                          Reviewed By
                        </p>
                        <p className="mt-2 text-base font-medium text-gray-900">
                          {reviewedBy?.name + " " + reviewedBy?.lastName}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  Activity Timeline
                </h2>
              </div>

              <div className="space-y-6">
                {/* Request Rejected */}
                {status.toUpperCase() === "REJECTED" &&
                  reviewedAt &&
                  reviewedAt !== "0001-01-01T00:00:00" && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        </div>
                        <div className="h-full w-0.5 bg-gray-200"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h3 className="font-semibold text-gray-900">
                          Request Rejected
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                          {formatDate(reviewedAt)} at{" "}
                          {formatDateTime(reviewedAt)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          Application denied. User notified via email.
                        </p>
                      </div>
                    </div>
                  )}

                {/* Under Review / Pending */}
                {status.toUpperCase() === "PENDING" && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-8 items-center justify-center rounded-full bg-gray-100">
                        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                      </div>
                      <div className="h-full w-0.5 bg-gray-200"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className="font-semibold text-gray-900">
                        Under Review
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Processing account registration request.
                      </p>
                    </div>
                  </div>
                )}

                {/* Request Approved */}
                {status.toUpperCase() === "APPROVED" &&
                  reviewedAt &&
                  reviewedAt !== "0001-01-01T00:00:00" && (
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="h-full w-0.5 bg-gray-200"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <h3 className="font-semibold text-gray-900">
                          Request Approved
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                          {formatDate(reviewedAt)} at{" "}
                          {formatDateTime(reviewedAt)}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          Account approved and activated successfully.
                        </p>
                      </div>
                    </div>
                  )}

                {/* Request Submitted */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      Request Submitted
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(createdAt)} at {formatDateTime(createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Account registration request created.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRequestDetail;
