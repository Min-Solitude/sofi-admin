import IonIcon from '@reacticons/ionicons'
import Button from '../../../../components/Button'
import View from '../../../../motion/View'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { useEffect } from 'react'

const Advertisement = () => {

    const account = useAppSelector(state => state.auth.account)



    return (
        <View className='flex flex-col'>
            <View className='flex flex-col shadow-md bg-[#00000070] text-white rounded-lg'>
                <View className='py-2 px-4  flex items-center justify-between'>
                    <h1 className='text-[1.2rem] text-white font-bold '>Bảng tin</h1>
                    <Button className='flex justify-center items-center text-gray-500'>
                        <IonIcon name='ellipsis-horizontal' className='text-xl' />
                    </Button>
                </View>
                <View className='min-h-[15rem]  '>
                    <img
                        src='https://i.pinimg.com/originals/7d/07/a2/7d07a255678962d30d8717dcf5dbd266.gif'
                        alt='nev'
                        className='w-full h-full object-cover'
                    />
                </View>
                <View className='px-4 pb-4 flex flex-col gap-2 items-start'>
                    <h2 className='text-[1.1rem]'>Diễn đàn Nevsad chính thức hoạt động!!!</h2>
                    <p className='line-clamp-3  text-[0.8rem] text-gray-300'>
                        It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                        distribution of letters, as opposed to using 'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                        their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                    </p>
                    <Button
                        className='text-[0.9rem]  text-white rounded-lg mt-4'
                        type='button'
                    >
                        Xem thông tin
                    </Button>
                </View>
            </View>

        </View>
    )
}

export default Advertisement
