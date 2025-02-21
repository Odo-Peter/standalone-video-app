import { useContext } from "react";
import { View } from "react-native";
import { Channel, Thread } from "stream-chat-expo";
// import { useHeaderHeight } from 'expo-router/stack';
import { AppContext } from "../_layout";

export default function ThreadScreen() {
  const { channel, thread, setThread } = useContext(AppContext);
  const headerHeight = 300;

  if (!channel || !thread) return null;

  return (
    <Channel
      channel={channel}
      thread={thread}
      keyboardVerticalOffset={headerHeight}
      threadList
    >
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Thread onThreadDismount={() => setThread(null)} />
      </View>
    </Channel>
  );
}
