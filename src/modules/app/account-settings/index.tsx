import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@store/index";
import {
  changeEmail,
  changePassword,
  checkUser,
  uploadAvatar,
} from "@store/user/actions";
import { UserFormSettingsValues } from "./types";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),
});

const AccountSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userSettings, setUserSettings] = useState<UserFormSettingsValues>({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setUserSettings({
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
    });
    setAvatarUrl(user?.avatar_url || "");
  }, [user]);

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(
        uploadAvatar({
          file,
          onSuccess: () => {
            dispatch(checkUser());
          },
        })
      );
    }
  };

  const handleFormSubmit = async (values: UserFormSettingsValues) => {
    if (values.newPassword && values.oldPassword) {
      dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
    }
    if (values.email !== userSettings.email) {
      dispatch(changeEmail());
    }
  };

  if (loading || !userSettings.email) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-800 min-w-[400px] px-12 py-2 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <Formik
        initialValues={userSettings}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ dirty }) => (
          <Form className="space-y-4">
            <Input label="Email" name="email" autoComplete="off" />
            <Input
              label=" Old Password"
              name="oldPassword"
              autoComplete="off"
              type="password"
              placeholder="******"
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="******"
            />

            <Button disabled={!dirty} type="submit" buttonText="Save Changes" />
          </Form>
        )}
      </Formik>

      <div className="mt-8">
        <label htmlFor="avatar" className="block mb-2">
          Upload New Avatar
        </label>
        <input
          id="avatar"
          name="avatar"
          accept=".png,.jpg"
          type="file"
          onChange={handleAvatarUpload}
          className="w-full px-4 py-2"
        />
      </div>
      {avatarUrl && (
        <div className="mt-4">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
