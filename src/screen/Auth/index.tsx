import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useAppSelector } from '../../hooks/useRedux'
import View from '../../motion/View'
import history from '../../redux/store/history'
import Login from './Login'
import Register from './Register'
import { motion } from 'framer-motion'

const Auth = () => {
    const [isAccount, setIsAccount] = useState<boolean>(true)

    const checkAccessToken = useAppSelector((state) => state.auth.accessToken)

    useEffect(() => {
        if (checkAccessToken) {
            history.push('/')
        }
    }, [checkAccessToken])

    return (
        <View
            className=' font-medium flex justify-center items-center '
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
        >
            <View className='w-full p-8 lg:p-24 flex md:w-[60%] lg:max-w-[40rem] lg:flex-1  flex-col min-h-screen  relative justify-center items-start'>
                <Logo className='w-[3.5rem] absolute top-8 left-8 md:top-24 lg:left-24' />
                <h1 className='mb-8 text-gradient font-medium  tracking-wider text-[1.8rem]'>
                    {isAccount ? 'Đăng nhập' : 'Đăng ký'}
                </h1>
                <View className='w-full'>{isAccount ? <Login /> : <Register />}</View>
                <View className='mt-8 flex gap-2 items-center text-[0.9rem] text-gray-600'>
                    {isAccount ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <Button
                        onClick={() => {
                            setIsAccount(!isAccount)
                            toast.dismiss()
                        }}
                    >
                        <p className='text-primary'>{isAccount ? 'Đăng ký ngay' : 'Đăng nhập ngay'}</p>
                    </Button>
                </View>
                <View className='absolute bottom-8 md:bottom-20 left-[50%] -translate-x-[50%] flex flex-col gap-4 items-center'>
                    <Logo className='w-[3rem]' />
                    <span className='text-[0.8rem] text-gray-400'>© 2023 by Nevsolit</span>
                </View>
            </View>
            <View className='hidden lg:block lg:flex-1 h-screen overflow-hidden relative '>
                <img
                    src='https://papers.co/wallpaper/papers.co-bj42-apple-iphone-ios13-background-orange-art-36-3840x2400-4k-wallpaper.jpg'
                    alt='nev'
                    className='absolute h-full object-cover'
                />
                <motion.img
                    src='https://cdn.gamma.app/zc87vhr30n8uf3n/98e24af9f2294c14b215d5e51963947d/original/just-the-boat.svg'
                    alt='nev'
                    className='w-[16rem] absolute bottom-8 left-8'
                    initial={{ rotate: 0, y: 0 }}
                    animate={{ rotate: 5, y: 10 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                    }}
                />
                <img
                    src='https://cdn.gamma.app/zc87vhr30n8uf3n/fb59abe02a28477d8092f0e4d817bd78/original/just-the-waves.svg'
                    alt='nev'
                    className='w-[16rem] absolute bottom-8 translate-y-[80%] left-6'
                />
            </View>
        </View>
    )
}
export default Auth
