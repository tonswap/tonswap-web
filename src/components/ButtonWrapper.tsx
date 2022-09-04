import MainButton from "@twa-dev/mainbutton";
import { ReactNode } from "react";
import { isTelegramWebApp } from "utils";
import { ActionButton } from "./ActionButton";

type Props = {
    isLoading?: boolean;
    customClassName?: string;
    onClick: () => void;
    isDisabled?: boolean;
    text: string;
    image?: string | ReactNode;
};

export const ButtonWrapper = ({
    isLoading,
    customClassName = "",
    onClick,
    isDisabled,
    text,
    image
}: Props) => {

    if (!isTelegramWebApp()) {
        return <ActionButton
            onClick={onClick}
            isLoading={isLoading}
            customClassName={customClassName}
            isDisabled={isDisabled}>
            <>{text} {image}</>
        </ActionButton>
    } else {
        return <MainButton text={text} disabled={isDisabled} onClick={onClick} />
    }
}

