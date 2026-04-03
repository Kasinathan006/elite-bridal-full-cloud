import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/join" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="gigs" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="booking/index" />
            <Stack.Screen name="details/artist" />
        </Stack>
    );
}
