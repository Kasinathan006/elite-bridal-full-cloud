// @ts-nocheck
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Bell, ShieldCheck, MessageSquare, Star, Heart, Calendar } from 'lucide-react-native';
import { useEffect, useState } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const MOCK_NOTIFS = [
    { id: '1', type: 'BOOKING', payload: JSON.stringify({ message: 'Padma Iyer has requested to book you for June 12th Muhurtham!' }), isRead: false, createdAt: new Date(Date.now() - 600000).toISOString() },
    { id: '2', type: 'LIKE', payload: JSON.stringify({ message: 'Ananya Krishnan liked your latest portfolio post' }), isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', type: 'MESSAGE', payload: JSON.stringify({ message: 'Riya Aesthetics sent you a message about a collaboration' }), isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '4', type: 'REVIEW', payload: JSON.stringify({ message: 'New 5-star review from your last Muhurtham client ⭐⭐⭐⭐⭐' }), isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

const ICON_MAP = {
    BOOKING: { icon: Calendar, color: '#B5477A', bg: 'rgba(194,24,91,0.1)' },
    MESSAGE: { icon: MessageSquare, color: '#9C27B0', bg: 'rgba(156,39,176,0.1)' },
    LIKE: { icon: Heart, color: '#E91E63', bg: 'rgba(233,30,99,0.1)' },
    REVIEW: { icon: Star, color: '#FF9800', bg: 'rgba(255,152,0,0.1)' },
    DEFAULT: { icon: Bell, color: '#B5477A', bg: 'rgba(194,24,91,0.1)' },
};

function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/notifications/user_1`)
            .then(res => { const ct = res.headers.get('content-type') || ''; return ct.includes('application/json') ? res.json() : []; })
            .then(data => setNotifications(Array.isArray(data) && data.length > 0 ? data : MOCK_NOTIFS))
            .catch(() => setNotifications(MOCK_NOTIFS))
            .finally(() => setLoading(false));
    }, []);

    const renderNotif = ({ item }) => {
        let message = item.payload;
        try { message = JSON.parse(item.payload)?.message || item.payload; } catch {}
        const { icon: Icon, color, bg } = ICON_MAP[item.type] || ICON_MAP.DEFAULT;
        return (
            <TouchableOpacity style={[styles.notifCard, !item.isRead && styles.notifCardUnread]} activeOpacity={0.8}>
                <View style={[styles.iconCircle, { backgroundColor: bg }]}>
                    <Icon size={20} color={color} />
                </View>
                <View style={styles.notifBody}>
                    <Text style={[styles.notifMsg, !item.isRead && styles.notifMsgUnread]}>{message}</Text>
                    <Text style={styles.notifTime}>{timeAgo(item.createdAt)}</Text>
                </View>
                {!item.isRead && <View style={styles.unreadDot} />}
            </TouchableOpacity>
        );
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <Text style={styles.headerSub}>ACTIVITY</Text>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
                    {unreadCount > 0 && (
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{unreadCount} new</Text>
                        </View>
                    )}
                </View>
            </View>
            <FlatList
                data={notifications}
                renderItem={renderNotif}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={8}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        {loading ? <ActivityIndicator size="large" color='#B5477A' /> :
                            <>
                                <Bell size={48} color="#F8BBD9" strokeWidth={1.5} />
                                <Text style={styles.emptyText}>All caught up! 🌸</Text>
                            </>
                        }
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E8DDE2' },
    headerSub: { fontSize: 9, fontWeight: '900', color: '#B5477A', letterSpacing: 4, marginBottom: 4 },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    headerTitle: { fontSize: 26, fontWeight: '900', color: '#6B2D50' },
    countBadge: { backgroundColor: '#B5477A', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
    countText: { color: '#6B2D50', fontWeight: '900', fontSize: 11 },
    listContent: { paddingTop: 8, paddingBottom: 100 },
    notifCard: {
        flexDirection: 'row', alignItems: 'center', padding: 18, paddingHorizontal: 20,
        borderBottomWidth: 1, borderBottomColor: '#FFF0F5', backgroundColor: '#FDF0F5', gap: 16,
    },
    notifCardUnread: { backgroundColor: '#FFF8FB' },
    iconCircle: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
    notifBody: { flex: 1 },
    notifMsg: { fontSize: 13, color: '#9E8A92', lineHeight: 20, fontWeight: '500', marginBottom: 4 },
    notifMsgUnread: { color: '#6B2D50', fontWeight: '700' },
    notifTime: { fontSize: 10, color: '#9E8A92', fontWeight: '700' },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#B5477A', flexShrink: 0 },
    empty: { padding: 80, alignItems: 'center', gap: 16 },
    emptyText: { color: '#7B2D50', fontWeight: '700', fontSize: 15 },
});
