import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  invalidateBooksQueries,
  invalidateBorrowedBooksQueries,
  invalidateUserQueries,
} from "../admin/queryInvalidation";
import { BorrowBookAction, EditProfile } from "./api";
import type { EditProfileParams } from "@/types";

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

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      params,
    }: {
      userId: string;
      params: EditProfileParams;
    }) => {
      return await EditProfile(userId, params);
    },
    onSuccess: () => {
      invalidateUserQueries(queryClient);
    },
  });
};
