'use client';

import { useQuery } from '@tanstack/react-query';
import { User } from './userList';

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  window.localStorage.setItem("users", JSON.stringify(data));
  return data;
}

export default function useFetchUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}
