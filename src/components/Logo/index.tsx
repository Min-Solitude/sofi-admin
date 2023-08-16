import View from "../../motion/View";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <View className={`font-bold ${className}`}>
      <img
        src="https://nevflynn.com/_next/image?url=%2Fimages%2Flogo.svg&w=96&q=75"
        alt="Nev"
      />
    </View>
  );
};

export default Logo;
