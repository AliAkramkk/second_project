import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import ChefNavbar from "../../../component/Navbar/ChefNavbar";
import Footer from "../../User/Footer/Footer";

const LiveRoom = () => {
  const { roomCode } = useParams();
  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const myMeeting = async (element) => {
    const appID = 757742058;
    const serverSecret = "d803d8057cd6549a9a97834cd57376cc";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      randomID(5),
      randomID(5)

      // userId
      // Date.now().toString(),
      // "piyush"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        // config: {
        //   role,
        // },
      },
      sharedLinks: [
        {
          name: "copy link",
          url: `http://localhost:5173/chef/live/${roomCode}`,
        },
      ],
    });
  };
  return (
    <>
      <div className=" bg-gray-100 ">
        <ChefNavbar />
        <div className="mt-10 mb-10">
          <div ref={myMeeting} />
          {/* <h1>Room</h1>
      {roomId} */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LiveRoom;
