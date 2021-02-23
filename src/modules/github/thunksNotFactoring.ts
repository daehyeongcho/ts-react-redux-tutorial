import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { GithubAction } from "./types";
import { getUserProfile } from "../../api/github";
import { getUserProfileAsync } from "./actions";

// ThunkAction의 Generics
// <TReturnType, TState, TExtraThunkArg, TBasicAction>
// TReturnType: thunk함수에서 반환하는 값의 타입
// TState: 스토어의 상태에 대한 타입
// TExtraThunkArg: redux-thunk 미들웨어의 ExtraArgument의 타입
// TBasicAction: dispatch할 수 있는 액션들의 타입

// TReturnType: 아무것도 return하지 않으면 void타입
// 아래 예제는 async를 사용하고 있기 때문에
// Promise<void>가 조금 더 정확하다(void도 상관없음)

export const getUserProfileThunk = (
  username: string
): ThunkAction<Promise<void>, RootState, null, GithubAction> => {
  return async (dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request(""));
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
