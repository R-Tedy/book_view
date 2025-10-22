import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router"

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/(auth)"}>
        SignIn
      </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/(auth)/signup"}>
        SignUp
      </Link>
    </View>
  );
}
