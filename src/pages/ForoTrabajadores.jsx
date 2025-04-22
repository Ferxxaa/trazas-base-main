import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { db, auth } from '../firebase';  // Asegúrate de que firebase.js esté configurado correctamente
import Navbar from '../components/Navbar'; // Importa el Navbar


const addComment = async (postId, commentContent) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Por favor, inicia sesión.");
    return;
  }

  const commentsRef = ref(db, `foros/${postId}/comments`);
  const newCommentRef = push(commentsRef);

  await set(newCommentRef, {
    content: commentContent,
    authorId: user.uid,
    authorName: user.displayName,
    createdAt: new Date().toISOString(),
  });
};


const ForoTrabajadores = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(db, 'foros');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const postsList = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
      setPosts(postsList);
      setLoading(false);
    });
  }, []);

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      addComment(postId, newComment);
      setNewComment(''); // Limpiar campo de comentario
    }
  };

  return (
    <div>
      <Navbar /> {/* Agregar Navbar aquí */}
      <h1>Foro de Trabajadores</h1>
      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : (
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Publicado por: {post.authorName}</small>
            
            {/* Mostrar los comentarios */}
            <div>
              {Object.keys(post.comments || {}).map(commentId => (
                <div key={commentId}>
                  <p>{post.comments[commentId].content}</p>
                  <small>Comentario por: {post.comments[commentId].authorName}</small>
                </div>
              ))}
            </div>

            {/* Campo para agregar comentario */}
            <div>
              <textarea 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
                placeholder="Escribe un comentario"
              />
              <button onClick={() => handleAddComment(post.id)}>Agregar Comentario</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ForoTrabajadores;
