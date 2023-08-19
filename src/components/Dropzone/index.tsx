import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { db, storage } from '../../configs'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import View from '../../motion/View'
import IonIcon from '@reacticons/ionicons'
import Button from '../Button'
import { useAppSelector } from '../../hooks/useRedux'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

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

    const uploadPost = async () => {
        const docRef = await addDoc(collection(db, 'posts'), {
            caption: captionRef.current?.value,
            timestamp: serverTimestamp(),
            background: isBackgroud,
            avatar: account?.photoURL,
            nickName: isNickName
        })
        await Promise.all(
            selectedImages.map((image: any) => {
                const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`)

                uploadBytes(imageRef, image, {}).then(async () => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        images: arrayUnion(downloadURL)
                    })
                })
            })
        )

        captionRef.current!.value = ''
        setSelectedImages([])
        setIsBackgroud(0)
        closeDropzone()
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
                    isBackgroud === 3 || isBackgroud === 4
                        ? ' w-full  max-w-[30rem] flex flex-col relative overflow-hidden justify-start items-center gap-4 bg-gray-200 rounded-lg text-white'
                        : ' w-full  max-w-[30rem] flex flex-col relative overflow-hidden justify-start items-center gap-4 bg-gray-200 rounded-lg'
                }
                onClick={(event) => event.stopPropagation()}
            >
                <img
                    src={
                        isBackgroud === 1
                            ? 'https://i.pinimg.com/564x/37/32/87/373287af8dafc76df9dcac294de5a243.jpg'
                            : isBackgroud === 2
                            ? 'https://i.pinimg.com/564x/9a/76/af/9a76afd01287af22e7a8a7930d4bab6f.jpg'
                            : isBackgroud === 3
                            ? 'https://i.pinimg.com/564x/f6/fb/6f/f6fb6fb2f38504efc5296af16d4659a8.jpg'
                            : 'https://i.pinimg.com/736x/85/26/87/8526878378cdb652dd388ba55ef1aa1b.jpg'
                    }
                    className={isBackgroud === 0 ? 'hidden' : 'w-full h-full object-cover absolute'}
                />
                <View className='w-full flex flex-col justify-start items-center gap-4 z-10'>
                    <Button onClick={closeDropzone} className='absolute top-5 right-6'>
                        <IonIcon name='close-outline' className='text-2xl text-gray-400' />
                    </Button>
                    <h1 className='mt-4 text-[1.2rem] font-bold text-gradient'>Tạo bài viết</h1>
                    <View className='w-full px-4 flex flex-col gap-4 items-center py-4 border-t border-gray-300'>
                        <View className='w-full gap-2 flex items-center text-[0.8rem]'>
                            <View className='w-[2.8rem] h-[2.8rem] rounded-full flex justify-center items-center'>
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
                            <View className='flex flex-col gap-2 items-start'>
                                <View
                                    className='flex gap-2 items-center cursor-pointer'
                                    onClick={() => setIsChangeNickName(true)}
                                >
                                    <h2 className='text-[0.9rem] font-bold '>{isNickName}</h2>
                                    <IonIcon name='pencil-outline' className='text-[0.7rem] ' />
                                </View>

                                <Button
                                    className='flex items-center gap-1 py-1 px-2 rounded-lg bg-gray-100'
                                    onClick={() => {
                                        toast.info('Bầy đặt dấu diếm đồ, Lạnh lùng boy đồ hen!!!')
                                    }}
                                >
                                    <IonIcon name='earth-outline' className='text-[1rem] text-gray-400' />
                                    <span className='text-gray-400'>Công khai</span>
                                </Button>
                            </View>
                        </View>
                        {isChangeNickName && (
                            <View
                                className=' py-2 px-4 rounded-lg border border-gray-300 bg-white w-full mb-2 flex gap-2 items-center'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <input
                                    type='text'
                                    className='flex-1 bg-transparent outline-none text-gray-800 text-[0.9rem]'
                                    value={isNickName}
                                    onChange={(event) => setIsNickName(event.target.value)}
                                />
                                <Button
                                    className='py-2 px-2 rounded-lg background-gradient  flex justify-center items-center'
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
                        <View className=' w-full  items-center rounded-lg  flex '>
                            <input
                                ref={captionRef}
                                className='flex-1 outline-none text-[0.9rem]  bg-transparent'
                                type='text'
                                placeholder='Tiêu đề'
                            />
                        </View>
                    </View>
                    <div {...getRootProps()} className='w-full px-4'>
                        <input {...getInputProps()} />
                        {selected_images.length === 0 ? (
                            <div className=' p-2 rounded-lg cursor-pointer bg-gray-100 border border-gray-300 flex justify-center items-center w-full h-[15rem]'>
                                <IonIcon name='images-outline' className='text-2xl text-gray-300' />
                            </div>
                        ) : (
                            <div className='overflow-y-scroll max-h-[20rem]   rounded-lg bg-gray-100  border border-gray-300'>
                                <div className='columns-1 p-2   lg:columns-2 gap-3 space-y-3 '>{selected_images}</div>
                            </div>
                        )}
                    </div>
                    <View className=' w-full px-4 flex gap-2'>
                        <label htmlFor=''>
                            <View
                                className={
                                    isBackgroud === 0
                                        ? 'w-[2rem] h-[2rem] bg-gray-50 flex justify-center items-center rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] bg-gray-50 flex justify-center items-center rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(0)}
                            >
                                <IonIcon name='ban-outline' className='text-2xl text-gray-400' />
                            </View>
                        </label>
                        <label htmlFor=''>
                            <motion.img
                                src='https://i.pinimg.com/564x/37/32/87/373287af8dafc76df9dcac294de5a243.jpg'
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
                                src='https://i.pinimg.com/564x/9a/76/af/9a76afd01287af22e7a8a7930d4bab6f.jpg'
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
                                src='https://i.pinimg.com/564x/f6/fb/6f/f6fb6fb2f38504efc5296af16d4659a8.jpg'
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
                                src='https://i.pinimg.com/736x/85/26/87/8526878378cdb652dd388ba55ef1aa1b.jpg'
                                className={
                                    isBackgroud === 4
                                        ? 'w-[2rem] h-[2rem] rounded-lg cursor-pointer border border-2 border-white duration-150'
                                        : 'w-[2rem] h-[2rem] rounded-lg cursor-pointer duration-150'
                                }
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsBackgroud(4)}
                            />
                        </label>
                    </View>
                    <View className=' mb-8 w-full px-4'>
                        <Button
                            onClick={uploadPost}
                            className='py-2 rounded-lg background-gradient w-full text-white text-[0.9rem]'
                        >
                            Upload
                        </Button>
                    </View>
                </View>
            </div>
        </View>
    )
}

export default Dropzone
