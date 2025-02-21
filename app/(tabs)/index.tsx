// import { StyleSheet } from 'react-native';

// import App from "@/components/videocall/VideoCall";

// export default function HomeScreen() {
//   return <App />;
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

import { useRouter } from "expo-router";
import { useContext, useEffect, useMemo } from "react";
import { Text, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { AppContext } from "../_layout";

const filters = {
  example: "example-apps",
  members: { $in: ["Brakiss"] },
  type: "messaging",
};
const sort = { last_message_at: -1 };
const options = { state: true, watch: true };

export default function ChannelListScreen() {
  const router = useRouter();
  const { setChannel } = useContext(AppContext);
  const memoizedFilters = useMemo(() => filters, []);

  const chatClient = StreamChat.getInstance("mmhfdzb5evj2");

  useEffect(() => {
    const checkChannels = async () => {
      const channels = await chatClient.queryChannels(filters);
      console.log("Retrieved channels:", channels);
    };

    checkChannels();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ChannelList
        filters={memoizedFilters}
        // sort={sort}
        options={options}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/channel/${channel.id}`);
        }}
        EmptyStateIndicator={() => <Text>No channels found.</Text>} // Custom empty state message
      />
    </View>
  );
}
