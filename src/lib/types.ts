import { AsyncActionCreatorBuilder } from "typesafe-actions";

export type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export type AsyncState<T, E = any> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};
