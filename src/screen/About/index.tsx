import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import View from '../../motion/View';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';

import RiveFile from '../../riv/diamon.riv'
import Section from '../../motion/Section';
import IonIcon from '@reacticons/ionicons';


export default function About() {

    const [isContent, setIsContent] = useState('')

    const { rive, RiveComponent } = useRive({
        src: RiveFile,
        autoplay: true,
        stateMachines: "State Machine",
    })

    // StateMachineInputType.Boolean
    const isRuby = useStateMachineInput(rive, "State Machine", "Ruby")
    const isGarnet = useStateMachineInput(rive, "State Machine", "Garnet")
    const isSapphire = useStateMachineInput(rive, "State Machine", "Sapphire")

    useEffect(() => {
        setIsContent('garnet')
    }, [])

    return (
        <Section>
            <View className=' flex flex-col gap-8 rounded-2xl h-[80vh] text-white  p-2 '>
                <View className='w-full flex justify-center items-center'>
                    <View className='w-[10rem] h-[10rem] overflow-hidden rounded-full border-2 border-white flex justify-center items-center'>
                        <RiveComponent width={'100%'} height={'100%'} />
                    </View>
                </View>
                <View className=' flex flex-col gap-2'>
                    <View className='bg-[#00000070]  p-4 flex text-[0.9rem] flex-col items-center rounded-xl'>
                        <h1 className='text-[2rem] my-4 font-bold text-yellow-400'>
                            {
                                isContent === 'ruby' ? ' Hỗ trợ' : isContent === 'garnet' ? 'Giới thiệu' : 'Liên hệ'
                            }
                        </h1>
                        <p className='text-center'>
                            {
                                isContent === 'ruby' ? '1' :
                                    isContent === 'garnet' ? 'Là sinh viên, chúng tôi hiểu việc chỉ ngồi vào bàn học và tập trung khó khăn như thế nào. Đặc biệt là khi bạn phải đặt nhạc, hẹn giờ và ghi chú từ ba thiết bị hoặc trang web khác nhau, trong khi bị tấn công bởi quảng cáo, có thể là của một công cụ năng suất khác. Chúng tôi đã tạo nefy như một cách giúp bạn khắc phục điều này và cuối cùng là có một không gian kỹ thuật số cá nhân, yên tĩnh để làm việc, học tập hoặc chỉ đơn giản là thư giãn. Với các diễn đàn bài viết và không gian học tập thoải mái sẽ giúp bạn có cảm giác tuyệt vời hơn trong việc học'
                                        : 'Hãy liên hệ cho chúng tôi thông qua Email, số điện thoại để có thể phản hồi những sự cố hoặc những hoạt động từ Nefy. Xin chân thành cảm ơn!'
                            }
                        </p>
                        <p className='mt-4 text-center'>Chúng tôi không ngừng cải thiện, hãy đảm bảo theo dõi mạng xã hội của chúng tôi để được cập nhật!</p>
                        <View className='flex w-full flex-col gap-8 items-center mt-8'>
                            <Button onClick={() => {
                                isRuby!.value = true
                                isGarnet!.value = false
                                isSapphire!.value = false
                                setIsContent('ruby')
                            }} className='bg-red-500 py-3 rounded-lg justify-center text-white flex gap-2 items-center w-full'>
                                <IonIcon name='diamond' />
                                <span>
                                    Ruby
                                </span>
                            </Button>
                            <Button onClick={() => {
                                isGarnet!.value = true
                                isRuby!.value = false
                                isSapphire!.value = false
                                setIsContent('garnet')
                            }} className='bg-purple-500 py-3 rounded-lg justify-center text-white flex gap-2 items-center w-full'>
                                <IonIcon name='diamond' />
                                <span>
                                    Garnet
                                </span>
                            </Button>
                            <Button onClick={() => {
                                isSapphire!.value = true
                                isRuby!.value = false
                                isGarnet!.value = false
                                setIsContent('sapphire')
                            }} className='bg-blue-500 py-3 rounded-lg justify-center text-white flex gap-2 items-center w-full'>
                                <IonIcon name='diamond' />
                                <span>
                                    Sapphire
                                </span>
                            </Button>
                        </View>
                    </View>
                </View>
            </View >
        </Section>
    );
}