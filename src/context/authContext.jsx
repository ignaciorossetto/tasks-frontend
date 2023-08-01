import { createContext,  useEffect, useReducer, useContext } from "react";

export const UserContext = createContext()

const AuthTypes = {
    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT_START: "LOGOUT_START",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_ERROR: "LOGOUT_ERROR"
}

const INITIAL_LOGIN_STATE = {
    user: JSON.parse(localStorage.getItem('taskUSer' || null)),
    isLoading: false,
    error: null,
  }

const authReducer = (state, action) => {
switch (action.type) {
    case AuthTypes.LOGIN_START:
    return { user: null, isLoading: true, error: null };
    case AuthTypes.LOGIN_SUCCESS:
    return {isLoading: false, user: action.payload, error: null };
    case AuthTypes.LOGIN_ERROR:
    return { user: null, isLoading: false, error: action.payload };
    case AuthTypes.LOGOUT_START:
    return {isLoading: true, user: null, error: null };
    case AuthTypes.LOGOUT_SUCCESS:
    return {isLoading: false, user: null, error: null };
    case AuthTypes.LOGOUT_ERROR:
    return { isLoading: false, user: null, error: action.payload };
    default:
    return INITIAL_LOGIN_STATE;
}
}

const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_LOGIN_STATE);
    
    useEffect(()=>{
        localStorage.setItem("taskUSer", JSON.stringify(state.user))
        console.log(state.error)
    }, [state.user])



    return <UserContext.Provider value={{...state, dispatch}}>{children}</UserContext.Provider>
}

const useAuth = () => useContext(UserContext);

export { UserContextProvider, useAuth };