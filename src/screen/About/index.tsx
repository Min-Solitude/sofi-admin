import View from '../../motion/View';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';


export default function About() {
    const [isChoose, setIsChoose] = useState(0);

    return (
        <View className='bg-[#151515] text-white flex-col lg:flex-row flex gap-4 m-2 h-[92%] p-4 rounded-xl'>
            <View className='lg:flex-1 flex flex-col gap-4 items-start max-w-[18rem]'>
                <Logo className='text-[1.2rem]' />
                <View className='flex flex-wrap w-full gap-4 text-[0.8rem] lg:flex-col'>
                    <Button className={`py-2 rounded-lg lg:justify-start   ${isChoose === 0 && 'bg-[#ffffff50] lg:px-6'} px-2 duration-200 flex justify-center items-center`}
                        onClick={() => setIsChoose(0)}
                    >
                        Tổng quan
                    </Button>
                    <Button className={`py-2 rounded-lg lg:justify-start   ${isChoose === 1 && 'bg-[#ffffff50] lg:px-6 '} px-2  duration-200 flex justify-center items-center`}
                        onClick={() => setIsChoose(1)}
                    >
                        Nền tảng
                    </Button>
                    <Button className={`py-2 rounded-lg lg:justify-start  ${isChoose === 2 && 'bg-[#ffffff50] lg:px-6'} px-2  duration-200 flex justify-center items-center`}
                        onClick={() => setIsChoose(2)}
                    >
                        Liên hệ
                    </Button>
                </View>
            </View>
            <View className='bg-[#ffffff30] text-[0.9rem] rounded-xl p-4 flex-1'>
                {
                    isChoose === 0 && (
                        <View className='flex flex-col gap-4 items-start'>
                            <p className='text-start'>
                                Hầu hết các bạn sinh viên sẽ rất đam mê với học trên nền nhạc lofi. Vì thế Nefy sẽ đem lại cho bạn một không gian học tập thoải mái, không quảng cáo để đảm bảo bạn có một cảm giác học thoải mái. Chúng tôi vẫn đang tiếp tục phát triển để có đem lại cho bạn những sự trải nghiệm tốt nhất. Bạn có thể đăng ký trở thành thành viên của nefy để có thể cùng nhau phát triển cộng đồng hoặc theo dõi fanpage để nhận những thông báo hoặc sự kiện mới nhất.
                            </p>
                            <p className='text-start'>Nefy là một nhánh dịch vụ website giải trí của Nevsolit. Bạn có thể đến với Nevsolit để tìm kiếm những dịch vụ khác. <br /> <a href="https://www.nevsolit.website/" className='text-green-400'>Nevsolit</a></p>
                        </View>
                    )
                }
                {
                    isChoose === 1 && (
                        <View className='flex gap-4'>
                            <Link to='https://www.facebook.com/nefystudies/' className='p-2 rounded-lg bg-blue-500 flex justify-center items-center'>
                                <IonIcon name='logo-facebook' className='text-3xl' />
                            </Link>
                            <Link to='https://www.instagram.com/ktys4tt/' className='p-2 rounded-lg bg-pink-500 flex justify-center items-center'>
                                <IonIcon name='logo-instagram' className='text-3xl' />
                            </Link>
                            <Link to='https://www.youtube.com/channel/UC9Q6bqQX6qZ4X7Z9Z9Q9Z9Q' className='p-2 rounded-lg bg-red-500 flex justify-center items-center'>
                                <IonIcon name='logo-youtube' className='text-3xl' />
                            </Link>
                        </View>
                    )
                }
                {
                    isChoose === 2 && (
                        <View>
                            <p className='text-start'>Nếu bạn có bất kì thắc mắc nào về nefy, hãy liên hệ với chúng tôi qua email: <a href="mailto:nevsolit@gmail.com" className='text-green-400'>
                                nevsolit@gmail.com
                            </a></p>
                        </View>
                    )
                }
            </View>
        </View>
    );
}