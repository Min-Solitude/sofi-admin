import View from "../../motion/View";
import history from "../../redux/store/history";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <View
      className={` cursor-pointer ${className}`}
      onClick={() => history.push("/")}
    >
      <img
        src="https://nevflynn.com/_next/image?url=%2Fimages%2Flogo.svg&w=96&q=75"
        alt="Nev"
      />
    </View>
  );
};

export default Logo;
