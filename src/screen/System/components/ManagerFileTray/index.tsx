import { useState } from "react";
import Button from "../../../../components/customs/Button";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { updateFileTray } from "../../../../redux/reducers/setting/setting.reducer";
import Loading from "../../../../components/shared/Loading";
import Section from "../../../../motion/Section";

type ManagerFileTrayProps = {
    className?: string;
}

export default function ManagerFileTray(props: ManagerFileTrayProps) {

    const [isValueTitle, setIsValueTitle] = useState('')
    const [isUrlBackground, setIsUrlBackground] = useState('')
    const [isValueStatus, setIsValueStatus] = useState(false)
    const loading = useAppSelector(state => state.setting.loading)
    const dispatch = useAppDispatch()

    const handleUpdateFileTray = () => {
        if (!isValueTitle || !isUrlBackground) return toast.error('Vui lòng nhập đầy đủ thông tin')

        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
        if (!regex.test(isUrlBackground)) return toast.error('Link ảnh không hợp lệ')

        dispatch(updateFileTray({
            title: isValueTitle,
            background: isUrlBackground,
            status: isValueStatus
        })

        )
    }

    return (
        <Section className={`flex flex-col gap-4 ${props.className}`}>
            {
                loading && <Loading />
            }
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="title" className='font-semibold text-base text-gray-700'>
                    Tiêu đề
                </label>
                <input type="text" id='title' name='title' placeholder='Tiêu đề' className='py-3 px-4 rounded-lg border outline-none border-gray-200'
                    value={isValueTitle}
                    onChange={(e) => setIsValueTitle(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="title" className='font-semibold text-base text-gray-700'>
                    Link ảnh nền
                </label>
                <input type="text" id='title' name='title' placeholder='Link ảnh nền' className='py-3 px-4 rounded-lg border outline-none border-gray-200'
                    value={isUrlBackground}
                    onChange={(e) => setIsUrlBackground(e.target.value)}
                />
            </div>
            <div className='flex items-center gap-2 w-full'>
                <label htmlFor="status" className='font-semibold text-base text-gray-700'>
                    Trạng thái: <span className='ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full'>{isValueStatus ? 'bật' : 'tắt'}</span>
                </label>
                <input type="checkbox" className="toggle bg-blue-500 hover:bg-blue-700" id="status" name="status" checked={isValueStatus} onChange={(e) => setIsValueStatus(e.target.checked)} />
            </div>
            <Button className=' font-semibold mt-4 py-2 rounded-lg max-w-[14rem] bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                onClick={handleUpdateFileTray}
            >
                Lưu
            </Button>
        </Section>
    )
}
