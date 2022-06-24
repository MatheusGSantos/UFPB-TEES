import styled from 'styled-components';

interface IContainerProps {
  visible: boolean;
}

export const Container = styled.div<IContainerProps>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);

    ${props => !props.visible && `
      display: none;
    `}

`;