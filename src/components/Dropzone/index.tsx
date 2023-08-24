import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { db, storage } from '../../configs'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import View from '../../motion/View'
import IonIcon from '@reacticons/ionicons'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { uploadPostOnFirebase } from '../../redux/reducers/post/post.reducer'

type DropzoneProps = {
    closeDropzone: () => void
}

const Dropzone = ({ closeDropzone }: DropzoneProps) => {
    const [selectedImages, setSelectedImages] = useState([])
    const captionRef = useRef<HTMLInputElement>(null)
    const account = useAppSelector((state) => state.auth.account)
    const [isBackgroud, setIsBackgroud] = useState(0)
    const [isNickName, setIsNickName] = useState(account?.displayName)
    const [isChangeNickName, setIsChangeNickName] = useState(false)

    const dispatch = useAppDispatch()
    const isLoading = useAppSelector((state) => state.post.isLoading)

    const uploadPost = async () => {
        if (captionRef.current?.value.length === 0) {
            toast.error('Tiêu đề không được để trống')
            return
        }

        const dataPost = {
            caption: captionRef.current?.value,
            background: isBackgroud,
            avatar: account?.photoURL,
            nickName: isNickName,
            selectedImages
        }

        dispatch(uploadPostOnFirebase(dataPost))

        if (isLoading === false) {
            captionRef.current!.value = ''
            setSelectedImages([])
            setIsBackgroud(0)
            closeDropzone()
        }
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setSelectedImages(
            acceptedFiles.map((file: any) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        )
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const selected_images = selectedImages?.map((file: any) => (
        <div key={file.name} className='break-inside-avoid   shadow-sm  '>
            <img alt='nev' src={file.preview} className='rounded-lg shadow-sm' />
        </div>
    ))

    return (
        <View
            className='fixed top-0 bottom-0 left-0 right-0 px-4 bg-[#00000070] z-50 flex flex-col justify-center items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDropzone}
        >
            <div
                className={
                    `w-full bg-[#201f1f]  max-w-[30rem] flex flex-col relative overflow-hidden justify-start items-center gap-4 bg-[#181818]  rounded-lg text-white`
                }
                onClick={(event) => event.stopPropagation()}
            >
                <img
                    src={
                        isBackgroud === 1
                            ? 'https://i.pinimg.com/564x/8e/76/ba/8e76ba07003fdb5f1468f0b6762cc124.jpg'
                            : isBackgroud === 2
                                ? 'https://i.pinimg.com/736x/e0/70/f9/e070f9ecaabc1ce2c3594fb516eb2b26.jpg'
                                : isBackgroud === 3
                                    ? 'https://i.pinimg.com/564x/67/f6/ca/67f6ca55aac593b42c8e19bb2585af01.jpg'
                                    : 'https://i.pinimg.com/564x/d0/93/c9/d093c9ce8ab2c4e25d585915a5c8f13f.jpg'
                    }
                    className={isBackgroud === 0 ? 'hidden' : 'w-full  h-full object-cover absolute'}
                />
                <View className='w-full flex flex-col justify-start items-center gap-4 z-10'>
                    <Button onClick={closeDropzone} className='absolute top-6 right-6'>
                        <img src="https://app.lofi.co/static/media/close.ec10df3ee1f2f2e876c1d4465722feac.svg" alt="close" className='w-[1.2rem]' />
                    </Button>
                    <h1 className={
                        `mt-4 text-[1.1rem] font-bold py-1 px-4 duration-200 rounded-lg ${isBackgroud === 0 ? '' : 'bg-[#00000098]'}`
                    }>Tạo bài viết</h1>
                    <View className='w-full px-4 flex flex-col gap-4 items-center py-4 border-t border-[#2d2c2c]'>
                        <View className='w-full gap-2 flex items-center text-[0.8rem]'>
                            <View className='w-[2rem] h-[2rem] rounded-full flex justify-center items-center'>
                                <img
                                    src={
                                        account?.photoURL
                                            ? account?.photoURL
                                            : 'https://firebasestorage.googleapis.com/v0/b/zoom-clone-2-0-1.appspot.com/o/avatars%2Fdefault-avatar.jpg?alt=media&token=1b2b0b1a-9b0a-4b0a-9b0a-4b0a9b0a4b0a'
                                    }
                                    alt='nev'
                                    className='w-full h-full rounded-full'
                                />
                            </View>
                            <View className='flex items-center justify-between flex-1'>
                                <View
                                    className={`flex gap-2 items-center cursor-pointer py-1 duration-200 rounded-lg ${isBackgroud === 0 ? ' px-2 ' : 'bg-[#00000098]  px-4 '}`}
                                    onClick={() => setIsChangeNickName(true)}
                                >
                                    <h2 className='text-[0.9rem] font-bold '>{isNickName}</h2>
                                    <IonIcon name='pencil-outline' className='text-[0.7rem] ' />
                                </View>

                                <Button
                                    className='flex items-center gap-1 py-1 px-2 rounded-lg bg-[#00000098]'
                                    onClick={() => {
                                        toast.info('Bầy đặt dấu diếm đồ, Lạnh lùng boy đồ hen!!!')
                                    }}
                                >
                                    <IonIcon name='earth-outline' className='text-[1rem] text-white' />
                                    <span className='text-white'>Công khai</span>
                                </Button>
                            </View>
                        </View>
                        {isChangeNickName && (
                            <View
                                className=' p-2 rounded-lg mt-2  bg-[#00000098] w-full mb-2 flex gap-2 items-center'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <input
                                    type='text'
                                    className='flex-1 bg-transparent outline-none text-white px-4 text-[0.9rem]'
                                    value={isNickName}
                                    onChange={(event) => setIsNickName(event.target.value)}
                                />
                                <Button
                                    className='py-2 px-2 rounded-lg bg-[#ffffff6a] flex justify-center items-center'
                                    onClick={() => {
                                        if (isNickName.length === 0) {
                                            toast.error('Tên không được để trống')
                                            return
                                        } else {
                                            setIsChangeNickName(false)
                                        }
                                    }}
                                >
                                    <IonIcon name='checkmark-outline' className='text-[1rem] text-white' />
                                </Button>
                            </View>
                        )}
                        <View className={` w-full mt-2 py-2 items-center rounded-lg duration-200  flex ${isBackgroud === 0 ? '' : 'px-4 bg-[#00000098] duration-200'}`}>
                            <input
                                ref={captionRef}
                                className='flex-1 outline-none text-[0.9rem] text-white  bg-transparent'
                                type='text'
                                placeholder='Tiêu đề'
                            />
                        </View>
                    </View>
                    <div {...getRootProps()} className='w-full px-4'>
                        <input {...getInputProps()} />
                        {selected_images.length === 0 ? (
                            <div className=' p-2 rounded-lg cursor-pointer bg-[#0000004f] flex justify-center items-center w-full h-[15rem]'>
                                <IonIcon name='images-outline' className='text-2xl text-white' />
                            </div>
                        ) : (
                            <div className='overflow-y-scroll max-h-[20rem]   rounded-lg bg-[#2a2929]  border border-gray-300'>
                                <div className='columns-1 p-2   lg:columns-2 gap-3 space-y-3 '>{selected_images}</div>
                            </div>
                        )}
                    </div>
                    {/* <View className=' w-full px-4 flex gap-2'>
                        <label htmlFor=''>
                            <View
                                className={
                                    isBackgroud === 0
                                        ? 'w-[2rem] h-[2rem] bg-[#ffffff70] flex justify-center text-white items-center rounded-lg cursor-pointer border border-1 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] bg-gray-50 flex justify-center items-center text-[#00000098] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(0)}
                            >
                                <IonIcon name='ban-outline' className='text-2xl ' />
                            </View>
                        </label>
                        <label htmlFor=''>
                            <motion.img
                                src='https://i.pinimg.com/564x/8e/76/ba/8e76ba07003fdb5f1468f0b6762cc124.jpg'
                                className={
                                    isBackgroud === 1
                                        ? 'w-[2rem] h-[2rem] rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(1)}
                            />
                        </label>
                        <label htmlFor=''>
                            <motion.img
                                src='https://i.pinimg.com/736x/e0/70/f9/e070f9ecaabc1ce2c3594fb516eb2b26.jpg'
                                className={
                                    isBackgroud === 2
                                        ? 'w-[2rem] h-[2rem] rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(2)}
                            />
                        </label>
                        <label htmlFor=''>
                            <motion.img
                                src='https://i.pinimg.com/564x/67/f6/ca/67f6ca55aac593b42c8e19bb2585af01.jpg'
                                className={
                                    isBackgroud === 3
                                        ? 'w-[2rem] h-[2rem] rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(3)}
                            />
                        </label>
                        <label htmlFor=''>
                            <motion.img
                                src='https://i.pinimg.com/564x/d0/93/c9/d093c9ce8ab2c4e25d585915a5c8f13f.jpg'
                                className={
                                    isBackgroud === 4
                                        ? 'w-[2rem] h-[2rem] rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(4)}
                            />
                        </label>
                    </View> */}
                    <View className=' mb-8 mt-4 w-full px-4'>
                        <Button
                            onClick={uploadPost}
                            className={
                                `py-2 rounded-lg  w-full text-white text-[0.9rem] ${isBackgroud === 0 ? 'bg-[#ffffff58]' : 'bg-[#00000098]'}`
                            }
                        >
                            Upload
                        </Button>
                    </View>
                </View>
            </div>
        </View >
    )
}

export default Dropzone
