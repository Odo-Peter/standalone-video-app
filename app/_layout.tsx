// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/useColorScheme";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider, Streami18n, Chat } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { useEffect, useState, createContext } from "react";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";
import { useStreamChatTheme } from "../hooks/useChatTheme";

const chatClient = StreamChat.getInstance("mmhfdzb5evj2");
// const apiKey = "mmhfdzb5evj2";
// const userId = "Brakiss";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0JyYWtpc3MiLCJ1c2VyX2lkIjoiQnJha2lzcyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzM5NDM5MTkyLCJleHAiOjE3NDAwNDM5OTJ9.xrdHWHNAxkaR5N4FGaGqG7GAr6xYzuIk0heExdamKZA";
const user = { id: "Brakiss" };

export const AppContext = createContext<any>(null);

const streami18n = new Streami18n({ language: "en" });

export default function RootLayout() {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);

  const filters = {
    example: "Test Channel",
    members: { $in: ["Brakiss"] },
    type: "messaging",
  };

  useEffect(() => {
    const setupChat = async () => {
      await chatClient.connectUser(user, userToken);

      // Check if user has channels
      // const channels = await chatClient.queryChannels(filters);
      // console.log("Retrieved channels:", channels);

      // // If no channels exist, create one
      // if (channels.length === 0) {
      //   console.log("No channels found. Creating a test channel...");
      //   const channel = chatClient.channel("messaging", "test-channel", {
      //     name: "Test Channel",
      //     members: ["Brakiss"],
      //   });

      //   await channel.create();
      //   console.log("Test channel created:", channel.id);
      // }

      setClientReady(true);
    };

    setupChat();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  console.log(clientReady);

  if (!clientReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <OverlayProvider i18nInstance={streami18n}>
            <Chat client={chatClient}>
              <Stack
                screenOptions={{
                  headerTitleStyle: { color: "black", fontWeight: "bold" },
                }}
              />
            </Chat>
          </OverlayProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}
