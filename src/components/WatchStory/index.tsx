import React from 'react'
import Section from '../../motion/Section'
import View from '../../motion/View'
import { type } from 'os'

type WatchStoryProps = {
    children: React.ReactNode,
    close: () => void
}

const WatchStory = ({ children, close }: WatchStoryProps) => {
    return (
        <View className='fixed top-0 left-0 bottom-0 right-0 z-50 bg-black text-white flex justify-center items-center'
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                duration: 0.5
            }}
            onClick={() => close()}

        >
            <i>
                "{children}"
            </i>
        </View>
    )
}

export default WatchStory