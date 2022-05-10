import { useMemo } from 'react';
import { AccountLinkModel, AccountLinkModelType } from 'user/model/AccountLinkModel';

type AccountLinks = AccountLinkModel[];

export type UseAccountLinks = () => AccountLinks;

export const useAccountLinks: UseAccountLinks = () => {
    return useMemo(() => ([
        {
            type: AccountLinkModelType.Spotify,
            accountName: 'Spotify',
            isLinked: false,
        },
    ]), []);
};
