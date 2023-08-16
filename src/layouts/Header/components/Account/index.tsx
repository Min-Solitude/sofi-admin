import { useState } from "react";
import View from "../../../../motion/View";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { AuthAction } from "../../../../redux/reducers/auth";

const Account = () => {
  const [isDropdown, setIsDropdown] = useState(false);

  const accountLoginGoogle = useAppSelector(
    (state) => state.auth.accountGoogle
  );

  const dispatch = useAppDispatch();

  return (
    <View className="relative">
      <View
        className="w-[3.5rem] relative cursor-pointer h-[3.5rem] rounded-full  flex justify-center items-center "
        whileTap={{ scale: 0.9 }}
        onTap={() => setIsDropdown(!isDropdown)}
      >
        <img
          src={
            accountLoginGoogle
              ? accountLoginGoogle.photoURL
              : "https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
          }
          alt={
            accountLoginGoogle ? accountLoginGoogle.displayName : "Anonymous"
          }
          className="w-[3.5rem] h-[3.5rem] rounded-full object-cover border-2 border-gray-300"
        />
        <span className="w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border--gray-300"></span>
      </View>
      {isDropdown && (
        <View
          className="absolute -bottom-[1rem] w-[20rem] left-0 py-1 px-4 rounded-lg   bg-white border border-gray-300 shadow-lg flex items-start flex-col gap-2"
          initial={{ opacity: 0, x: -20, y: "100%" }}
          animate={{ opacity: 1, x: 0, y: "100%" }}
          exit={{ opacity: 0, x: -20, y: "100%" }}
          transition={{ duration: 0.2 }}
        >
          <View className="flex gap-2 items-center py-2 w-full border-b border-gray-200 mb-2">
            <View
              className="w-[3.5rem]  h-[3.5rem] rounded-full  flex justify-center items-center "
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={
                  accountLoginGoogle
                    ? accountLoginGoogle.photoURL
                    : "https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
                }
                alt={
                  accountLoginGoogle
                    ? accountLoginGoogle.displayName
                    : "Anonymous"
                }
                className="w-[3.5rem] h-[3.5rem] rounded-full object-cover border-2 border-gray-100"
              />
            </View>
            <View className=" flex flex-col justify-center">
              <p className="text-[1.1rem] text-gray-800">
                {accountLoginGoogle
                  ? accountLoginGoogle.displayName
                  : "Anonymous"}
              </p>
              <span className="text-[0.8rem] relative top-[-0.3rem] text-gray-500">
                {accountLoginGoogle ? accountLoginGoogle.email : "Anonymous"}
              </span>
            </View>
          </View>
          <View
            className=" w-full text-gray-800 py-2 rounded-lg cursor-pointer "
            whileTap={{ scale: 0.9 }}
          >
            Thông tin cá nhân
          </View>
          <View
            className=" w-full text-gray-800 py-2 rounded-lg cursor-pointer "
            whileTap={{ scale: 0.9 }}
          >
            Đổi mật khẩu
          </View>
          <View
            className=" w-full text-gray-800 cursor-pointer py-4 border-t border-gray-200 mt-2  "
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              dispatch(AuthAction.handleLogout());
            }}
          >
            Đăng xuất
          </View>
        </View>
      )}
    </View>
  );
};

export default Account;
