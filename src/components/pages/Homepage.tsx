import React, { FC } from "react";

const Homepage: FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">
          Welcome to Mainteny
        </h1>
        <h2 className="has-text-centered">
          This is a React Redux University Portal used by admin's to assign
          courses to students.
          <br /> Designed by David Zagi
        </h2>
      </div>
    </section>
  );
};

export default Homepage;
