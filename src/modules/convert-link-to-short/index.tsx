import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  checkLink,
  convertLinkToShortAuth,
  convertLinkToShortFree,
} from "../../store/links/actions";
import { ConvertLinkToShortValues } from "./types";
import { useEffect, useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { GENERATED_FREE_LINK_KEY } from "../../shared/constants";
import { Link } from "../../store/links/types";
import { Select } from "@components/ui/select";

const LinkSchema = Yup.object().shape({
  url: Yup.string().url("Invalid URL").required("Link is required"),
  expirationTime: Yup.number(),
});

export const ConvertLinkToShort = () => {
  const dispatch = useAppDispatch();
  const [link, setShortLink] = useState<Link | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    const savedLink = localStorage.getItem(GENERATED_FREE_LINK_KEY);
    if (savedLink) {
      dispatch(
        checkLink({
          url: savedLink,
          onSuccess: (data) => {
            if (data) {
              setShortLink(data);
            } else {
              localStorage.removeItem(GENERATED_FREE_LINK_KEY);
            }
          },
          onReject: () => {
            localStorage.removeItem(GENERATED_FREE_LINK_KEY);
          },
        })
      );
    }
  }, [dispatch]);

  const submitConvertLinkForm = (
    values: ConvertLinkToShortValues,
    { setSubmitting, resetForm }: FormikHelpers<ConvertLinkToShortValues>
  ) => {
    if (user) {
      dispatch(
        convertLinkToShortAuth({
          url: values.url,
          expirationTime: parseInt(values.expirationTime || "15"),
          onSuccess: (link: Link) => {
            setShortLink(link);
            setSubmitting(false);
            resetForm();
          },
        })
      );
    } else {
      dispatch(
        convertLinkToShortFree({
          url: values.url,
          onSuccess: (link: Link) => {
            setShortLink(link);
            setSubmitting(false);
            resetForm();
          },
        })
      );
    }
  };

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link.short_link).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-w-[400px]  ">
      <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full  ">
        <h2 className="text-white text-2xl mb-4">Convert Link</h2>
        <Formik
          initialValues={{ url: "" }}
          validationSchema={LinkSchema}
          onSubmit={submitConvertLinkForm}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Input
                label="Your link"
                type="url"
                name="url"
                placeholder="https://example.com"
              />
              {!!user && (
                <Select
                  name="expirationTime"
                  label="Expiration Time"
                  options={[
                    { label: "15 minutes", value: 15 },
                    { label: "30 minutes", value: 30 },
                    { label: "1 hour", value: 60 },
                  ]}
                />
              )}

              <Button
                type="submit"
                isSubmitting={isSubmitting}
                buttonText="Generate"
              />
            </Form>
          )}
        </Formik>
        {link?.id && (
          <div className="p-4 rounded-md flex flex-col items-center justify-between mt-4">
            <span className="w-full text-left italic">
              <a
                href={link.short_link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline italic"
              >
                {link.real_link}
              </a>{" "}
              was converted to
            </span>
            <div className="flex mt-4 w-full">
              <a
                href={link.short_link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline italic"
              >
                {link.short_link}
              </a>
              <button
                onClick={copyToClipboard}
                className="ml-4 hover:text-gray-100 flex items-center"
              >
                {isCopied ? (
                  <>
                    <CheckIcon className="h-4 w-4 mr-1 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="h-4 w-4 mr-1" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
