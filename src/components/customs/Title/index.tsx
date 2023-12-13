type TitleProps = {
    children: React.ReactNode
    className?: string
}

export default function Title({ children, className }: TitleProps) {
    return (
        <h1 className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ${className}`}>
            {children}
        </h1>
    )
}
