import { call, put } from "redux-saga/effects";
import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";

/*
  유틸함수의 재사용성을 높이기 위하여 
  함수의 패러미터는 언제나 하나의 값을 사용하도록 하고,
  action.payload를 그대로 패러미터로 넣어주도록 설정합니다.
  만약에 여러가지 종류의 값을 패러미터로 넣어야 한다면 객체 형태로 만들어줘야 합니다.
 */
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// action이 payload를 갖고 있는지 확인합니다.
// __ is __ 문법은 Type guard라고 부릅니다.
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
// action is PayloadAction<string, P>는
//   action이 실제 PayloadAction<string,P>인가 구분하는 키워드
// return (action as PayloadAction<string, P>).payload !== undefined는
//   action이라는 obj에 payload가 있을때 PayloadAction 타입으로 취급한다는 것
const isPayloadAction = <P>(
  action: any
): action is PayloadAction<string, P> => {
  return (action as PayloadAction<string, P>).payload !== undefined;
};

const createAsyncSaga = <T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) => {
  return function* (action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      yield put(asyncActionCreator.failure(e));
    }
  };
};

export default createAsyncSaga;
