import { useState } from 'react'
import Button from '../../../../components/Button'
import WatchNotice from '../../../../components/WatchNoti'
import { useAppSelector } from '../../../../hooks/useRedux'
import View from '../../../../motion/View'

const data = {
    title: 'Diễn đàn Nevsad chính thức hoạt động!!!',
    image: 'https://i.pinimg.com/originals/7d/07/a2/7d07a255678962d30d8717dcf5dbd266.gif',
    content: 'Xin chào các bạn, mình đang bắt đầu xây dựng 1 website dùng để nghe nhạc học tập. Ở đây các bạn có thể lắng nghe những bản nhạc lofi không quảng cáo. Và cũng đăng những bài viết của mình. Hết một ngày diễn đàn sẽ reset 1 lần và các bạn đăng bài viết 1 ngày 1 lần. Đồng thời các bạn có thể đăng những câu chuyện của mình gửi cho chúng tôi để có thể được đăng lên diễn đàn story của chúng tôi. Bạn cũng có thể đăng ký làm một thành viên của Nefy để cùng nhau phát triển nó.'
}

const Advertisement = () => {
    const [isOption, setIsOption] = useState(false)
    const [isWatch, setIsWatch] = useState(false)

    const account = useAppSelector(state => state.auth.account)



    return (
        <View className='flex flex-col'>
            <View className='flex flex-col shadow-md bg-[#00000070] text-white rounded-lg'>
                <View className='py-2 px-4  flex items-center justify-between'>
                    <h1 className='text-[1.2rem] text-white font-bold '>Bảng tin</h1>
                    {/* <Button className='flex justify-center items-center relative text-gray-500'
                        onClick={() => setIsOption(!isOption)}
                    >
                        <IonIcon name='ellipsis-horizontal' className='text-xl' />
                        {
                            isOption && (
                                <View className='absolute bg-black right-[0rem] bottom-[-2rem]  w-[8rem]'>1</View>
                            )
                        }
                    </Button> */}
                </View>
                <View className='min-h-[15rem]  '>
                    <img
                        src={data.image}
                        alt='nev'
                        className='w-full h-full object-cover'
                    />
                </View>
                <View className='px-4 pb-4 flex flex-col gap-2 items-start'>
                    <h2 className='text-[1.1rem] mt-2'>{data.title}</h2>
                    <p className='line-clamp-3  text-[0.8rem] text-gray-300'>
                        {data.content}
                    </p>
                    <Button
                        className='text-[0.9rem]  text-white rounded-lg mt-4'
                        type='button'
                        onClick={() => setIsWatch(!isWatch)}
                    >
                        Xem thông tin
                    </Button>
                </View>
            </View>
            {
                isWatch && <WatchNotice content={data.content} title={data.title} image={data.image} close={() => setIsWatch(false)} />
            }
        </View >
    )
}

export default Advertisement
