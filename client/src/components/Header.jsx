import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Zap } from "lucide-react";
import { auth, provider } from "../firebase";
import { setUserData } from "../redux/userSlice";

const API = import.meta.env.VITE_API_URL;

// Brand ka naam ek hi jagah: baad mein badalna ho to sirf yahan.
export const BRAND = "SiteForge";

export default function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  // ---------- LOGIN (Google popup -> backend -> Redux) ----------
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const { data } = await axios.post(
        `${API}/api/auth/google`,
        { name: displayName, email, avatar: photoURL },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- LOGOUT ----------
  const handleLogout = async () => {
    await axios.get(`${API}/api/auth/logout`, { withCredentials: true });
    dispatch(setUserData(null));
  };

  // NavLink active hone par lime pill, warna halka hover
  const linkClass = ({ isActive }) =>
    `rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
      isActive ? "bg-lime text-forest-800" : "text-forest-800 hover:bg-forest-800/5"
    }`;

  return (
    <header className="flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
      {/* Logo block */}
      <Link to="/" className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-800 text-lime">
          <Zap size={20} strokeWidth={2.5} />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight">{BRAND}</span>
      </Link>

      {/* Center pill nav (mobile par hidden) */}
      <nav className="hidden items-center rounded-full bg-paper p-1.5 ring-1 ring-forest-800/10 md:flex">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/pricing" className={linkClass}>Pricing</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      </nav>

      {/* Right side: user ya login button */}
      {userData ? (
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-lime px-4 py-2 text-sm font-semibold">
            {userData.credits} credits
          </span>
          <img
            src={userData.avatar}
            alt={userData.name}
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-forest-800/10"
          />
          <button
            onClick={handleLogout}
            className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-forest-800/5 sm:block"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-full bg-forest-800 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-950"
        >
          Log in with Google
        </button>
      )}
    </header>
  );
}