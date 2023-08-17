import { useParams } from 'react-router-dom'
import Section from '../../../../motion/Section'
import View from '../../../../motion/View'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useAppSelector } from '../../../../hooks/useRedux'
import { useEffect } from 'react'

const Room = () => {
    const { idRoom } = useParams<{ idRoom: string }>()
    const nameAccount = useAppSelector((state) => state.auth.account.displayName)

    const myRoomMeeting = async (e: any) => {
        if (idRoom) {
            const appId = 190973300
            const serverSecret = 'eabe7ddfc4a4d12e2c3a069714133cf2'

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appId,
                serverSecret,
                idRoom,
                Date.now().toString(),
                nameAccount || 'Anonymous'
            )

            const zc = ZegoUIKitPrebuilt.create(kitToken)

            zc.joinRoom({
                container: e,
                sharedLinks: [
                    {
                        name: 'Sao chép link',
                        url: window.location.href
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall
                },
                showScreenSharingButton: true,
                showTurnOffRemoteCameraButton: true, // Giá trị tương ứng
                showTurnOffRemoteMicrophoneButton: true, // Giá trị tương ứng
                showRemoveUserButton: true // Giá trị tương ứng
            })
        }
    }

    return (
        <Section>
            <View className='mt-16'>
                <div ref={myRoomMeeting}></div>
            </View>
        </Section>
    )
}

export default Room
