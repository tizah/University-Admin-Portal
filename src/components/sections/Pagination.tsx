import React, { FC, useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import {
  saveStudentCourses,
  getStudents,
} from "../../store/actions/studentAction";

import { Student } from "../../store/types";
import CoursesModal from "../UI/Modal";
import AddCourseModal from "../UI/AddCourseModal";
import MultiSelect from "../UI/MultiSelect";
import { RootState } from "../../store";
import CourseList from "./CourseList";

interface PageProps {
  studentsArray: Student[];
}

interface SaveCoursesProps {
  studentId: string;
  courses: [];
}

const PaginatedContent: FC<PageProps> = ({ studentsArray }) => {
  const studetListPerPage = 9;
  const [activePage, setCurrentPage] = useState(1);
  const [showViewCoursesModal, setShowViewCoursesModal] = useState(false);
  const [showAddCoursesModal, setShowAddCoursesModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [studentRecord, setStudentRecord] = useState<Student>();
  const [studentCourseRecord, setStudentCourseRecord] = useState<Student>();
  const [studentIdClicked, setStudentId] = useState("");

  const [updatedStudentRecord, setUpdatedStudentRecord] = useState<Student>();
  const [loading, setLoading] = useState<boolean>(false);

  // Logic for displaying current todos
  const indexOfLastStudent = activePage * studetListPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studetListPerPage;
  const currentStudents = studentsArray.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const { students } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();

  const handleSaveCourses = async (studentId: string, coursesList: []) => {
    setCourses(() => coursesList);
    const coureseNumber = studentRecord?.courses;
    const student: Student = {
      studentId: studentIdClicked,
      id: studentId,
      firstName: "",
      lastName: "",
      email: "",
      imageUrl: "",
      gender: "",
      courses: [...coursesList, ...coureseNumber!],
    };
    setUpdatedStudentRecord(student);
  };

  const handleOnSave = async () => {
    setLoading(true);
    await dispatch(saveStudentCourses(updatedStudentRecord!));
    await dispatch(getStudents());
    setLoading(false);
    setShowAddCoursesModal(false);
  };

  const handleClose = () => {
    setShowAddCoursesModal(false);
    setLoading(false);
  };

  const handleShowModal = (
    e: MouseEvent<HTMLAnchorElement>,
    student: Student
  ) => {
    e.preventDefault();
    setShowViewCoursesModal(true);

    setStudentRecord(student);
  };

  const handleShowAddStudentCourseModal = (
    e: MouseEvent<HTMLAnchorElement>,
    student: Student
  ) => {
    e.preventDefault();
    setShowAddCoursesModal(true);
    setStudentCourseRecord(student);
  };
  const handleSetLoading = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  const renderTodos = currentStudents.map((student, index) => {
    return (
      <div
        className="card"
        key={index}
        onClick={() => setStudentId(student.studentId)}
      >
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={student.imageUrl} alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">
                {student.firstName} {student.lastName}
              </p>
              <p className="subtitle is-6">{student.email}</p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          {showViewCoursesModal && (
            <CoursesModal
              title="View Courses"
              onClose={() => setShowViewCoursesModal(false)}
            >
              Courses offered by student
              <div className="content">
                <ol type="1">
                  <CourseList student={studentRecord} />
                </ol>
              </div>
            </CoursesModal>
          )}
          <a
            href="#"
            className="card-footer-item"
            onClick={(e) => handleShowModal(e, student)}
          >
            View Courses
          </a>
          <a
            href="#"
            className="card-footer-item"
            onClick={(e) => handleShowAddStudentCourseModal(e, student)}
          >
            Add Courses
          </a>
          {showAddCoursesModal && (
            <AddCourseModal
              title="Add Courses"
              onClose={() => handleClose()}
              onSave={() => {
                handleOnSave();
              }}
              onClick={(e: MouseEvent<HTMLDivElement>) => handleSetLoading(e)}
              loading={loading}
            >
              {console.log({ loading })}
              <MultiSelect
                onChange={handleSaveCourses}
                student={studentCourseRecord}
              />
            </AddCourseModal>
          )}
        </footer>
      </div>
    );
  });

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="card-container">{renderTodos}</div>

      <nav className="pagination" role="navigation" aria-label="pagination">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={studetListPerPage}
          totalItemsCount={students.length}
          pageRangeDisplayed={studetListPerPage}
          onChange={handlePageChange}
        />
      </nav>
    </>
  );
};

export default PaginatedContent;
