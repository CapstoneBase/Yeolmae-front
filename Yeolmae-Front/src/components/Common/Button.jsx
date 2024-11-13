import React from 'react';

function Button({ text, type, onClick }) {
  return (
    <button type="button" className="btn btn-outline-primary" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
