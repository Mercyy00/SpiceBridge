import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("spiceBridgeUser");

        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch {
                localStorage.removeItem("spiceBridgeUser");
                return null;
            }
        }

        return null;
    });

    function login(userData) {
        setUser(userData);
        localStorage.setItem(
            "spiceBridgeUser",
            JSON.stringify(userData)
        );
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("spiceBridgeUser");
    }

    const value = {
        user,
        login,
        logout,
        isLoggedIn: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access authentication
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}