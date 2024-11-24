import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

const App = () => {
  return (
    <div>
      <h1>React Form Handling</h1>
      <div>
        <h2>Controlled Components</h2>
        <RegistrationForm />
      </div>
      <hr />
      <div>
        <h2>Formik Form</h2>
        <FormikForm />
      </div>
    </div>
  );
};

export default App;
