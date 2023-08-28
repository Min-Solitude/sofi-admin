import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../../../components/Button'
import Logo from '../../../../components/Logo'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import View from '../../../../motion/View'
import { AuthAction, authRegisterMember, authUpdateDisplayName, authUpdatePhotoURL } from '../../../../redux/reducers/auth'
import { Link } from 'react-router-dom'

const Account = () => {
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const [isProfile, setIsProfile] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false)

    const [isOldPassword, setIsOldPassword] = useState('')
    const [isNewPassword, setIsNewPassword] = useState('')

    const accountLogin = useAppSelector((state) => state.auth.account)

    const [isDisplayName, setIsDisplayName] = useState(accountLogin.displayName)

    const [isImageUrl, setIsImageUrl] = useState<any>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleRegisterMember = async () => {
        dispatch(authRegisterMember(accountLogin.uid))
    }

    const handleIUpdateDisplayName = async () => {
        dispatch(authUpdateDisplayName(isDisplayName))
    }

    const handleUpdateImageUrl = () => {
        dispatch(authUpdatePhotoURL(isImageUrl))
    }

    const handleSetImageUrl = (e: any) => {
        if (e.target.files[0]) {
            setIsImageUrl(e.target.files[0])
        }
    }

    return (
        <View className='relative'>
            <View
                className='  cursor-pointer flex justify-center items-center '
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDropdown(!isDropdown)}
            >
                <IonIcon name='person-circle-outline' className='text-[2rem] text-white' />
            </View>

            {isDropdown && (
                <motion.div
                    className='absolute -bottom-[1rem] w-[20rem] right-0 py-1 px-4 rounded-lg text-[0.9rem] bg-[#000000b4] duration-200 xl:bg-[#00000070] shadow-md flex items-start flex-col gap-2'
                    initial={{ opacity: 0, x: 20, y: '100%' }}
                    animate={{ opacity: 1, x: 0, y: '100%' }}
                    exit={{ opacity: 0, x: 20, y: '100%' }}
                    transition={{ duration: 0.2 }}
                    ref={dropdownRef}
                    onClick={() => setIsDropdown(false)}
                >
                    <View className='flex gap-2 items-center py-2  w-full border-b border-[#676565] mb-2'>
                        <View className='w-[2.5rem]  h-[2.5rem] rounded-full  flex justify-center items-center '>
                            <img
                                src={
                                    accountLogin && accountLogin.photoURL
                                        ? accountLogin.photoURL
                                        : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                                }
                                alt={accountLogin && accountLogin.displayName ? accountLogin.displayName : 'Anonymous'}
                                className='w-[2.5rem] h-[2.5rem] rounded-full object-cover '
                            />
                        </View>
                        <View className=' flex flex-col justify-center'>
                            <p className='text-[1rem] text-white font-bold'>
                                {accountLogin && accountLogin.displayName ? accountLogin.displayName : 'Anonymous'}
                            </p>
                            <span className='text-[0.8rem] relative top-[-0.3rem] text-gray-300'>
                                {accountLogin && accountLogin.email ? accountLogin.email : 'Anonymous'}
                            </span>
                        </View>
                    </View>
                    <Button
                        className=' w-full flex gap-2 items-center text-[0.9rem] text-gray-300 rounded-lg cursor-pointer '
                        onClick={() => {
                            setIsProfile(true)
                            setIsMember(false)
                            setIsChangePassword(false)
                        }}
                    >
                        <IonIcon name='person' className='translate-y-[-0.1rem]' />
                        <p>Thông tin cá nhân</p>
                    </Button>
                    <View
                        className=' w-full flex gap-2 items-center text-[0.9rem] text-gray-300 rounded-lg cursor-pointer'
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setIsProfile(false)
                            setIsMember(false)
                            setIsChangePassword(true)
                        }}
                    >
                        <IonIcon name='key' className='translate-y-[-0.1rem]' />
                        <p>Đổi mật khẩu</p>
                    </View>
                    <View
                        className=' w-full flex gap-2 items-center  text-gray-300 cursor-pointer mb-2  '
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            dispatch(AuthAction.handleLogout())
                        }}
                    >
                        <IonIcon name='log-out' className='translate-y-[-0.1rem]' />
                        <p>Đăng xuất</p>
                    </View>
                </motion.div>
            )}
            {
                (isProfile || isMember) &&
                (
                    <View className='fixed top-0 left-0 bottom-0 p-4 right-0  bg-[#00000095] flex justify-center lg:items-center     items-start'>
                        <View className='w-full bg-black text-white max-w-[30rem] p-4 relative rounded-lg flex flex-col items-start gap-4' >
                            <Button className='flex justify-center items-center absolute top-8 right-4'
                                onClick={() => {
                                    setIsProfile(false)
                                    setIsMember(false)
                                }}
                            >
                                <IonIcon name='close-outline' className='text-[1.8rem] text-[#3a3939]' />
                            </Button>
                            <Logo className='py-4' />
                            <View className='flex w-full relative items-center font-medium text-[0.8rem]  justify-start gap-4'>
                                <Button
                                    className={
                                        `${isProfile ? 'text-yellow-400 ' : 'text-white'}}`
                                    }
                                    onClick={() => {
                                        setIsProfile(true)
                                        setIsMember(false)
                                    }}
                                >
                                    Thông tin
                                </Button>
                                <Button
                                    className={
                                        `${isMember ? 'text-yellow-400 ' : 'text-white'}}`
                                    }
                                    onClick={() => {
                                        setIsProfile(false)
                                        setIsMember(true)
                                    }}
                                >
                                    Thành viên
                                </Button>
                                <Button
                                    className='absolute right-0 hover:text-yellow-400'
                                    onClick={() => {
                                        dispatch(AuthAction.handleLogout())
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            </View>
                            <View className='text-[0.8rem] w-full'>
                                {
                                    isProfile && (
                                        <View className='flex flex-col gap-2 mt-4'>
                                            <View className='flex flex-col gap-2'>
                                                <View className='flex items-center justify-between'>
                                                    <h1 className='text-[0.9rem] font-bold'>Thông tin của tôi</h1>
                                                    <Button className='rounded-full py-1 px-4 border border-[#3d3d3d] flex justify-center items-center'
                                                        onClick={() => handleIUpdateDisplayName()}
                                                    >
                                                        Cập nhật
                                                    </Button>
                                                </View>
                                                <View className='w-full  px-4 rounded-lg py-2 bg-[#1a1919]'>
                                                    <input type="text" value={isDisplayName}
                                                        placeholder='Anonymous'
                                                        onChange={e => setIsDisplayName(e.target.value)}
                                                        className='w-full outline-none bg-transparent'
                                                    />
                                                </View>
                                            </View>
                                            <View className='flex flex-col gap-2 mt-4'>
                                                <View className='flex items-center justify-between'>
                                                    <h1 className='text-[0.9rem] font-bold'>Avatar</h1>
                                                    <Button className='rounded-full py-1 px-4 border border-[#3d3d3d] flex justify-center items-center'
                                                        onClick={() => handleUpdateImageUrl()}
                                                    >
                                                        Cập nhật
                                                    </Button>
                                                </View>
                                                <input type="file" accept="image/*" hidden name="avatar" onChange={handleSetImageUrl}
                                                    className='bg-yellow-300' id='avatar'
                                                />
                                                <View className='flex justify-between items-end'>
                                                    <label htmlFor="avatar" className='w-[3rem] h-[3rem] flex justify-center items-center  cursor-pointer rounded-lg overflow-hidden'>
                                                        <img src={
                                                            accountLogin.photoURL ? accountLogin.photoURL : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                                                        } alt="nev"
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </label>
                                                    <label htmlFor="avatar" className='font-medium cursor-pointer hover:underline text-yellow-400'>
                                                        Thay đổi
                                                    </label>
                                                </View>
                                            </View>
                                            <View className='flex flex-col gap-2 mt-8'>
                                                <View className='flex items-center justify-between'>
                                                    <h1 className='text-[0.9rem] font-bold'>Đổi mật khẩu</h1>
                                                </View>

                                                <Button className='w-full py-2 rounded-full border border-[#3d3d3d] mt-4 mb-4'
                                                    onClick={() => {
                                                        setIsChangePassword(true)
                                                        setIsMember(false)
                                                        setIsProfile(false)
                                                    }}
                                                >
                                                    Đổi mật khẩu
                                                </Button>
                                            </View>
                                        </View>
                                    )
                                }
                                {
                                    isMember && (
                                        <View className='mt-2 w-full'>
                                            <h1 className='text-[0.9rem] font-bold'>Thành viên của Nefy</h1>
                                            <View className='mt-2 flex items-start p-2 bg-[#444343] w-full rounded-lg gap-2'>
                                                <View className='w-[4rem] h-[4rem] flex justify-center items-center rounded-lg bg-black'>
                                                    <span className='text-[1.2rem] font-bold'>N</span>
                                                </View>
                                                <View>
                                                    {
                                                        accountLogin.member ? (
                                                            <View className='flex flex-col gap-2'>
                                                                <p className='font-medium text-green-400 text-[0.9rem]'>Bạn đã là thành viên của Nefy</p>
                                                                <Link className='flex items-center gap-2' to='https://www.facebook.com/nefystudies/'>
                                                                    <IonIcon name='logo-facebook' className='text-[1.6rem] text-blue-400' />
                                                                    <p>Tham gia group facebook để cùng nhau phát triển!</p>
                                                                </Link>
                                                            </View>
                                                        ) : (
                                                            <Button className='py-2 px-4 rounded-lg bg-[#141414] font-medium'
                                                                onClick={() => handleRegisterMember()}
                                                            >
                                                                Đăng ký thành viên
                                                            </Button>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                )
            }
            {
                isChangePassword && (
                    <View className='fixed top-0 left-0 bottom-0 p-4 right-0  bg-[#00000095] flex justify-center lg:items-center items-start'>
                        <View className='w-full bg-black text-white max-w-[30rem] p-4 relative rounded-lg flex flex-col items-start gap-4' >
                            <Button className='flex justify-center items-center absolute top-8 right-4'
                                onClick={() => {
                                    setIsChangePassword(false)
                                    setIsMember(false)
                                    setIsProfile(false)
                                }}
                            >
                                <IonIcon name='close-outline' className='text-[1.8rem] text-[#3a3939]' />
                            </Button>
                            <Logo className='py-4' />
                            <h1 className='text-[0.9rem] font-bold text-yellow-400'>Thay đổi mật khẩu</h1>
                            <View className='flex flex-col gap-2 w-full'>
                                <label htmlFor="oldPassword" className='text-[0.8rem] text-[#6b6a6a] font-medium'>Mật khẩu cũ</label>
                                <input type="text" id='oldPassword' className='w-full outline-none bg-transparent bg-[#383838] w-full px-4 py-2 font-medium rounded-lg text-[0.9rem]' />
                            </View>
                            <View className='flex flex-col gap-2 w-full'>
                                <label htmlFor="newPassword" className='text-[0.8rem] text-[#6b6a6a] font-medium'>Mật khẩu mới</label>
                                <input type="text" id='newPassword' className='w-full outline-none bg-transparent bg-[#383838] w-full px-4 py-2 font-medium rounded-lg text-[0.9rem]' />
                            </View>
                            <Button className='w-full py-2 rounded-lg text-[0.9rem] font-medium border border-yellow-400 text-yellow-400 mt-4 mb-4'
                                onClick={() => {
                                    setIsChangePassword(false)
                                    setIsMember(false)
                                    setIsProfile(false)
                                    toast.warning('Tính năng này chưa làm. Đang lười!')
                                }}
                            >
                                Đổi mật khẩu
                            </Button>
                        </View>
                    </View>
                )
            }
        </View >
    )
}

export default Account
