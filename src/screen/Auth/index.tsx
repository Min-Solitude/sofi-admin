import { useEffect, useState } from "react";
import View from "../../motion/View";
import Logo from "../../components/Logo";
import Login from "./Login";
import Button from "../../components/Button";
import Register from "./Register";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import history from "../../redux/store/history";
import IonIcon from "@reacticons/ionicons";
import { authLoginWithGoogle } from "../../redux/reducers/auth";

const Auth = () => {
  const [isAccount, setIsAccount] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const checkAccessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (checkAccessToken) {
      history.push("/");
    }
  }, [checkAccessToken]);

  const handleLoginGoogle = () => {
    dispatch(authLoginWithGoogle());
  };

  return (
    <View
      className="min-h-screen font-medium flex flex-col relative justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <Logo className="w-[4rem] absolute top-4 left-4" />
      <h1 className="mb-8 text-gradient uppercase font-medium tracking-widest text-[2rem]">
        {isAccount ? "Đăng nhập" : "Đăng ký"}
      </h1>
      <View className="w-[90%]">{isAccount ? <Login /> : <Register />}</View>
      <View className="mt-8 flex gap-2 items-center">
        {isAccount ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
        <Button
          onClick={() => {
            setIsAccount(!isAccount);
            toast.dismiss();
          }}
        >
          <p className="text-primary">
            {isAccount ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </p>
        </Button>
      </View>

      <Button
        className="mt-12 flex flex-col items-center gap-4"
        onClick={handleLoginGoogle}
      >
        <IonIcon name="logo-google" className="text-[1.8rem] text-primary" />
      </Button>
    </View>
  );
};
export default Auth;
