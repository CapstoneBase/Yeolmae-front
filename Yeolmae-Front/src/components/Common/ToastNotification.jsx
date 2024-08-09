import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Toast = styled.div`
  bottom: 25px;
  left: 50%;
  height: 30px;
  width: 300px;
  margin-left: -165px;
  padding: 5px 15px;
  position: absolute;
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

function ToastNotification({ text, props }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [props]);

  return (
    <Toast>
      <p>{text}</p>
    </Toast>
  );
}

export default ToastNotification;
