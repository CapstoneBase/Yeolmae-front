import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    color: white;
    background-color: #6558F5;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    padding: 7px 25px;
    font-size: 15px;
    white-space: nowrap;
    font-family: "NotoSansKR-Bold";

    &:hover {
        background-color: #a4a0db;
        color: #6558F5;
    }

    &:active {
        background-color: #6558F5; 
        color: white;
    }
`;


const Button = ({ text, type, onClick }) => {
    return <StyledButton type={type} onClick={onClick}>{text}</StyledButton>;
};

export default Button;