import React from "react";
import { User } from "../../../../redux/reducers/auth";
import ModalVip from "../ModalVip";
import IonIcon from "@reacticons/ionicons";

type Props = {
  listUser: User[];
};

export default function ListAccount({ listUser }: Props) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>STT</th>
            <th>Thông tin</th>
            <th>Đăng nhập</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Vip</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            item?.photoURL
                              ? item?.photoURL
                              : "https://i.pinimg.com/564x/c1/8a/38/c18a38c8e0cbca467b3468135fcc4226.jpg"
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {item?.displayName
                          ? item?.displayName
                          : "Chưa cập nhật"}
                      </div>
                      <div className="text-sm opacity-50">
                        {item?.email ? item?.email : "Chưa cập nhật"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item?.account}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item?.loginBy}
                  </span>
                </td>
                <td>
                  {item?.phoneNumber ? item?.phoneNumber : "Chưa cập nhật"}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">{item?.role}</button>
                </th>
                <th>
                  <label htmlFor={`my_modal_${index}`} className="btn">
                    {item?.vip?.isVip ? (
                      <div>
                        <IonIcon
                          name="diamond"
                          className="text-lg text-blue-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <IonIcon name="diamond-outline" className="text-lg" />
                      </div>
                    )}
                  </label>

                  <input
                    type="checkbox"
                    id={`my_modal_${index}`}
                    className="modal-toggle"
                  />
                  <ModalVip user={item} index={index} />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
