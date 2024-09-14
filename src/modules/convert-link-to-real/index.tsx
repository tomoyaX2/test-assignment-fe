import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConvertLinkToRealAndRedirect = () => {
  const { link } = useParams();

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await axios.get(`/api/get-long-link/${link}`);
        window.location.href = response.data.longLink;
      } catch (error) {
        console.error("Failed to fetch the long link", error);
      }
    };
    fetchLink();
  }, [link]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p>Redirecting...</p>
    </div>
  );
};

export default ConvertLinkToRealAndRedirect;
