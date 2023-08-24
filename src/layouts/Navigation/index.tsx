import { NavLink } from 'react-router-dom'
import View from '../../motion/View'
import IonIcon from '@reacticons/ionicons'

const Navigation = () => {
    return (
        <View className='fixed bottom-0 shadow-md lg:w-[80%] py-2 lg:translate-x-[-50%] lg:left-[50%] z-50   left-[50%] translate-x-[-50%]'>
            <View className='bg-[#00000090] border border-[#737272] py-2 px-4 flex items-center gap-4 duration-200 justify-between  rounded-lg m-auto'>
                <NavLink
                    to='/'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] duration-200 p-2 flex justify-center items-center rounded-lg text-white'
                            : 'text-white p-2 duration-200 flex justify-center items-center rounded-lg'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl ' />
                </NavLink>
                <NavLink
                    to='/meeting'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] duration-200 p-2 flex justify-center items-center rounded-lg text-white'
                            : 'text-white p-2 flex duration-200 justify-center items-center rounded-lg'
                    }
                >
                    <IonIcon name='videocam-outline' className='text-2xl ' />
                </NavLink>
                <NavLink
                    to='/c'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] p-2 duration-200 flex justify-center items-center rounded-lg text-white'
                            : 'text-white p-2 flex duration-200 justify-center items-center rounded-lg '
                    }
                >
                    <IonIcon name='body' className='text-xl ' />
                </NavLink>
                <NavLink
                    to='/about'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] p-2 flex duration-200 justify-center items-center rounded-lg text-white'
                            : 'text-white p-2 flex duration-200 justify-center items-center  rounded-lg'
                    }
                >
                    <IonIcon name='help-outline' className='text-2xl ' />
                </NavLink>
                <NavLink
                    to='/c'
                    className={(nav) =>
                        nav.isActive
                            ? 'bg-[#ffffff70] p-2 duration-200 flex justify-center items-center rounded-lg text-white'
                            : 'text-white p-2 flex duration-200 justify-center items-center rounded-lg '
                    }
                >
                    <IonIcon name='body' className='text-2xl ' />
                </NavLink>
            </View>
        </View>
    )
}

export default Navigation
