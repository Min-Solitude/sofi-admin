import { MotionProps, motion } from "framer-motion";

type CustomPropsButton = Omit<React.HTMLProps<HTMLButtonElement>, "ref">;

type ButtonProps = CustomPropsButton &
  MotionProps & {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
  };

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <motion.button
      {...rest}
      className={`${rest.className}`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
