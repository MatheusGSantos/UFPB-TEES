import { shade } from "polished";
import styled, { css } from "styled-components";

const buttonBgColors = {
    primary: "#4B3387",
    danger: "#ff6b6b",
    confirm: "#51b651",
};
const buttonTextColors = {
    primary: "#fff",
    danger: "#fff",
    confirm: "#fff",
};

interface ContainerProps {
    bgColor?: keyof typeof buttonBgColors;
    rounded?: boolean;
}

const getBgColor = (props: ContainerProps): string => {
    return props.bgColor
        ? buttonBgColors[props.bgColor]
        : buttonBgColors.primary;
};

const getColor = (props: ContainerProps): string => {
    return props.bgColor
        ? buttonTextColors[props.bgColor]
        : buttonTextColors.primary;
};

export const Container = styled.button<ContainerProps>`
    border: 0;
    border-radius: 10px;
    font-weight: 500;
    height: 48px;
    /* margin-top: 16px; */
    padding: 0 16px;
    transition: background-color 0.2s;
    width: 100%;
    ${(props) =>
        css`
            background: ${getBgColor(props)};
            color: ${getColor(props)};
            border-radius: ${props.rounded ? "30px" : "10px"};
        `}
    &:hover {
        ${(props) =>
            css`
                background: ${shade(0.2, getBgColor(props))};
            `}
    }
`;
