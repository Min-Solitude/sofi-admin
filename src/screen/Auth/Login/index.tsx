import { motion } from 'framer-motion'
import Button from '../../../components/Button'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../hooks/useRedux'
import { authLoginWithAccount, authLoginWithGoogle } from '../../../redux/reducers/auth'
import IonIcon from '@reacticons/ionicons'
import View from '../../../motion/View'
import history from '../../../redux/store/history'

const Login = () => {
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const [isShowFormLogin, setIsShowFormLogin] = useState<boolean>(false)

    const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

    const dispatch = useAppDispatch()

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Email === '' || Password === '') {
            console.log(
                '%cNev: %cĐăng nhập %ccũng không xong',
                'color: #FBAB7E; font-weight: bold',
                'color: red; font-weight: bold',
                'color: blue; font-weight: bold'
            )
            toast.error('Vui lòng nhập đầy đủ thông tin')
            return
        }

        if (!regexEmail.test(Email)) {
            toast.error('Email không hợp lệ')
            return
        }

        const dataForm = {
            email: Email,
            password: Password
        }

        dispatch(authLoginWithAccount(dataForm))
    }

    return (
        <View className='w-full  flex gap-8 flex-col items-center'>
            <motion.form
                className=' flex flex-col gap-4 w-full max-w-[25rem]  bg-gray-800 p-8 rounded-2xl shadow-2xl'
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <View className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-gray-500 text-[0.9rem]'>
                        Email
                    </label>
                    <input
                        type='text'
                        className='rounded-lg py-2 text-[0.9rem] px-4 bg-transparent border  border-gray-500 focus:outline-none focus:bg-gray-700  duration-200'
                        value={Email}
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </View>
                <View className='flex flex-col gap-2'>
                    <label htmlFor='password' className='text-gray-800 text-[0.9rem]'>
                        Mật khẩu
                    </label>
                    <View className='w-full relative flex items-center'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
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
                <View className='relative left-2 -top-2'>
                    <Button
                        type='button'
                        onClick={() => {
                            toast.warning('Có cái mật khẩu mà cũng quên. RÁNG NHỚ ĐI !!!')
                        }}
                    >
                        <p className='text-[0.9rem] underline text-gray-500'>Quên mật khẩu</p>
                    </Button>
                </View>
                <Button className='mt-4  background-gradient text-white font-medium py-2 rounded-lg'>Đăng nhập</Button>
            </motion.form>
        </View>
    )
}

export default Login
