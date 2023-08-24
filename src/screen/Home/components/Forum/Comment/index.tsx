import IonIcon from '@reacticons/ionicons'
import Button from '../../../../../components/Button'
import View from '../../../../../motion/View'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { toast } from 'react-toastify'
import { commentPost } from '../../../../../redux/reducers/post/post.reducer'

type CommentProps = {
    avatar: string
    comment: string
    displayName: string
}

type Comment = {
    id: string
    data?: CommentProps[]
    close?: () => void
}

const Comment = ({ id, data, close }: Comment) => {
    const [comment, setComment] = useState('')
    const account = useAppSelector((state) => state.auth.account)
    const dispatch = useAppDispatch()

    const handleComment = () => {
        if (!account) return toast.error('Bạn cần đăng nhập để bình luận')

        if (!comment) return toast.error('Bạn cần nhập nội dung bình luận')

        const dataComment = {
            comment,
            id,
            avatar: account.photoURL,
            displayName: account.displayName
        }

        dispatch(commentPost(dataComment))

        setComment('')
    }

    return (
        <View className=' z-10 mb-4 w-full px-4'>
            <View className='border-t py-4 border-gray-300 '>
                <View className='  flex items-center justify-between'>
                    <h1 className='text-[1.2rem]'>Comment</h1>
                    <Button
                        className='flex justify-center text-[1.2rem] items-center'
                        type='button'
                        onClick={() => close && close()}
                    >
                        <IonIcon name='close' />
                    </Button>
                </View>
                {data?.length ? (
                    <View className='mt-4 flex flex-col gap-2 max-h-[20rem] overflow-y-scroll text-white '>
                        {data?.map((item, index) => (
                            <View key={index} className='flex gap-4 p-2 rounded-lg  bg-[#00000070] items-center'>
                                <View className='w-[2rem] h-[2rem] rounded-lg overflow-hidden'>
                                    <img src={item.avatar ? item.avatar : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'} alt='nev' className='w-full h-full object-cover' />
                                </View>
                                <p className='text-[0.9rem]'>{item.comment}</p>
                            </View>
                        ))}
                    </View>
                ) : (
                    <p className='text-[0.9rem] text-[#878585] mt-4'>Chưa có bình luận nào!!!</p>
                )}
                <View className='mt-4 w-full flex items-center gap-4'>
                    <input
                        type='text'
                        className='flex-1 py-2 px-4 rounded-lg bg-gray-300 text-gray-800 outline-none text-[0.9rem]'
                        placeholder='Nhập bình luận của bạn'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        className='flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-lg background-gradient text-white'
                        type='button'
                        onClick={() => handleComment()}
                    >
                        <IonIcon name='send' />
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Comment
