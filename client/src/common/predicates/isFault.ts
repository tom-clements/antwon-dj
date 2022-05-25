import { ApiFault, Fault, FaultType, GenericFault } from 'common/model/Fault';

export const isGenericFault = (fault: Fault): fault is GenericFault => fault.type === FaultType.Generic;
export const isApiFault = (fault: Fault): fault is ApiFault => fault.type === FaultType.Api;
