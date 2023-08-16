import { motion } from "framer-motion";
import Button from "../../../components/Button";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/useRedux";
import { authLoginWithAccount } from "../../../redux/reducers/auth";
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

  return (
    <motion.form
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: -100 }}
      className=" flex flex-col gap-6 "
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="Email"
        className="rounded-full py-3 px-8 bg-transparent border focus:text-gray-800 placeholder:text-gray-300 border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <View className="w-full relative flex items-center">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Mật khẩu"
          value={Password}
          className="rounded-full w-full font-medium  py-3 px-8 bg-transparent border focus:text-gray-800 placeholder:text-gray-300 border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="absolute right-8 z-10 font-medium    flex justify-center items-center"
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
      <View className="relative left-2 -top-2">
        <Button
          onClick={() => {
            toast.warning("Quên kệ mày!!!");
          }}
        >
          <p className="text-[0.9rem] underline text-gray-500">Quên mật khẩu</p>
        </Button>
      </View>
      <Button className="  background-gradient text-white font-medium py-3 rounded-full">
        Đăng nhập
      </Button>
    </motion.form>
  );
};

export default Login;
