import React, { useEffect, useState } from 'react'

import View from '../motion/View'
import Header from './Header'
import Navigation from './Navigation'
import { useAppSelector } from '../hooks/useRedux'
import history from '../redux/store/history'
import SideBar from './SideBar'
import Button from '../components/Button'
import IonIcon from '@reacticons/ionicons'

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [checkMobile, setCheckMobile] = React.useState(false)
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    const background = useAppSelector((state) => state.screen.background)


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

        const checkPosted = localStorage.getItem('Posted')
        if (checkPosted) {
            setTimeout(() => {
                localStorage.removeItem('Posted')
            }, 86400000)
        }
    }, [])




    return (
        <View className={
            `h-screen  flex items-end duration-1000 bg-[#f0f0f0] ${background ? 'background-night' : 'background-day'} text-black `
        }>
            {checkMobile ? <Navigation /> : <SideBar />}
            <Header />
            <main className='lg:m-auto h-[93.5vh] overflow-y-scroll  lg:w-[80%]  xl:w-[60%] w-full  font-medium'>
                {children}
            </main>
        </View>
    )
}

export default MainLayout
