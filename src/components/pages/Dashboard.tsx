import React, { FC, useEffect, useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import StudentJsonData from "../../STUDENT_MOCK_DATA.json";

import Button from "../UI/Button";

import Message from "../UI/Message";
import { setSuccess } from "../../store/actions/authActions";
import { seedStudents, getStudents } from "../../store/actions/studentAction";
import { RootState } from "../../store";

import Pagination from "../sections/Pagination";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );

  const { error, students } = useSelector((state: RootState) => state.student);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const handleSeeding = () => {
    setLoading(true);
    dispatch(seedStudents(StudentJsonData as any, () => setLoading(false)));
    dispatch(getStudents());
  };

  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Please verify your email address" />
        )}{" "}
        {(students as any).length > 0 ? (
          <article className="message is-link">
            <div className="message-header">
              <p>
                <h3 className="is-size-1">Welcome {user?.firstName}</h3>
              </p>
            </div>
            <div className="message-body">Here are the list of Students</div>
          </article>
        ) : null}
        {(students as any).length <= 0 ? (
          <>
            <Message
              type="info"
              msg="You dont have any student in the database, Please Click on the Seed button to seed students into the database"
            />
            <Button
              text={loading ? `Seeding Students` : "Seed"}
              className="is-primary  mt-5"
              disabled={loading}
              onClick={() => handleSeeding()}
            />
          </>
        ) : (
          <div>
            <Pagination studentsArray={students} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
