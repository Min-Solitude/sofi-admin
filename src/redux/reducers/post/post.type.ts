export type Post = {
    avatar: string
    background: number
    caption: string
    id: string
    images: string[]
    nickName: string
    timestamp: any
}

export type PostState = {
    isLoading: boolean
    listPost: Post[]
}

export type uploadPostPayload = {
    caption?: string
    background: number
    avatar: string
    nickName: string
    selectedImages: string[]
}
