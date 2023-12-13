import { motion } from 'framer-motion'

type ButtonProps = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

export default function Button({ children, className, onClick, type = 'button' }: ButtonProps) {
    return (
        <motion.button className={`flex justify-center outline-none items-center text-[14px] ${className}`}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            type={type}
        >
            {children}
        </motion.button>
    )
}
