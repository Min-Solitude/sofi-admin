import Account from "./components/Account";
import Search from "./components/Search";

const Header = () => {
  return (
    <header className="fixed flex items-center justify-between  bg-white w-full p-4 z-50 ">
      <Account />
      <Search />
    </header>
  );
};

export default Header;
