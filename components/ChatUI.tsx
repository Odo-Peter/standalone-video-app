import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { View, Modal, Button } from "react-native";
import { useState } from "react";

const InCallChat = ({ channel }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Chat" onPress={() => setVisible(true)} />
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
          <Button title="Close Chat" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
};

export default InCallChat;
