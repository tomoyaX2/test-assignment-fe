import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ConvertLinkToShort } from "./modules/convert-link-to-short";
import ConvertLinkToRealAndRedirect from "./modules/convert-link-to-real";
import Dashboard from "./modules/app/dashboard";
import AccountSettings from "./modules/app/account-settings";
import SetPassword from "./modules/auth/set-password";
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./components/providers/theme-provider";
import { useAppDispatch } from "./store";
import { useEffect } from "react";
import { checkUser } from "./store/user/actions";
import ProtectedRoute from "./components/hoc/protected-route";
import { BASE_APP_PATH } from "./shared/constants";
import { Toaster } from "@components/ui/toast/Toaster";

axios.defaults.baseURL = "https://45a2783c86a6.ngrok.app";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser({}));
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path={BASE_APP_PATH} element={<ConvertLinkToShort />} />
            <Route
              path={`${BASE_APP_PATH}/s/:link`}
              element={<ConvertLinkToRealAndRedirect />}
            />
            <Route
              path={`${BASE_APP_PATH}/set-password`}
              element={<SetPassword />}
            />
            <Route element={<ProtectedRoute redirectPath={BASE_APP_PATH} />}>
              <Route
                path={`${BASE_APP_PATH}/app/dashboard`}
                element={<Dashboard />}
              />
              <Route
                path={`${BASE_APP_PATH}/app/account-settings`}
                element={<AccountSettings />}
              />
            </Route>
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
