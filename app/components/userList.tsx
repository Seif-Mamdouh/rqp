'use client';

import useFetchUsers from './fetchUserData';

export interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const { data: users, isLoading, error } = useFetchUsers();

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul className="space-y-4">
            {users?.map((user: User) => (
                <li key={user.id} className="p-4 border rounded">
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </li>
            ))}
        </ul>
    );
}