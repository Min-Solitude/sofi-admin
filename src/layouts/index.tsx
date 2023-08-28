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

    const background = useAppSelector((state) => state.screen.background)
    const [isBackgroundDay, setIsBackgroundDay] = useState('')
    const [isBackgroundNight, setIsBackgroundNight] = useState('')
    const isChooseBackground = useAppSelector((state) => state.screen.chooseBackground)

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

        // REMOVE POSTED IN LOCALSTORAGE AFTER 5 MINUTES

        const checkPosted = localStorage.getItem('Posted')
        if (checkPosted) {
            setTimeout(() => {
                localStorage.removeItem('Posted')
            }, 300000)
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
    }, [])



    return (
        <View className={
            `h-screen  flex items-end  bg-[#f0f0f0] duration-500 text-black ${background ? isBackgroundDay : isBackgroundNight}`
        }>
            {checkMobile ? <Navigation /> : <SideBar />}
            <Header />
            <main className='lg:m-auto h-[89.5vh] relative overflow-y-scroll  lg:w-[80%]  xl:w-[60%] w-full  font-medium'>
                {children}
                <View className='fixed bottom-16 flex items-center gap-2 lg:bottom-4 lg:right-4 z-50 bg-[#000000] py-2 px-4 rounded-lg text-white '>
                    <IonIcon name='disc' className='text-2xl cursor-pointer hover:' />
                    <i className='hidden lg:block'>{dataMusic[isMusic].name}</i>
                    <audio src={dataMusic[isMusic].url} ref={audioRef} >
                        <source src={dataMusic[isMusic].url} type="audio/mpeg" />
                    </audio>
                </View>
            </main >
        </View >
    )
}

export default MainLayout
