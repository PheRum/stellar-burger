import { FC, SyntheticEvent, useEffect, useState } from "react";
import { RegisterUI } from "@ui-pages";
import { Preloader } from "@ui";
import {
    fetchRegisterUser,
    getUserThunk,
    removeErrorText,
    selectLoading,
    selectErrorText
} from "../../slices/stellarBurgerSlice";
import { useDispatch, useSelector } from "../../services/store";

export const Register: FC = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectErrorText);

    useEffect(() => {
        dispatch(removeErrorText());
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(
            fetchRegisterUser({
                name: userName,
                password: password,
                email: email
            })
        ).then(() => dispatch(getUserThunk()));
    };

    if (isLoading) {
        return <Preloader />;
    }
    return (
        <RegisterUI
            errorText={error}
            email={email}
            userName={userName}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
        />
    );
};
