import Section from '../../motion/Section'
import View from '../../motion/View'
import Forum from './components/Forum'
import Story from './components/Story'

const Home = () => {
    return (
        <Section>
            <View className='p-2 w-full'>
                <Story />
                <Forum />
            </View>
        </Section>
    )
}

export default Home
