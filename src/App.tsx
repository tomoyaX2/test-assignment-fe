import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ConvertLinkToShort } from "./modules/convert-link-to-short";
import ConvertLinkToRealAndRedirect from "./modules/convert-link-to-real";
import Dashboard from "./modules/app/dashboard";
import AccountSettings from "./modules/app/account-settings";
import SetPassword from "./modules/auth/set-password";
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./components/providers/theme-provider";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/test-assignment-fe"
              element={<ConvertLinkToShort />}
            />
            <Route
              path="/test-assignment-fe/s/:link"
              element={<ConvertLinkToRealAndRedirect />}
            />
            <Route
              path="/test-assignment-fe/set-password"
              element={<SetPassword />}
            />

            {/* Protected Routes */}
            <Route
              path="/test-assignment-fe/app/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/test-assignment-fe/app/account-settings"
              element={<AccountSettings />}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
