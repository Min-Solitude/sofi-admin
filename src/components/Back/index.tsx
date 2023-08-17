import Button from '../Button'
import IonIcon from '@reacticons/ionicons'
import history from '../../redux/store/history'

const Back = () => {
    return (
        <Button onClick={() => history.back()} type='button' className='flex justify-center items-center text-primary'>
            <IonIcon name='arrow-back-outline' className='text-[1.4rem] ' />
        </Button>
    )
}

export default Back
