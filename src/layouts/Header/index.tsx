import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import { useAppDispatch } from '../../hooks/useRedux'
import View from '../../motion/View'
import { changeBackground } from '../../redux/reducers/screen/screen.reducer'
import Account from './components/Account'


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const Header = () => {
    const dispatch = useAppDispatch()
    const [isOn, setIsOn] = useState(true);

    const toggleSwitch = () => {
        setIsOn(!isOn)
        dispatch(changeBackground(!isOn))
    };





    return (
        <header className={`fixed left-0   flex top-0 items-center justify-between   w-full p-2 z-50  `}>
            <Logo className='text-[1.5rem] ' />

            <View className='flex gap-4 duration-200 lg:gap-8 items-center'>
                <div className={`switch ${isOn ? 'bg-[#0000006d]' : 'bg-[#ffffff64]'}`} data-ison={isOn} onClick={toggleSwitch}>
                    <motion.div className="handle" layout transition={spring} />
                </div>
                <Account />
            </View>
        </header>
    )
}

export default Header
