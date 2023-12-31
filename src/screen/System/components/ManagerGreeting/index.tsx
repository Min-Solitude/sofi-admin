import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '../../../../components/customs/Button'
import Loading from '../../../../components/shared/Loading'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import Section from '../../../../motion/Section'
import { getGreetings, updateGreeting } from '../../../../redux/reducers/setting/setting.reducer'

type ManagerGrettingProps = {
    className?: string
}

export default function ManagerGretting({ className }: ManagerGrettingProps) {

    const [isValueTitle, setIsValueTitle] = React.useState('')
    const [isValueContent, setIsValueContent] = React.useState('')
    const [isValueStatus, setIsValueStatus] = React.useState(false)
    const [isValueImage, setIsValueImage] = React.useState('')
    const [isValueLayout, setIsValueLayout] = React.useState(false)

    const greeting = useAppSelector(state => state.setting.greeting)

    const loading = useAppSelector(state => state.setting.loading)

    const dispatch = useAppDispatch()

    const handleUpdateGreeting = () => {

        if (!isValueTitle || !isValueContent || !isValueImage) return toast.error('Vui lòng nhập đầy đủ thông tin')

        const payload = {
            title: isValueTitle,
            content: isValueContent,
            status: isValueStatus,
            image: isValueImage,
            layout: isValueLayout
        }

        dispatch(updateGreeting(payload))
    }

    useEffect(() => {
        dispatch(getGreetings())
        
        if (greeting) {
            setIsValueTitle(greeting.title)
            setIsValueContent(greeting.content)
            setIsValueStatus(greeting.status)
            setIsValueImage(greeting.image)
        }
    }, [])

    return (
        <Section className={`flex flex-col gap-4 ${className}`}>
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
                <label htmlFor="image" className='font-semibold text-base text-gray-700'>
                    Ảnh lời chào
                </label>
                <input type="url" id='image' name='image' placeholder='Link ảnh' className='py-3 px-4 rounded-lg border outline-none border-gray-200'
                    value={isValueImage}
                    onChange={(e) => setIsValueImage(e.target.value)}
                />
                <i className='text-xs text-red-500'>*Lưu ý: Dùng hình trên pinterest</i>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="content" className='font-semibold text-base text-gray-700'>
                    Nội dung
                </label>
                <textarea name="content" id="content" placeholder='Nội dung' className='py-3 px-4 h-[10rem] rounded-lg border outline-none border-gray-200'
                    value={isValueContent}
                    onChange={(e) => setIsValueContent(e.target.value)} />
            </div>
            <div className='flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200'>
                <label htmlFor="status" className='font-semibold text-base text-gray-700'>
                    Trạng thái: <span className='ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full'>{isValueStatus ? 'bật' : 'tắt'}</span>
                </label>
                <input type="checkbox" className="toggle bg-blue-500 hover:bg-blue-700" id="status" name="status" checked={isValueStatus} onChange={(e) => setIsValueStatus(e.target.checked)} />
            </div>
            <div className='flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200'>
                <label htmlFor="layout" className='font-semibold text-base text-gray-700'>
                    Layout: <span className='ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full'>{isValueLayout ? 'Layout 1' : 'Layout 2'}</span>
                </label>
                <input type="checkbox" className="toggle bg-blue-500 hover:bg-blue-700" id="layout" name="layout" checked={isValueLayout} onChange={(e) => setIsValueLayout(e.target.checked)} />
            </div>
            <Button className=' font-semibold mt-4 py-2 rounded-lg max-w-[14rem] bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                onClick={handleUpdateGreeting}
            >
                Lưu
            </Button>
        </Section>
    )
}
