import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from './userList';

const fetchUserFromLocalStorage = async (user: User) => {
    const storedUsers = window.localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUserList = users.map((u: User) => u.id === user.id? u : user);
    window.localStorage.setItem("users", JSON.stringify(updatedUserList));

    return user;
}

export default function useMutate() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: fetchUserFromLocalStorage,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['users'], (old: User[] | undefined) => {
                return old?.map((user) => 
                    user.id === updatedUser.id ? updatedUser : user
                );
            });
        },
    });
}

