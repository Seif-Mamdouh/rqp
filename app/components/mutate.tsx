import { useMutation } from '@tanstack/react-query';
import { Todo } from './dataList';

async function updateTodo(todo: Todo) {
}

export default function useUpdateTodo() {
    return useMutation({
        mutationFn: updateTodo,
        onSuccess: (updatedTodo) => {}
    });
}