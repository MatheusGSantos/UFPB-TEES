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
                /* background-color: #141414; */
                background-color: #1ec100;
                margin-left: 5px;
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
    min-height: calc(100vh - 3rem);
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 8px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .section-container {
        width: 100%;
        height: 50%;
        display: flex;

        section {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            /* border: 1px solid black; */

            .search-container {
                padding: 0.8rem 1.5rem;
                border-radius: 27px;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                max-width: 500px;
                margin: 2rem 0;

                input {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    flex: 1;
                }
            }

            #search-outcome {
                border: 1px solid #26353e;
                border-radius: 5px;
                width: 100%;
                max-width: 540px;
                flex: 1;
            }

            #form-registration {
                margin-top: 2rem;
                max-width: 500px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            #delete-container {
                width: 100%;
                max-width: 500px;
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: space-between;

                #input-container {
                    margin-top: 2rem;
                    background-color: #fff;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                }
            }

            input {
                width: 100%;
                background-color: transparent;
                border: none;
                outline: none;
            }
        }

        .header {
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: center;
        }
    }
`;
