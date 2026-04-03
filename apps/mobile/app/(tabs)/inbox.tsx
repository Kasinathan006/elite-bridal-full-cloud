// @ts-nocheck
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, Image } from 'react-native';
import { MessageCircle, Search, Check, CheckCheck, Phone } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const MOCK_CONVOS = [
    { id: '1', participant: { displayName: 'Lakshmi Studio', avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100', isVerified: true }, lastMessage: { content: 'Sure! What date did you have in mind for the booking?', createdAt: new Date(Date.now() - 600000).toISOString(), isRead: false }, unreadCount: 3 },
    { id: '2', participant: { displayName: 'Riya Aesthetics', avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', isVerified: true }, lastMessage: { content: 'Package details sent! Check your email 💌', createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: true }, unreadCount: 0 },
    { id: '3', participant: { displayName: 'Nithya Bridal Arts', avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100', isVerified: false }, lastMessage: { content: 'Thank you for booking! See you on June 12th 🌸', createdAt: new Date(Date.now() - 86400000).toISOString(), isRead: true }, unreadCount: 0 },
];

function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return 'now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
}

export default function InboxScreen() {
    const router = useRouter();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ALL');

    useEffect(() => {
        fetch(`${API_URL}/conversations/user_1`)
            .then(res => {
                const ct = res.headers.get('content-type') || '';
                return ct.includes('application/json') ? res.json() : [];
            })
            .then(data => setConversations(Array.isArray(data) && data.length > 0 ? data : MOCK_CONVOS))
            .catch(() => setConversations(MOCK_CONVOS))
            .finally(() => setLoading(false));
    }, []);

    const filtered = activeTab === 'UNREAD'
        ? conversations.filter(c => c.unreadCount > 0)
        : conversations;

    const renderConvo = ({ item }) => (
        <TouchableOpacity
            style={[styles.convoCard, item.unreadCount > 0 && styles.convoCardUnread]}
            onPress={() => router.push(`/chat/${item.id}`)}
            activeOpacity={0.8}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.participant?.avatarUrl || 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100' }} style={styles.avatar} />
                {item.unreadCount > 0 && <View style={styles.onlineDot} />}
            </View>
            <View style={styles.convoBody}>
                <View style={styles.topRow}>
                    <Text style={styles.participantName}>{item.participant?.displayName || 'Artist'}</Text>
                    <Text style={[styles.timeText, item.unreadCount > 0 && styles.timeTextUnread]}>
                        {timeAgo(item.lastMessage?.createdAt || new Date().toISOString())}
                    </Text>
                </View>
                <View style={styles.bottomRow}>
                    <Text style={[styles.lastMsg, item.unreadCount > 0 && styles.lastMsgUnread]} numberOfLines={1}>
                        {item.lastMessage?.content || 'Start a conversation...'}
                    </Text>
                    {item.unreadCount > 0 ? (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unreadCount}</Text>
                        </View>
                    ) : (
                        item.lastMessage?.isRead
                            ? <CheckCheck size={14} color='#B5477A' />
                            : <Check size={14} color='#9E8A92' />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <Text style={styles.headerSub}>MESSAGES</Text>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>INBOX</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.hBtn}><Search size={18} color='#B5477A' /></TouchableOpacity>
                        <TouchableOpacity style={styles.hBtn}><Phone size={18} color='#B5477A' /></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.tabs}>
                    {['ALL', 'UNREAD'].map(tab => (
                        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.tabActive]}>
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <FlatList
                data={filtered}
                renderItem={renderConvo}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={8}
                windowSize={10}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        {loading
                            ? <ActivityIndicator size="large" color='#B5477A' />
                            : <>
                                <MessageCircle size={48} color="#F8BBD9" strokeWidth={1.5} />
                                <Text style={styles.emptyText}>No messages yet</Text>
                                <Text style={styles.emptySubText}>Connect with artists to start chatting</Text>
                            </>
                        }
                    </View>
                }
            />

            <TouchableOpacity style={styles.newChatBtn} onPress={() => router.push('/(tabs)/search')}>
                <MessageCircle size={22} color="#FFFFFF" />
                <Text style={styles.newChatText}>NEW MESSAGE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: {
        paddingHorizontal: 24, paddingTop: 60, paddingBottom: 0,
        backgroundColor: '#FDF0F5', borderBottomWidth: 1, borderBottomColor: '#E8DDE2',
    },
    headerSub: { fontSize: 9, fontWeight: '900', color: '#B5477A', letterSpacing: 4, marginBottom: 4 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    headerTitle: { fontSize: 26, fontWeight: '900', color: '#6B2D50' },
    headerActions: { flexDirection: 'row', gap: 10 },
    hBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8DDE2' },
    tabs: { flexDirection: 'row', gap: 0 },
    tab: { paddingVertical: 14, paddingHorizontal: 20, borderBottomWidth: 3, borderBottomColor: 'transparent' },
    tabActive: { borderBottomColor: '#B5477A' },
    tabText: { fontSize: 11, fontWeight: '900', color: '#9E8A92', letterSpacing: 1 },
    tabTextActive: { color: '#B5477A' },
    listContent: { paddingTop: 8, paddingBottom: 120 },
    convoCard: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 16,
        borderBottomWidth: 1, borderBottomColor: '#FFF0F5',
        backgroundColor: '#FDF0F5',
    },
    convoCardUnread: { backgroundColor: '#FFF5F8' },
    avatarContainer: { position: 'relative', marginRight: 14 },
    avatar: { width: 56, height: 56, borderRadius: 20, backgroundColor: '#FCE4EC', borderWidth: 2, borderColor: '#F48FB1' },
    onlineDot: { position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#B5477A', borderWidth: 2, borderColor: '#FFFFFF' },
    convoBody: { flex: 1 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    participantName: { fontSize: 15, fontWeight: '900', color: '#6B2D50' },
    timeText: { fontSize: 10, color: '#9E8A92', fontWeight: '700' },
    timeTextUnread: { color: '#B5477A', fontWeight: '900' },
    bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    lastMsg: { fontSize: 13, color: '#9E8A92', flex: 1, marginRight: 8, fontWeight: '400' },
    lastMsgUnread: { color: '#6B2D50', fontWeight: '700' },
    unreadBadge: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: '#B5477A', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
    unreadText: { color: '#6B2D50', fontSize: 10, fontWeight: '900' },
    empty: { padding: 80, alignItems: 'center', gap: 12 },
    emptyText: { color: '#7B2D50', fontWeight: '900', fontSize: 16 },
    emptySubText: { color: '#9E8A92', fontSize: 13, textAlign: 'center' },
    newChatBtn: {
        position: 'absolute', bottom: 28, right: 24,
        flexDirection: 'row', alignItems: 'center', gap: 10,
        backgroundColor: '#B5477A', paddingHorizontal: 20, paddingVertical: 16,
        borderRadius: 28, shadowColor: '#B5477A', shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    newChatText: { color: '#6B2D50', fontWeight: '900', fontSize: 12, letterSpacing: 1.5 },
});
