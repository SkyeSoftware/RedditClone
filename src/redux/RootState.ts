import { StateType as PostsStateType } from './posts/State'

interface RootStateDefinition {
	posts: PostsStateType
}

export type RootState = Readonly<RootStateDefinition>
