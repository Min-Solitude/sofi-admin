import { NavLink } from 'react-router-dom'
import View from '../../motion/View'
import IonIcon from '@reacticons/ionicons'

const Navigation = () => {
    return (
        <View className='fixed bottom-0 w-full shadow-md lg:w-[80%] lg:translate-x-[-50%] lg:left-[50%] z-50   left-[50%] translate-x-[-50%]'>
            <View className='bg-[#000000f1]  py-2 px-4 flex items-center gap-4 duration-200 justify-between  rounded-lg m-auto'>
                <NavLink
                    to='/'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] w-full duration-200 py-2 flex justify-center items-center rounded-lg text-white'
                            : 'text-white py-2 w-[50%] duration-200 flex justify-center items-center rounded-lg'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl ' />
                </NavLink>
                <NavLink
                    to='/forum'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] w-full duration-200 py-2 flex justify-center items-center rounded-lg text-white'
                            : 'text-white py-2  py-2 w-[50%]  flex duration-200 justify-center items-center rounded-lg'
                    }
                >
                    <IonIcon name='chatbox-ellipses-outline' className='text-xl ' />
                </NavLink>

                <NavLink
                    to='/about'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] py-2 w-full flex duration-200 justify-center items-center rounded-lg text-white'
                            : 'text-white py-2  py-2 w-[50%]  flex duration-200 justify-center items-center  rounded-lg'
                    }
                >
                    <IonIcon name='help-outline' className='text-2xl ' />
                </NavLink>
                <NavLink
                    to='https://www.nevsolit.website/'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] py-2 w-full duration-200 flex justify-center items-center rounded-lg text-white'
                            : 'text-white py-2  py-2 w-[50%]  flex duration-200 justify-center items-center rounded-lg '
                    }
                >
                    <span className='text-white font-bold'>N</span>
                </NavLink>
            </View>
        </View>
    )
}

export default Navigation
