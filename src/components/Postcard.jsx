import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  // console.log(`${featuredImage }`); // Log to verify if featuredImage is undefined
  const url = appwriteService.getFilePreview(featuredImage)
  // console.log(url);
  
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {featuredImage ? (
            <img
              src={url}
              alt={url}
              className='rounded-xl'
            />
          ) : (
            <p>No Image Available</p> // Handle cases where featuredImage is missing
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
