import { useEffect, useState } from "react";
import axios from "./api/axios";
import { setAccessToken } from "./utils/tokenManager";
import Router from "./router/Router";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post("/refresh_access_token", {}, { withCredentials: true });

        const token = res.data?.jwt_token;
        if (token) {
          setAccessToken(token);
        }
      } catch (err) {
        console.warn("Could not refresh access token:", err);
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Router />;
};

export default App;
