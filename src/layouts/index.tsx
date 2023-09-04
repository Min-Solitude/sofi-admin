import React, { useEffect, useRef, useState } from 'react'

import View from '../motion/View'
import Header from './Header'
import Navigation from './Navigation'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import history from '../redux/store/history'
import SideBar from './SideBar'
import IonIcon from '@reacticons/ionicons'
import music from '../assets/music'
import { startMusic } from '../redux/reducers/music/music.reducer'
import { checkMember } from '../redux/reducers/auth'
import Loading from '../components/shared/Loading'
import { useRive } from 'rive-react'
import { listRive } from '../riv'
import { listImage } from '../assets/img'
import Button from '../components/Button'

type MainLayoutProps = {
    children: React.ReactNode
}

const dataMusic = [
    {
        name: 'Lofi hốc xương',
        url: music.ueueueue
    },
    {
        name: 'Lofi tình anh em',
        url: music.friend
    },
    {
        name: 'Lofi chó sủa',
        url: music.dog
    }
]

const MainLayout = ({ children }: MainLayoutProps) => {
    const [checkMobile, setCheckMobile] = React.useState(false)
    const accessToken = useAppSelector((state) => state.auth.accessToken)
    const accountLogin = useAppSelector((state) => state.auth.account)

    const background = useAppSelector((state) => state.screen.background)
    const [isBackgroundDay, setIsBackgroundDay] = useState('')
    const [isBackgroundNight, setIsBackgroundNight] = useState('')
    const isChooseBackground = useAppSelector((state) => state.screen.chooseBackground)
    const [isMessage, setIsMessage] = useState(false)
    const [isRain, setIsRain] = useState(false)

    const isStartMusic = useAppSelector((state) => state.music.status)
    const isMusic = useAppSelector((state) => state.music.music)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isStartMusic) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause()
        }

    }, [isStartMusic, isMusic])

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 1024) {
                setCheckMobile(true)
            } else {
                setCheckMobile(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!accessToken) {
            history.push('/auth')
        }
    }, [])

    useEffect(() => {
        if (isChooseBackground === 0) {
            setIsBackgroundDay('background-day-0')
            setIsBackgroundNight('background-night-0')
        } else if (isChooseBackground === 1) {
            setIsBackgroundDay('background-day-1')
            setIsBackgroundNight('background-night-1')
        } else {
            setIsBackgroundDay('background-day-2')
            setIsBackgroundNight('background-night-2')
        }
    }, [isChooseBackground])


    useEffect(() => {
        // WEBSITE RELOAD

        window.addEventListener('beforeunload', (event) => {
            dispatch(startMusic(false))
        })

        dispatch(checkMember(accountLogin.uid))
    }, [])


    // REMOVE POSTED IN LOCALSTORAGE AFTER 5 MINUTES

    const checkPosted = localStorage.getItem('Posted')
    if (checkPosted) {
        setTimeout(() => {
            localStorage.removeItem('Posted')
        }, 300000)
    }

    const { rive, RiveComponent } = useRive({
        src: listRive.cat,
        autoplay: true,
        stateMachines: 'State Machine 1',
    })

    if (isMessage) {
        setTimeout(() => {
            setIsMessage(false)
        }
            , 1500)
    }

    return (
        <View className={
            `h-screen  flex items-end  bg-[#f0f0f0] duration-500 text-black ${background ? isBackgroundDay : isBackgroundNight}`
        }>
            {checkMobile ? <Navigation /> : <SideBar />}
            <Header />
            <main className='lg:m-auto z-10 h-[89.5vh] relative overflow-y-scroll  lg:w-[80%]  xl:w-[60%] w-full  font-medium'>
                <Button className=' hidden lg:block left-[30%] group lg:fixed top-[40%] w-[1.2rem] h-[1.2rem] rounded-full border-2 border-white bg-[#ffffff83]'
                    onClick={() => {
                        setIsRain(!isRain)
                        if (isRain) {
                            setIsMessage(false)
                        } else {
                            setIsMessage(true)
                        }
                    }}
                >
                    <span className='absolute opacity-0 lg:group-hover:opacity-100 delay-100 top-[-2.5rem] text-[0.8rem] py-1 px-4 rounded-lg text-white bg-[#0000008f] left-0 transition-opacity duration-200'>Mưa</span>
                </Button>
                {children}
                <View className='fixed z-10 bottom-16 flex items-center gap-2 lg:bottom-4 lg:right-4 z-50 bg-[#000000] py-2 px-2 lg:pr-6 rounded-full text-white '>
                    <View className=' absolute cursor-pointer top-[-4.5rem] lg:right-0 right-[-1rem] w-[5rem] h-[5rem]'
                        onClick={() => setIsMessage(true)}
                    >
                        <RiveComponent width={'100%'} height={'100%'} />
                        {
                            isMessage && (
                                <View className={`absolute duration-200 text-[0.8rem] py-1 px-2 w-[6rem] text-center top-[-1rem] right-[-2.5rem] bg-black rounded-lg text-white ${isRain ? 'lg:right-10' : 'lg:right-0'} `}

                                >
                                    <span>
                                        {
                                            isRain ? 'Trời má!!!' : 'Nhột quá!!!'
                                        }
                                    </span>
                                </View>
                            )
                        }
                        {
                            isRain && (
                                <View className=' absolute w-[8rem] h-[8rem] top-[-5rem] overflow-hidden right-[-2rem]'
                                    initial={{ opacity: 0, scale: 0.5, x: 200 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, x: 200 }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                >
                                    <img src={listImage.rain} className='w-full h-full object-cover' />
                                </View>
                            )
                        }
                    </View>
                    <IonIcon name='disc' className='text-[2rem] cursor-pointer hover:' />
                    <i className='hidden lg:block text-[0.8rem]'>{dataMusic[isMusic].name}</i>
                    <audio src={dataMusic[isMusic].url} ref={audioRef} >
                        <source src={dataMusic[isMusic].url} type="audio/mpeg" />
                    </audio>
                </View>
            </main >

        </View >
    )
}

export default MainLayout
