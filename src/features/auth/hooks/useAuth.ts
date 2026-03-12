import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/shared/api/auth.api';

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data: any) => {
      const { access_token, user } = data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
  });

  const refreshMutation = useMutation({
    mutationFn: () => authApi.refresh(),
    onSuccess: (data: any) => {
      const { access_token, user } = data.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    refresh: refreshMutation.mutate,
    refreshAsync: refreshMutation.mutateAsync,
    isRefreshing: refreshMutation.isPending,
  };
}
