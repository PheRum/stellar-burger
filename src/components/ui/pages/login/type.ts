import { PageUIProps } from "../common-type";
import React from "react";

export type LoginUIProps = PageUIProps & {
    password: string;
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
