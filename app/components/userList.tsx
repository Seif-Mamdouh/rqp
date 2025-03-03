'use client';

import { useState } from 'react';
import useFetchUsers from './fetchUserData';
import useMutate from './mutate';
import Filter from './filter';

export interface User {
    id: number;
    name: string;
    email: string;
}

interface EditState {
    userId: number | null;
    field: 'name' | 'email' | null;
    value: string;
}

export default function UserList() {
    const { data: users, isLoading, error } = useFetchUsers();
    const { mutate: updateUser } = useMutate();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const [editState, setEditState] = useState<EditState>({
        userId: null,
        field: null,
        value: '',
    });
    
    const handleEdit = (userId: number, field: 'name' | 'email') => {
        const user = users?.find((user: User) => user.id === userId);
        if (!user) return;
        
        setEditState({
            userId,
            field,
            value: user[field] || '', 
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditState({
            ...editState,
            value: e.target.value,
            });
    }

    const handleSave = () => {
        if (!editState.userId || !editState.field) return;
        
        const currentUser = users?.find(u => u.id === editState.userId);
        if (!currentUser) return;
        
        updateUser({
            ...currentUser,
            [editState.field]: editState.value,
        });
        
        setEditState({
            userId: null,
            field: null,
            value: '',
        });
    }

    const handleCancel = () => {
        setEditState({
            userId: null,
            field: null,
            value: '',
        });
    }

    const renderEditForm = () => (
        <>
            <input 
                type="text" 
                value={editState.value} 
                onChange={handleChange} 
                className="w-full p-2 border rounded mb-2"
                autoFocus
            />
            <div className="flex space-x-2">
                <button 
                    onClick={handleSave}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                    Save
                </button>
                <button 
                    onClick={handleCancel}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                    Cancel
                </button>
            </div>
        </>
    );

    const filterByUserId = (userId: number | null) => {
        setSelectedUserId(userId);
    }

    const filteredUsers = selectedUserId ? users?.filter((user) => user.id === selectedUserId) : users

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul className="space-y-4">
            <Filter selectedUserId={selectedUserId} onSelectedUserIdChange={filterByUserId} />
            {filteredUsers?.map((user: User) => (
                <li key={user.id} className="p-4 border rounded">
                    {editState.userId === user.id ? (
                        renderEditForm()
                    ) : (
                        <>
                            <h3 className="font-bold">{user.name}</h3>
                            <p>{user.email}</p>
                            <div className="mt-2 flex space-x-2">
                                <button 
                                    onClick={() => handleEdit(user.id, 'name')}
                                    className="px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    Edit Name
                                </button>
                                <button 
                                    onClick={() => handleEdit(user.id, 'email')}
                                    className="px-3 py-1 bg-green-500 text-white rounded"
                                >
                                    Edit Email
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}