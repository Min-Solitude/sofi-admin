import Section from '../../motion/Section'
import View from '../../motion/View'
import Advertisement from './components/Advertisement'
import Forum from './components/Forum'
import Story from './components/Story'

const Home = () => {
    return (
        <Section>
            <View className='px-2 w-full '>
                <View className='w-full  max-w-[30rem] lg:max-w-none m-auto'>
                    <Story />
                </View>
                <View className='w-full mt-4 mb-20 flex justify-center gap-4'>
                    {/* <View className='hidden bg-pink-100 flex-1 xl:block'>Notice</View> */}
                    <Forum />
                    <View className='hidden  flex-1  lg:block'>
                        <Advertisement />
                    </View>
                </View>
            </View>
        </Section>
    )
}

export default Home
