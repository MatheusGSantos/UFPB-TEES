import React from "react";
import { Container } from "./styles";


interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({children, visible=false}) =>
{
    return (
        <Container visible={visible}>
          {children}
        </Container>        
    );
}

export default Modal;