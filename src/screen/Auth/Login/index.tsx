import { motion } from "framer-motion";
import Button from "../../../components/Button";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/useRedux";
import {
  authLoginWithAccount,
  authLoginWithGoogle,
} from "../../../redux/reducers/auth";
import IonIcon from "@reacticons/ionicons";
import View from "../../../motion/View";

const Login = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

  const dispatch = useAppDispatch();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Email === "" || Password === "") {
      console.log(
        "%cNev: %cĐăng nhập %ccũng không xong",
        "color: #FBAB7E; font-weight: bold",
        "color: red; font-weight: bold",
        "color: blue; font-weight: bold"
      );
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!regexEmail.test(Email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    const dataForm = {
      email: Email,
      password: Password,
    };

    dispatch(authLoginWithAccount(dataForm));
  };

  const handleLoginGoogle = () => {
    dispatch(authLoginWithGoogle());
  };

  return (
    <View
      className="flex flex-col items-start gap-4 "
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <Button
        className="flex gap-4 justify-center items-center text-white rounded-lg bg-primary w-full py-2"
        onClick={handleLoginGoogle}
      >
        <IonIcon name="logo-google" className="text-[1.4rem]" />
        <span>Đăng nhập bằng Google</span>
      </Button>
      <View className=" w-full relative  border-b border-gray-300 my-4 flex justify-center items-center">
        <span className="bg-white absolute px-2 text-[0.9rem] text-gray-700">
          hoặc
        </span>
      </View>
      <motion.form
        className=" flex flex-col gap-4 w-full "
        onSubmit={handleLogin}
      >
        <View className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-800 text-[0.9rem]">
            Email
          </label>
          <input
            type="text"
            className="rounded-lg py-2 text-[0.9rem] px-4 bg-transparent border focus:text-gray-800  border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
            value={Email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </View>
        <View className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-800 text-[0.9rem]">
            Mật khẩu
          </label>
          <View className="w-full relative flex items-center">
            <input
              type={isShowPassword ? "text" : "password"}
              value={Password}
              className="rounded-lg w-full text-[0.9rem] font-medium  py-2 px-4 bg-transparent border focus:text-gray-800  border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
            <Button
              className="absolute right-4 z-10 font-medium    flex justify-center items-center"
              onClick={() => setIsShowPassword(!isShowPassword)}
              type="button"
            >
              {isShowPassword ? (
                <IonIcon
                  name="eye-outline"
                  className="text-gray-300 text-[1.6rem]"
                />
              ) : (
                <IonIcon
                  name="eye-off-outline"
                  className="text-gray-300 text-[1.6rem]"
                />
              )}
            </Button>
          </View>
        </View>
        <View className="relative left-2 -top-2">
          <Button
            type="button"
            onClick={() => {
              toast.warning("Có cái mật khẩu mà cũng quên. RÁNG NHỚ ĐI !!!");
            }}
          >
            <p className="text-[0.9rem] underline text-gray-500">
              Quên mật khẩu
            </p>
          </Button>
        </View>
        <Button className="  background-gradient text-white font-medium py-2 rounded-lg">
          Đăng nhập
        </Button>
      </motion.form>
    </View>
  );
};

export default Login;
