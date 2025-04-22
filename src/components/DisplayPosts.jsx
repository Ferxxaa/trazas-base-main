import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  // Obtener publicaciones
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(query(collection(db, 'foro'), orderBy('timestamp', 'desc')));
    const postsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPosts(postsList);
  };

  // Obtener comentarios de una publicación específica
  const fetchComments = async (postId) => {
    const querySnapshot = await getDocs(collection(db, 'foro', postId, 'comments'));
    const commentsList = querySnapshot.docs.map((doc) => doc.data());
    setComments(commentsList);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Foro</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: '20px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => fetchComments(post.id)}>Ver comentarios</button>

          {comments.map((comment, index) => (
            <div key={index} style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayPosts;
