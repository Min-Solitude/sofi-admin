import React, { useEffect, useRef, useState } from 'react'

import IonIcon from '@reacticons/ionicons'
import { useRive } from 'rive-react'
import music from '../assets/music'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import View from '../motion/View'
import { checkMember } from '../redux/reducers/auth'
import { startMusic } from '../redux/reducers/music/music.reducer'
import history from '../redux/store/history'
import { listRive } from '../riv'
import Header from './Header'
import Navigation from './Navigation'
import SideBar from './SideBar'
import { listImage } from '../assets/img'
import Loading from '../components/shared/Loading'
import { useNavigate } from 'react-router-dom'

type MainLayoutProps = {
    children: React.ReactNode
}

const dataMusic = [
    {
        name: '180 deg',
        url: music.deg,
        img: listImage.img01
    },
    {
        name: 'Hop lofi',
        url: music.hopmix,
        img: listImage.img02
    },
    {
        name: 'Udon',
        url: music.udon,
        img: listImage.img03
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
    const navigate = useNavigate()

    // GET URL 
    const url = window.location.href
    const urlSplit = url.split('/')
    const urlLast = urlSplit[urlSplit.length - 1]

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
        } else if (isChooseBackground === 2) {
            setIsBackgroundDay('background-day-2')
            setIsBackgroundNight('background-night-2')
        } else if (isChooseBackground === 3) {
            setIsBackgroundDay('background-day-3')
            setIsBackgroundNight('background-night-3')
        } else {
            setIsBackgroundDay('background-day-4')
            setIsBackgroundNight('background-night-4')
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

    useEffect(() => {

        if (urlLast !== null)
            setIsRain(false)


    }, [urlLast])

    return (
        <View className={
            `h-screen  flex items-end  bg-[#f0f0f0] duration-500 text-black ${background ? isBackgroundDay : isBackgroundNight}`
        }>
            <div className='background-day-0 opacity-0'></div>
            <div className='background-day-1 opacity-0'></div>
            <div className='background-day-2 opacity-0'></div>
            <div className='background-day-3 opacity-0'></div>
            <div className='background-day-4 opacity-0'></div>
            <div className='background-night-0 opacity-0 '></div>
            <div className='background-night-1 opacity-0'></div>
            <div className='background-night-2 opacity-0'></div>
            <div className='background-night-3 opacity-0'></div>
            <div className='background-night-4 opacity-0'></div>
            <View className='fixed lg:bottom-2 bottom-16 right-0 lg:right-auto lg:left-2 z-[50] w-[3rem] h-[3rem] rounded-full bg-black flex justify-center items-center cursor-pointer'
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    history.push('/forum/story')
                }}
            >
                <IonIcon name='mail-outline' className='text-white  text-[1.5rem]' />
            </View>
            {checkMobile ? <Navigation /> : <SideBar />}
            <Header />
            <main className='lg:m-auto z-10 h-[89.5vh] relative overflow-y-scroll  lg:w-[80%]  xl:w-[60%] w-full  font-medium'>
                <Button className=' hidden lg:block z-30 left-[10%] group lg:fixed top-[40%] w-[1.2rem] h-[1.2rem] rounded-full border-2 border-white bg-[#ffffff83]'
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
                <View className=' fixed hidden lg:block bottom-0 right-0 cursor-pointer z-[10]  w-[5rem] h-[5rem]'
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
                </View>
                {
                    isRain && (
                        <View className=' z-0 fixed top-0 overflow-hidden left-0 bottom-0 right-0'>
                            <img src={
                                listImage.rain
                            }
                                className='w-[150%]'
                                alt="" />
                        </View>
                    )
                }
                <View className='fixed z-10 bottom-16 flex items-center gap-2 lg:bottom-18 lg:left-2 z-50  text-white '>
                    <View className='w-[3rem] relative h-[3rem] flex justify-center items-center rounded-full overflow-hidden'
                        // Rotate
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 10,
                            loop: Infinity,
                            ease: 'linear',
                        }}
                    >
                        <img src={
                            dataMusic[isMusic].img
                        }
                            className='w-full h-full object-cover '
                            alt="nev" />
                    </View>
                    <View className='flex items-center gap-2'>
                        <i className='hidden lg:block text-[0.9rem]'>{dataMusic[isMusic].name}</i>
                        <IonIcon name='musical-notes-outline' className='text-[1rem] opacity-50 ' />
                    </View>
                    <audio src={dataMusic[isMusic].url} ref={audioRef} >
                        <source src={dataMusic[isMusic].url} type="audio/mpeg" />
                    </audio>
                </View>
            </main >

        </View >
    )
}

export default MainLayout
