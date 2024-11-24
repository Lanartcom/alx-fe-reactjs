import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams(); // Extract dynamic parameter
  return <h1>Blog Post ID: {id}</h1>;
};

export default BlogPost;
