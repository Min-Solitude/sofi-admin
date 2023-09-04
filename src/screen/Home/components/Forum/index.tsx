import IonIcon from '@reacticons/ionicons'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../../../components/Button'
import Dropzone from '../../../../components/Dropzone'
import Loading from '../../../../components/shared/Loading'
import { db } from '../../../../configs'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import View from '../../../../motion/View'
import { PostProps } from '../../../../types'
import { likePost } from '../../../../redux/reducers/post/post.reducer'
import Comment from './Comment'

const Forum = () => {
    const [posts, setPosts] = useState([])
    const account = useAppSelector((state) => state.auth.account)
    const [isShowDropzone, setIsShowDropzone] = useState(false)
    const [isSeeMore, setIsSeeMore] = useState('')
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const checkPosted = localStorage.getItem('Posted')
    const [isComment, setIsComment] = useState('')

    const isLoading = useAppSelector((state) => state.post.isLoading)

    const dispatch = useAppDispatch()

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

    const handleLikePost = (id: string) => {
        dispatch(
            likePost({
                id: id,
                uid: account.uid
            })
        )
    }

    if (isLoading) return <Loading />

    return (
        <View className='w-full max-w-[30rem]'>
            {accessToken && !checkPosted ? (
                <View className='p-2 mb-4 rounded-lg shadow-md border bg-[#201f1fae] border-gray-800 gap-4   text-[0.9rem] flex items-center'
                    onClick={() => setIsShowDropzone(true)}

                >
                    <View className='w-[2rem] shadow-lg h-[2rem] rounded-lg flex justify-start overflow-hidden items-center'>
                        <img
                            src={
                                account.photoURL
                                    ? account.photoURL
                                    : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                            }
                            alt='nev'
                            className='w-full '
                        />
                    </View>
                    <View
                        className=' flex-1  text-gray-500 rounded-lg flex items-center justify-start cursor-pointer'
                    >
                        <p>Tạo bài viết</p>
                    </View>
                </View>
            ) : (
                <View className='mb-4 text-[0.9rem] py-2 px-4 rounded-lg bg-[#00000090] text-white'>
                    <p>Vui lòng chờ 5 phút để được đăng bài</p>
                </View>
            )}
            {isShowDropzone && <Dropzone closeDropzone={() => setIsShowDropzone(false)} />}
            <View className='flex flex-col gap-4 '>
                {posts.map((post: PostProps) => (
                    <View
                        key={post.id}
                        className={
                            `bg-[#00000070] text-white relative w-full overflow-hidden shadow-md flex flex-col justify-center items-center rounded-lg`
                        }
                    >
                        <img
                            src={
                                post.background === 1
                                    ? 'https://i.pinimg.com/564x/8e/76/ba/8e76ba07003fdb5f1468f0b6762cc124.jpg'
                                    : post.background === 2
                                        ? 'https://i.pinimg.com/736x/e0/70/f9/e070f9ecaabc1ce2c3594fb516eb2b26.jpg'
                                        : post.background === 3
                                            ? 'https://i.pinimg.com/564x/67/f6/ca/67f6ca55aac593b42c8e19bb2585af01.jpg'
                                            : 'https://i.pinimg.com/564x/d0/93/c9/d093c9ce8ab2c4e25d585915a5c8f13f.jpg'
                            }
                            className={post.background === 0 ? 'hidden' : 'w-full h-full object-cover absolute'}
                        />
                        {
                            !post.images && (
                                <View className='absolute right-4 top-4'>
                                    <span className='py-2 px-4 rounded-lg bg-[#00000070] text-white text-[0.9rem] font-bold'>
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
                            )
                        }
                        <View className='z-10 w-full px-4 text-[0.9rem] flex flex-col'>
                            {
                                post.images && (
                                    <View
                                        className={
                                            post.images && post.images.length === 1
                                                ? 'rounded-lg mt-4 relative'
                                                : 'rounded-lg mt-4 columns-2 relative gap-4 p-2 bg-[#00000070] space-y-4'
                                        }
                                    >
                                        {post.images &&
                                            post.images.map((image: string) => (
                                                <img
                                                    key={image}
                                                    src={image}
                                                    alt='post'
                                                    className='w-full object-cover rounded-lg'
                                                />
                                            ))}
                                        <span className='absolute bottom-0 right-0 px-4 py-2 bg-[#00000080] text-white font-bold rounded-tl-lg rounded-br-lg'>
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
                                )
                            }
                            <View className='flex gap-2 mt-4 items-center relative'>
                                <View className='w-[2.5rem] h-[2.5rem] overflow-hidden  rounded-lg overflow-hidden flex justify-center items-center'>
                                    <img
                                        src={
                                            post.avatar
                                                ? post.avatar
                                                : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                                        }
                                        alt={post.nickName ? post.nickName : 'Anonymous'}
                                        className='w-full'
                                    />
                                </View>
                                <View className='  flex-1 flex justify-between items-center '>
                                    <View className='font-bold'>
                                        <p>{post.nickName}</p>
                                        <span className='text-[0.8rem] font-light text-gray-300'>user</span>
                                    </View>
                                </View>
                            </View>

                            <View className='mt-4'>
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
                            <View className=' flex gap-4 items-center text-white mb-4 justify-end'>
                                <View
                                    className={
                                        post.background === 0
                                            ? 'flex gap-2 items-center    '
                                            : 'flex gap-2 items-center  '
                                    }
                                >
                                    <span className='text-[1rem]'
                                    >
                                        {post.likes && post.likes.length > 0 ? (
                                            post.likes.length
                                        ) : (
                                            <span>0</span>
                                        )}
                                    </span>
                                    {post.likes?.includes(account.uid) ? (
                                        <Button
                                            className={
                                                'flex  items-center justify-center'
                                            }
                                        >
                                            <IonIcon name='heart' className='text-2xl text-red-500' />
                                        </Button>
                                    ) : (
                                        <Button
                                            className={
                                                post.background === 0
                                                    ? 'flex  items-center justify-center '
                                                    : 'flex  items-center justify-center'
                                            }
                                            onClick={() => {
                                                if (!accessToken) {
                                                    toast.warning('Vui lòng đăng nhập để thực hiện chức năng này')
                                                    return
                                                }

                                                handleLikePost(post.id)
                                            }}
                                        >
                                            <IonIcon name='heart-outline' className='text-2xl' />
                                        </Button>
                                    )}
                                </View>

                                <Button
                                    className={
                                        'flex  items-center justify-center'
                                    }
                                    onClick={() => {
                                        if (!accessToken) {
                                            toast.warning('Vui lòng đăng nhập để thực hiện chức năng này')
                                            return
                                        }

                                        setIsComment(post.id)
                                    }}
                                >
                                    <IonIcon name='chatbubble-outline' className='text-2xl' />
                                </Button>
                            </View>
                        </View>
                        {isComment && isComment === post.id && (
                            <Comment data={post.comments} close={() => setIsComment('')} id={post.id} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Forum
