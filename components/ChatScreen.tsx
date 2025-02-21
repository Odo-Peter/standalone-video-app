import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import { StreamChatGenerics } from "@/types/chatType";

export const ChatScreen = () => {
  const [channel, setChannel] = useState<
    ChannelType<StreamChatGenerics> | undefined
  >(undefined);
  const { client } = useChatContext();

  const CHANNEL_TYPE = "videocall";
  const CHANNEL_ID = "NX7wgsT31zDZ"; // You can get the call id through sharing params while routing through navigation.

  useEffect(() => {
    const createChannel = async () => {
      const newChannel = await client.channel(CHANNEL_TYPE, CHANNEL_ID);
      setChannel(newChannel);
    };
    createChannel();
  }, [client]);

  if (!channel) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={"large"} style={StyleSheet.absoluteFill} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
