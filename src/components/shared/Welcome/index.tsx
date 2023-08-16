import IonIcon from "@reacticons/ionicons";
import { motion } from "framer-motion";

import View from "../../../motion/View";
import Logo from "../../Logo";
import Button from "../../Button";

const Welcome = () => {
  const handleCloseWelcome = () => {};

  return (
    <View className="h-screen flex justify-center relative  items-center bg-primary flex-col gap-4">
      <img
        src="https://i.pinimg.com/564x/5e/49/44/5e4944073308da676c25bf65c3c4b6b3.jpg"
        alt="IU"
        className=" h-full object-cover"
      />
      <View className="absolute flex flex-col w-full h-full items-center justify-center gap-4">
        <View className="absolute top-4 left-4 uppercase font-bold">
          <span className="text-[0.9rem] text-gray-300">
            Chào mừng bạn đến với
          </span>
          <Logo className="linear-wipe text-[2.5rem]" />
        </View>
        <motion.div className="w-[8rem] overflow-hidden relative h-[8rem] shadow-2xl flex justify-center items-center rounded-full bg-yellow-300 border-4 border-white">
          <motion.img
            src="https://i.pinimg.com/564x/9c/39/00/9c3900aa956de70274e8f883966e2193.jpg"
            alt="IU"
            className="object-cover w-full h-full rounded-full "
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <IonIcon name="play" className="text-[2rem] absolute " />
        </motion.div>
        <Button
          className="absolute bottom-4 left-4 font-medium flex items-center background-gradient py-2 px-8 rounded-full"
          onClick={handleCloseWelcome}
        >
          <span>Bắt đầu</span>
          <IonIcon name="arrow-forward" className="text-xl ml-2" />
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
