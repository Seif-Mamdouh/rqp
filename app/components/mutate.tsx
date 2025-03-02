import { useMutation } from '@tanstack/react-query';
import { Todo } from './dataList';

async function updateTodo(todo: Todo) {
    const todosString = window.localStorage.getItem("todos") || "[]";
    const totalTodos: Todo[] = JSON.parse(todosString);
    
    const toDoById = totalTodos.find((t: Todo) => t.id === todo.id);
    
    return toDoById;
}

export default function useUpdateTodo() {
    return useMutation({
        mutationFn: updateTodo,
        onSuccess: (updatedTodo) => {}
    });
}