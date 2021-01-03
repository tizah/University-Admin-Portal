import { ThunkAction } from "redux-thunk";

import { StudentAction, GET_STUDENT_BY_ID, GET_STUDENTS, Student,SeedStudentAction, SEED_STUDENT,  SAVE_STUDENTCOURSES} from "../types";

import { RootState } from ".."
import firebase from "../../firebase/config";

export const getStudents = (): ThunkAction<void, RootState, null, StudentAction> => {
    return async dispatch  => {
        try {

  const students = await firebase.firestore().collection("students");
    students.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { studentId: doc.id, ...doc.data() };
      });
        if (tempDoc.length > 0) {
                const studentsData = tempDoc as Student[];
                dispatch({
                    type: GET_STUDENTS,
                    payload: studentsData
                });
            }
    });
          
            
        } catch (err) {
            console.log(err)
        }
    }
}

export const getStudentById = (id: string): ThunkAction<void, RootState, null, StudentAction> => {
    return async dispatch => {
        try {
            const student = await firebase.firestore().collection('students').where('id', '==', id).get();
           if (!student.empty) {
               const studentData = student.docs[0];
               const data = studentData.data() as Student
                dispatch({
                    type: GET_STUDENT_BY_ID,
                    payload: data
                });
            }
         
        } catch (err) {
            console.log(err);
        }
    }
}

export const seedStudents = (students: Student[], onError: () => void): ThunkAction<void, RootState, null, SeedStudentAction> => {
    return async dispatch => {
        Array.from(students).forEach(async (student: Student) => {
            try {
                const data: Student = {
                    ...student
                }

                const ref = await firebase.firestore().collection('students').add(data);
                data.id = ref.id;
                
                dispatch({
                    type: SEED_STUDENT,
                    payload: data
                })
            } catch (error) {
                onError();
                console.log(error.message);
            }
        });
    }

}

export const saveStudentCourses = (student: Student): ThunkAction<void, RootState, null, StudentAction> => {
    
    return async dispatch => {
        try {

            console.log({ student })
           
            await firebase.firestore().collection('students').doc(student.studentId).update({ courses: student.courses });

            const studentRecord = await firebase.firestore().collection(student.studentId).get();
            const result = studentRecord.docs[0];
            const studentResult = result.data() as Student;

            
            dispatch({
                type: SAVE_STUDENTCOURSES,
                payload: studentResult
            });
               
        } catch (err) {
        console.log(err.message);

        }
    }
}
    
