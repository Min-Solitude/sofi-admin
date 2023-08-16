import React, { useEffect } from "react";

import View from "../motion/View";
import Navigation from "./Navigation";
import SideBar from "./SideBar";
import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [checkMobile, setCheckMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setCheckMobile(true);
      } else {
        setCheckMobile(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <View>
      {checkMobile ? <Navigation /> : <SideBar />}
      <View className="min-h-screen relative font-medium">
        <Header />
        <main className="absolute top-[5.5rem] bg-white w-full">
          {children}
        </main>
      </View>
    </View>
  );
};

export default MainLayout;
