import React, { useEffect } from "react";
import Section from "../../../../motion/Section";
import IonIcon from "@reacticons/ionicons";
import Button from "../../../../components/customs/Button";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import {
  getNoti,
  updateNoti,
} from "../../../../redux/reducers/setting/setting.reducer";
import Loading from "../../../../components/shared/Loading";

type ManagerGeneralAnnouncementProps = {
  className?: string;
};

export default function ManagerGeneralAnnouncement({
  className,
}: ManagerGeneralAnnouncementProps) {
  const [isBannerUrl, setIsBannerUrl] = React.useState<any>("");
  const [isValueTitle, setIsValueTitle] = React.useState<string>("");
  const [isValueContent, setIsValueContent] = React.useState<string>("");
  const [isEmail, setIsEmail] = React.useState<boolean>(false);
  const [isNote, setIsNote] = React.useState<string>("");
  const [isStatus, setIsStatus] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.setting.loading);
  const noti = useAppSelector((state) => state.setting.noti);

  const handleUpdate = () => {
    if (!isValueTitle || !isValueContent || !isNote || !isBannerUrl)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn chưa nhập đủ thông tin",
      });

    dispatch(
      updateNoti({
        banner: isBannerUrl,
        title: isValueTitle,
        content: isValueContent,
        email: isEmail,
        note: isNote,
        status: isStatus,
      })
    );
  };

  useEffect(() => {
    dispatch(getNoti());

    if (noti) {
      setIsBannerUrl(noti.banner);
      setIsValueTitle(noti.title);
      setIsValueContent(noti.content);
      setIsEmail(noti.email);
      setIsNote(noti.note);
      setIsStatus(noti.status);
    }
  }, []);

  return (
    <Section className={`${className}`}>
      {loading && <Loading />}
      <h1 className="font-bold text-base text-blue-500">Quản lý thông báo</h1>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="title"
            className="font-semibold text-base text-gray-700"
          >
            Banner
          </label>
          <input
            type="url"
            id="title"
            name="title"
            placeholder="Link banner"
            className="py-3 px-4 rounded-lg border outline-none border-gray-200"
            value={isBannerUrl}
            onChange={(e) => setIsBannerUrl(e.target.value)}
          />
        </div>
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
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="content"
            className="font-semibold text-base text-gray-700"
          >
            Nội dung
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Tiêu đề"
            className="py-3 px-4 h-[10rem] rounded-lg border outline-none border-gray-200"
            value={isValueContent}
            onChange={(e) => setIsValueContent(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="notice"
            className="font-semibold text-base text-gray-700"
          >
            Email
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isEmail ? "Bật" : "Tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="notice"
            name="notice"
            checked={isEmail}
            onChange={(e) => setIsEmail(e.target.checked)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="note"
            className="font-semibold text-base text-gray-700"
          >
            Lời nhắc
          </label>
          <textarea
            id="note"
            name="note"
            placeholder="Tiêu đề"
            className="py-3 px-4 h-[10rem] rounded-lg border outline-none border-gray-200"
            value={isNote}
            onChange={(e) => setIsNote(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
          <label
            htmlFor="status"
            className="font-semibold text-base text-gray-700"
          >
            Trạng thái
            <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
              {isStatus ? "Bật" : "Tắt"}
            </span>
          </label>
          <input
            type="checkbox"
            className="toggle bg-blue-500 hover:bg-blue-700"
            id="status"
            name="status"
            checked={isStatus}
            onChange={(e) => setIsStatus(e.target.checked)}
          />
        </div>
        <Button
          className="font-semibold  bg-gradient-to-r py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
          onClick={() => handleUpdate()}
        >
          Lưu
        </Button>
      </div>
    </Section>
  );
}
