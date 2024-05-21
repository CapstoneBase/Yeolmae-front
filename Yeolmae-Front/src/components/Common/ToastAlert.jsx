import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToastAl = styled.div`
  bottom: 25px;
  left: center;
  height: 30px;
  width: auto;
  padding: 5px 15px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 13px;
  box-shadow: rgba(100, 100, 100, 0.1) 0px 0px 29px 0px;
  font-size: 13px;
  text-align: center;
  color: black;

  .p {
    margin: 0;
  }
`;

function ToastAlert({ text }) {
  return (
    <ToastAl>
      <p>{text}</p>
    </ToastAl>
  );
}

export default ToastAlert;
