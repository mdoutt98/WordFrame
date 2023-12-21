import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #F76B1C;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const OutOfTimeModal = ({ onTryAgain }) => {
    return (
        <Overlay>
            <ModalContent>
                <h1>You Lost!</h1>
                <Button onClick={onTryAgain}>Try Again</Button>
            </ModalContent>
        </Overlay>
    );
};

export default OutOfTimeModal;
