import { useEffect, useState } from 'react';
import View from '../../motion/View';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/useRedux';

const Lofi = () => {

    const [isSayHello, setIsSayHello] = useState('');
    const accountLogin = useAppSelector(state => state.auth.account);
    const [isDate, setIsDate] = useState('');

    useEffect(() => {

        const date = new Date();
        const hour = date.getHours();

        if (hour >= 6 && hour < 12) {
            setIsSayHello('Good Morning');
        } else if (hour >= 12 && hour < 18) {
            setIsSayHello('Good Afternoon');
        } else {
            setIsSayHello('Good Evening');
        }

        setIsDate(date.toLocaleDateString('en-GB', {
            month: 'long',
            day: 'numeric'
        }));


    }, []);

    return (
        <View className='h-[85vh] '>
            <motion.div
                className='fixed z-50 lg:top-[70%] lg:left-[20%] top-[20%] left-1/2 translate-x-[-50%] text-white  cursor-move'
                drag
            >
                <View className='mb-4'>
                    <p className='text-[1.8rem] font-OpenSans font-medium'>{isSayHello}, {accountLogin.displayName} <span className='ml-4'>{isSayHello === 'Good Evening' ? '🌙' : '☀️'}</span> </p>
                    <p className='text-[1rem]'>
                        Today is {isDate}
                    </p>
                </View>
                <i className='text-[0.9rem]'>
                    "Code lỗi đóng laptop lại đi ngủ"
                </i>
            </motion.div>
        </View>
    );
};

export default Lofi;