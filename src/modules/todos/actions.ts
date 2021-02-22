import {
  /* createStandardAction: deprecated */
  createAction,
} from "typesafe-actions";
import { Todo } from "./types";

// 액션 타입 선언
export const ADD_TODO = "todos/ADD_TODO" as const;
export const TOGGLE_TODO = "todos/TOGGLE_TODO" as const;
export const REMOVE_TODO = "todos/REMOVE_TODO" as const;

let nextId = 1; // 새로운 항목을 추가할 때 사용할 고유ID값

// 액션 생성 함수

// 이 액션 생성 함수의 경우엔 패러미터를 기반하여 커스타미이징된 payload를 설정해주므로,
// createAction이라는 함수를 사용합니다.
// typesafe-actions v5에선 createStandardAction이 createAction으로 바뀌고 v4방식의 createAction은 deprecated됨
export const addTodo = createAction(ADD_TODO, (text: string) => ({
  id: nextId++,
  text,
  done: false,
}))<Todo>();

// payload가 그대로 들어가는 액션 생성 함수는 정말 간단합니다.
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();
