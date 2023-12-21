// Modal.jsx
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it's above everything else
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #0093E9;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const Modal = ({ onRestart }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <h1>Congrats, you won!</h1>
                <ModalButton onClick={onRestart}>Play Again</ModalButton>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
