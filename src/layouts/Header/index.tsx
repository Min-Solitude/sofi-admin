import Logo from '../../components/Logo'
import Account from './components/Account'
import Search from './components/Search'

const Header = () => {
    return (
        <header className='fixed flex top-0 items-center justify-between gap-2  bg-white w-full p-2 z-50 '>
            <Account />
            <Logo className='w-[4rem]' />
            <Search />
        </header>
    )
}

export default Header
