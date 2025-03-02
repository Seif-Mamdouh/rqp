import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './dataList';

async function updateTodo(todo: Todo) {
    const todosString = window.localStorage.getItem("todos") || "[]";
    const totalTodos: Todo[] = JSON.parse(todosString);
    
    const todoIndex = totalTodos.findIndex((t: Todo) => t.id === todo.id);
    
    if (todoIndex !== -1) {
        totalTodos[todoIndex] = todo;
        
        window.localStorage.setItem("todos", JSON.stringify(totalTodos));
    }
    
    return todo;
}

export default function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodo,
        onSuccess: (updatedTodo) => {
            queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => {
                if (!old) return [];
                return old.map((todo: Todo) => todo.id === updatedTodo?.id ? updatedTodo : todo);
            });
        }
    });
}