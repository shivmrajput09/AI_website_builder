import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import Home from "./pages/Home";
import PricingPage from "./pages/PricingPage"; // Path apne hisaab se adjust kar lena
import Dashboard from "./pages/Dashboard";



// [Zero-Knowledge Explanation]
// Yeh ek temporary (dummy) component hai. 
// Kyunki Home page par click karne se app '/pricing' par ja rahi thi aur route missing tha,
// isliye jab tak asli Pricing page nahi banta, tab tak error se bachne ke liye yeh text dikhega.
const DummyPricing = () => (
  <div className="flex items-center justify-center min-h-screen bg-canvas text-white text-2xl">
    Pricing Page Coming Soon... 🚀
  </div>
);

export default function App() {
  // [Zero-Knowledge Explanation]
  // App khulte hi chupke se backend par jaakar check karta hai ki user ka token valid hai ya nahi.
  // ⚠️ DHYAN RAHE: Agar tumhara Node.js (backend) server band hua, 
  // toh yahi function "net::ERR_CONNECTION_REFUSED :5000" wala error fenkega.
  useGetCurrentUser();
  const { loading } = useSelector((state) => state.user);

  // [Change Effect]
  // Server se jawab aane tak screen blank rakho.
  // Agar isko hata doge, toh user ko aadhe second ke liye "Login" button dikhega aur fir achanak "Profile/Dashboard" aa jayega. Is UI flickering ko rokne ke liye yeh line zaroori hai.
  if (loading) return <div className="min-h-screen bg-canvas" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* [Change Effect]
            Yeh naya route humne khol diya hai. Ab agar url mein /pricing type hoga 
            ya button dabeaga, toh app crash hone ki jagah DummyPricing render karegi. 
            Jab naya page ban jaye, toh DummyPricing hata kar <PricingPage /> laga dena. */}
{/* Ab dummy ki jagah asli Premium UI chalega */}
<Route path="/pricing" element={<PricingPage />} /> 
<Route path="/dashboard" element={<Dashboard />} />       
        {/* Aage ke phases mein yahan aayenge:
        <Route path="/dashboard" element={<Dashboard />} />
            /dashboard, /generate, /editor/:id, /site/:slug */}
      </Routes>
    </BrowserRouter>
  );
}