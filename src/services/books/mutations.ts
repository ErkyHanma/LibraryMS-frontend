import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowBookAction } from "./api";
import {
  invalidateBooksQueries,
  invalidateBorrowedBooksQueries,
  invalidateUserQueries,
} from "../admin/queryInvalidation";

export const useBorrowBookAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      userId,
    }: {
      bookId: number;
      userId: string;
    }) => {
      return await BorrowBookAction(bookId, userId);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
      invalidateBorrowedBooksQueries(queryClient);
      invalidateBooksQueries(queryClient);
    },
  });
};
