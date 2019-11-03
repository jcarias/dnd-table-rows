import React from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Button } from "@material-ui/core";

const validate = values => {
  const errors = {};
  if (!values.tester) {
    errors.tester = "Required";
  } else {
    var re = new RegExp(values.regEx);
    if (!re.exec(values.tester)) {
      errors.tester = "Invalid value";
    }
  }

  return errors;
};

const MyForm = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <h2>Simple Default Input</h2>
          <div>
            <Field
              label="Regular expression"
              name="regEx"
              type="text"
              component={TextField}
              placeholder="First Name"
              fullWidth
              margin="normal"
            />
          </div>
          <div>
            <Field
              name="tester"
              label="Test input"
              type="text"
              component={TextField}
              placeholder=""
              fullWidth
              margin="normal"
            />
          </div>

          <Button type="submit" disabled={invalid}>
            Submit
          </Button>
        </form>
      )}
    />
  );
};
export default MyForm;
