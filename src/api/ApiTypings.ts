import { ApiResponse, ApiErrorResponse } from 'apisauce'

export interface PostsResponseData {
	after: string
	before: string
	children: PostListData[]
	dist: number
	modhash: ''
}

export interface ErrorResponseData {
	message: string
	detail: string
}

export type GetPostsResponse = ApiResponse<PostsResponseData>
export type GeneralErrorResponse = ApiErrorResponse<ErrorResponseData>

export interface PostListData {
	kind: string
	data: PostData
}

export interface PostData {
	author: string
	created: number
	created_utc: number
	id: string
	is_video: boolean
	likes: number
	selftext: string
	subreddit: string
	title: string
	thumbnail: string
	url: string
	preview: PreviewData
	score: number
	num_comments: number
}

export interface PreviewData {
	enabled: boolean
	images: Array<ImageData>
}

export interface ImageData {
	id: string
	source: SourceData
}

export interface SourceData {
	height: number
	width: number
	url: string
}
