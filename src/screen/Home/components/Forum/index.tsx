import { useEffect, useState } from 'react'
import View from '../../../../motion/View'
import Dropzone from '../../../../components/Dropzone'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../../configs'
import { useAppSelector } from '../../../../hooks/useRedux'
import Button from '../../../../components/Button'
import IonIcon from '@reacticons/ionicons'
import { toast } from 'react-toastify'

type PostProps = {
    caption: string
    images: string[]
    timestamp: number
    id: string
    background: number
    avatar: string
    nickName: string
}

const Forum = () => {
    const [posts, setPosts] = useState([])
    const avatar = useAppSelector((state) => state.auth.account.photoURL)
    const [isShowDropzone, setIsShowDropzone] = useState(false)
    const [isSeeMore, setIsSeeMore] = useState('')

    useEffect(() => {
        const collectionRef = collection(db, 'posts')
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
            setPosts(
                querySnapshot.docs.map((doc: any) => ({
                    ...doc.data(),
                    id: doc.id,
                    timestamp: doc.data().timestamp?.toDate().getTime()
                }))
            )
        })

        return unsubscribe
    }, [])

    return (
        <View className='mt-8 mb-32'>
            <View className='p-2 rounded-lg border gap-4 mb-8 bg-gray-100 text-[0.9rem] flex items-center'>
                <View className='w-[2.8rem] h-[2.8rem] rounded-full flex justify-center items-center'>
                    <img
                        src={
                            avatar
                                ? avatar
                                : 'https://firebasestorage.googleapis.com/v0/b/zoom-clone-2-0-1.appspot.com/o/avatars%2Fdefault-avatar.jpg?alt=media&token=1b2b0b1a-9b0a-4b0a-9b0a-4b0a9b0a4b0a'
                        }
                        alt='nev'
                        className='w-full h-full rounded-full'
                    />
                </View>
                <View
                    className='bg-white flex-1 h-[2.8rem] text-gray-500 rounded-lg flex items-center justify-start px-4 hover:bg-gray-200 cursor-pointer'
                    onClick={() => setIsShowDropzone(true)}
                >
                    Tạo bài viết
                </View>
            </View>

            {isShowDropzone && <Dropzone closeDropzone={() => setIsShowDropzone(false)} />}

            <View className='flex flex-col gap-8'>
                {posts.map((post: PostProps) => (
                    <View
                        key={post.id}
                        className={
                            post.background === 3 || post.background === 4
                                ? 'bg-gray-100 relative overflow-hidden shadow-md flex jc items-center rounded-lg text-white'
                                : 'bg-gray-100 relative overflow-hidden shadow-md flex jc items-center rounded-lg'
                        }
                    >
                        <img
                            src={
                                post.background === 1
                                    ? 'https://i.pinimg.com/564x/37/32/87/373287af8dafc76df9dcac294de5a243.jpg'
                                    : post.background === 2
                                    ? 'https://i.pinimg.com/564x/9a/76/af/9a76afd01287af22e7a8a7930d4bab6f.jpg'
                                    : post.background === 3
                                    ? 'https://i.pinimg.com/564x/f6/fb/6f/f6fb6fb2f38504efc5296af16d4659a8.jpg'
                                    : 'https://i.pinimg.com/736x/85/26/87/8526878378cdb652dd388ba55ef1aa1b.jpg'
                            }
                            className={post.background === 0 ? 'hidden' : 'w-full h-full object-cover absolute'}
                        />
                        <View className='z-10 p-4 text-[0.9rem]'>
                            <View className='flex gap-2 items-center relative'>
                                <View className='w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden flex justify-center items-center'>
                                    <img src={post.avatar} alt={post.nickName} />
                                </View>
                                <View>
                                    <View className='font-bold'>{post.nickName}</View>
                                </View>
                                <span className='absolute right-0'>
                                    {
                                        new Date(post.timestamp)
                                            .toLocaleString('en-GB', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })
                                            .split(',')[0]
                                    }
                                </span>
                            </View>
                            <View className='px-2 py-4'>
                                <p className={isSeeMore === post.id ? '' : 'line-clamp-3'}>{post.caption}</p>
                                {post.caption.length > 100 && (
                                    <span
                                        className={
                                            isSeeMore === post.id ? 'hidden' : 'text-gray-300 underline cursor-pointer'
                                        }
                                        onClick={() => setIsSeeMore(post.id)}
                                    >
                                        Xem thêm
                                    </span>
                                )}
                            </View>
                            <View className='rounded-lg overflow-hidden'>
                                {post.images &&
                                    post.images.map((image: string) => <img key={image} src={image} alt='post' />)}
                            </View>
                            <View
                                className='mt-4 flex gap-4 items-center justify-end'
                                onClick={() => {
                                    toast.warning('Bình tĩnh chưa làm tính năng này!!')
                                }}
                            >
                                <Button className='flex items-center justify-center'>
                                    <IonIcon name='heart-outline' className='text-xl' />
                                </Button>
                                <Button className='flex items-center justify-center'>
                                    <IonIcon name='chatbubble-outline' className='text-xl' />
                                </Button>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Forum
