'use client';

import { useState } from 'react';
import useFetchTodos from './fetchUserData';
import useUpdateTodoList from './mutate';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export default function DataList() {
    const { data: todos, isLoading, error } = useFetchTodos();
    const updateTodoMutation = useUpdateTodoList();

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

    const toggleCompletion = () => {
        if (currIndex) {
            const updatedTodo = {
                ...currIndex,
                completed: !currIndex.completed
            };
            
            updateTodoMutation.mutate(updatedTodo);
        }
    }

    return (
        <div className="space-y-4 flex flex-col items-center justify-center w-full h-full">
            {currIndex && (
                <div key={currIndex.id} className="p-4 border rounded">
                    <h3 className="font-bold">{currIndex.title}</h3>
                    <p className="text-gray-600">{currIndex.completed ? 'Completed' : 'Not Completed'}</p>
                    
                    <button 
                        onClick={toggleCompletion}
                        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
                    >
                        {currIndex.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                    
                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={handlePrev} 
                            disabled={currPage === 0}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <p>{currPage + 1} of {todos?.length}</p>
                        <button 
                            onClick={handleNext} 
                            disabled={currPage === (todos?.length || 0) - 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            
            {updateTodoMutation.isPending && (
                <div className="mt-2 text-blue-500">Updating...</div>
            )}
        </div>
    );
}