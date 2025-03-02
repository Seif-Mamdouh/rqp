import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './dataList';

async function updateTodoList(todo: Todo) {
    const todosString = window.localStorage.getItem("todos") || "[]";
    const totalTodos: Todo[] = JSON.parse(todosString);
    
    const todoIndex = totalTodos.findIndex((t: Todo) => t.id === todo.id);

    totalTodos[todoIndex] = todo;
        
    window.localStorage.setItem("todos", JSON.stringify(totalTodos));
    
    return todo;
}

export default function useUpdateTodoList() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodoList,
        onSuccess: (updatedTodo) => {
            queryClient.setQueryData(['todos'], (old: Todo[] )=> 
                old.map(todo => todo.id === updatedTodo?.id ? updatedTodo : todo)
            );
        }
    });
}