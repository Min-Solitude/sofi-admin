import Button from "../../../../components/customs/Button";

const data = [
    {
        label: 'Cài đặt chào mừng',
        value: 'greeting'
    },
    {
        label: 'Thông báo tổng',
        value: 'notification'
    }
]

type SettingBarProps = {
    className?: string;
    isChoose: string;
    setIsChoose: (value: string) => void;
}

export default function SettingBar(props: SettingBarProps) {
    return (
        <div className={`p-4 h-[80vh] border flex flex-col gap-4 border-gray-200 rounded-xl shadow-main ${props.className}`}>
            {
                data.map((item, index) => (
                    <Button className=" w-full" key={index}
                        onClick={() => props.setIsChoose(item.value)}
                    >
                        <div className="flex items-center w-full text-sm ">
                            <div className={`w-[3rem] h-[3rem] rounded-full flex justify-center p-2 items-center ${props.isChoose === item.value ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-200'}`}>
                                <div className={`w-full h-full rounded-full bg-white flex justify-center items-center font-bold text-sm ${props.isChoose === item.value ? 'text-blue-500' : 'bg-white text-gray-500'}`}>{index + 1}</div>
                            </div>
                            <span className={`text-sm text-gray-500 py-2 rounded-r-full px-4 text-start flex-1 font-semibold -translate-x-2 ${props.isChoose === item.value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{item.label}</span>
                        </div>
                    </Button>
                ))
            }
        </div>
    )
}
