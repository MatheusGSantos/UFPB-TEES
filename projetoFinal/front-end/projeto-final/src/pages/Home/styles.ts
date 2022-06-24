import styled, { keyframes } from "styled-components";

const ModalAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    width: 100%;
    height: 100vh;

    nav {
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        background-color: #26353e;
        padding: 0.5rem 0;

        #authenticated-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            cursor: pointer;
            border: 2px solid #22b68c;
            padding: 4px 0.5rem;
            border-radius: 4px;
            transition: all 0.1s ease-in-out;

            &:hover {
                background-color: #22b68c;
                h3 {
                    color: #fff;
                }

                #status-indicator {
                    border: 1px solid #fff;
                }
            }

            h3 {
                color: #c2c6d3;
                font-size: 14px;
            }

            #status-indicator {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #6f6f6f;
                margin-left: 5px;
            }

            .authenticated {
                background-color: #1ec100 !important;
            }
        }
    }

    .modal-wrapper {
        width: 100%;
        max-width: 500px;
        background-color: #ffff;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        border-radius: 5px;

        animation: ${ModalAnimation} 0.3s ease-in-out;

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h1 {
                margin-bottom: 2rem;
                font-weight: 700;
            }
        }
    }

    .modal-header {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        svg {
            cursor: pointer;

            path {
                stroke: #666568;
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
        height: calc(50vh - 3rem);
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
                box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);

                input {
                    background-color: transparent;
                    border: none;
                    outline: none;
                    flex: 1;
                }
            }

            #search-outcome {
                border-radius: 5px;
                width: 100%;
                max-width: 540px;
                flex: 1;
                overflow-y: scroll;
                display: flex;
                flex-direction: column;
                gap: 1rem;

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

                .user-wrapper {
                    display: flex;
                    flex-direction: column;
                    border-radius: 10px;
                    padding: 1rem 1rem;
                    gap: 0.5rem;
                    margin-right: 5px;
                    background-color: #fff;
                    box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);

                    .id{
                        color: #666568;
                    }
                    .info{
                        color: #161616;
                    }

                    &:hover {
                        background-color: #e4e4e4;
                    }
                    }
            }

            .form-registration {
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
                    box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);
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
