import { normalizePost, getImagePreview } from './Normalizers'
import { PostData } from '../api/ApiTypings'

const rawPost: PostData = {
  author: 'author',
  created: 7200,
  created_utc: 0,
  id: '0123',
  is_video: false,
  likes: 0,
  selftext: 'text',
  subreddit: 'subreddit',
  title: 'title',
  thumbnail: 'thumb',
  url: 'asd',
  score: 0,
  num_comments: 0,
  preview: {
    enabled: false,
    images: [
      {
        id: '123123',
        source: {
          url: 'url',
          width: 0,
          height: 0
        }
      }
    ]
  }
}

test('normalizePost should normalize single post', () => {
	const normalizedPost: Event = {
		author: 'author',
		created: 0,
		id: '0123',
		score: 0,
		content: 'text',
		title: 'title',
		thumbnail: 'thumb',
		comments: 0,
		image: 'url',
		width: 0,
		height: 0
	}
	expect(normalizePost(rawPost)).toMatchObject(normalizedPost)
})

test('getImagePreview should return correct image values', () => {
  const normalizedPreview = {
    image: "url",
    width: 0,
    height: 0
  }
  expect(getImagePreview(rawPost.preview)).toMatchObject(normalizedPreview)
})
