
import { ThunkAction } from "redux-thunk";

import { SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData, SET_ERROR, NEED_VERIFICATION, SET_SUCCESS } from "../store/types";

import { RootState } from "../store";


export const signupMock = (signup:SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => { 
        
    }
}

export const setError = () => {
    return {
        type: SET_ERROR,
        payload: 'The email address is already in use by another account.' || 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.'
    }
}


export const fakeUsersInDb =
    [{
        email: "davidzagi93@gmail.com"
    },
    {
        email: "davidzagi@outlook.com"
    },
    ];