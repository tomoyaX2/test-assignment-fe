import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { checkLink } from "../../store/links/actions";
import { Link } from "../../store/links/types";
import { useToast } from "@components/ui/toast/use-toast";
import { BASE_APP_PATH } from "@shared/constants";

const ConvertLinkToRealAndRedirect = () => {
  const { link } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (link) {
      dispatch(
        checkLink({
          url: link,
          onSuccess: (realLink: Link) => {
            window.location.href = realLink.real_link;
          },
          onReject: () => {
            toast({
              title: "Looks like your link expired or is not valid",
              description: "You will be redirected to main page in 2 seconds",
            });
            setTimeout(() => {
              navigate(BASE_APP_PATH);
            }, 2000);
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
