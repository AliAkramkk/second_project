import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const LiveRoom = () => {
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const appID = 757742058;
    const serverSecret = "d803d8057cd6549a9a97834cd57376cc";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,

      // userId
      Date.now().toString(),
      "piyush"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };
  return (
    <div>
      <div ref={myMeeting} />
      {/* <h1>Room</h1>
      {roomId} */}
    </div>
  );
};

export default LiveRoom;
