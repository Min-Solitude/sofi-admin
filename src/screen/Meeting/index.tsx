import Back from '../../components/Back'
import Button from '../../components/Button'
import Section from '../../motion/Section'
import View from '../../motion/View'
import history from '../../redux/store/history'

const Meeting = () => {
    const handleJoinRoom = () => {
        const isIdRoom = Math.random().toString(36).substring(7)

        history.push(`/meeting/room/${isIdRoom}`)
    }

    return (
        <Section>
            <View className='p-2 flex flex-col gap-4 w-full'>
                <View>
                    <Back />
                </View>
                <View className='w-full relative rounded-lg h-[15rem] lg:h-[20rem]'>
                    <img
                        src='https://wallpaper.dog/large/20554006.jpg'
                        alt='nev'
                        className='w-full h-full object-cover rounded-lg '
                    />
                    <View className='absolute flex flex-col gap-4 bottom-0 left-[50%] translate-x-[-50%] xl:w-[40%] bg-white translate-y-[50%] w-[90%] lg:w-[60%] rounded-lg shadow-md p-4 border border-gray-300'>
                        <h1 className=' text-[1.2rem] font-bold text-gray-700'>Gọi video</h1>
                        <View className='flex flex-col gap-4 '>
                            <Button
                                className='text-[0.9rem] py-2 background-gradient text-white rounded-lg'
                                type='button'
                                onClick={handleJoinRoom}
                            >
                                <span className='text-sm'>Tham gia</span>
                            </Button>
                        </View>
                    </View>
                </View>
                <View className='flex flex-col gap-8'>
                    <View className='w-full relative rounded-lg h-auto bg-gray-100 mt-24 '>
                        <img
                            src='https://www.ringcentral.com/content/dam/rc-www/en_us/images/content/seo/resource-from-content/compose-copy-png-rendition.webp'
                            alt='nev'
                            className='w-full h-full object-cover rounded-lg '
                        />
                    </View>
                    <View className='text-[0.9rem] text-gray-700 flex flex-col gap-4 mb-24'>
                        <p>
                            1. Giao tiếp trực tiếp: Gọi video cho phép bạn trò chuyện và gặp gỡ người dùng khác một cách
                            trực tiếp, giúp tạo ra sự kết nối và tương tác tự nhiên.
                        </p>
                        <p>
                            2. Tiện lợi và dễ sử dụng: Chỉ cần một vài bước đơn giản, bạn có thể bắt đầu cuộc gọi video
                            ngay lập tức mà không cần cài đặt phần mềm hay plugin phức tạp.
                        </p>
                        <p>
                            3. Tương thích trên nhiều nền tảng: Tính năng gọi video của chúng tôi tương thích với các
                            trình duyệt phổ biến, cho phép bạn gọi video từ máy tính, điện thoại di động và máy tính
                            bảng.
                        </p>
                        <p>
                            4. Bảo mật và riêng tư: Chúng tôi đặt sự bảo mật và riêng tư lên hàng đầu. Tất cả cuộc gọi
                            video được mã hóa và thông tin cá nhân của bạn được bảo vệ.
                        </p>
                        <p>
                            Hãy trải nghiệm tính năng gọi video tuyệt vời này trên trang web của chúng tôi và khám phá
                            thế giới giao tiếp trực tuyến mới mẻ!
                        </p>
                    </View>
                </View>
            </View>
        </Section>
    )
}

export default Meeting
