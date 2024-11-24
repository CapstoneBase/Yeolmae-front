import React from 'react';

function Button({ text, onClick }) {
  return (
    <button className="btn btn-primary w-100 my-3 py-2" type="submit" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
