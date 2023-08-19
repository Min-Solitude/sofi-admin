import View from '../../motion/View'
import history from '../../redux/store/history'

type LogoProps = {
    className?: string
}

const Logo = ({ className }: LogoProps) => {
    return (
        <View className={` cursor-pointer ${className}`} onClick={() => history.push('/')}>
            <img
                src='https://uploads-ssl.webflow.com/6036be4d49d4d03cd028a976/609a398dad5fb298a54f6d2b_iorama_black.svg'
                alt='Nev'
            />
        </View>
    )
}

export default Logo
