import type { BookParams, UpdateBookParams } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";
import { invalidateBooksQueries } from "./queryInvalidation";

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
