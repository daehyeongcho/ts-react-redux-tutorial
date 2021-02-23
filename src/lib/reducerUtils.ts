import { AnyAction } from "redux";
import { getType } from "typesafe-actions";
import { AnyAsyncActionCreator, AsyncState } from "./types";

export const asyncState = {
  // 다음 코드는 화살표 함수에 Generic을 설정한 것입니다.
  initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  load: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data: T): AsyncState<T, E> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <T, E = any>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error,
  }),
};

export const transformToArray = <AC extends AnyAsyncActionCreator>(
  asyncActionCreator: AC
) => {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
  // Object.values(asyncActionCreator) 이런건 작동안함
};

export const createAsyncReducer = <
  S,
  AC extends AnyAsyncActionCreator,
  K extends keyof S
>(
  asyncActionCreator: AC,
  key: K
) => {
  return (state: S, action: AnyAction) => {
    // 각 액션 생성함수의 type을 추출해줍니다.
    const [REQUEST, SUCCESS, FAILURE] = transformToArray(
      asyncActionCreator
    ).map(getType);

    switch (action.type) {
      case REQUEST:
        return {
          ...state,
          [key]: asyncState.load(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: asyncState.success(action.payload),
        };
      case FAILURE:
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
};
