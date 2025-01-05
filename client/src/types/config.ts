import { ReactNode } from "react";
import { IUser } from ".";

export type IContextType = {
    [x: string]: ReactNode | IUser | boolean | React.Dispatch<any> | (() => Promise<boolean>);
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}