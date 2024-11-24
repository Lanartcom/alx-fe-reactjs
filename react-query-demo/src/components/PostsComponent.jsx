import React from "react";
import { useQuery } from "react-query";

// Function to fetch posts from the JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const PostsComponent = () => {
  // Use React Query to fetch data
  const { data, error, isLoading, refetch } = useQuery("posts", fetchPosts, {
    staleTime: 300000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
  });

  // Handle loading and error states
  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
