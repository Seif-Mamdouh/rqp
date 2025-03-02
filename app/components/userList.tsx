'use client';

import { useState } from 'react';
import useFetchUsers from './fetchUserData';
import useMutate from './mutate';

export interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const { data: users, isLoading, error } = useFetchUsers();

    const { mutate: updateUser } = useMutate();

    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [editField, setEditField] = useState<'name' | 'email' | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const handleEditName = (userId: number) => {
        setEditUserId(userId);
        setEditField('name');
        setName(users?.find((user: User) => user.id === userId)?.name || '');
    }
    
    const handleEditEmail = (userId: number) => {
        setEditUserId(userId);
        setEditField('email');
        setEmail(users?.find((user: User) => user.id === userId)?.email || '');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleSave = () => {
        if (!editUserId) return;
        
        const currentUser = users?.find(u => u.id === editUserId);
        if (!currentUser) return;
        
        if (editField === 'name') {
            updateUser({ 
                ...currentUser,
                name
            });
            setName('');
        } else if (editField === 'email') {
            updateUser({
                ...currentUser,
                email
            });
            setEmail('');
        }
        
        setEditUserId(null);
        setEditField(null);
    }

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul className="space-y-4">
            {users?.map((user: User) => (
                <li key={user.id} className="p-4 border rounded">
                    {editUserId === user.id && editField === 'name' ? (
                        <>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded"
                            />
                            <button onClick={handleSave}>Save</button>
                        </>
                    ) : editUserId === user.id && editField === 'email' ? (
                        <>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={handleChangeEmail} 
                                className="w-full p-2 border rounded"
                            />
                            <button onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <h3 className="font-bold">{user.name}</h3>
                            <p>{user.email}</p>
                            <button 
                                onClick={() => handleEditName(user.id)}
                                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                Edit Name
                            </button>
                            <button 
                                onClick={() => handleEditEmail(user.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded"
                            >
                                Edit Email
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}