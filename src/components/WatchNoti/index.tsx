import IonIcon from '@reacticons/ionicons'
import View from '../../motion/View'
import Button from '../Button'

type WatchNoticeProps = {
    content: string,
    title: string,
    image: string,
    close: () => void
}

const WatchNotice = ({ content, title, image, close }: WatchNoticeProps) => {
    return (
        <View className='fixed top-0 left-0 bottom-0 right-0 z-[1000000] bg-black flex justify-center text-white items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >

            <View className='max-w-[40rem] overflow-y-scroll h-[80vh]'>
                <View className='w-full relative rounded-lg overflow-hidden'>
                    <Button className='flex justify-center items-center absolute top-4 right-4 w-[3rem] h-[3rem] bg-black rounded-full text-white   '
                        onClick={close}
                    >
                        <IonIcon name='close' className='text-xl' onClick={close} />
                    </Button>
                    <img
                        src={image}
                        alt='nev'
                        className='w-full h-full object-cover'
                    />
                </View>
                <h1 className='mt-4 text-[1.2rem] font-bold'>{title}</h1>
                <p className='mt-4 text-[0.9rem]'>
                    {content}
                </p>
            </View>
        </View>
    )
}

export default WatchNotice