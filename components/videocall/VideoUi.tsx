import {
  useCallStateHooks,
  CallParticipantsList,
} from "@stream-io/video-react-native-sdk";
import { useState } from "react";

import { Button, Text, View } from "react-native";

export type CallControlsComponentProps = {
  onChatOpenHandler?: () => void;
};

export const MyVideoButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();
  return (
    <Button
      title={isMute ? "Turn on camera" : "Turn off camera"}
      onPress={() => camera.toggle()}
    ></Button>
  );
};

export const MyVideoFlip = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, direction } = useCameraState();
  return (
    <Button
      title={direction === "front" ? "Turn back camera" : "Turn front camera"}
      onPress={() => camera.flip()}
    ></Button>
  );
};

export const MyMicrophoneButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  return (
    <Button
      title={isMute ? "Turn on microphone" : "Turn off microphone"}
      onPress={() => microphone.toggle()}
    ></Button>
  );
};

export const ChatButton = ({ onPressHandler }: any) => {
  return (
    <View>
      <Button title="Chat" onPress={onPressHandler} />
    </View>
  );
};

export const CallControlsComponent = ({
  onChatOpenHandler,
}: CallControlsComponentProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 12,
        zIndex: 2,
        backgroundColor: "#272A30",
      }}
    >
      <ChatButton onPressHandler={onChatOpenHandler} />
      <MyVideoButton />
      <MyVideoFlip />
    </View>
  );
};

export function VideoUI() {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  const [openModal, setOpenModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* CallParticipantsList should take the full available space */}

      {openModal && (
        <View
          style={{ backgroundColor: "green", height: "70%", width: "100%" }}
        >
          <Text>Hello World</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <CallParticipantsList participants={participants} />
      </View>

      {/* Buttons should stay at the bottom */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 20,
          backgroundColor: "#f8f8f8", // Light background for better visibility
        }}
      >
        <CallControlsComponent
          onChatOpenHandler={() => console.log("Modal open")}
        />
        {/* <MyVideoButton />
            <MyVideoFlip />
            <MyMicrophoneButton /> */}
      </View>
    </View>
  );
}
