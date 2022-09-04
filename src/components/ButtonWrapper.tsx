import MainButton from "@twa-dev/mainbutton";
import { ReactNode } from "react";
import { isTelegramWebApp } from "utils";
import { ActionButton } from "./ActionButton";

type Props = {
    children: string | ReactNode;
    isLoading?: boolean;
    customClassName?: string;
    onClick: () => void;
    isDisabled?: boolean;
};

export const ButtonWrapper = ({
    children,
    isLoading,
    customClassName = "",
    onClick,
    isDisabled,
}: Props) => {

    if (!isTelegramWebApp()) {
        return <ActionButton
            onClick={onClick}
            isLoading={isLoading}
            customClassName={customClassName}
            isDisabled={isDisabled}>
            {children}
        </ActionButton>
    } else {
        const buttonText = children as string;
        return <MainButton text={buttonText} disabled={isDisabled} progress={isLoading} onClick={onClick} />
    }
}

