// // import {
// //   StreamCall,
// //   StreamVideo,
// //   StreamVideoClient,
// //   User,
// // } from "@stream-io/video-react-native-sdk";
// // import { useEffect, useState } from "react";
// // import { VideoUI } from "./VideoUi";
// // import { GestureHandlerRootView } from "react-native-gesture-handler";
// // import { StyleSheet } from "react-native";
// // import { ChatWrapper } from "../ChatWrapper";
// // import InCallChat from "../ChatUI";

// // const apiKey = "mmhfdzb5evj2";
// // const userId = "Brakiss";
// // const token =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0JyYWtpc3MiLCJ1c2VyX2lkIjoiQnJha2lzcyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzM5NDM5MTkyLCJleHAiOjE3NDAwNDM5OTJ9.xrdHWHNAxkaR5N4FGaGqG7GAr6xYzuIk0heExdamKZA";

// // const user: User = { id: userId };
// // const callId = "NX7wgsT31zDZ";

// // const client = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });
// // const call = client.call("default", callId);
// // call.join({ create: true });

// // export default function App() {
// //   const [channel, setChannel] = useState(null);

// //   return (
// //     <ChatWrapper>
// //       <GestureHandlerRootView style={styles.container}>
// //         <StreamVideo client={client}>
// //           <StreamCall call={call}>
// //             <VideoUI />
// //           </StreamCall>
// //         </StreamVideo>
// //         {channel && <InCallChat channel={channel} />}
// //       </GestureHandlerRootView>
// //     </ChatWrapper>
// //   );
// // }
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// // =============================================

// /* eslint-disable react/display-name */
// import 'react-native-gesture-handler';
// import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { LogBox, SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
// import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
// import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { StreamChat } from 'stream-chat';
// import {
//   Channel,
//   ChannelList,
//   Chat,
//   MessageInput,
//   MessageList,
//   OverlayProvider,
//   Streami18n,
//   Thread,
//   useAttachmentPickerContext,
// } from 'stream-chat-expo';

// import { useStreamChatTheme } from '../../hooks/useChatTheme';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// LogBox.ignoreAllLogs(true);

// const chatClient = StreamChat.getInstance('q95x9hkbyd6p');
// const userToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9uIn0.eRVjxLvd4aqCEHY_JRa97g6k7WpHEhxL7Z4K4yTot1c';
// const user = {
//   id: 'ron',
// };

// const filters = {
//   example: 'example-apps',
//   members: { $in: ['ron'] },
//   type: 'messaging',
// };
// const sort = { last_message_at: -1 };
// const options = {
//   state: true,
//   watch: true,
// };

// /**
//  * Start playing with streami18n instance here:
//  * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
//  */
// const streami18n = new Streami18n({
//   language: 'en',
// });

// const ChannelListScreen = ({ navigation }: any) => {
//   const { setChannel } = useContext(AppContext);

//   const memoizedFilters = useMemo(() => filters, []);

//   return (
//     <Chat client={chatClient} i18nInstance={streami18n}>
//       <View style={{ height: '100%' }}>
//         <ChannelList
//           filters={memoizedFilters}
//           onSelect={(channel) => {
//             setChannel(channel);
//             navigation.navigate('Channel');
//           }}
//           options={options}
//           sort={sort}
//         />
//       </View>
//     </Chat>
//   );
// };

// const ChannelScreen = ({ navigation }) => {
//   const { channel, setThread, thread } = useContext(AppContext);
//   const headerHeight = useHeaderHeight();
//   const { setTopInset } = useAttachmentPickerContext();

//   useEffect(() => {
//     setTopInset(headerHeight);
//   }, [headerHeight]);

//   return (
//     <SafeAreaView>
//       <Chat client={chatClient} i18nInstance={streami18n}>
//         <Channel channel={channel} keyboardVerticalOffset={headerHeight} thread={thread}>
//           <View style={{ flex: 1 }}>
//             <MessageList
//               onThreadSelect={(thread) => {
//                 setThread(thread);
//                 navigation.navigate('Thread');
//               }}
//             />
//             <MessageInput />
//           </View>
//         </Channel>
//       </Chat>
//     </SafeAreaView>
//   );
// };

// const ThreadScreen = () => {
//   const { channel, setThread, thread } = useContext(AppContext);
//   const headerHeight = useHeaderHeight();

//   return (
//     <SafeAreaView>
//       <Chat client={chatClient} i18nInstance={streami18n}>
//         <Channel channel={channel} keyboardVerticalOffset={headerHeight} thread={thread} threadList>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'flex-start',
//             }}
//           >
//             <Thread onThreadDismount={() => setThread(null)} />
//           </View>
//         </Channel>
//       </Chat>
//     </SafeAreaView>
//   );
// };

// const Stack = createStackNavigator();

// const AppContext = React.createContext();

// const App = () => {
//   const colorScheme = useColorScheme();
//   const { bottom } = useSafeAreaInsets();
//   const theme = useStreamChatTheme();

//   const [channel, setChannel] = useState();
//   const [clientReady, setClientReady] = useState(false);
//   const [thread, setThread] = useState();

//   useEffect(() => {
//     const setupClient = async () => {
//       await chatClient.connectUser(user, userToken);

//       setClientReady(true);
//     };

//     setupClient();
//   }, []);

//   return (
//     <NavigationContainer
//       theme={{
//         colors: {
//           ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme).colors,
//           background: theme.colors?.white_snow || '#FCFCFC',
//         },
//         dark: colorScheme === 'dark',
//       }}
//     >
//       <AppContext.Provider value={{ channel, setChannel, setThread, thread }}>
//         <GestureHandlerRootView style={{ flex: 1 }}>
//           <OverlayProvider
//             bottomInset={bottom}
//             i18nInstance={streami18n}
//             translucentStatusBar
//             value={{ style: theme }}
//           >
//             {clientReady && (
//               <Stack.Navigator
//                 initialRouteName='ChannelList'
//                 screenOptions={{
//                   headerTitleStyle: { alignSelf: 'center', fontWeight: 'bold' },
//                 }}
//               >
//                 <Stack.Screen
//                   component={ChannelScreen}
//                   name='Channel'
//                   options={() => ({
//                     headerBackTitle: 'Back',
//                     headerRight: () => <></>,
//                     headerTitle: channel?.data?.name,
//                   })}
//                 />
//                 <Stack.Screen
//                   component={ChannelListScreen}
//                   name='ChannelList'
//                   options={{ headerTitle: 'Channel List' }}
//                 />
//                 <Stack.Screen
//                   component={ThreadScreen}
//                   name='Thread'
//                   options={() => ({ headerLeft: () => <></> })}
//                 />
//               </Stack.Navigator>
//             )}
//           </OverlayProvider>
//         </GestureHandlerRootView>
//       </AppContext.Provider>
//     </NavigationContainer>
//   );
// };

// export default () => {
//   const theme = useStreamChatTheme();
//   return (
//     <SafeAreaProvider style={{ backgroundColor: theme.colors?.white_snow || '#FCFCFC' }}>
//       <App />
//     </SafeAreaProvider>
//   );
// };
