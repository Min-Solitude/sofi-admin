import { useRive } from 'rive-react'
import View from '../../../motion/View'
import { listRive } from '../../../riv'

const Loading = () => {
    const { rive, RiveComponent } = useRive({
        src: listRive.loading,
        autoplay: true,
    })
    return (
        <View className='fixed z-[1000] top-0 z-[60] left-0 bottom-0 right-0 bg-[#000000] flex justify-center items-center'>
            <View className='w-[15rem] h-[15rem] lg:w-[20rem] lg:h-[20rem]'>
                <RiveComponent width={'100%'} height={'100%'} />
            </View>
        </View>
    )
}

export default Loading
