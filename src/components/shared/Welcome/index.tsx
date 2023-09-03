import { motion } from "framer-motion";
import { useRive } from "rive-react";
import View from "../../../motion/View";
import { listRive } from "../../../riv";
import history from "../../../redux/store/history";

const Welcome = () => {
  const handleCloseWelcome = () => {
    sessionStorage.setItem('isWelcome', 'true')
    history.push('/')
  };

  const { rive, RiveComponent } = useRive({
    src: listRive.boy,
    autoplay: true,
    stateMachines: "State Machine 1",
  })

  return (
    <View className="h-screen w-full bg-white relative cursor-pointer-welcome">
      <RiveComponent width={'100%'} height={'100%'} />
      <motion.button className="absolute lg:bottom-[25%] bottom-[30%] left-[50%]  py-2 px-8 font-bold text-[0.9rem] border border-blue-600 rounded-full bg-blue-500 text-white"
        onClick={handleCloseWelcome}
        initial={{ opacity: 0, scale: 0.5, x: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%' }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
        whileTap={{ scale: 0.9 }}
      >
        Let's go
      </motion.button>
    </View>

  );
};

export default Welcome;
