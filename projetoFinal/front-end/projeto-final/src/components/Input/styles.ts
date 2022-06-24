import { shade } from "polished";
import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    /* background: transparent; */
    padding: 0.75rem 0.25rem;
    width: 100%;
    border-bottom: 2px solid #ece9f4;
    color: #666360;
    display: flex;
    align-items: center;
    transition: border-color 0.3s ease-in-out;
    & + div {
        margin-top: 8px;
    }
    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}
    ${(props) =>
        props.isFocused &&
        css`
            color: #4e3885;
            border-color: #4e3885;
        `}
  ${(props) =>
        props.isFilled &&
        css`
            color: #4e3885;
        `}
  input {
        flex: 1;
        background: transparent;
        border: 0;
        color: ${shade(0.7, "#9498a4")};
        &::placeholder {
            color: #9498a4;
        }
    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`;
