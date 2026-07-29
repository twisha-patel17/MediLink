import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

import { useGoogleLogin } from "../../hooks/useAuth";

export const GoogleLoginButton = () => {

    const { mutate } = useGoogleLogin();

    const handleSuccess = (response) => {

        mutate(
            response.credential
        );

    };

    const handleError = () => {

        toast.error(
            "Google Login Failed."
        );

    };

    return (

        <div className="mt-5 flex justify-center">

            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />

        </div>

    );

};