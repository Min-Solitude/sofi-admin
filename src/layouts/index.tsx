import React, { useEffect } from 'react';
import history from '../redux/store/history';
import Header from './components/Header';
import SideBar from './components/SideBar';


type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {

    const isLogin = sessionStorage.getItem('isLogin');

    useEffect(() => {
        if (!isLogin) {
            history.push('/login');
        }
    }, [isLogin])


    return (
        <main className='min-h-screen text-[14px]'>
            <div className='flex top-0'>
                <div className='h-screen flex-1 sticky top-0 max-w-[18rem]'>
                    <SideBar className=' bg-white  h-screen fixed w-[18rem]' />
                </div>
                <div className='flex-1'>
                    <Header className='bg-white sticky top-0 px-4 py-2' />
                    <div className='px-4 py-6 bg-white min-h-screen '>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainLayout
