import { SerializedError } from '@reduxjs/toolkit';
import { fault, Fault } from 'common/model/Fault';

export const mapReduxErrorToFault = (error: SerializedError): Fault => {
    if (error.code) console.log(error);
    return fault(error.name, error.message, undefined, error.stack);
};
