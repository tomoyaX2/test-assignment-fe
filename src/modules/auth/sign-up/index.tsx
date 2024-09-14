import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

// Validation schema for Sign Up
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpForm = () => {
  const onSubmit = () => {};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="test@test.com"
              label="Email"
            />
            <Input
              type="password"
              placeholder="********"
              name="password"
              label="Password"
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="********"
            />

            <Button
              type="submit"
              buttonText="Sign Up"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
