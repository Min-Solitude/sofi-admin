import { useEffect, useState } from 'react';
import Title from '../../components/customs/Title'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import Section from '../../motion/Section'
import { getAllUser, getAllUserVip } from '../../redux/reducers/auth';
import IonIcon from '@reacticons/ionicons';
import Button from '../../components/customs/Button';
import ModalVip from './components/ModalVip';
import Loading from '../../components/shared/Loading';

const Home = () => {

    const dispatch = useAppDispatch();
    const listUser = useAppSelector(state => state.auth.listUser);
    const loading = useAppSelector(state => state.auth.loading);

    const [isValueSearch, setIsValueSearch] = useState<string>('');

    const [isChooseFilter, setIsChooseFilter] = useState<string>('all');

    const fetchUsers = () => {
        dispatch(getAllUser({
            search: isValueSearch
        }));
    }

    const fetchUsersVip = () => {
        dispatch(getAllUserVip());
    }

    useEffect(() => {
        if (isChooseFilter === 'all') {
            fetchUsers();
        } else if (isChooseFilter === 'vip') {
            fetchUsersVip();
        }
    }, [isChooseFilter])

    return (
        <>
            {
                loading && <Loading />
            }
            <Section className='flex flex-col gap-4'>
                <Title className='text-2xl'>Quản lý tài khoản</Title>
                <div className='flex flex-col gap-4 mt-4'>
                    <div className='w-full flex items-center justify-between'>
                        <form className='flex gap-2 flex-1 items-center'
                            onSubmit={(e) => {
                                e.preventDefault();
                                fetchUsers();
                            }}
                        >
                            <input type="text" placeholder='Tìm kiếm theo số điện thoại' className='py-2 px-4 border border-gray-100 bg-white shadow-main rounded-lg outline-none w-full max-w-[28rem]'
                                onChange={(e) => setIsValueSearch(e.target.value)}
                                value={isValueSearch}
                                required
                            />
                            <Button type='submit' className='flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 text-white shadow-main rounded-lg'>
                                <IonIcon name='search' className='text-lg' />
                            </Button>
                        </form>
                        <div className='flex gap-2 items-center justify-end'>
                            <Button className=' px-4 font-semibold py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main'
                                onClick={() => setIsChooseFilter('all')}
                            >
                                Tất cả
                            </Button >
                            <Button className=' px-4 font-semibold py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main'
                                onClick={() => setIsChooseFilter('vip')}
                            >
                                Tài khoản vip
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thông tin</th>
                                    <th>Đăng nhập</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Vip</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUser && listUser?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item?.photoURL ? item?.photoURL : 'https://i.pinimg.com/564x/c1/8a/38/c18a38c8e0cbca467b3468135fcc4226.jpg'} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item?.displayName ? item?.displayName : 'Chưa cập nhật'}</div>
                                                        <div className="text-sm opacity-50">{item?.email ? item?.email : 'Chưa cập nhật'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {item?.account}
                                                <br />
                                                <span className="badge badge-ghost badge-sm">{item?.loginBy}</span>
                                            </td>
                                            <td>{item?.phoneNumber ? item?.phoneNumber : 'Chưa cập nhật'}</td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs">{item?.role}</button>
                                            </th>
                                            <th>
                                                <label htmlFor={`my_modal_${index}`} className="btn">
                                                    {
                                                        item?.vip?.isVip ? (
                                                            <div>
                                                                <IonIcon name='diamond' className='text-lg text-blue-500' />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <IonIcon name='diamond-outline' className='text-lg' />
                                                            </div>
                                                        )
                                                    }
                                                </label>

                                                <input type="checkbox" id={`my_modal_${index}`} className="modal-toggle" />
                                                <ModalVip user={item} index={index} />
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default Home
