import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getBooksByCategoryId,
  getBookById,
  getBooks,
  getPopularCategories,
  getUserProfile,
  getBorrowedBookByUserId,
} from "./api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetBooks(searchTerm = "", filters = {}, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_BOOKS, searchTerm, filters],
    queryFn: () => getBooks(searchTerm, filters),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBooksSuspense(searchTerm = "", filters = {}) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_BOOKS, searchTerm, filters],
    queryFn: () => getBooks(searchTerm, filters),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
}

export function useGetBookById(bookId: number | string, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_BOOK_BY_ID, bookId],
    queryFn: () => getBookById(bookId),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBookByIdSuspense(bookId: number | string) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_BOOK_BY_ID, bookId],
    queryFn: () => getBookById(bookId),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
}

export function useGetPopularCategories(limit?: number, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_POPULAR_CATEGORIES, limit],
    queryFn: () => getPopularCategories(limit),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBooksByCategoryIdSuspense(
  categoryId: number,
  page?: number,
  limit?: number,
) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_BOOKS_BY_CATEGORYID, categoryId, page, limit],
    queryFn: () => getBooksByCategoryId(categoryId, page, limit),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
  });
}

export function useGetUserProfile(userId: string, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE, userId],
    queryFn: () => getUserProfile(userId),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBorrowedRecordsByUserId(
  userId: string,
  searchTerm = "",
  filters = {},
  enabled = true,
) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_RECORDS_BOOK_BY_USERID,
      userId,
      searchTerm,
      filters,
    ],
    queryFn: () => getBorrowedBookByUserId(userId, searchTerm, filters),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}
