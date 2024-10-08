import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userID: action.payload.user__id,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
                userID: null,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        userID: localStorage.getItem("userID"),
        token: localStorage.getItem("authToken"),
        isAuthenticated: localStorage.getItem("authToken") ? true : false,
        
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token, userID) => {
            dispatch({ 
                type: ACTIONS.LOGIN, 
                payload:{ token, userID },
            });
            localStorage.setItem("authToken", token);
            localStorage.setItem("userID", userID);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            localStorage.removeItem("authID");
            navigate("/");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };
