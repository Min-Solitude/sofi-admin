import { useEffect, useRef, useState } from 'react'
import View from '../../../../motion/View'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { AuthAction } from '../../../../redux/reducers/auth'
import { motion } from 'framer-motion'

const Account = () => {
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const accountLogin = useAppSelector((state) => state.auth.account)

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

    return (
        <View className='relative'>
            <View
                className='w-[3rem] relative cursor-pointer h-[3rem] rounded-full  flex justify-center items-center '
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDropdown(!isDropdown)}
            >
                <img
                    src={
                        accountLogin && accountLogin.photoURL
                            ? accountLogin.photoURL
                            : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                    }
                    alt={accountLogin && accountLogin.displayName ? accountLogin.displayName : 'Anonymous'}
                    className='w-[3rem] h-[3rem] rounded-full object-cover border-2 border-primary'
                />
                <span className='w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white'></span>
            </View>

            {isDropdown && (
                <motion.div
                    className='absolute -bottom-[1rem] w-[20rem] right-0 py-1 px-4 rounded-lg text-[0.9rem]   bg-white shadow-md flex items-start flex-col gap-2'
                    initial={{ opacity: 0, x: 20, y: '100%' }}
                    animate={{ opacity: 1, x: 0, y: '100%' }}
                    exit={{ opacity: 0, x: 20, y: '100%' }}
                    transition={{ duration: 0.2 }}
                    ref={dropdownRef}
                >
                    <View className='flex gap-2 items-center py-2 w-full border-b border-gray-200 mb-2'>
                        <View className='w-[2.5rem]  h-[2.5rem] rounded-full  flex justify-center items-center '>
                            <img
                                src={
                                    accountLogin && accountLogin.photoURL
                                        ? accountLogin.photoURL
                                        : 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'
                                }
                                alt={accountLogin && accountLogin.displayName ? accountLogin.displayName : 'Anonymous'}
                                className='w-[2.5rem] h-[2.5rem] rounded-full object-cover border-2 border-gray-100'
                            />
                        </View>
                        <View className=' flex flex-col justify-center'>
                            <p className='text-[1rem] text-primary font-bold'>
                                {accountLogin && accountLogin.displayName ? accountLogin.displayName : 'Anonymous'}
                            </p>
                            <span className='text-[0.8rem] relative top-[-0.3rem] text-gray-500'>
                                {accountLogin && accountLogin.email ? accountLogin.email : 'Anonymous'}
                            </span>
                        </View>
                    </View>
                    <View
                        className=' w-full hover:text-primary text-gray-800 py-2 rounded-lg cursor-pointer '
                        whileTap={{ scale: 0.9 }}
                    >
                        Thông tin cá nhân
                    </View>
                    <View
                        className=' w-full hover:text-primary text-gray-800 py-2 rounded-lg cursor-pointer '
                        whileTap={{ scale: 0.9 }}
                    >
                        Đổi mật khẩu
                    </View>
                    <View
                        className=' w-full hover:text-primary text-gray-800 cursor-pointer py-4 border-t border-gray-200 mt-2  '
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            dispatch(AuthAction.handleLogout())
                        }}
                    >
                        Đăng xuất
                    </View>
                </motion.div>
            )}
        </View>
    )
}

export default Account
