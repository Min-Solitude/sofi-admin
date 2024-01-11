import IonIcon from "@reacticons/ionicons";
import { User } from "../../../../redux/reducers/auth";
import ModalVip from "../ModalVip";

type Props = {
  listMember: User[];
};

export default function ListMember({ listMember }: Props) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>STT</th>
            <th>Thông tin</th>
            <th>Thành viên</th>
            <th>Email thành viên</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listMember &&
            listMember?.map((item, index) => {
              // if item.isMember === fasle retun null
              if (!item.isMember) return null;

              return (
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
                    <div className="w-full flex justify-start">
                      {item?.isMember ? (
                        <IonIcon
                          name="checkmark-done-circle"
                          className="text-lg text-green-500"
                        />
                      ) : (
                        <IonIcon
                          name="close-circle"
                          className="text-lg text-red-500"
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="w-full flex justify-start">
                      {item?.emailMember ? item?.emailMember : "Chưa cập nhật"}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
