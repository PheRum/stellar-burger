import React, { Dispatch, SetStateAction, useState } from "react";

export const useForm = <T>(inputValues: T) => {
    const [values, setValues] = useState(inputValues);

    // @ts-ignore
    const handleChange: Dispatch<SetStateAction<string>> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.currentTarget;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
};
