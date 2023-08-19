import { NavLink } from 'react-router-dom'
import View from '../../motion/View'
import IonIcon from '@reacticons/ionicons'
import { motion } from 'framer-motion'

const Navigation = () => {
    return (
        <View className='fixed bottom-0 p-2  lg:w-[80%] lg:translate-x-[-50%] lg:left-[50%] z-50  w-full left-0'>
            <View className=' px-4 flex items-center duration-200  justify-between rounded-lg border shadow-md bg-white border-gray-200'>
                <NavLink
                    to='/'
                    className={(nav) =>
                        nav.isActive
                            ? 'background-gradient shadow-md border-2 duration-200 border-white w-[3rem] translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    '
                            : 'rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]'
                    }
                >
                    <IonIcon name='home-outline' className='text-2xl ' />
                </NavLink>
                <NavLink
                    to='/meeting'
                    className={(nav) =>
                        nav.isActive
                            ? 'background-gradient w-[3rem] shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    '
                            : 'rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]'
                    }
                >
                    <IonIcon name='videocam-outline' className='text-2xl ' />
                </NavLink>
                <motion.button
                    className={
                        'w-[3.5rem] h-[3.5rem] rounded-full bg-gray-100 border border-gray-300 shadow-md flex justify-center items-center '
                    }
                    initial={{ scale: 1, y: '-50%' }}
                    whileTap={{ scale: 0.9, y: '-50%' }}
                >
                    <IonIcon name='add-outline' className='text-2xl ' />
                </motion.button>
                <NavLink
                    to='/about'
                    className={(nav) =>
                        nav.isActive
                            ? 'background-gradient w-[3rem]  shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    '
                            : 'rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]'
                    }
                >
                    <IonIcon name='help-outline' className='text-2xl ' />
                </NavLink>
                <NavLink
                    to='/c'
                    className={(nav) =>
                        nav.isActive
                            ? 'background-gradient w-[3rem] shadow-md border-2 border-white duration-200 translate-y-[-50%] text-white rounded-full h-[3rem] flex justify-center items-center    '
                            : 'rounded-full h-[3rem] flex justify-center items-center text-gray-700  w-[3rem]'
                    }
                >
                    <IonIcon name='body' className='text-2xl ' />
                </NavLink>
            </View>
        </View>
    )
}

export default Navigation
