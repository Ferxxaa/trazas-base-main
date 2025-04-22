// src/pages/Foro.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Foro() {
  const [posts, setPosts] = useState([]);
  const [nuevoPost, setNuevoPost] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const postsRef = collection(db, "posts");

  useEffect(() => {
    obtenerPosts();

    onAuthStateChanged(auth, user => {
      if (user && user.email.startsWith("admin")) {
        setIsAdmin(true);
      }
    });
  }, []);

  const obtenerPosts = async () => {
    const data = await getDocs(postsRef);
    setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const agregarPost = async () => {
    if (nuevoPost.trim() === '') return;
    await addDoc(postsRef, { contenido: nuevoPost });
    setNuevoPost('');
    obtenerPosts();
  };

  const eliminarPost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    obtenerPosts();
  };

  return (
    <div>
      <h2>Foro</h2>
      {isAdmin && (
        <div>
          <textarea value={nuevoPost} onChange={(e) => setNuevoPost(e.target.value)} />
          <button onClick={agregarPost}>Publicar</button>
        </div>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.contenido}
            {isAdmin && <button onClick={() => eliminarPost(post.id)}>🗑️</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
