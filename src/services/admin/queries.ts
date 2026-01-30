import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  getAccountRequest,
  getBorrowedBooks,
  getDashboard,
  getBooks,
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

export function useGetAccountRequest(filters = {}, enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACCOUNT_REQUESTS],
    queryFn: async () => getAccountRequest(filters),
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
    queryKey: [QUERY_KEYS.GET_BORROWED_BOOKS],
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
