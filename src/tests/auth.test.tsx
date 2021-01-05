import { cleanup, waitFor } from "@testing-library/react";
import {
  User,
  SignUpData,
  SignInData,
  SET_ERROR,
  SIGN_OUT,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
} from "../store/types";
import {
  signup,
  signin,
  signout,
  sendPasswordResetEmail,
} from "../store/actions/authActions";
import FirestoreMock from "./fireStoreMock.test";
import faker from "faker";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { setError, fakeUsersInDb } from "./mockFunctions";

import "@testing-library/jest-dom/extend-expect";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

afterAll(cleanup);
describe("Testing Authentication", () => {
  ///initial test

  const signupWithDuplicateVariables: SignUpData = {
    firstName: "jon",

    email: "davidzagi93@gmail.com",
    password: "123456",
  };

  const signInDataValues: SignInData = {
    email: "davidzagi93@gmail.com",
    password: "123456",
  };

  const signupDataVariables: SignUpData = {
    firstName: faker.name.firstName(),

    email: faker.internet.email(),
    password: "123456",
  };

  const userData: User = {
    email: "jon.doe@email.com",
    firstName: "jon",
    role: "Admin",
    id: "123456789",
    createdAt: "1/January/2021 1:30 PM",
  };

  //mocking the signup function

  it("should return error", () => {
    const store = mockStore({});
    // const userExist = (signupUserData: SignUpData) => {
    //   return fakeUsersInDb.some((user) => {
    //     return user.email === signupUserData.email;
    //   });
    // };

    return store
      .dispatch<any>(signup(signupWithDuplicateVariables, () => {}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(setError());
      });
  });

  it("should create user and send Email", () => {
    const store = mockStore({});
    return store
      .dispatch<any>(signup(signupDataVariables, () => {}))
      .then(async () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({ type: "NEED_VERIFICATION" });
      });
  });

  it("should signout", () => {
    const store = mockStore({});
    return store.dispatch<any>(signout()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: SET_LOADING,
        payload: true,
      });

      expect(actions[1]).toEqual({ type: SIGN_OUT });
    });
  });

  ///code can be commented out when test needs to be run

  // it("should send password  reset", () => {
  //   const msg = "rest password send";
  //   const email = "davidzagi93@gmail.com";
  //   const store = mockStore({});
  //   return store.dispatch<any>(sendPasswordResetEmail(email, msg)).then(() => {
  //     const actions = store.getActions();

  //     expect(actions[0]).toEqual({
  //       type: SET_SUCCESS,
  //       payload: msg,
  //     });
  //   });
  // });

  it("should error out on sending password rest", () => {
    const msg = "rest password send";
    const email = "test@test.com";
    const store = mockStore({});
    return store.dispatch<any>(sendPasswordResetEmail(email, msg)).then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: SET_ERROR,
        payload:
          "There is no user record corresponding to this identifier. The user may have been deleted.",
      });
    });
  });

  it("should signin user", () => {
    const store = mockStore({});
    return store.dispatch<any>(signin(signInDataValues, () => {})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: SET_USER,
        payload: {
          createdAt: "",
          email: signInDataValues.email,
          firstName: "",
          id: "",
          role: "Admin",
        },
      });
    });
  });
});
