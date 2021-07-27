
import React from "react";

import SecureStorage from "../services/secureStorage";
import AuthService from "../services/auth";
import secureStorage from "../services/secureStorage";

const AuthContext = React.createContext();

const authReducer = (prevState, action) => {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case "SIGN_IN":
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
        case "SIGN_OUT":
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
    });

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
           
            secureStorage.getValue("token")
                .then((res) => {
                    
                    dispatch({ type: "RESTORE_TOKEN", token: res });
                    
                console.log('restoring token', res);
                })
                .catch((err) => {
                    // loggedIn = false;
                    console.log(err);
                });
 
        };

        bootstrapAsync();

        return function cleanup() {
          };
    }, []);

    const authContext = 
        // React.useMemo(() => (
            {
            state: state,
            signIn: async (data) => new Promise((resolve, reject) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                AuthService.login(data)
                    .then((res) => {
                        console.log('res', res);
                        SecureStorage.storeValue("token", res.data.token)
                            .then((done) => {

                                dispatch({
                                    type: "SIGN_IN",
                                    token: res.data.token,
                                });

                                resolve(res);
                            })
                            .catch((err) => {
                                console.log("err", err)
                                reject(err);
                            });
                        
                    })
                    .catch((err) => {
                        console.log("login", err);
                        reject(err);
                    });
            }),
            signOut: () => {
                return SecureStorage.storeValue("token", "").then((res) => {
                    //navigate refresh
                    dispatch({ type: "SIGN_OUT" });
                });
            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                return AuthService.register(data)
                    .then((res) => {
                        SecureStorage.storeValue("token", res.data.token)
                            .then((done) => {

                                dispatch({
                                    type: "SIGN_IN",
                                    token: res.data.token,
                                });
                            })
                            .catch((err) => {
                                return err;
                                console.log("err", err)
                            });
                    })
                    .catch((err) => {
                        return err;
                    });

                // dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
            },
            }
        // ), [state]);

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};

const Consumer = AuthContext.Consumer;  
export { AuthProvider, AuthContext };

// I make this default since it will probably be exported most often.
export default Consumer;