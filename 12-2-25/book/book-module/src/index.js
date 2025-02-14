import React from 'react';

function Book({ name, author, price }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Author: {author}</p>
      <p>Price: ${price}</p>
    </div>
  );
}

export default Book;
