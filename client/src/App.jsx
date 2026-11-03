import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import Home from "./pages/Home";

export default function App() {
  // App khulte hi check karo ki user pehle se logged-in hai ya nahi
  useGetCurrentUser();
  const { loading } = useSelector((state) => state.user);

  // Server se jawab aane tak blank rakho, taaki login button chamak na jaye
  if (loading) return <div className="min-h-screen bg-canvas" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aage ke phases mein yahan aayenge:
            /dashboard, /generate, /editor/:id, /pricing, /site/:slug */}
      </Routes>
    </BrowserRouter>
  );
}