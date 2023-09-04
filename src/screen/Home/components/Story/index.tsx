import { toast } from 'react-toastify'
import View from '../../../../motion/View'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../../../configs'
import WatchStory from '../../../../components/WatchStory'

export type StoryProps = {
    disPlayName: string
    email: string
    id: string
    status: boolean
    story: string
    timestamp: number
    uid: string
}


const Story = () => {
    const [isStory, setIsStory] = useState([])
    const [isWatchStory, setIsWatchStory] = useState<string | null>(null)

    useEffect(() => {
        const collectionRef = collection(db, 'stories')
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
            setIsStory(
                querySnapshot.docs.map((doc: any) => ({
                    ...doc.data(),
                    id: doc.id,
                    timestamp: doc.data().timestamp?.toDate().getTime()
                }))
            )
        })

        return unsubscribe
    }, [])


    return (
        <View className=' flex gap-4 w-full mt-4    m-auto  flex-col text-white'>
            <View className='carousel  carousel-center  max-w-[30rem] lg:max-w-none space-x-4  rounded-box'>
                {isStory.map((item: StoryProps, index) =>
                    item.status && (
                        <View className='carousel-item shadow-xl cursor-pointer px-2 w-[10rem] rounded-xl flex justify-center items-center bg-[#000000c7] h-[15rem]' key={index}
                            onClick={() => {
                                setIsWatchStory(item.story)
                            }}
                        >
                            <i className='text-center text-[0.5rem]'>{item.story}</i>
                        </View>
                    )
                )}
            </View>
            {
                isWatchStory && (
                    <WatchStory close={() => setIsWatchStory(null)}>
                        {isWatchStory}
                    </WatchStory>
                )
            }
        </View>
    )
}

export default Story
