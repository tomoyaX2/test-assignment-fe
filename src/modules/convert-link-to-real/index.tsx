import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { checkLink } from "../../store/links/actions";
import { Link } from "../../store/links/types";
import { BASE_APP_PATH } from "../../shared/constants";

const ConvertLinkToRealAndRedirect = () => {
  const { link } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (link) {
      dispatch(
        checkLink({
          url: link,
          onSuccess: (realLink: Link) => {
            window.location.href = realLink.real_link;
          },
          onReject: () => {
            navigate(BASE_APP_PATH);
          },
        })
      );
    }
  }, [dispatch, link, navigate]);

  return (
    <div className="flex items-center justify-center text-white">
      <p>Redirecting...</p>
    </div>
  );
};

export default ConvertLinkToRealAndRedirect;
