import { NavLink } from "react-router-dom"
import View from "../../motion/View"
import IonIcon from "@reacticons/ionicons"

const SideBar = () => {
    return (
        <View className="fixed top-0 left-2 h-screen flex items-center">
            <View className="flex flex-col items-center justify-center p-2 border border-[#737272] bg-[#00000090] rounded-lg gap-2 justify-center">
                <NavLink
                    to='/'
                    className={(nav) =>
                        nav.isActive
                            ? 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#ffffff70]'
                            : 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#00000070]'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl text-[#d6d4d4] ' />
                </NavLink>
                <NavLink
                    to='/meeting'
                    className={(nav) =>
                        nav.isActive
                            ? 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#ffffff70]'
                            : 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#00000070]'
                    }
                >
                    <IonIcon name='videocam-outline' className='text-xl text-[#d6d4d4] ' />
                </NavLink>
                <NavLink
                    to='/c'
                    className={(nav) =>
                        nav.isActive
                            ? 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#ffffff70]'
                            : 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#00000070]'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl text-[#d6d4d4]' />
                </NavLink>
                <NavLink
                    to='/about'
                    className={(nav) =>
                        nav.isActive
                            ? 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#ffffff70]'
                            : 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#00000070]'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl text-[#d6d4d4]' />
                </NavLink>
                <NavLink
                    to='/c'
                    className={(nav) =>
                        nav.isActive
                            ? 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#ffffff70]'
                            : 'rounded-lg  w-[2.5rem] h-[2.5rem] flex justify-center items-center bg-[#00000070]'
                    }
                >
                    <IonIcon name='home-outline' className='text-xl text-[#d6d4d4]' />
                </NavLink>
            </View>
        </View>
    )
}

export default SideBar