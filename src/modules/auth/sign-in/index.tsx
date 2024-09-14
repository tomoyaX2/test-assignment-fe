import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInForm = () => {
  const onSubmit = () => {};
  return (
    <div>
      <h2 className="text-xl font-bold  mb-4">Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input
              type="email"
              placeholder="test@test.com"
              name="email"
              label="Email"
            />
            <Input
              type="password"
              placeholder="********"
              name="password"
              label="Password"
            />

            <Button
              type="submit"
              buttonText="Sign In"
              className="!mt-8"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
