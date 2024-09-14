import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const LinkSchema = Yup.object().shape({
  link: Yup.string().url("Invalid URL").required("Link is required"),
});

export const ConvertLinkToShort = () => {
  return (
    <div className="flex items-center justify-center w-[400px]">
      <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl mb-4">Convert Link</h2>
        <Formik
          initialValues={{ link: "" }}
          validationSchema={LinkSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await axios.post("/api/submit-link", { link: values.link });
              alert("Link submitted successfully!");
              resetForm();
            } catch (error) {
              console.error("Error submitting the link", error);
              alert("Failed to submit the link");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Input
                label="Your link"
                type="url"
                name="link"
                placeholder="https://example.com"
              />

              <Button
                type="submit"
                isSubmitting={isSubmitting}
                buttonText="Generate"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
