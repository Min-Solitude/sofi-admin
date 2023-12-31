import React, { useEffect } from "react";
import Section from "../../../../motion/Section";
import Button from "../../../../components/customs/Button";
import Swal from "sweetalert2";
import IonIcon from "@reacticons/ionicons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { getHeader, updateHeader, uploadLogo } from "../../../../redux/reducers/setting/setting.reducer";
import Loading from "../../../../components/shared/Loading";

type GeneralManagerProps = {
  className?: string;
};

export default function ManagerGeneral({ className }: GeneralManagerProps) {

    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.setting.loading);
    const header = useAppSelector((state) => state.setting.header);

  const [isLogoUrl, setIsLogoUrl] = React.useState<any>(null);

  const [isValueStatus, setIsValueStatus] = React.useState<boolean>(false);
  const [isValueStatusBtnNotice, setIsValueStatusBtnNotice] =
    React.useState<boolean>(false);
  const [isValueStatusBtnFullscreen, setIsValueStatusBtnFullscreen] =
    React.useState<boolean>(false);
  const [isValueStatusBtnDarkMode, setIsValueStatusBtnDarkMode] =
    React.useState<boolean>(false);
  const [isValueStatusLayout, setIsValueStatusLayout] =
    React.useState<boolean>(false);
  const [isValueStatusProfile, setIsValueStatusProfile] =
    React.useState<boolean>(false);

    const handleUpdateGeneral = () => {
        if(!isLogoUrl){
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Bạn chưa chọn logo",
              });

        }

       
            dispatch(updateHeader({
                status: isValueStatus,
                btnNotice: isValueStatusBtnNotice,
                btnFullscreen: isValueStatusBtnFullscreen,
                btnDarkMode: isValueStatusBtnDarkMode,
                layout: isValueStatusLayout,
                profile: isValueStatusProfile,
            }))

        
    }

    useEffect(() => {
        dispatch(getHeader())
        if(header){
            setIsLogoUrl(header.logo)
            setIsValueStatus(header.status)
            setIsValueStatusBtnNotice(header.btnNotice)
            setIsValueStatusBtnFullscreen(header.btnFullscreen)
            setIsValueStatusBtnDarkMode(header.btnDarkMode)
            setIsValueStatusLayout(header.layout)
            setIsValueStatusProfile(header.profile)
        }
    }, []);

  return (
    <Section className={`flex flex-col gap-4 ${className}`}>
        {
            loading && <Loading/>
        }
      <h1 className="font-bold text-base text-blue-500">Header</h1>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 items-start ">
          <input
            type="file"
            accept="image/*"
            hidden
            name="logo"
            onChange={(e: any) => {
              if (e.target.files[0]) {
                setIsLogoUrl(e.target.files[0]);
              }
            }}
            id="logo"
          />
         {
            isLogoUrl ? (
                <img
                src={
                    typeof isLogoUrl === "string"
                        ? isLogoUrl
                        : URL.createObjectURL(isLogoUrl)
                }
                alt=""
                className="w-[10rem] rounded-lg border border-gray-200"
              />
            ) : (
                <div className="w-[10rem] h-[8rem] rounded-lg flex justify-center items-center bg-gray-200">
                    <IonIcon name="image-outline" size="large" className="text-gray-400" />
                </div>
            )
         }
          <div className="flex flex-col gap-2">
            <label
              htmlFor="logo"
              className=" font-semibold py-2 px-4 cursor-pointer rounded-lg max-w-[14rem] bg-gray-300 text-black"
            >
              Đổi logo
            </label>
            {
                isLogoUrl && (
                    <Button
                    className="font-semibold  bg-gradient-to-r py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
                    onClick={() => {
                      if(isLogoUrl !== header?.logo){
                        dispatch(uploadLogo(isLogoUrl))
                      }else{
                        return Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Bạn chưa thay đổi logo",
                          });
                      }
                    }}
                  >
                    Tải lên
                  </Button>
                )
            }
          </div>
        </div>
        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="status"
            className="font-semibold text-base text-gray-700"
          >
            Trạng thái:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatus ? "bật" : "tắt"}
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

        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="notice"
            className="font-semibold text-base text-gray-700"
          >
            Nút thông báo:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatusBtnNotice ? "bật" : "tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="notice"
            name="notice"
            checked={isValueStatusBtnNotice}
            onChange={(e) => setIsValueStatusBtnNotice(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="fullscreen"
            className="font-semibold text-base text-gray-700"
          >
            Nút toàn màn hình:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatusBtnFullscreen ? "bật" : "tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="fullscreen"
            name="fullscreen"
            checked={isValueStatusBtnFullscreen}
            onChange={(e) => setIsValueStatusBtnFullscreen(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="darkmode"
            className="font-semibold text-base text-gray-700"
          >
            Nút chế độ tối:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatusBtnDarkMode ? "bật" : "tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="darkmode"
            name="darkmode"
            checked={isValueStatusBtnDarkMode}
            onChange={(e) => setIsValueStatusBtnDarkMode(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="layout"
            className="font-semibold text-base text-gray-700"
          >
            Layout:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatusLayout ? "bật" : "tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="layout"
            name="layout"
            checked={isValueStatusLayout}
            onChange={(e) => setIsValueStatusLayout(e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="profile"
            className="font-semibold text-base text-gray-700"
          >
            Profile:{" "}
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isValueStatusProfile ? "bật" : "tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="profile"
            name="profile"
            checked={isValueStatusProfile}
            onChange={(e) => setIsValueStatusProfile(e.target.checked)}
          />
          </div>

      </div>

      <Button className="font-semibold  bg-gradient-to-r py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
        onClick={() => handleUpdateGeneral()}
      >
        Lưu
      </Button>
    </Section>
  );
}
