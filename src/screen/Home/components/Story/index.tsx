import View from '../../../../motion/View'

const Story = () => {
    return (
        <View className=' flex gap-4 w-full    m-auto  flex-col text-white'>
            <View className='carousel  carousel-center  max-w-[30rem] lg:max-w-none space-x-4  rounded-box'>
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <View className='carousel-item shadow-xl w-[10rem] h-[15rem]' key={index}>
                        <img
                            src='https://i.pinimg.com/564x/f6/cd/d0/f6cdd0ef8ba7db15c1be04173d75ac03.jpg'
                            className='rounded-box object-cover w-full h-full'
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Story
