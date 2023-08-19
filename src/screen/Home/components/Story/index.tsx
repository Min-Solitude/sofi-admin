import View from '../../../../motion/View'

const Story = () => {
    return (
        <View className='py-2 flex items-center lg:py-8 overflow-x-scroll '>
            <View className='flex gap-4 items-center pl-2 '>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                    <View
                        className='w-[4rem] relative cursor-pointer  h-[4rem] flex justify-center items-center rounded-full bg-gray-100'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        key={index}
                    >
                        <span className='absolute  w-[4.5rem] rounded-full round border-2 border-dashed border-secondary  bg-transparent h-[4.5rem]'></span>
                        <img
                            src='https://i.pinimg.com/564x/cd/bb/e8/cdbbe85cc12c46e58ff986cb3ce81ee3.jpg'
                            alt='nev'
                            className='w-full h-full object-cover rounded-full'
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Story
