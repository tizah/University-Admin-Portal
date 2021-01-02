import React, { FC, useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { Student } from "../../store/types";
import {
  saveStudentCourses,
  getStudents,
  getStudentById,
} from "../../store/actions/studentAction";

interface CourseListProps {
  student: Student | undefined;
}

interface CourseProp {
  label: string;
  value: string;
}

const CourseList: FC<CourseListProps> = ({ student }) => {
  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();

  const [studentCourseList, setStudentCoursesList] = useState<CourseProp[]>();

  const [isCourseDeleting, setIsCourseDeleting] = useState(false);

  useEffect(() => {
    setStudentCoursesList(undefined);
  }, []);

  const handleOnClick = async (
    //  e: MouseEvent<HTMLAnchorElement>,
    courseLabel: string
  ) => {
    //e.preventDefault();
    setIsCourseDeleting(true);
    const updatedCourse = student?.courses.filter((element: CourseProp) => {
      return element.label != courseLabel;
    });

    const updatedStudentRecord: Student = {
      studentId: student?.studentId!,
      id: student?.studentId!,
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gender: "",
      courses: updatedCourse as [],
    };

    await dispatch(saveStudentCourses(updatedStudentRecord!));
    await dispatch(getStudents());
    setIsCourseDeleting(false);
    console.log({ updatedCourse });
    student!.courses = updatedStudentRecord.courses;
    setStudentCoursesList(updatedStudentRecord.courses);
  };

  const studentCourses =
    studentCourseList !== undefined
      ? studentCourseList.map((course: any, index: number) => {
          {
            console.log({ studentCourseList });
          }
          return (
            <>
              <li key={index}>
                {course.label}

                <button
                  onClick={(e) => handleOnClick(course.label)}
                  className="button is-danger delete is-large"
                  disabled={isCourseDeleting}
                  style={{ marginLeft: "20px" }}
                ></button>
              </li>
            </>
          );
        })
      : student?.courses.map((course: any, index: number) => {
          console.log({ student });
          return (
            <>
              <li key={index}>
                {course.label}

                <button
                  onClick={(e) => handleOnClick(course.label)}
                  className=" button is-danger delete  is-large"
                  disabled={isCourseDeleting}
                  style={{ marginLeft: "20px" }}
                ></button>
              </li>
            </>
          );
        });

  return (
    <div>
      {console.log({ studentCourseList })}
      {student && student.courses.length > 0 ? (
        studentCourses
      ) : (
        <p>No Courses assigned to this student yet</p>
      )}
    </div>
  );
};

export default CourseList;
