import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Tooltip from "../../components/Tooltip";
import getValidationErrors from "../../utils/getValidationErrors";

import { FaSearch } from "react-icons/fa";
import { FiHelpCircle, FiLock, FiMail, FiUser } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { HiOutlineIdentification } from "react-icons/hi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { Container, Content } from "./styles";

interface CreateUserFormData {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserFormData {
    id: string;
    name: string;
    email: string;
}

interface LoginFormData {
    email: string;
    password: string;
    stayLogged: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

const Home: React.FC = () => {
    const createUserFormRef = useRef<FormHandles>(null);
    const updateUserFormRef = useRef<FormHandles>(null);
    const loginFormRef = useRef<FormHandles>(null);

    const { signIn, user } = useAuth();

    const [searchInputValue, setSearchInputValue] = useState("");
    const [idInputValue, setIdInputValue] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    const handleSubmitSearch = async () => {
        if (!searchInputValue.length) {
            console.info("Search input is empty");
            try {
                const response = await api.get("/users");
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.info("Searching for user");
            try {
                const response = await api.get(
                    `/users?email=${searchInputValue}`
                );
                setUsers([response.data]);
            } catch (err) {
                console.log(err);
            }
            setSearchInputValue("");
        }
    }

    const handleCreateUserSubmit = useCallback(
        async (data: CreateUserFormData) => {
            try {
                createUserFormRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required("Nome obrigatório"),
                    email: Yup.string()
                        .required("E-mail obrigatório")
                        .email("Digite um e-mail válido"),
                    password: Yup.string().min(6, "No mínimo 6 dígitos"),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                toast.promise(api.post("/users", data), {
                    pending: "Submitting...",
                    success: {
                        render: "Usuário criado com sucesso!",
                    },
                    error: {
                        render({ data: error }) {
                            return `Error: ${error?.response?.data?.message}`;
                        },
                    },
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    createUserFormRef.current?.setErrors(errors);
                }
            }
        },
        []
    );

    const handleUpdateUserSubmit = useCallback(
        async (data: UpdateUserFormData) => {
            try {
                updateUserFormRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    id: Yup.string().required("ID obrigatório"),
                    name: Yup.string(),
                    email: Yup.string().email("Digite um e-mail válido"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                toast.promise(
                    api.patch(`/users/${data.id}`, {
                        name: data.name === "" ? undefined : data.name,
                        email: data.email === "" ? undefined : data.email,
                    }),
                    {
                        pending: "Submitting...",
                        success: {
                            render: "Usuário atualizado com sucesso!",
                        },
                        error: {
                            render({ data: error }) {
                                return `Error: ${error?.response?.data?.message}`;
                            },
                        },
                    }
                );
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    updateUserFormRef.current?.setErrors(errors);
                }
            }
        },
        []
    );

    const handleDeleteUser = async () => {
        if (idInputValue) {
            toast.promise(api.delete(`/users/${idInputValue}`), {
                pending: "Submitting...",
                success: {
                    render() {
                        setIdInputValue("");
                        return "Usuário deletado com sucesso!";
                    },
                },
                error: {
                    render({ data: error }) {
                        return `Error: ${error?.response?.data?.message}`;
                    },
                },
            });
        }
    }

    const handleLoginSubmit = useCallback(
        async (data: LoginFormData) => {
            try {
                loginFormRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("E-mail required")
                        .email("Insert a valid e-mail"),
                    password: Yup.string().required("Password required"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                }, () => setModalVisible(false));
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    loginFormRef.current?.setErrors(errors);
                }
            }
        },
        [signIn]
    );

    return (
        <>
            <Container>
                <nav>
                    <div
                        id="authenticated-wrapper"
                        onClick={() => setModalVisible(true)}
                    >
                        <h3>Authenticated</h3>
                        <div
                            id="status-indicator"
                            className={user ? "authenticated" : ""}
                        />
                    </div>
                </nav>
                <Content>
                    <div className="section-container">
                        <section>
                            <div className="header">
                                <h1>Buscar</h1>
                                <Tooltip
                                    title="Buscar um usuário por email. Caso não seja informado, lista todos os usuários."
                                    inverted={true}
                                >
                                    <FiHelpCircle color="#4B3387" size={16} />
                                </Tooltip>
                            </div>

                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={searchInputValue}
                                    onChange={(e) => {
                                        setSearchInputValue(e.target.value);
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmitSearch();
                                        }
                                    }}
                                />
                                <FaSearch
                                    color="#A0A0A0"
                                    onClick={() => handleSubmitSearch()}
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: "10px",
                                    }}
                                />
                            </div>
                            <div id="search-outcome">
                                {users.map((user) => (
                                    <div key={user.id} className="user-wrapper">
                                        <p className="id"><strong>id:</strong> {user.id}</p>
                                        <p className="info"><strong>name:</strong> {user.name}</p>
                                        <p className="info"><strong>email:</strong> {user.email}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="header">
                                <h1>Cadastrar</h1>
                                <Tooltip
                                    title="Cadastrar um novo usuário."
                                    inverted={true}
                                >
                                    <FiHelpCircle color="#4B3387" size={16} />
                                </Tooltip>
                            </div>

                            <Form
                                className="form-registration"
                                ref={createUserFormRef}
                                onSubmit={handleCreateUserSubmit}
                            >
                                <Input
                                    name="name"
                                    placeholder="Nome"
                                    icon={FiUser}
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    icon={FiMail}
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    icon={FiLock}
                                />
                                <Button
                                    style={{ marginTop: "auto" }}
                                    buttonType="confirm"
                                    type="submit"
                                >
                                    Cadastrar
                                </Button>
                            </Form>
                        </section>
                    </div>
                    <div className="section-container">
                        <section>
                            <div className="header">
                                <h1>Atualizar</h1>
                                <Tooltip title="Atualizar um usuário. Deve ser informado o id e pelo menos um atributo que deve ser mudado.">
                                    <FiHelpCircle color="#4B3387" size={16} />
                                </Tooltip>
                            </div>
                            <Form
                                className="form-registration"
                                ref={updateUserFormRef}
                                onSubmit={handleUpdateUserSubmit}
                            >
                                <Input
                                    name="id"
                                    placeholder="Id"
                                    icon={HiOutlineIdentification}
                                />
                                <Input
                                    name="name"
                                    placeholder="Nome"
                                    icon={FiUser}
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    icon={FiMail}
                                />
                                <Button
                                    style={{ marginTop: "auto" }}
                                    type="submit"
                                >
                                    Atualizar
                                </Button>
                            </Form>
                        </section>
                        <section>
                            <div className="header">
                                <h1>Deletar</h1>
                                <Tooltip title="Deletar um usuário pelo id.">
                                    <FiHelpCircle color="#4B3387" size={16} />
                                </Tooltip>
                            </div>
                            <div id="delete-container">
                                <div id="input-container">
                                    <input
                                        type="text"
                                        placeholder="Insira o Id"
                                        value={idInputValue}
                                        onChange={(e) =>
                                            setIdInputValue(e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    style={{ marginTop: "auto" }}
                                    buttonType="danger"
                                    onClick={handleDeleteUser}
                                >
                                    Deletar
                                </Button>
                            </div>
                        </section>
                    </div>
                </Content>
                <Modal visible={modalVisible}>
                    <div className="modal-wrapper">
                        <div className="modal-header">
                            <GrFormClose
                                size={20}
                                onClick={() => setModalVisible(false)}
                            />
                        </div>
                        <Form
                            className="form-registration"
                            ref={loginFormRef}
                            onSubmit={handleLoginSubmit}
                        >
                            <h1>Login</h1>
                            <Input
                                name="email"
                                placeholder="Email"
                                icon={FiMail}
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Senha"
                                icon={FiLock}
                            />
                            <Button style={{ margin: "2rem 0" }} type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </Modal>
            </Container>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                style={{ marginTop: "3rem" }}
            />
        </>
    );
};

export default Home;
