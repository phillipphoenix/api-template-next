import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "../pages/api/auth/user";
import fetchJson, { FetchError } from "../lib/fetchJson";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/auth/user");

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ data?: User; error?: FetchError }> => {
    try {
      const user = await fetchJson<User>("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      mutateUser(user, false);
      return { data: user, error: undefined };
    } catch (error) {
      if (error instanceof FetchError) {
        return { data: undefined, error };
      } else {
        console.error("An unexpected error happened:", error);
        throw error;
      }
    }
  };

  return { user, mutateUser, login };
}
