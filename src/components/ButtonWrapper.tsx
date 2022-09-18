import { ReactNode } from "react";
import { isTelegramWebApp } from "utils";
import { ActionButton } from "./ActionButton";
import { MainButton } from '@twa-dev/sdk/react';

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
        console.log('telegram web app')
        return <MainButton text={text} disabled={isDisabled} progress={isLoading} onClick={() => onClick} />
    }
}

