import { HttpStatusCode } from 'common/model/HttpStatusCode';

export enum FaultType {
    /**
     * A general or unknown error has occurred
     */
    Generic = 7,

    /**
     * A generic HTTP-based REST API error
     */
    Api = 14,
}

type FaultBase = { message: string; }

export type GenericFault = FaultBase & {
    type: FaultType.Generic;
    name: string;
    cause?: Fault;
    stack?: string;
};

export type ApiFault = FaultBase & {
    type: FaultType.Api;
    statusCode: HttpStatusCode;
    apiCode: string;
};

export type Fault =
    GenericFault |
    ApiFault;

export const fault = (name?: string, message?: string, cause?: Fault, stack?: string): GenericFault => ({
    type: FaultType.Generic,
    name: name ?? 'Unknown',
    message: message ?? 'An unknown error has occurred',
    cause,
    stack
});

export const apiFault = (statusCode: HttpStatusCode, apiCode: string, message: string): ApiFault => ({
    type: FaultType.Api,
    statusCode,
    apiCode,
    message,
});
