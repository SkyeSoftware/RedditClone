import { merge, identity, assoc } from 'ramda';
import { Action } from 'redux';


import { GeneralErrorResponse } from '../api/ApiTypings';
import { RequestFailureAction } from './helpers/ReduxHelpers';

interface GeneralStateType {
    [key: string]: {};
}

type actionMapperFn<StateType> = (
    state: StateType,
    action: Action
) => Partial<StateType>;

export enum AsyncStatus {
    Init,
    Pending,
    Success,
    Error,
}

export function pendingReducerIn<
    StateType extends GeneralStateType,
    SubstateType extends GeneralStateType
>(stateKey: string, actionMapper: actionMapperFn<SubstateType> = identity) {
    return (state: StateType, action: Action) =>
        assoc(
            stateKey,
            merge(actionMapper(state[stateKey] as SubstateType, action), {
                __status: AsyncStatus.Pending,
                __error: null,
            }),
            state
        );
}

export function successReducerIn<
    StateType extends GeneralStateType,
    SubstateType extends GeneralStateType
>(stateKey: string, actionMapper: actionMapperFn<SubstateType> = identity) {
    return (state: StateType, action: Action) =>
        assoc(
            stateKey,
            merge(actionMapper(state[stateKey] as SubstateType, action), {
                __status: AsyncStatus.Success,
                __error: null,
            }),
            state
        );
}

export function errorReducerIn<
    StateType extends GeneralStateType,
    SubstateType extends GeneralStateType
>(stateKey: string, actionMapper: actionMapperFn<SubstateType> = identity) {
    return (state: StateType, action: RequestFailureAction) =>
        assoc(
            stateKey,
            merge(actionMapper(state[stateKey] as SubstateType, action), {
                __status: AsyncStatus.Error,
                __error: action.payload.error,
            }),
            state
        );
}

export const InitialAsyncRequestState = {
    __status: AsyncStatus.Init,
    __error: null,
};
