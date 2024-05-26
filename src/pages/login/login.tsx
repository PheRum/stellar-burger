import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { LoginUI } from "@ui-pages";
import { useDispatch } from "../../services/store";
import { useSelector } from "react-redux";
import { fetchLoginUser, removeErrorText, selectErrorText, selectLoading } from "../../slices/stellarBurgerSlice";
import { Preloader } from "@ui";

export const Login: FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const error = useSelector(selectErrorText);
    const isLoading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(removeErrorText());
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(removeErrorText());
        dispatch(fetchLoginUser({ email, password }));
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <LoginUI
            errorText={error}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
};
