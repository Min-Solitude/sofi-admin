import { useState } from "react";
import Title from "../../components/customs/Title";
import Section from "../../motion/Section";
import ManagerGeneralAnnouncement from "./components/ManagerGeneralAnnouncement";
import ManagerGretting from "./components/ManagerGreeting";
import SettingBar from "./components/SettingBar";
import ManagerFileTray from "./components/ManagerFileTray";

export default function SystemPage() {

    const [isChoose, setIsChoose] = useState('greeting')

    return (
        <Section className="px-1">
            <div>
                <Title className="text-2xl">Hệ thống</Title>
            </div>
            <div className="w-full mt-4 flex gap-4">
                <SettingBar className="flex-1 max-w-[18rem]" isChoose={isChoose} setIsChoose={setIsChoose} />
                <div className="shadow-main flex-1 rounded-xl flex gap-4 border border-gray-200 p-4">
                    {
                        isChoose === 'greeting' && <ManagerGretting className="flex-1" />
                    }
                    {
                        isChoose === 'notification' && <ManagerGeneralAnnouncement className="flex-1" />
                    }
                    {
                        isChoose === 'filetray' && <ManagerFileTray className="flex-1" />
                    }
                    <div className="flex-1 max-w-[16rem] rounded-xl overflow-hidden">
                        {
                            isChoose === 'greeting' && (
                                <img src="https://i.pinimg.com/736x/78/d7/5d/78d75d49c1e2a66f4b4a6552c54a4dfc.jpg" alt="" className="w-full h-full object-cover" />
                            )
                        }
                        {
                            isChoose === 'notification' && (
                                <img src="https://i.pinimg.com/564x/d8/bf/ad/d8bfadc9869cb97c73d7e86c0a9f143c.jpg" alt="" className="w-full h-full object-cover" />
                            )
                        }
                        {
                            isChoose === 'filetray' && (
                                <img src="https://i.pinimg.com/564x/d9/08/67/d90867c18729111b3aab06e5ca5c14ae.jpg" alt="" className="w-full h-full object-cover" />
                            )
                        }
                    </div>
                </div>
            </div>
        </Section>
    )
}
