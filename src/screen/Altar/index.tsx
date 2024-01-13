import React, { useEffect, useState } from "react";
import Section from "../../motion/Section";
import Title from "../../components/customs/Title";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { Altar } from "../../redux/reducers/altar/altar.types";
import { getAllAltar } from "../../redux/reducers/altar/altar.reducer";
import Loading from "../../components/shared/Loading";
import Button from "../../components/customs/Button";
import View from "../../motion/View";

export default function AltarPage() {
  const dispatch = useAppDispatch();
  const [listAltar, setListAltar] = useState<Altar[]>([]);
  const data = useAppSelector((state) => state.altar.data);
  const loading = useAppSelector((state) => state.altar.loading);

  const [isShowAltar, setIsShowAltar] = useState<Altar | null>(null);

  useEffect(() => {
    dispatch(getAllAltar());
    if (data.length > 0) {
      setListAltar(data);
    }
  }, []);

  const formatDateSend = (date: string) => {
    const d = new Date(date);
    const dateSend = d.toLocaleDateString("vi-VN");
    return dateSend;
  };

  return (
    <>
      {loading && <Loading />}
      <Section>
        <Title className="text-2xl">Quản lý điều ước</Title>
        <div className="mt-8">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>STT</th>
                <th>Thông tin</th>
                <th>Email</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listAltar.length > 0 ? (
                listAltar.map((altar, index) => (
                  <tr key={index} className="">
                    <td>
                      <p className="font-semibold text-gray-700">
                        #{index + 1}
                      </p>
                    </td>
                    <td className="">
                      <div className="flex gap-4  bg-gray-100 rounded-lg p-2">
                        <div className="w-[3rem] h-[3rem] rounded-xl bg-white overflow-hidden">
                          <img
                            src={
                              altar?.photoURL
                                ? altar?.photoURL
                                : "https://i.pinimg.com/564x/82/3a/a1/823aa177ccec5713771e23e0bf00f710.jpg"
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-white flex-1 rounded-lg p-2 flex flex-col">
                          <h1 className="font-semibold">
                            {altar?.displayName ? altar?.displayName : "------"}
                            <span className="text-xs text-gray-600">
                              ({altar?.account})
                            </span>
                          </h1>
                          <p className="text-xs">
                            {altar?.email ? altar?.email : "------"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {altar?.phoneNumber ? altar?.phoneNumber : "------"}
                      </div>
                    </td>
                    <td>
                      <div>{formatDateSend(altar?.dateSend)}</div>
                    </td>
                    <td>
                      <div
                        className={`font-semibold ${
                          altar?.status === "pending" && "text-yellow-500"
                        } ${altar?.status === "approved" && "text-green-500"} ${
                          altar?.status === "rejected" && "text-red-500"
                        }`}
                      >
                        {altar?.status === "pending" && "Đang chờ"}
                        {altar?.status === "approved" && "Đã duyệt"}
                        {altar?.status === "rejected" && "Bị từ chối"}
                      </div>
                    </td>
                    <td>
                      <Button
                        className="text-sm font-semibold py-2 px-6 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                        onClick={() => setIsShowAltar(altar)}
                      >
                        Xem
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <div>Không có dữ liệu</div>
              )}
            </tbody>
          </table>
        </div>
        {isShowAltar && (
          <div className="fixed top-0 left-0 bottom-0 right-0 bg-[#ffffffa8] flex justify-center items-center">
            <View
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="bg-white shadow-main p-4 rounded-xl max-w-[32rem] w-full"
            >
              <h1 className="font-bold text-lg">
                {isShowAltar?.displayName} -{" "}
                <span className="font-medium text-sm">
                  ({isShowAltar?.account})
                </span>
              </h1>
              <textarea
                className="bg-gray-100 p-4 rounded-lg my-4 w-full min-h-[12rem] outline-none"
                disabled
              >
                {isShowAltar?.content}
              </textarea>
              <Button
                className="text-sm font-semibold mt-2 py-2 px-6 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                onClick={() => setIsShowAltar(null)}
              >
                Đóng
              </Button>
            </View>
          </div>
        )}
      </Section>
    </>
  );
}
