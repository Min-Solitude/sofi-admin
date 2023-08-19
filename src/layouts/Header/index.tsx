import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useAppSelector } from '../../hooks/useRedux'
import Account from './components/Account'

const Header = () => {
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    const [checkMobile, setCheckMobile] = useState(false)

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
        <header className='fixed left-0 lg:w-4/5 xl:w-3/5 lg:left-[50%] lg:translate-x-[-50%]  flex top-0 items-center justify-between gap-2  bg-white w-full p-4 z-50 '>
            <Logo className='w-[3rem]' />
            {!checkMobile && (
                <nav className='flex items-center gap-8 text-[0.9rem] font-medium text-gray-600'>
                    <NavLink to='/' className={(nav) => (nav.isActive ? 'text-primary font-bold duration-200' : '')}>
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to='/meeting'
                        className={(nav) => (nav.isActive ? ' text-primary font-bold duration-200' : '')}
                    >
                        Phòng họp
                    </NavLink>
                    <NavLink
                        to='/about'
                        className={(nav) => (nav.isActive ? 'text-primary font-bold duration-200' : '')}
                    >
                        Giới thiệu
                    </NavLink>
                    <NavLink
                        to='/contact'
                        className={(nav) => (nav.isActive ? 'text-primary font-bold duration-200' : '')}
                    >
                        Liên hệ
                    </NavLink>
                </nav>
            )}
            {accessToken ? (
                <Account />
            ) : (
                <Link to='/auth'>
                    <Button className='py-2 px-4 rounded-lg background-gradient text-white text-[0.9rem]'>
                        Đăng nhập
                    </Button>
                </Link>
            )}
        </header>
    )
}

export default Header
