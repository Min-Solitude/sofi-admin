import View from '../../motion/View'
import history from '../../redux/store/history'

type LogoProps = {
    className?: string
}

const Logo = ({ className }: LogoProps) => {
    return (
        <View
            className={` cursor-pointer ${className} font-bold text-white flex justify-center`}
            onClick={() => history.push('/')}
        >
            Nefy
        </View>
    )
}

export default Logo
