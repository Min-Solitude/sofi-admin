import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import IonIcon from '@reacticons/ionicons'

import Button from '../../../components/Button'
import View from '../../../motion/View'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../hooks/useRedux'
import { authRegister } from '../../../redux/reducers/auth'

const Register = () => {
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [RePassword, setRePassword] = useState<string>('')

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

    const dispatch = useAppDispatch()

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!Email || !Password || !RePassword) {
            console.log(
                '%cNev: %cSpam cái %cquần què',
                'color: #FBAB7E; font-weight: bold',
                'color: red; font-weight: bold',
                'color: blue; font-weight: bold'
            )
            toast.error('Vui lòng nhập đầy đủ thông tin')

            return
        }

        if (!regexEmail.test(Email)) return toast.error('Email không hợp lệ')

        if (Password.length < 6) return toast.error('Mật khẩu phải có ít nhất 6 ký tự')

        if (Password !== RePassword) return toast.error('Mật khẩu không khớp')

        const dataForm = {
            email: Email,
            password: Password
        }

        dispatch(authRegister(dataForm))

        setEmail('')
        setPassword('')
        setRePassword('')
    }
    return (
        <View className='w-full  flex gap-8 flex-col items-center'>
            <motion.form
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=' flex flex-col gap-4 w-full max-w-[25rem]  bg-gray-800 p-8 rounded-2xl shadow-2xl'
                onSubmit={handleRegister}
            >
                <View className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-gray-800 text-[0.9rem]'>
                        Email
                    </label>
                    <input
                        type='text'
                        placeholder='Email'
                        className='rounded-lg py-2 text-[0.9rem] px-4 bg-transparent border  border-gray-500 focus:outline-none focus:bg-gray-700  duration-200'
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='email'
                    />
                </View>
                <View className='flex flex-col gap-2'>
                    <label htmlFor='password' className='text-gray-800 text-[0.9rem]'>
                        Mật khẩu
                    </label>

                    <View className='w-full relative flex items-center'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Mật khẩu'
                            value={Password}
                            className='rounded-lg w-full text-[0.9rem] font-medium  py-2 px-4 bg-transparent border   border-gray-500 focus:outline-none focus:bg-gray-700  duration-200'
                            onChange={(e) => setPassword(e.target.value)}
                            id='password'
                        />
                        <Button
                            className='absolute right-4 z-10 font-medium    flex justify-center items-center'
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            type='button'
                        >
                            {isShowPassword ? (
                                <IonIcon name='eye-outline' className='text-gray-500 text-[1.6rem]' />
                            ) : (
                                <IonIcon name='eye-off-outline' className='text-gray-500 text-[1.6rem]' />
                            )}
                        </Button>
                    </View>
                </View>

                <View className='flex flex-col gap-2'>
                    <label htmlFor='re-password' className='text-gray-800 text-[0.9rem]'>
                        Nhập lại mật khẩu
                    </label>
                    <View className='w-full relative flex items-center'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            placeholder='Nhập lại mật khẩu'
                            className='rounded-lg w-full text-[0.9rem] font-medium  py-2 px-4 bg-transparent border   border-gray-500 focus:outline-none focus:bg-gray-700  duration-200'
                            value={RePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            id='re-password'
                        />
                        <Button
                            type='button'
                            className='absolute right-4 z-10    flex justify-center items-center'
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? (
                                <IonIcon name='eye-outline' className='text-gray-500 text-[1.6rem]' />
                            ) : (
                                <IonIcon name='eye-off-outline' className='text-gray-500 text-[1.6rem]' />
                            )}
                        </Button>
                    </View>
                </View>

                <Button className='mt-4  bg-[#ffffff50] text-[0.9rem] text-white font-medium py-2 rounded-lg'>Đăng ký</Button>
            </motion.form>
        </View >
    )
}

export default Register
