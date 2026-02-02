import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getAccountRequest,
  getBorrowedBooks,
  getDashboard,
  getBooks,
  getUsers,
  getCategories,
  getBookById,
} from "./api";
import { QUERY_KEYS } from "@/lib/queryKeys";

export function useGetDashboard(enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_DASHBOARD],
    queryFn: getDashboard,
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBooks(searchTerm = "", filters = {}, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_BOOKS, searchTerm, filters],
    queryFn: async () => {
      return getBooks(searchTerm, filters);
    },
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBookById(bookId: number | string, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_BOOK_BY_ID, bookId],
    queryFn: async () => getBookById(bookId),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetAccountRequest(
  searchTerm = "",
  filters = {},
  enabled = true,
) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACCOUNT_REQUESTS, searchTerm, filters],
    queryFn: async () => getAccountRequest(searchTerm, filters),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetBorrowedBooks(
  searchTerm = "",
  filters = {},
  enabled = true,
) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_BORROWED_BOOKS, searchTerm, filters],
    queryFn: async () => {
      return getBorrowedBooks(searchTerm, filters);
    },
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetUsers(searchTerm = "", filters = {}, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS, searchTerm, filters],
    queryFn: async () => {
      return getUsers(searchTerm, filters);
    },
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}

export function useGetCategories(enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: async () => getCategories(),
    enabled: enabled && isAuthenticated,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnMount: true,
  });
}
