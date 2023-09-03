import View from '../../../motion/View'

const Loading = () => {
    return (
        <View className='fixed top-0 z-[60] left-0 bottom-0 right-0 bg-[#000000] flex justify-center items-center'>
            <span className='rounded-full border-4 border-l-transparent animate-spin h-[3rem] w-[3rem]  border-primary'></span>
        </View>
    )
}

export default Loading
