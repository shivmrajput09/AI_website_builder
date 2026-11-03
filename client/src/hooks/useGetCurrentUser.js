import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const API = import.meta.env.VITE_API_URL;

// App khulte hi check karta hai ki user pehle se logged-in hai ya nahi
export default function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // withCredentials: true -> cookie (token) request ke saath jati hai
        const { data } = await axios.get(`${API}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(data)); // user mila: Redux mein save
      } catch (error) {
        dispatch(setUserData(null)); // 401: matlab logged-out
      }
    };

    fetchUser();
  }, [dispatch]);
}