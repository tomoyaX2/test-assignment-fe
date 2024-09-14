import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

const SetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={PasswordSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post("/api/set-password", {
              password: values.password,
            });
            alert("Password set successfully!");
            resetForm();
          } catch (error) {
            console.error("Failed to set password", error);
            alert("Error setting password");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-white text-2xl mb-4">Set a New Password</h2>

            <Input
              label="New Password"
              containerClassName="mb-4"
              type="password"
              name="password"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
            />

            <Button type="submit" isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SetPassword;
