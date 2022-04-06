import { FC } from 'react';
import { ErrorCode } from 'model/enums/ErrorCode';
import { useErrorRedirect } from 'hooks/useErrorRedirect';

interface Props {
    errorCode?: ErrorCode;
    redirectPath?: string;
}

export const ErrorRedirect: FC<Props> = props => {
    const {
        errorCode = ErrorCode.Unknown,
        redirectPath = '/'
    } = props;

    useErrorRedirect(true, errorCode, redirectPath);

    return null;
};
