import { QUERY_KEYS } from "@/lib/queryKeys";
import type { QueryClient } from "@tanstack/react-query";

export function invalidateBooksQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_DASHBOARD],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_ADMIN_BOOKS],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_BOOKS],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_BOOK_BY_ID],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_ADMIN_BOOK_BY_ID],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_BOOKS_BY_CATEGORYID],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POPULAR_CATEGORIES],
    exact: false,
    refetchType: "active",
  });
}

export function invalidateBorrowedBooksQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_BORROWED_BOOKS],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECORDS_BOOK_BY_USERID],
    exact: false,
    refetchType: "active",
  });
}

export function invalidateUserQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_USERS],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE],
    exact: false,
    refetchType: "active",
  });

  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECORDS_BOOK_BY_USERID],
    exact: false,
    refetchType: "active",
  });
}

export function invalidateAccountRequestQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_ACCOUNT_REQUESTS],
    exact: false,
    refetchType: "active",
  });
}
