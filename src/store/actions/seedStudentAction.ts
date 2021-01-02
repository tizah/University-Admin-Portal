import { ThunkAction } from "redux-thunk";

import { Student, SeedStudentAction, SeedStudentState, SEED_STUDENT, SEED_ERROR } from "../types"

//import seeder from "../../utils/seeder";

import { RootState } from "..";
import firebase from "../../firebase/config";


export const seedStudent = (students: Student[]): ThunkAction<void, RootState, null, SeedStudentAction> => {
    return async dispatch => {
        Array.from(students).forEach(async (student: Student) => {
            try {
                const data: Student = {
                    ...student
                }

                const ref = await firebase.firestore().collection('/students').add(data);
                data.id = ref.id;
                
                dispatch({
                    type: SEED_STUDENT,
                    payload: data
                })
            } catch (error) {
                console.log(error);
            }
        });
    }

}