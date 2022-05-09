import { AccountLinkModel, AccountLinkModelType } from 'user/model/AccountLinkModel';

export const mockAccountLinksFactory = (isLinked: boolean) => (): AccountLinkModel[] => ([
    {
        type: AccountLinkModelType.Spotify,
        accountName: 'Spotify',
        isLinked,
        linkUser: 'Ablert Clements',
        linkDate: new Date(),
    },
]);
