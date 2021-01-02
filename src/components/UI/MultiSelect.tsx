import React, { useState, useEffect, useCallback } from "react";
import MultiSelect from "react-multi-select-component";
import { Student } from "../../store/types";
import { Courses } from "../../utils/coursesList";
import CourseList from "../sections/CourseList";
import { CapitalizeFirstLetter, FilterCourses } from "../../utils/util";

interface CourseList {
  label: string;
  value: string;
}

interface TagColor {
  name: string;
}

const Example: React.FC<{
  onChange: (selected: any, c: []) => any;
  student: Student | undefined;
}> = ({ onChange, student }) => {
  const options = Courses;

  const [selected, setSelected] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<CourseList[]>([]);
  const [tag, setTag] = useState("");

  const tagList = [
    "is-success",
    "is-warning",
    "is-danger",
    "is-dark",
    "is-primary",
  ];

  useEffect(() => {
    const studentCourses = student?.courses.map((x: CourseList) => x.value);
    const courseOptions = options.map((x) => x.value);
    const filteredCourses = FilterCourses(courseOptions, studentCourses!);
    const result = filteredCourses.map((x: any) => {
      const capital = CapitalizeFirstLetter(x);
      return {
        value: x,
        label: capital,
      } as CourseList;
    });
    setSelectedOptions(result);
  }, []);

  const changeTagHandler = () => {
    let randomElement = tagList[Math.floor(Math.random() * tagList.length)];
    setTag(randomElement);
  };

  const handleCourseChange = useCallback(
    (courses: any) => {
      setSelected(courses);
      onChange("", courses);
    },
    [setSelected]
  );

  return (
    <div>
      <h1>Selected Courses</h1>
      {selected.map((value: CourseList, index: number) => (
        <span key={index} className={`tag ${tag} is-large space`}>
          <p onClick={changeTagHandler}>{value.label}</p>
        </span>
      ))}
      {console.log("multi select render")}
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
