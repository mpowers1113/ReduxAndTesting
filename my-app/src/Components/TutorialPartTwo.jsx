import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

async function getSpecificPost(postId) {
  console.log('prefetching on hover ', postId);
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  return res.data;
}

function Posts({ setPostId }) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery(
    'posts',
    async () => {
      console.log('fetching');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return res.data;
    },
    {
      staleTime: 50000,
    },
  );

  return (
    <div className="p-4">
      <h1 className="ml-4 text-2xl font-bold">Posts</h1>
      <div className="p-4">
        {postsQuery.isLoading ? (
          'Loading posts'
        ) : (
          <ul className="p-4">
            {postsQuery.data.map((post) => {
              return (
                <li
                  onMouseEnter={() =>
                    queryClient.prefetchQuery(
                      ['post', post.id],
                      () => getSpecificPost(post.id),
                      {
                        staleTime: Infinity,
                      },
                    )
                  }
                  className="p-1 list-disc "
                  key={post.id}>
                  <p
                    className="underline cursor-pointer text-blue-600"
                    href="#"
                    onClick={() => setPostId(post.id)}>
                    {post.title}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {postsQuery.isFetching && <div>Updating...</div>}
    </div>
  );
}

function Post({ postId, setPostId }) {
  const { isLoading, data, isFetching } = useQuery(
    ['post', postId],
    async () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data);
    },
  );

  if (isLoading) return 'loading...';

  return (
    <div className="p-4 flex flex-col justify-center align-middle items-center">
      <button
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setPostId(-1)}>
        Back
      </button>

      <div className="p-4">
        <h1 className="font-bold text-lg p-4">{data.title}</h1>
        <p className="p-4">{data.body}</p>
      </div>
      {isFetching && <div className="p-4">Updating...</div>}
    </div>
  );
}

export default function PostMates() {
  const [postId, setPostId] = useState(-1);
  return (
    <>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </>
  );
}
