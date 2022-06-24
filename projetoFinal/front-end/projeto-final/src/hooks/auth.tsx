import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from "../utils/localStorageUtils";

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials, cb: () => void): Promise<void>;
    signOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = getLocalStorageItem("token");
        const user = getLocalStorageItem("user");

        if (token && user) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signOut = useCallback(() => {
        removeLocalStorageItem("token");
        removeLocalStorageItem("user");

        setData({} as AuthState);
    }, []);

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials, cb: () => void) => {
            const id = toast.loading("Submitting...");
            try {
                const response = await api.post("/sessions", {
                    email,
                    password,
                });

                const { user, token } = response.data;

                setLocalStorageItem("token", token);
                setLocalStorageItem("user", user);

                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                setData({ token, user });
                toast.update(id, {
                    render: "Logged in successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
                cb();
                
            } catch (err: any) {
                toast.update(id, {
                    render: `Error: ${err?.response?.data?.message}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
            }
        },
        []
    );

    const updateUser = useCallback(
        (user: User) => {
            setLocalStorageItem("user", user);

            setData({
                token: data.token,
                user,
            });
        },
        [setData, data.token]
    );

    return (
        <AuthContext.Provider
            value={useMemo(
                () => ({ user: data.user, signIn, signOut, updateUser }),
                [data.user, signIn, signOut, updateUser]
            )}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
