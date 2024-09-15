import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useAppDispatch } from "@store/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SetPasswordValues } from "./types";
import { setPassword } from "@store/user/actions";
import { BASE_APP_PATH } from "@shared/constants";

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords doesn't match")
    .required("Confirm Password is required"),
});

const SetPassword = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (
    values: SetPasswordValues,
    { setSubmitting, resetForm }: FormikHelpers<SetPasswordValues>
  ) => {
    const token = searchParams.get("token");
    navigate(BASE_APP_PATH);

    dispatch(
      setPassword({
        password: values.password,
        token: token ?? "",
        onSuccess: () => {
          navigate(BASE_APP_PATH);
        },
        onReject: () => {
          setSubmitting(false);
          resetForm();
        },
      })
    );
  };
  return (
    <div className="flex items-center justify-center min-w-[400px]  ">
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={PasswordSchema}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-white text-2xl mb-4">Set Password</h2>

            <Input
              label="New Password"
              containerClassName="mb-4"
              type="password"
              placeholder="*********"
              name="password"
              isRequired
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="*********"
              name="confirmPassword"
              isRequired
            />

            <Button
              type="submit"
              buttonText="Submit"
              className="mt-6"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SetPassword;
