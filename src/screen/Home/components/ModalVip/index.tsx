import React from 'react'
import { User, destroyVipAccount, updateVipAccount } from '../../../../redux/reducers/auth'
import IonIcon from '@reacticons/ionicons'
import Swal from 'sweetalert2'
import Button from '../../../../components/customs/Button'
import { useAppDispatch } from '../../../../hooks/useRedux'

type ModalVipProps = {
    user: User
    index: number
}

export default function ModalVip({ user, index }: ModalVipProps) {

    const dispatch = useAppDispatch();

    const [isValuePacket, setIsValuePacket] = React.useState<string>(user?.vip?.package || '')
    const [isValueTitle, setIsValueTitle] = React.useState<string>('Thông báo nâng cấp gói thành công')
    const [isValueContent, setIsValueContent] = React.useState<string>('')

    const handleUpdateVip = (e: React.FormEvent<HTMLFormElement>) => {

        if (!isValuePacket) {
            Swal.fire({
                title: 'Vui lòng chọn gói VIP!',
                icon: 'error'
            });
            return;
        }

        const payload = {
            id: user.uid,
            package: isValuePacket,
            titleNotice: isValueTitle,
            contentNotice: isValueContent,
        }

        dispatch(updateVipAccount(payload))
    }

    const handleDestroyVip = async (id: string) => {
        const confirmDestroy = await Swal.fire({
            title: 'Bạn có chắc chắn muốn hủy gói VIP cho thằng lồn này không?',
        });

        if (confirmDestroy.isConfirmed) {
            const payload = {
                id
            }

            dispatch(destroyVipAccount(payload))
        }
    }

    // format epoch time
    const formatTime = (time: Date) => {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const handleNightAndDayRunOutOfTime = (time: Date) => {
        const date = new Date(time);
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const diffDay = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDay;
    }

    return (
        <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Nạp card 20 ngàn!</h3>
                <div className='mt-4'>
                    <div className='flex gap-2 items-center'>
                        {
                            user?.vip?.isVip ? (
                                <div>
                                    <IonIcon name='diamond' className='text-xl text-blue-500' />
                                </div>
                            ) : (
                                <div>
                                    <IonIcon name='diamond-outline' className='text-xl' />
                                </div>
                            )
                        }
                        <div className='-translate-y-1'>
                            {
                                user?.vip?.isVip ? (
                                    <p><span className='text-blue-500'>VIP ({user?.vip?.package === 'month' ? 'tháng' : 'năm'})</span> - Hết hạn: {user?.vip?.expiredAt ? formatTime(user?.vip?.expiredAt) : ''}</p>
                                ) : (
                                    <i className='font-medium text-xs'>Thằng lồn này chưa nạp card!</i>
                                )
                            }
                        </div>
                    </div>
                    {/* confirm  */}
                    {
                        user?.vip?.isVip ? (
                            <div className='mt-4 font-medium flex flex-col gap-4'>
                                <h1>Đang sử dung gói {user?.vip?.package === 'month' ? 'tháng' : 'năm'} : <span className='py-1 px-4 rounded-full bg-blue-500 text-white'>{user?.vip?.createdAt ? formatTime(user?.vip?.createdAt) : ''}</span> - <span className='py-1 px-4 rounded-full bg-red-500 text-white'>{user?.vip?.expiredAt ? formatTime(user?.vip?.expiredAt) : ''}</span></h1>
                                <p>
                                    Còn lại: <span className='py-1 px-4 rounded-full bg-green-500 text-white'>{user?.vip?.expiredAt ? handleNightAndDayRunOutOfTime(user?.vip?.expiredAt) : ''} ngày</span>
                                </p>
                                <Button className='mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main'
                                    onClick={() => handleDestroyVip(user?.uid)}
                                >
                                    Hủy gói
                                </Button>
                            </div>
                        ) : (
                            <form className='mt-4' onSubmit={async (e) => {
                                e.preventDefault();

                                const confirmUpdate = await Swal.fire({
                                    title: 'Bạn có chắc chắn muốn nâng cấp gói VIP cho thằng lồn này không?',
                                });

                                if (confirmUpdate.isConfirmed) {
                                    e.preventDefault();
                                    handleUpdateVip(e);
                                }
                            }}>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="namePacket" className='text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Gói:</label>
                                    <select name='namePacket' id='namePacket' className="select select-info w-full font-medium" required
                                        onChange={(e) => setIsValuePacket(e.target.value)}
                                        value={isValuePacket}
                                    >
                                        <option value={''}>Chọn gói</option>
                                        <option value={'month'}>Gói tháng </option>
                                        <option value={'year'}>Gói năm</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-4 mt-4'>
                                    <label className='text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Thông báo:</label>
                                    <input type="text" className='py-2 px-4 font-medium rounded-lg outline-none border border-gray-200' id='titleNotice' name='titleNotice' placeholder='Tiêu đề thông báo'
                                        onChange={(e) => setIsValueTitle(e.target.value)}
                                        value={isValueTitle}
                                        required
                                    />
                                    <textarea name="contentNotice" id="contentNotice" className='py-2 px-4 font-medium rounded-lg outline-none border border-gray-200' placeholder='Nội dung thông báo'
                                        onChange={(e) => setIsValueContent(e.target.value)}
                                        value={isValueContent}
                                        required
                                    />
                                </div>
                                <Button type='submit' className='mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main'>
                                    Nâng cấp
                                </Button>
                            </form>
                        )
                    }
                </div>
                <div className="modal-action">
                    <label htmlFor={`my_modal_${index}`} className="btn">Đóng</label>
                </div>
            </div>
        </div >
    )
}
