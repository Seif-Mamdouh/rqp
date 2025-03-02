'use client';

import { useState } from 'react';
import useFetchTodos from './fetchUserData';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export default function DataList() {
    const { data: todos, isLoading, error } = useFetchTodos();

    const [currPage, setCurrPage] = useState(0);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    const currIndex = todos?.[currPage];

    const handleNext = () => {
        setCurrPage(currPage + 1);
    }

    const handlePrev = () => {
        setCurrPage(currPage - 1);
    }

    return (
        <div className="space-y-4 flex flex-col items-center justify-center w-full h-full">
            {currIndex && (
                <div key={currIndex.id} className="p-4 border rounded">
                    <h3 className="font-bold">{currIndex.title}</h3>
                    <p className="text-gray-600">{currIndex.completed ? 'Completed' : 'Not Completed'}</p>
                    <button onClick={handlePrev}>Prev</button>
                    <p>{currPage} of {todos?.length}</p>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
        </div>
    );
}