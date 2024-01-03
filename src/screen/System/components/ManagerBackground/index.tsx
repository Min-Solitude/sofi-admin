import { useEffect, useState } from "react";
import Button from "../../../../components/customs/Button";
import Section from "../../../../motion/Section";
import IonIcon from "@reacticons/ionicons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import Swal from "sweetalert2";
import {
  deleteBackground,
  getBackground,
  updateBackground,
} from "../../../../redux/reducers/backgound/background.reducer";
import Loading from "../../../../components/shared/Loading";

type ManagerBackgroundProps = {
  className?: string;
};

export default function ManagerBackground(props: ManagerBackgroundProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.background.loading);

  const [isBackgroundFreeDay, setIsBackgroundFreeDay] = useState<any>(null);
  const [isBackgroundFreeNight, setIsBackgroundFreeNight] = useState<any>(null);
  const [isValueTitle, setIsValueTitle] = useState("");
  const background = useAppSelector((state) => state.background.background);
  const [isValueStatus, setIsValueStatus] = useState(false);
  const [isKind, setIsKind] = useState(false);

  function capitalizeFirstLetter(title: string) {
    return title.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const handleUpdateBackgroundFree = () => {
    if (!isBackgroundFreeDay || !isBackgroundFreeNight || !isValueTitle)
      return Swal.fire("Vui lòng chọn ảnh nền");

    // Format title
    const isValueTitleFormat = capitalizeFirstLetter(isValueTitle);

    const payload = {
      name: isValueTitleFormat,
      backgroundDay: isBackgroundFreeDay,
      backgroundNight: isBackgroundFreeNight,
      type: isKind ? "free" : "vip",
    };

    dispatch(updateBackground(payload));

    setIsBackgroundFreeDay(null);
    setIsBackgroundFreeNight(null);
    setIsValueTitle("");
  };

  useEffect(() => {
    dispatch(getBackground());
  }, []);

  return (
    <Section className={`flex flex-col gap-4 ${props.className}`}>
      {loading && <Loading />}
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-base text-blue-500">Quản lý ảnh nền</h1>
        <div className="flex items-center gap-2">
          <label
            htmlFor="status"
            className="font-semibold text-base text-gray-700"
          >
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatus ? "ngày" : "đêm"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="status"
            name="status"
            checked={isValueStatus}
            onChange={(e) => setIsValueStatus(e.target.checked)}
          />
        </div>
      </div>
      <div className="w-full flex justify-start">
        <Button>
          <label
            htmlFor="my_modal_6"
            className="font-semibold cursor-pointer bg-gradient-to-r px-4 py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
          >
            Thêm ảnh nền miễn phí
          </label>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 items-start">
          <h1 className="font-semibold text-gray-800">Miễn phí</h1>
          <div className="flex gap-4 flex-wrap">
            {// type === free
            background?.map(
              (item: any, index) =>
                item.type === "free" && (
                  <div
                    key={index}
                    className="bg-gray-300 rounded-xl overflow-hidden w-[16rem] h-[8rem] relative"
                  >
                    <img
                      src={
                        isValueStatus
                          ? item.backgroundDay
                          : item.backgroundNight
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <Button
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-main"
                      onClick={() => {
                        Swal.fire({
                          title: "Bạn có muốn xóa ảnh này?",
                          showDenyButton: true,
                          confirmButtonText: `Xóa`,
                          denyButtonText: `Hủy`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            dispatch(deleteBackground(item.name));
                          }
                        });
                      }}
                    >
                      <IonIcon name="trash-outline" className="text-2xl" />
                    </Button>
                  </div>
                )
            )}
          </div>
          <div className="mt-4">
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Thêm ảnh nền miễn phí</h3>
                <div className="py-4 w-full flex flex-col gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="logo"
                    onChange={(e: any) => {
                      if (e.target.files[0]) {
                        setIsBackgroundFreeDay(e.target.files[0]);
                      }
                    }}
                    id="backgroundFreeDay"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="logo"
                    onChange={(e: any) => {
                      if (e.target.files[0]) {
                        setIsBackgroundFreeNight(e.target.files[0]);
                      }
                    }}
                    id="backgroundFreeNight"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="title"
                      className="font-semibold text-base text-gray-700"
                    >
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Tiêu đề"
                      className="py-3 px-4 rounded-lg border outline-none border-gray-200"
                      value={isValueTitle}
                      onChange={(e) => setIsValueTitle(e.target.value)}
                    />
                  </div>
                  <div className="h-[10rem] rounded-xl bg-gray-200 w-full flex justify-center items-center">
                    <label
                      htmlFor="backgroundFreeDay"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {isBackgroundFreeDay ? (
                        <img
                          src={
                            typeof isBackgroundFreeDay === "string"
                              ? isBackgroundFreeDay
                              : URL.createObjectURL(isBackgroundFreeDay)
                          }
                          alt=""
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <IonIcon
                          name="image-outline"
                          size="large"
                          className="text-gray-400"
                        />
                      )}
                    </label>
                  </div>
                  <div className="h-[10rem] rounded-xl bg-gray-200 w-full flex justify-center items-center">
                    <label
                      htmlFor="backgroundFreeNight"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {isBackgroundFreeNight ? (
                        <img
                          src={
                            typeof isBackgroundFreeNight === "string"
                              ? isBackgroundFreeNight
                              : URL.createObjectURL(isBackgroundFreeNight)
                          }
                          alt=""
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <IonIcon
                          name="image-outline"
                          size="large"
                          className="text-gray-400"
                        />
                      )}
                    </label>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <label
                      htmlFor="status"
                      className="font-semibold text-base text-gray-700"
                    >
                      Loại nền:{" "}
                      <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
                        {isKind ? "free" : "vip"}
                      </span>
                    </label>
                    <input
                      type="checkbox"
                      className="toggle bg-blue-500 hover:bg-blue-700"
                      id="status"
                      name="status"
                      checked={isKind}
                      onChange={(e) => setIsKind(e.target.checked)}
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <Button>
                    <label
                      htmlFor="my_modal_6"
                      className="font-semibold cursor-pointer bg-gradient-to-r px-4 py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
                      onClick={handleUpdateBackgroundFree}
                    >
                      Tải lên
                    </label>
                  </Button>
                  <label
                    htmlFor="my_modal_6"
                    className="font-semibold cursor-pointer bg-gray-200 px-4 py-2 rounded-lg  text-gray-500 "
                    onClick={() => {
                      setIsBackgroundFreeDay(null);
                      setIsBackgroundFreeNight(null);
                      setIsValueTitle("");
                    }}
                  >
                    Đóng
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-gray-800">Vip</h1>
          <div className="flex gap-4 flex-wrap">
            {// type === free
            background?.map(
              (item: any, index) =>
                item.type === "vip" && (
                  <div
                    key={index}
                    className="bg-gray-300 rounded-xl relative overflow-hidden w-[16rem] h-[8rem]"
                  >
                    <img
                      src={
                        isValueStatus
                          ? item.backgroundDay
                          : item.backgroundNight
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <Button
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-main"
                      onClick={() => {
                        Swal.fire({
                          title: "Bạn có muốn xóa ảnh này?",
                          showDenyButton: true,
                          confirmButtonText: `Xóa`,
                          denyButtonText: `Hủy`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            dispatch(deleteBackground(item.name));
                          }
                        });
                      }}
                    >
                      <IonIcon name="trash-outline" className="text-2xl" />
                    </Button>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
