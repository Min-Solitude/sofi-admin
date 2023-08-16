import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import IonIcon from "@reacticons/ionicons";

import Button from "../../../components/Button";
import View from "../../../motion/View";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/useRedux";
import { authRegister } from "../../../redux/reducers/auth";

const Register = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [RePassword, setRePassword] = useState<string>("");

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

  const dispatch = useAppDispatch();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Email || !Password || !RePassword) {
      console.log(
        "%cNev: %cSpam cái %cquần què",
        "color: #FBAB7E; font-weight: bold",
        "color: red; font-weight: bold",
        "color: blue; font-weight: bold"
      );
      toast.error("Vui lòng nhập đầy đủ thông tin");

      return;
    }

    if (!regexEmail.test(Email)) return toast.error("Email không hợp lệ");

    if (Password.length < 6)
      return toast.error("Mật khẩu phải có ít nhất 6 ký tự");

    if (Password !== RePassword) return toast.error("Mật khẩu không khớp");

    const dataForm = {
      email: Email,
      password: Password,
    };

    dispatch(authRegister(dataForm));

    setEmail("");
    setPassword("");
    setRePassword("");
  };
  return (
    <motion.form
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, x: -100 }}
      className=" flex flex-col gap-6"
      onSubmit={handleRegister}
    >
      <input
        type="text"
        placeholder="Email"
        className="rounded-full font-medium py-3 px-8 bg-transparent border focus:text-gray-800 placeholder:text-gray-300 border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
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

      <View className="w-full relative flex items-center">
        <input
          type={isShowPassword ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          className="rounded-full w-full font-medium  py-3 px-8 bg-transparent border focus:text-gray-800 placeholder:text-gray-300 border-gray-300 focus:outline-none focus:bg-gray-100  duration-200"
          value={RePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <Button
          type="button"
          className="absolute right-8 z-10    flex justify-center items-center"
          onClick={() => setIsShowPassword(!isShowPassword)}
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

      <Button className="mt-4  background-gradient text-white font-medium py-3 rounded-full">
        Đăng ký
      </Button>
    </motion.form>
  );
};

export default Register;
