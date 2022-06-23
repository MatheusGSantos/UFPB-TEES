import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;

    nav {
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        background-color: #26353e;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;

            h3 {
                color: #c2c6d3;
                font-size: 14px;
            }

            #status-indicator {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #141414;
                margin-left: 2px;
            }
        }
    }
`;

export const Content = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #f5f5f5;
    flex: 1;

    .section-container {
        width: 100%;
        height: 50%;
        display: flex;

        section {
            width: 50%;
            height: 100%;
        }
    }
`;
