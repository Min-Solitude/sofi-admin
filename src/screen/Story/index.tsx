import React from 'react'
import Section from '../../motion/Section'
import View from '../../motion/View'
import Button from '../../components/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { sendStory } from '../../redux/reducers/post/post.reducer'

const Story = () => {

    const [isStory, setIsStory] = React.useState('')

    const accountLogin = useAppSelector((state) => state.auth.account)
    const dispatch = useAppDispatch()

    const handleSendStory = () => {
        const data = {
            story: isStory,
            email: accountLogin.email,
            disPlayName: accountLogin.displayName,
            uid: accountLogin.uid,
        }

        dispatch(sendStory(data))
    }

    return (
        <Section>
            <View className='w-full lg:bg-[#000000ab] mt-4 bg-black lg:mt-8 border border-[#202020] p-4 text-white text-[0.9rem] rounded-xl'>
                <h1 className='font-bold text-[1.6rem]'>Lời nói</h1>
                <p className='text-gray-400'>Hãy viết câu chuyện của bạn, nó sẽ được lựa chọn để đưa lên bản tin của Nefy!!!</p>
                <textarea
                    value={isStory}
                    onChange={(e) => setIsStory(e.target.value)}
                    placeholder='Viết đi đừng sợ :)'
                    className='mt-4 w-full lg:h-[60vh] outline-none h-[50vh] rounded-lg bg-[#111111] text-[0.9rem] p-4' />
                <Button className='mt-4 py-2 px-8 bg-[#ffffffd5]  text-black rounded-lg flex justify-center items-center'
                    onClick={() => handleSendStory()}
                >
                    Gửi
                </Button>
            </View>
        </Section>
    )
}

export default Story