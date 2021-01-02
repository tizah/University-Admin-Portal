import { SeedStudentAction, SeedStudentState, SEED_STUDENT, SEED_ERROR } from "../types";

const initialState: SeedStudentState = {
    students: [],
    seeded: false,
    error: "",
    success: ""
}


const SeedStudentReducer = (state = initialState, action: SeedStudentAction) => {
    switch (action.type) {
        case SEED_STUDENT:
            return {
                ...state,
                student: action.payload,
                seeded: true
            }
        case SEED_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default SeedStudentReducer;