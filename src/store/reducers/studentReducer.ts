
import { StudentAction, StudentState, GET_STUDENT_BY_ID, GET_STUDENTS, SAVE_STUDENTCOURSES, DELETE_COURSE  } from "../types"

const initiatlState: StudentState = {
    students: [],
    error: "",
    success: ""
}


const StudentReducer = (state = initiatlState, action: StudentAction) => {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload,
            }
        case GET_STUDENT_BY_ID: 
            return {
                ...state,
                student: action.payload,
            }
        case SAVE_STUDENTCOURSES: 
            return {
                ...state,
            }
        case DELETE_COURSE:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default StudentReducer;