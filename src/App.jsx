import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Onboarding from "./pages/Onboarding";
import Chat from "./pages/Chat";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route
            path="/chat"
            element={
              <>
                <Navbar />
                <Chat />
              </>
            }
          />
          <Route
            path="/budget"
            element={
              <>
                <Navbar />
                <Budget />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/learn"
            element={
              <>
                <Navbar />
                <Learn />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
