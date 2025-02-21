import { useEffect, useContext } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Channel,
  MessageList,
  MessageInput,
  useAttachmentPickerContext,
} from "stream-chat-expo";
// import { useHeaderHeight } from 'expo-router';
import { AppContext } from "../../_layout";

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { channel, setThread } = useContext(AppContext);
  const router = useRouter();
  const headerHeight = 300;
  const { setTopInset } = useAttachmentPickerContext();

  console.log(id);

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight]);

  if (!channel) return null;

  return (
    <Channel channel={channel} keyboardVerticalOffset={headerHeight}>
      <View style={{ flex: 1 }}>
        <MessageList
          onThreadSelect={(thread) => {
            setThread(thread);
            router.push("/(views)/thread");
          }}
        />
        <MessageInput />
      </View>
    </Channel>
  );
}
