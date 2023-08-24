export type PostProps = {
    caption: string
    images: string[]
    timestamp: number
    id: string
    background: number
    avatar: string
    nickName: string
    likes?: string[]
    comments?: CommentProps[]
}

export type CommentProps = {
    avatar: string
    comment: string
    displayName: string
}
