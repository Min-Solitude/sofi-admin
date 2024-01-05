import React, { useEffect } from "react";
import Button from "../../../../../components/customs/Button";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import {
  getTaskBar,
  updateTaskBar,
} from "../../../../../redux/reducers/setting/setting.reducer";

type TaskBarProps = {
  loading?: boolean;
};

export default function TaskBar({ loading }: TaskBarProps) {
  const [isValueClock, setIsValueClock] = React.useState<boolean>(true);
  const [isStatus, setIsStatus] = React.useState<boolean>(true);
  const [isLayout, setIsLayout] = React.useState<boolean>(true);

  const taskBar = useAppSelector((state) => state.setting.taskBar);

  const dispatch = useAppDispatch();

  const handleUpdateTaskBar = () => {
    dispatch(
      updateTaskBar({
        clock: isValueClock,
        status: isStatus,
        layout: isLayout,
      })
    );
  };

  useEffect(() => {
    dispatch(getTaskBar());

    if (taskBar) {
      setIsValueClock(taskBar.clock);
      setIsStatus(taskBar.status);
      setIsLayout(taskBar.layout);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
        <label
          htmlFor="notice"
          className="font-semibold text-base text-gray-700"
        >
          Đồng hồ
          <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
            {isValueClock ? "Loại 1" : "Loại 2"}
          </span>
        </label>
        <input
          type="checkbox"
          className="toggle bg-blue-500 hover:bg-blue-700"
          id="notice"
          name="notice"
          checked={isValueClock}
          onChange={(e) => setIsValueClock(e.target.checked)}
        />
      </div>
      <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
        <label
          htmlFor="notice"
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
          id="notice"
          name="notice"
          checked={isStatus}
          onChange={(e) => setIsStatus(e.target.checked)}
        />
      </div>
      <div className="flex items-center gap-2 w-full justify-between p-4 rounded-lg border border-gray-200">
        <label
          htmlFor="notice"
          className="font-semibold text-base text-gray-700"
        >
          Layout
          <span className="ml-2 py-1 px-6  bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full">
            {isLayout ? "Thường" : "Đặc biệt"}
          </span>
        </label>
        <input
          type="checkbox"
          className="toggle bg-blue-500 hover:bg-blue-700"
          id="notice"
          name="notice"
          checked={isLayout}
          onChange={(e) => setIsLayout(e.target.checked)}
        />
      </div>
      <Button
        className="font-semibold  bg-gradient-to-r py-2 rounded-lg from-cyan-500 to-blue-500 text-white"
        onClick={() => handleUpdateTaskBar()}
      >
        Lưu
      </Button>
    </div>
  );
}
