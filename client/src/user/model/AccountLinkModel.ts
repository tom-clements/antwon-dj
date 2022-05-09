export enum AccountLinkModelType {
    Spotify = 1,
}

interface BaseAccountLinkModel {
    type: AccountLinkModelType;
    accountName: string;
}

interface UnlinkedAccountLinkModel {
    isLinked: false;
}

interface LinkedAccountLinkModel {
    isLinked: true;
    linkUser?: string;
    linkDate?: Date;
}

export type AccountLinkModel =
    BaseAccountLinkModel &
    (UnlinkedAccountLinkModel | LinkedAccountLinkModel);
