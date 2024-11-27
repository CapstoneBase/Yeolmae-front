import React from 'react';

function Button({ text, onClick }) {
  return (
    <button className="btn btn-primary w-100" type="submit" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
