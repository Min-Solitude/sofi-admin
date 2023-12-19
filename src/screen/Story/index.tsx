import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import Section from '../../motion/Section'
import { getAllStory } from '../../redux/reducers/story/story.reducer'
import Loading from '../../components/shared/Loading'
import IonIcon from '@reacticons/ionicons'
import { Link } from 'react-router-dom'
import Button from '../../components/customs/Button'
import View from '../../motion/View'

export default function StoryPage() {
    const dispatch = useAppDispatch()
    const listStory = useAppSelector(state => state.story.listStory)
    const loading = useAppSelector(state => state.story.loading)

    const [isShowModal, setIsShowModal] = useState<string | null>('')

    useEffect(() => {
        dispatch(getAllStory())
    }, [])

    console.log(listStory);


    return (
        <Section className='flex gap-4'>
            {
                loading && <Loading />
            }
            <div className='flex-1 flex flex-col gap-4 w-full'>
                {
                    listStory && listStory.map((story, index) => (
                        <div key={index} className='flex w-full gap-2 bg-white border relative rounded-xl border-gray-200  p-2 shadow-main'>
                            <div className=' p-2 rounded-xl bg-gray-200 w-[10vw]'>
                                <div className='h-[7rem] bg-yellow-50 rounded-lg overflow-hidden w-full'>
                                    <img src={story.photoURL} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex flex-col mt-4 text-[14px] items-center'>
                                    <p className='py-1 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-semibold'>{story.account}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-start justify-start'>
                                <p><span className='font-semibold'>Người đăng: </span> {story.displayName ? story.displayName : '---'}</p>
                                <p><span className='font-semibold'>Email: </span> {story.email ? story.email : '---'}</p>
                                <p><span className='font-semibold'>Số điện thoại: </span> {story.phoneNumber ? story.phoneNumber : '---'}</p>
                                <p><span className='font-semibold'>Trạng tháii: </span> {
                                    story.status === 'pending' ? (
                                        <span className='text-yellow-500'>Đang chờ duyệt</span>
                                    ) : story.status === 'approved' ? (
                                        <span className='text-green-500'>Đã duyệt</span>
                                    ) : (
                                        <span className='text-red-500'>Đã từ chối</span>
                                    )
                                }</p>
                                <Button className='mt-2 text-sm py-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg'
                                    onClick={() => setIsShowModal(story.story)}
                                >
                                    Xem
                                </Button>
                                {
                                    isShowModal && (
                                        <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[#000000d7] z-50'>
                                            <View className='p-4 rounded-xl bg-white w-[40vw] m shadow-main'
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                            >
                                                {isShowModal}
                                                <Button className='mt-4 text-sm py-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg'
                                                    onClick={() => setIsShowModal(null)}
                                                >
                                                    Đóng
                                                </Button>
                                            </View>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                story.isVip && (
                                    <div className='absolute w-[2rem] h-[2rem] rounded-full bg-white top-0 right-0 border border-blue-500 -translate-y-1/2 translate-x-1/2 shadow-main flex justify-center items-center'>
                                        <IonIcon name='diamond' className='text-xl text-blue-500' />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
            <div className='flex-1 max-w-[22rem] bg-yellow-100 h-[89vh] rounded-xl overflow-hidden'>
                <img src="https://i.pinimg.com/564x/4e/6e/6a/4e6e6a8fb9fa171ae9ca7e95df2a35b0.jpg" alt="" className='w-full h-full object-cover' />
            </div>
        </Section>
    )
}
