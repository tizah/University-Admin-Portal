import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import { Student } from "../../store/types";
import { Courses } from "../../utils/coursesList";
import { CapitalizeFirstLetter, FilterCourses } from "../../utils/util";

interface CourseListProps {
  label: string;
  value: string;
}

const Example: React.FC<{
  onChange: (selected: any, c: []) => any;
  student: Student | undefined;
}> = ({ onChange, student }) => {
  const options = Courses;

  const [selected, setSelected] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<CourseListProps[]>([]);
  const [tag, setTag] = useState("");
  const [studentId, setStudentId] = useState<string>();

  const tagList = [
    "is-success",
    "is-warning",
    "is-danger",
    "is-dark",
    "is-primary",
  ];

  useEffect(() => {
    const studentCourses = student?.courses.map(
      (x: CourseListProps) => x.value
    );
    const courseOptions = options.map((x) => x.value);
    const filteredCourses = FilterCourses(courseOptions, studentCourses!);
    const result = filteredCourses.map((x: any) => {
      const capital = CapitalizeFirstLetter(x);
      return {
        value: x,
        label: capital,
      } as CourseListProps;
    });
    setStudentId(student?.studentId);
    setSelectedOptions(result);
  }, [options, student?.studentId, student?.courses]);

  const changeTagHandler = () => {
    let randomElement = tagList[Math.floor(Math.random() * tagList.length)];
    setTag(randomElement);
  };

  const handleCourseChange = (courses: any) => {
    setSelected(courses);
    onChange(studentId, courses);
  };

  return (
    <div>
      <h1>
        Selected Courses for {student?.firstName} {student?.lastName}
      </h1>
      {selected.map((value: CourseListProps, index: number) => (
        <span key={index} className={`tag ${tag} is-large space`}>
          <p onClick={changeTagHandler}>{value.label}</p>
        </span>
      ))}
      <MultiSelect
        options={student?.courses.length! > 0 ? selectedOptions : options}
        value={selected}
        onChange={handleCourseChange}
        labelledBy={"Select"}
      />
    </div>
  );
};

export default Example;
