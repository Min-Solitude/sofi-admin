import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import Logo from '../../components/Logo'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import View from '../../motion/View'
import { changeBackground, chooseBackground } from '../../redux/reducers/screen/screen.reducer'
import Account from './components/Account'
import Button from "../../components/Button"
import IonIcon from "@reacticons/ionicons"
import { changeMusic, startMusic } from "../../redux/reducers/music/music.reducer"
import { toast } from "react-toastify"


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const Header = () => {
    const dispatch = useAppDispatch()
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isShowBanner, setIsShowBanner] = useState(false);
    const background = useAppSelector(state => state.screen.chooseBackground)
    const [isTimeClock, setIsTimeClock] = useState('')
    const [isStartMusic, setIsStartMusic] = useState(false)

    const startMusicStart = useAppSelector(state => state.music.status)
    const isBackground = useAppSelector(state => state.screen.background)


    const isMusic = useAppSelector(state => state.music.music)




    const toggleSwitch = () => {
        dispatch(changeBackground(!isBackground))
    };

    const handleZoomFullScreen = () => {
        setIsFullScreen(!isFullScreen)
        if (!isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }

    }

    const handleChooseBackground = (index: number) => {
        dispatch(chooseBackground(index))

    };

    useEffect(() => {
        // GET TIME AM PM
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();

        if (hour >= 6 && hour < 12) {
            setIsTimeClock(`${hour}:${minute} AM`);
        } else if (hour >= 12 && hour < 18) {
            setIsTimeClock(`${hour}:${minute} PM`);
        } else {
            setIsTimeClock(`${hour}:${minute} PM`);
        }

    }, [])

    const handleStartMusic = () => {
        setIsStartMusic(!isStartMusic)
        dispatch(startMusic(!isStartMusic))
    }

    const handlePrevMusic = () => {
        if (isMusic === 0) {
            dispatch(changeMusic(2))
        } else {
            dispatch(changeMusic(isMusic - 1))
        }
    }

    const handleNextMusic = () => {
        if (isMusic === 2) {
            dispatch(changeMusic(0))
        } else {
            dispatch(changeMusic(isMusic + 1))
        }
    }



    return (
        <header className={`fixed left-0  bg-[#0000006d] lg:bg-transparent  flex flex-col lg:flex-row gap-2 lg:gap-0 top-0 items-center lg:justify-between   w-full p-2 z-[100]  `}>
            <Logo className='text-[1.5rem] ' />

            <View className='flex gap-4 duration-200 items-center '>
                <View className="flex gap-2 items-center py-2 px-4 rounded-lg bg-[#0000006d]">
                    <Button className="flex justify-center items-center"
                        onClick={() => handlePrevMusic()}
                    >
                        <IonIcon name="play-skip-back-outline" className="  text-white" />
                    </Button>
                    <Button className="flex justify-center items-center"
                        onClick={() => handleStartMusic()}
                    >
                        {
                            startMusicStart ? (
                                <IonIcon name="pause-outline" className="  text-white" />
                            ) : (
                                <IonIcon name="play-outline" className="  text-white" />
                            )
                        }
                    </Button>
                    <Button className="flex justify-center items-center"
                        onClick={() => handleNextMusic()}
                    >
                        <IonIcon name="play-skip-forward-outline" className="  text-white" />
                    </Button>
                </View>
                <View className="py-1 px-4 hidden lg:block cursor-pointer rounded-lg bg-[#0000006d]">
                    <p className='text-white  font-OpenSans font-bold'>{isTimeClock}</p>
                </View>
                <div className={`switch ${isBackground ? 'bg-[#0000006d]' : 'bg-[#ffffff64]'}`} data-ison={isBackground} onClick={toggleSwitch}>
                    <motion.div className="handle" layout transition={spring} />
                </div>
                <Button className="bg-[#0000006d] flex justify-center items-center p-2 rounded-lg text-white"
                    onClick={() => setIsShowBanner(!isShowBanner)}
                >
                    <IonIcon name="image-outline" className="text-[1.5rem] " />
                </Button>
                <Button className={
                    `bg-[#0000006d] hidden lg:flex justify-center items-center p-2 rounded-lg text-white ${isFullScreen ? 'border border-yellow-400' : ''}`
                }
                    onClick={() => handleZoomFullScreen()}
                >
                    <IonIcon name="scan-outline" className="text-[1.5rem] " />
                </Button>

                <Account />
            </View>

            {
                isShowBanner && (
                    <View className="bottom-28 cursor-pointer lg:w-[40rem] lg:left-2 lg:bottom-2 fixed z-50 flex gap-2 items-center p-2 bg-black w-full rounded-lg  left-0"
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        exit={{ x: 200 }}
                        transition={{ duration: 0.5 }}
                    >
                        {
                            [
                                'https://cdna.artstation.com/p/assets/images/images/012/252/242/4k/f-a-herold-summervillage-day.jpg?1533827344',
                                'https://cdnb.artstation.com/p/assets/images/images/022/937/573/large/anastasiia-kriukova-day-final-srgb.jpg?1577374315',
                                'https://cdnb.artstation.com/p/assets/images/images/022/272/149/4k/naka-isurita-environment-sketching-7-day.jpg?1574784810https://cdnb.artstation.com/p/assets/images/images/022/272/149/4k/naka-isurita-environment-sketching-7-day.jpg?1574784810',
                            ].map((item, index) => (
                                <View key={index} className={`overflow-hidden rounded-lg border duration-200 h-[5rem] lg:h-[8rem] flex-1 ${background === index ? 'border-yellow-400' : 'border-transparent'
                                    }`}
                                    onClick={() => {
                                        handleChooseBackground(index)
                                        setIsShowBanner(false)
                                    }}
                                >
                                    <img src={item} alt="nev"
                                        className=" h-full duration-200 hover:brightness-75 hover:scale-110 w-full object-cover rounded-lg"
                                    />
                                </View>
                            ))
                        }
                    </View>
                )
            }
        </header >
    )
}

export default Header
