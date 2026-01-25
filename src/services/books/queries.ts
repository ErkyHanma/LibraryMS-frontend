import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getBooksByCategoryId,
  getBookById,
  getBooks,
  getPopularCategories,
} from "./api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetBooks(enabled = true, searchTerm = "", filters = {}) {
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

export function useGetBookById(enabled = true, bookId: number | string) {
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

export function useGetPopularCategories(enabled = true, limit?: number) {
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
