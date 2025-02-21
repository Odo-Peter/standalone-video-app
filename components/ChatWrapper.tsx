import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";

import { SafeAreaView, ActivityIndicator,StyleSheet} from "react-native";
import { useChatClient } from "@/hooks/useChatClient";

const streami18n = new Streami18n({
  language: "en",
});

export const ChatWrapper = ({ children }: PropsWithChildren<{}>) => {
  const user = {
    id: "Brakiss",
    name: 'Brakiss',
    
  };
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0JyYWtpc3MiLCJ1c2VyX2lkIjoiQnJha2lzcyIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzM5NDM5MTkyLCJleHAiOjE3NDAwNDM5OTJ9.xrdHWHNAxkaR5N4FGaGqG7GAr6xYzuIk0heExdamKZA";

  const chatClient = useChatClient({
    apiKey:"mmhfdzb5evj2",
    userData: user,
    tokenProvider: token,
  });

  if (!chatClient) {
    // Show a loader until the Chat client loads
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={"large"} style={StyleSheet.absoluteFill} />
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider i18nInstance={streami18n}>
      <Chat client={chatClient} i18nInstance={streami18n}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });