import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import API from '../api/Api'
import Saga from '../typings/Saga';

/* ------------- Types ------------- */
import { PostsTypes } from '../redux/posts';

/* ------------- Sagas ------------- */
import {
  getPosts,
} from './posts/PostsSaga';


/* ------------- API ------------- */
export const api = new API()

/* ------------- Connect Types To Sagas ------------- */
type ActionHandlerType = [string, Saga]

const ActionHandlers: ActionHandlerType[] = [
  [PostsTypes.GET_POSTS_REQUEST, getPosts],
]

export default function* root() {
	const effects = ActionHandlers.map(([ type, handler ]) => takeLatest(type, handler, api))
	yield all(effects)
}
