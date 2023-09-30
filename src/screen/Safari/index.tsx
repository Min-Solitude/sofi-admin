import { useEffect } from 'react';
import { toast } from 'react-toastify';
import View from '../../motion/View';
import Button from '../../components/Button';

let deferredPrompt: any;

function Safari() {

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
        });
    }, []);

    const handleAddToHomescreenClick = () => {
        if ('standalone' in window.navigator) {

            if (!window.navigator.standalone) {

                if (deferredPrompt) {
                    // Show the prompt
                    deferredPrompt.prompt();

                    // Wait for the user to respond to the prompt
                    deferredPrompt.userChoice.then((choiceResult: any) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the A2HS prompt');
                        } else {
                            console.log('User dismissed the A2HS prompt');
                        }
                        deferredPrompt = null;
                    });

                } else {
                    // deferredPrompt not available, direct users to manual install
                    toast.error('Trình duyệt của bạn không hỗ trợ tự động cài đặt. Vui lòng thêm vào màn hình chính bằng tay.');
                }

            } else {
                toast.success('Đã thêm vào màn hình chính');
            }

        } else {
            toast.error('Trình duyệt không hỗ trợ');
        }
    }

    return (
        <View className='h-screen w-full flex justify-center items-center'>
            <Button onClick={handleAddToHomescreenClick} className='text-[0.8rem] py-2 px-4 rounded-l bg-black text-white font-medium'>
                Thêm vào Màn hình chính
            </Button>
        </View>
    );

}

export default Safari;