"use client"

import { useState } from "react";
import { User } from "./userList";
import useFetchUsers from "./fetchUserData";

interface FilterProps {
    selectedUserId: number | null;
    onSelectedUserIdChange: (userId: number | null) => void;

}
const Filter = ({ selectedUserId, onSelectedUserIdChange }: FilterProps) => {

    const { data: users } = useFetchUsers();

    return (
        <>
        <select 
            value={selectedUserId || ''} 
            onChange={(e) => onSelectedUserIdChange(parseInt(e.target.value))}>
            <option value={''}>All</option>
            {users?.map((user: User) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
        </>
    )
}


export default Filter;