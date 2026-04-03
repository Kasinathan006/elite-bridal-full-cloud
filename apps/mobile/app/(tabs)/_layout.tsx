// @ts-nocheck
import { Tabs, useRouter } from 'expo-router';
import { Home, Search, PlusSquare, MessageCircle, User, Briefcase, Bell } from 'lucide-react-native';
import { View, TouchableOpacity } from 'react-native';

export default function TabLayout() {
    const router = useRouter();
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6B2D50', // Burgundy for active tab
            tabBarInactiveTintColor: 'rgba(107,45,80,0.3)', // Muted burgundy
            tabBarStyle: {
                backgroundColor: '#FDF0F5', // Blush app background
                borderTopWidth: 1.5,
                borderTopColor: '#E8DDE2', // Neutral border
                height: 80,
                paddingBottom: 12,
                elevation: 0,
            },
            headerStyle: {
                backgroundColor: '#FDF0F5', // Blush app background
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E8DDE2',
            },
            headerTitleStyle: {
                fontWeight: '900',
                fontSize: 16,
                color: '#6B2D50', // Burgundy headings
                letterSpacing: 1.5,
            },
            headerTitleAlign: 'center',
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'HOME FEED',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <Home size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'DISCOVER',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <Search size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />,
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    title: 'POST',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            backgroundColor: '#B5477A', // Primary Rose Pink
                            padding: 14,
                            borderRadius: 20,
                            marginTop: -20,
                            shadowColor: '#B5477A',
                            shadowOpacity: 0.4,
                            shadowRadius: 12,
                            elevation: 8,
                        }}>
                            <PlusSquare size={22} color="#FDF0F5" strokeWidth={2.5} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'INBOX',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <MessageCircle size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'PROFILE',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <User size={24} color={color} strokeWidth={focused ? 2.5 : 1.8} />,
                }}
            />
        </Tabs>
    );
}
