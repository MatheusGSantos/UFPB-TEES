import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

enum EButtonTypes {
    "primary",
    "danger",
    "confirm",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    buttonType?: keyof typeof EButtonTypes;
    rounded?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, buttonType, ...rest }) => (
    <Container type="button" bgColor={buttonType} {...rest}>
        {children}
    </Container>
);

export default Button;
