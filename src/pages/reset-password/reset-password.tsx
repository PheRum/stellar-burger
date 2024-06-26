import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPasswordApi } from "@api";
import { ResetPasswordUI } from "@ui-pages";
import { useForm } from "../../hooks/useForm";

export const ResetPassword: FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<Error | null>(null);

    const { values, handleChange } = useForm({
        token: "",
        password: "",
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        /*
      Здесь допускается не использовать redux для
      выполнения запроса
    */
        setError(null);
        resetPasswordApi(values)
            .then(() => {
                localStorage.removeItem("resetPassword");
                navigate("/login");
            })
            .catch((err) => setError(err));
    };

    useEffect(() => {
        if (!localStorage.getItem("resetPassword")) {
            navigate("/forgot-password", { replace: true });
        }
    }, [navigate]);

    return (
        <ResetPasswordUI
            errorText={error?.message}
            password={values.password}
            token={values.token}
            setPassword={handleChange}
            setToken={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};
