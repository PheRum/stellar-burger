import React, { FC, SyntheticEvent, useEffect } from "react";
import { LoginUI } from "@ui-pages";
import { useDispatch } from "../../services/store";
import { useSelector } from "react-redux";
import { fetchLoginUser, removeErrorText, selectErrorText, selectLoading } from "../../slices/stellarBurgerSlice";
import { Preloader } from "@ui";
import { useForm } from "../../hooks/useForm";

export const Login: FC = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectErrorText);
    const isLoading = useSelector(selectLoading);
    const { values, handleChange } = useForm({
        email: "",
        password: ""
    });

    useEffect(() => {
        dispatch(removeErrorText());
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(removeErrorText());
        dispatch(fetchLoginUser(values));
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <LoginUI
            errorText={error}
            email={values.email}
            setEmail={handleChange}
            password={values.password}
            setPassword={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};
