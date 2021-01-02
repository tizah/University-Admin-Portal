export const SET_USER = "SET_USER";
export const SIGN_OUT = "SIGN_OUT";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const NEED_VERIFICATION = "NEED_VERIFICATION";
export const SET_SUCCESS = "SET_SUCCESS";


export const SEED_STUDENT = "SEED_STUDENT";
export const SEED_ERROR = "SEED_ERROR"

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_STUDENT_BY_ID = "GET_STUDENT_BY_ID";
export const SAVE_STUDENTCOURSES = "SAVE_STUDENTCOURSES";
export const DELETE_COURSE = "DELETE_COURSE";



export interface Student {
    studentId: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    gender: string;
    courses: [];
}

export interface User{
    firstName: string;
    email: string;
    id: string;
    role: string;
    createdAt: any;
}


export interface SeedStudentState{
    students: Student[] | [];
    seeded: boolean;
    error: string;
    success: string;

}

export interface StudentState{
    students: Student[] | [];
      error: string;
    success: string;
}

interface GetStudentsAction{
    type: typeof GET_STUDENTS;
    payload: Student[];
}

interface GetStudentByIdAction{
    type: typeof GET_STUDENT_BY_ID;
    payload: Student;
}

interface SaveStudentCoursesAction{
    type: typeof SAVE_STUDENTCOURSES;
    payload: Student;
}

interface DeleteCourseAction {
    type: typeof DELETE_COURSE;
}

interface SetStudentAction{
    type: typeof SEED_STUDENT;
    payload: Student;
}



export interface AuthState{
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string
}

export interface SignUpData {
    firstName: string;
    email: string;
    password: string;
}

export interface SignInData{
    email: string;
    password: string;
}

interface SetUserAction{
    type: typeof SET_USER;
    payload: User;
}

interface SetLoadingAction{
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SeedErrorAction{
    type: typeof SEED_ERROR;
    payload: string;
}

interface NeedVerificationAction{
    type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction;

export type SeedStudentAction = SetStudentAction | SeedErrorAction;

export type StudentAction = GetStudentsAction | GetStudentByIdAction | SaveStudentCoursesAction | DeleteCourseAction;
