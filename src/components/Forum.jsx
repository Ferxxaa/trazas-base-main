import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';  // Importa la configuración de Firebase

const Forum = ({ isAdmin }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Función para agregar una publicación
  const agregarPublicacion = async () => {
    if (!title || !content) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      // Crear la publicación en la colección 'foro'
      const docRef = await addDoc(collection(db, 'foro'), {
        title,
        content,
        adminId: 'admin@example.com',  // Este campo se puede personalizar con el ID del admin
        timestamp: serverTimestamp(),
      });

      console.log('Publicación creada con ID: ', docRef.id);

      // Si el usuario es admin, agregamos un comentario inicial
      if (isAdmin) {
        await addDoc(collection(docRef, 'comments'), {
          userId: 'admin@example.com',
          content: 'Este es un comentario inicial de prueba.',
          timestamp: serverTimestamp(),
        });

        console.log('Comentario inicial agregado');
      }
    } catch (e) {
      console.error('Error añadiendo publicación o comentario: ', e);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Publicar en el Foro</h2>
      <input
        type="text"
        placeholder="Título de la publicación"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
      />
      <textarea
        placeholder="Contenido de la publicación"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '150px', marginBottom: '10px', padding: '10px' }}
      />
      <button
        onClick={agregarPublicacion}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Publicar
      </button>
    </div>
  );
};

export default Forum;
