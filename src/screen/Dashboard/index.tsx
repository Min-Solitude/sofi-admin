import Title from "../../components/customs/Title";

export default function DashboardPage() {
    return (
        <div>
            <div className="h-[40vh] border border-gray-200 rounded-xl overflow-hidden relative flex justify-center items-center">
                <img src="https://camfashion.vn/wp-content/uploads/2022/07/concept-chup-anh-thanh-xuan-dep-nhat-2048x987.webp" alt="" className="w-full h-full object-cover" />
                <Title className="absolute text-5xl">Sofi Admin</Title>
            </div>
        </div>
    )
}
