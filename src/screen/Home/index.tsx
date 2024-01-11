import { useEffect, useState } from "react";
import Title from "../../components/customs/Title";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import Section from "../../motion/Section";
import { getAllUser, getAllUserVip } from "../../redux/reducers/auth";
import IonIcon from "@reacticons/ionicons";
import Button from "../../components/customs/Button";
import ModalVip from "./components/ModalVip";
import Loading from "../../components/shared/Loading";
import ListAccount from "./components/ListAccount";
import ListMember from "./components/ListMember";

const Home = () => {
  const dispatch = useAppDispatch();
  const listUser = useAppSelector((state) => state.auth.listUser);
  const loading = useAppSelector((state) => state.auth.loading);

  const [isShowMember, setIsShowMember] = useState<boolean>(false);

  const [isValueSearch, setIsValueSearch] = useState<string>("");

  const [isChooseFilter, setIsChooseFilter] = useState<string>("all");

  const fetchUsers = () => {
    dispatch(
      getAllUser({
        search: isValueSearch,
      })
    );
  };

  const fetchUsersVip = () => {
    dispatch(getAllUserVip());
  };

  useEffect(() => {
    if (isChooseFilter === "all") {
      fetchUsers();
    } else if (isChooseFilter === "vip") {
      fetchUsersVip();
    }
  }, [isChooseFilter]);

  console.log(listUser);

  return (
    <>
      {loading && <Loading />}
      <Section className="flex flex-col gap-4">
        <Title className="text-2xl">Quản lý tài khoản</Title>
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-full flex items-center justify-between">
            <form
              className="flex gap-2 flex-1 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                fetchUsers();
              }}
            >
              <input
                type="text"
                placeholder="Tìm kiếm theo số điện thoại"
                className="py-2 px-4 border border-gray-100 bg-white shadow-main rounded-lg outline-none w-full max-w-[28rem]"
                onChange={(e) => setIsValueSearch(e.target.value)}
                value={isValueSearch}
                required
              />
              <Button
                type="submit"
                className="flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-2 text-white shadow-main rounded-lg"
              >
                <IonIcon name="search" className="text-lg" />
              </Button>
            </form>
            <div className="flex gap-2 items-center justify-end">
              <Button
                className=" px-4 font-semibold py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main"
                onClick={() => {
                  setIsChooseFilter("all");
                  setIsShowMember(false);
                }}
              >
                Tất cả
              </Button>
              <Button
                className=" px-4 font-semibold py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main"
                onClick={() => {
                  setIsChooseFilter("vip");
                  setIsShowMember(false);
                }}
              >
                Tài khoản vip
              </Button>
              <Button
                className=" px-4 font-semibold py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-main"
                onClick={() => {
                  setIsShowMember(true);
                }}
              >
                Thành viên
              </Button>
            </div>
          </div>
          {isShowMember
            ? listUser && <ListMember listMember={listUser} />
            : listUser && <ListAccount listUser={listUser} />}
        </div>
      </Section>
    </>
  );
};

export default Home;
