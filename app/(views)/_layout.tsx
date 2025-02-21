import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const AuthLayout = () => {
  return (
    <SafeAreaView>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;
