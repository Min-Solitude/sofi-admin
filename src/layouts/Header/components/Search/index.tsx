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
  };

  return (
    <View className="flex items-center gap-2">
      <View
        className={
          isOpenSearch
            ? "flex items-center gap-4 bg-gray-100 pr-3 pl-6 duration-200 py-3 rounded-full"
            : "flex items-center gap-4 duration-200"
        }
      >
        {isOpenSearch && (
          <input
            type="text"
            className="bg-transparent outline-none"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}
        <Button
          className="flex justify-center items-center"
          type="button"
          onClick={() => {
            if (!isOpenSearch) setIsOpenSearch(true);
            else handleSearch();
          }}
        >
          <IonIcon name="search" className="text-[1.6rem] text-gray-700" />
        </Button>
      </View>
      {isOpenSearch && (
        <Button
          className="flex justify-center items-center"
          type="button"
          onClick={() => setIsOpenSearch(false)}
        >
          <IonIcon name="close" className="text-[1.6rem] text-gray-400" />
        </Button>
      )}
    </View>
  );
};

export default Search;
