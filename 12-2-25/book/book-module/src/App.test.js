import React from 'react';
import './Book.css';

function Book({ name, author, price }) {
  return (
    <div className="book">
      <h2>{name}</h2>
      <p>Author: {author}</p>
      <p>Price: ${price}</p>
    </div>
  );
}

export default Book;
