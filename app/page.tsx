"use client"

import {
  useQuery,
} from "@tanstack/react-query";
import React, {useEffect, useState} from 'react';


const fetchWeather = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return data
}

const fetchUser = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
}

const fetchComments = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments')
  const data = await response.json()
  return data
}
const useWeather = () => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  })
}

const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })
}

const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  })
}

export default function Home() {
  const { data, isLoading, error } = useWeather()
  const { data: userData, isLoading: userLoading, error: userError } = useUser()
  const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useComments()

  const [postComments, setPostComments] = useState<{ [key: number]: any[] }>({})

  const handleClick = (postId: number) => {
    const filteredComments = commentsData?.filter((comment: any) => comment.postId === postId) || []
    setPostComments(prev => ({
      ...prev,
      [postId]: filteredComments
    }))
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Welcome to the Home Page
      </h1>
      {data?.map((post: any) => (
        <div key={post.userId}>
          <h1>{post.title}</h1>
          <p>{userData?.find((user: any) => user.id === post.userId)?.name}</p>
          <p>{post.body}</p>
          <button onClick={() => handleClick(post.id)}>Click for comments</button>
          {postComments[post.id]?.map((comment: any) => (
            <div key={comment.id}>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
