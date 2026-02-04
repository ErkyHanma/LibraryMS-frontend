import type { BookParams, UpdateBookParams } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeUserRole,
  changeUserStatus,
  createBook,
  deleteBook,
  updateBook,
} from "./api";
import {
  invalidateBooksQueries,
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
      status: string;
    }) => {
      return await changeUserStatus(userId, status);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
    },
  });
};
