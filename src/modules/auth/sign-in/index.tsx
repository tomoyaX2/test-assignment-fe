import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useRef } from "react";
import { useClickOutside } from "@shared/hooks/click-outside";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInForm = ({
  setSignInOpen,
}: {
  setSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setSignInOpen(false);
  });

  const onSubmit = () => {};
  return (
    <div
      className="absolute bg-gray-900 px-6 py-4 right-12 top-16 rounded-lg w-[350px] z-2"
      ref={ref}
    >
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
              isRequired
              label="Email"
            />
            <Input
              type="password"
              placeholder="********"
              name="password"
              isRequired
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
