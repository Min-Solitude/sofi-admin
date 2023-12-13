import { toast } from "react-toastify";
import Button from "../../components/customs/Button";
import Title from "../../components/customs/Title";
import history from "../../redux/store/history";

export default function Login() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        console.log('data', data.get('username'));


        if (data.get('username') !== 'admin' || data.get('password') !== 'admin') {
            toast.error('Tài khoản hoặc mật khẩu không đúng');
            return;
        }

        sessionStorage.setItem('isLogin', 'true');
        history.push('/');
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-full max-w-[28rem] shadow-main bg-white px-4 py-8 rounded-xl flex flex-col items-center text-[14px]">
                <Title className="text-2xl">Đăng nhập admin</Title>
                <form className="flex flex-col gap-4 w-full mt-8" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tài khoản" name="username" className="outline-none  py-3 px-4 rounded-lg border border-gray-200" />
                    <input type="password" placeholder="Mật khẩu" name="password" className="outline-none  py-3 px-4 rounded-lg border border-gray-200" />
                    <Button type="submit" className="py-3 bg-black text-white rounded-lg font-medium mt-4">
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    )
}
