import { toast } from 'react-toastify'
import View from '../../../../motion/View'

const data = [
    {
        id: 1,
        image: 'https://i.pinimg.com/736x/27/6d/98/276d9820399d61af5250f3c9e578b16d.jpg'
    },
    {
        id: 2,
        image: 'https://i.pinimg.com/564x/d0/93/c9/d093c9ce8ab2c4e25d585915a5c8f13f.jpg'
    },
    {
        id: 3,
        image: 'https://i.pinimg.com/564x/78/e3/61/78e36189eabfe932d285e70cd9474dd6.jpg'
    },
    {
        id: 4,
        image: 'https://i.pinimg.com/564x/51/55/17/5155171b69971f915234237360473c14.jpg'
    },
    {
        id: 5,
        image: 'https://i.pinimg.com/564x/51/f2/ff/51f2ff05caccae7ea4d72683405e4334.jpg'
    },
    {
        id: 6,
        image: 'https://i.pinimg.com/564x/bb/19/7c/bb197c6887c48031ab0ace210c2afe11.jpg'
    },
    {
        id: 7,
        image: 'https://i.pinimg.com/564x/d5/54/9b/d5549bab30e7f374e7ef2fec7456e89b.jpg'
    }
]

const Story = () => {
    return (
        <View className=' flex gap-4 w-full mt-4    m-auto  flex-col text-white'>
            <View className='carousel  carousel-center  max-w-[30rem] lg:max-w-none space-x-4  rounded-box'>
                {data.map((item, index) => (
                    <View className='carousel-item shadow-xl cursor-pointer w-[10rem] h-[15rem]' key={index}
                        onClick={() => toast.success('Coming Soon')}
                    >
                        <img
                            src={item.image}
                            className='rounded-box object-cover w-full h-full'
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Story
