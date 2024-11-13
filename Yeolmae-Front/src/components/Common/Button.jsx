import React from 'react';

function Button({ text, type, onClick }) {
  return (
    // 클래스 이름 - 색상 변경
    <button type="button" className="btn btn-outline-primary" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
