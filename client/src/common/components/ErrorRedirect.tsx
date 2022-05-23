import type { FC } from 'react';
import { ErrorCode } from 'common/model/ErrorCode';
import { useErrorRedirect } from 'common/hooks/useErrorRedirect';

interface Props {
    errorCode?: ErrorCode;
    redirectPath?: string;
}

// TODO, this is a bad component...
export const ErrorRedirect: FC<Props> = props => {
    const {
        errorCode = ErrorCode.Unknown,
        redirectPath = '/'
    } = props;

    useErrorRedirect(true, errorCode, redirectPath);

    return null;
};
