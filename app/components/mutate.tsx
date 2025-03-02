import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './dataList';

async function updateTodo(todo: Todo) {
    const todosString = window.localStorage.getItem("todos") || "[]";
    const totalTodos: Todo[] = JSON.parse(todosString);
    
    // Find the index of the todo to update
    const todoIndex = totalTodos.findIndex((t: Todo) => t.id === todo.id);
    
    if (todoIndex !== -1) {
        // Update the todo in the array
        totalTodos[todoIndex] = todo;
        
        // Save back to localStorage
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