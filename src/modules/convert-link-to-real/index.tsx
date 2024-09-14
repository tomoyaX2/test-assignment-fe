import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { checkLink } from "../../store/links/actions";
import { Link } from "../../store/links/types";

const ConvertLinkToRealAndRedirect = () => {
  const { link } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (link) {
      dispatch(
        checkLink({
          url: link,
          onSuccess: (realLink: Link) => {
            window.location.href = realLink.real_link;
          },
        })
      );
    }
  }, [dispatch, link]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p>Redirecting...</p>
    </div>
  );
};

export default ConvertLinkToRealAndRedirect;
