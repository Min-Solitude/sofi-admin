import IonIcon from "@reacticons/ionicons";

import Button from "../../../../components/Button";
import View from "../../../../motion/View";
import { useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    toast.success("Tính năng đang phát triển");
    setIsOpenSearch(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpenSearch(false);
  };

  const handleClickInside = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <View className="flex items-center gap-2">
      <View className={"flex items-center gap-4 duration-200"}>
        <Button
          className="flex justify-center items-center"
          type="button"
          onClick={() => {
            if (!isOpenSearch) setIsOpenSearch(true);
          }}
        >
          <IonIcon name="search" className="text-[1.6rem] text-gray-700" />
        </Button>
      </View>
      {isOpenSearch && (
        <View
          className="fixed top-0 left-0 bottom-0 right-0 bg-[#00000010]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClickOutside}
        >
          <View className="flex justify-center">
            <View
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex justify-between py-2 max-w-[30rem] items-center px-4 w-[90%] mt-20 rounded-lg bg-white shadow-md"
              id="search"
              onClick={handleClickInside}
            >
              <input
                type="text"
                className="bg-transparent flex-1 outline-none text-[0.9rem]"
                placeholder="Tìm kiếm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                className="flex justify-center items-center"
                type="button"
                onClick={handleSearch}
              >
                <IonIcon
                  name="search"
                  className="text-[1.6rem] text-gray-700"
                />
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Search;
