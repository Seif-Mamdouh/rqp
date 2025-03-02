'use client';

import { useState } from 'react';
import useFetchUsers from './fetchUserData';

export interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const { data: users, isLoading, error } = useFetchUsers();

    const [search, setSearch] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filteredUsers = users?.filter((user: User) => user.name.toLowerCase().includes(search.toLowerCase()));

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul className="space-y-4">
            <input type="text" placeholder="Search" onChange={handleSearch} />
            {filteredUsers?.map((user: User) => (
                <li key={user.id} className="p-4 border rounded">
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </li>
            ))}
        </ul>
    );
}