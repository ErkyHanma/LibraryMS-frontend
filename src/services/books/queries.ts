import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getBookById, getBooks } from "./api";
import { QUERY_KEYS } from "@/lib/queryKeys";

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
