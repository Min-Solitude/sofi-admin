import React, { useEffect } from 'react'

import View from '../motion/View'
import Navigation from './Navigation'
import Header from './Header'

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [checkMobile, setCheckMobile] = React.useState(false)

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 1280) {
                setCheckMobile(true)
            } else {
                setCheckMobile(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <View className='min-h-screen bg-white'>
            {checkMobile ? <Navigation /> : null}
            <Header />
            <View className='lg:m-auto  lg:w-[80%]  xl:w-[60%] w-full bg-white  relative font-medium'>
                <main className='absolute w-full mb-[10rem]'>
                    <View className='mt-[4.5rem]'>{children}</View>
                </main>
            </View>
        </View>
    )
}

export default MainLayout
