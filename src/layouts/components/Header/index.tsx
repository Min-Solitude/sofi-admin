import { useState } from "react"
import Button from "../../../components/customs/Button"
import { motion } from "framer-motion"
import history from "../../../redux/store/history"

type HeaderProps = {
    className?: string
}

export default function Header({ className }: HeaderProps) {

    const [isShowModal, setIsShowModal] = useState(false)

    const handleLogout = () => {
        sessionStorage.removeItem('isLogin');
        history.push('/login');
    }

    return (
        <header className={`border-b flex justify-between items-center border-gray-200 ${className}`}>
            <div></div>
            <div className="flex gap-4 items-center relative">
                <div className="flex flex-col items-end">
                    <h1 className="font-semibold">Admin</h1>
                    <p className="text-xs text-gray-400">Hệ thống quản lý Sofi</p>
                </div>
                <Button className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden"
                    onClick={() => setIsShowModal(!isShowModal)}
                >
                    <img src="https://i.pinimg.com/564x/a9/58/a6/a958a68a7e73f3c8f60f280ff090f5ea.jpg" className="w-full h-full object-cover" alt="" />
                </Button>
                {
                    isShowModal && (
                        <motion.div className="absolute bg-white shadow-main p-2 rounded-lg border border-gray-200 right-0 -bottom-[4rem] w-[10rem]"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Button className="w-full flex items-center gap-4 font-medium text-white text-sm py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500"
                                onClick={handleLogout}
                            >
                                <p className="text-sm">Đăng xuất</p>
                            </Button>
                        </motion.div>
                    )
                }
            </div>
        </header>
    )
}
