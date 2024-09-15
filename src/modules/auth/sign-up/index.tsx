import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useAppDispatch } from "@store/index";
import { signup } from "@store/user/actions";
import { SignUpFormProps, SignUpFormValues } from "./types";
import { useRef } from "react";
import { useClickOutside } from "@shared/hooks/click-outside";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const SignUpForm = ({ closeModal }: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    closeModal();
  });

  const onSubmit = (
    values: { email: string },
    formikHelpers: FormikHelpers<SignUpFormValues>
  ) => {
    dispatch(
      signup({
        email: values.email,
        onSuccess: () => {
          closeModal();
          formikHelpers.setSubmitting(false);
        },
      })
    );
  };

  return (
    <div
      className="absolute bg-gray-900 px-6 py-4 right-8 top-16 rounded-lg w-[350px] z-2"
      ref={ref}
    >
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
              isRequired
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
