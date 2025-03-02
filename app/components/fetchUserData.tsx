'use client';

import { useQuery } from '@tanstack/react-query';
import { Todo } from './dataList';

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  window.localStorage.setItem("todos", JSON.stringify(data));
  return data;
}

export default function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}
