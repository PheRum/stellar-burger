import { PageUIProps } from "../common-type";
import { Dispatch, SetStateAction } from "react";

export type LoginUIProps = PageUIProps & {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
};
