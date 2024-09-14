import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useAppDispatch } from "../../../store";
import { signup } from "../../../store/user/actions";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (
    values: { email: string },
    formikHelpers: FormikHelpers<{
      email: string;
    }>
  ) => {
    dispatch(
      signup({
        email: values.email,
        onSuccess: () => {
          formikHelpers.setSubmitting(false);
        },
      })
    );

    formikHelpers.setSubmitting(false);
  };

  return (
    <div className="h-[200px]">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <Formik
        initialValues={{ email: "" }}
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

            <Button
              type="submit"
              buttonText="Sign Up"
              className="!mt-8"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
