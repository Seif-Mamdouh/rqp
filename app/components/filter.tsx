"use client"

import useFetchUsers from "./fetchUserData";
import { User } from "./userList";

interface FilterProps {
    selectedUserId: number | null;
    onSelectedUserIdChange: (userId: number | null) => void;
}

const Filter = ({selectedUserId, onSelectedUserIdChange}: FilterProps) => {

    const { data: users } = useFetchUsers();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedUserIdChange(parseInt(e.target.value));
    }

    return(
        <select
            value={selectedUserId || ''}
            onChange={handleChange}>
            <option value="all">All</option>
            {users?.map((user: User) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
    )

}


export default Filter;