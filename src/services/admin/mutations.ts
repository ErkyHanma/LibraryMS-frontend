import type {
  AccountRequestStatus,
  BookParams,
  UpdateBookParams,
  UserStatus,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChangeAccountRequestStatus,
  changeUserRole,
  changeUserStatus,
  createBook,
  deleteBook,
  returnBorrowedBook,
  updateBook,
} from "./api";
import {
  invalidateAccountRequestQueries,
  invalidateBooksQueries,
  invalidateBorrowedBooksQueries,
  invalidateUserQueries,
} from "./queryInvalidation";

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: BookParams) => {
      return await createBook(params);
    },
    onSuccess: () => {
      // Invalidate all related books queries
      invalidateBooksQueries(queryClient);
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      params,
    }: {
      bookId: number;
      params: UpdateBookParams;
    }) => {
      return await updateBook(bookId, params);
    },
    onSuccess: () => {
      invalidateBooksQueries(queryClient);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: number) => {
      return await deleteBook(bookId);
    },
    onSuccess: () => {
      invalidateBooksQueries(queryClient);
    },
  });
};

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return await changeUserRole(userId, role);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
    },
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      status,
    }: {
      userId: string;
      status: UserStatus;
    }) => {
      return await changeUserStatus(userId, status);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
    },
  });
};

export const useChangeAccountRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      accountRequestId,
      status,
      userId,
      rejectionReason,
    }: {
      accountRequestId: number;
      status: AccountRequestStatus;
      userId: string;
      rejectionReason?: string;
    }) => {
      return await ChangeAccountRequestStatus(
        accountRequestId,
        status,
        userId,
        rejectionReason,
      );
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
      invalidateAccountRequestQueries(queryClient);
    },
  });
};

export const useReturnBorrowedBookAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (borrowedBookId: number) => {
      return await returnBorrowedBook(borrowedBookId);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
      invalidateBooksQueries(queryClient);
      invalidateBorrowedBooksQueries(queryClient);
    },
  });
};
