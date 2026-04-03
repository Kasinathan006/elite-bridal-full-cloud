// @ts-nocheck
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput } from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark, Plus, Search, Bell, ShieldCheck, Star, Zap } from 'lucide-react-native';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const MOCK_POSTS = [
    {
        id: '1',
        author: { displayName: 'Lakshmi Studio', city: 'Chennai', isVerified: true, avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100' },
        content: 'ஒரு நல்ல Bridal look க்கு ஒரு நல்ல Artist தேவை. நான் ready! 💄✨ My latest Muhurtham transformation — full glam with long-wear HD base.',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700',
        likesCount: 247, commentsCount: 34, type: 'portfolio', createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: '2',
        author: { displayName: 'Riya Aesthetics', city: 'Bangalore', isVerified: true, avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100' },
        content: '5 years in the industry and still learning every single day. Every bride teaches me something new about beauty 🌸',
        image: null,
        likesCount: 183, commentsCount: 21, type: 'status', createdAt: new Date(Date.now() - 7200000).toISOString()
    },
    {
        id: '3',
        author: { displayName: 'Nithya Bridal Arts', city: 'Coimbatore', isVerified: false, avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100' },
        content: 'Mehndi season has arrived! Taking bookings for June-July 2026 — DM to reserve your date 🎊',
        image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=700',
        likesCount: 312, commentsCount: 58, type: 'portfolio', createdAt: new Date(Date.now() - 86400000).toISOString()
    },
];

function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
}

export default function HomeFeed() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedPosts, setLikedPosts] = useState({});

    const fetchFeed = useCallback(async () => {
        try {
            // CLOUD-FIRST: Try fetching from Supabase directly
            const { data, error } = await supabase
                .from('Post')
                .select('*, author:Profile(*)')
                .order('createdAt', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                setPosts(data);
            } else {
                // Fallback to API or Mock
                const res = await fetch(`${API_URL}/posts/feed`);
                const ct = res.headers.get('content-type') || '';
                const apiData = ct.includes('application/json') ? await res.json() : [];
                setPosts(Array.isArray(apiData) && apiData.length > 0 ? apiData : MOCK_POSTS);
            }
        } catch (err) {
            console.log('[FEED] Supabase Fetch Error, using mocks:', err.message);
            setPosts(MOCK_POSTS);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchFeed(); }, [fetchFeed]);

    const toggleLike = (id) => setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));

    const renderPost = ({ item }) => (
        <View style={styles.postCard}>
            {/* Author Row */}
            <View style={styles.authorRow}>
                <TouchableOpacity style={styles.authorLeft} onPress={() => router.push(`/details/artist?id=${item.author?.id || '1'}`)}>
                    <Image source={{ uri: item.author?.avatarUrl || 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100' }} style={styles.avatar} />
                    <View>
                        <View style={styles.nameInline}>
                            <Text style={styles.authorName}>{item.author?.displayName || 'Bridal Artist'}</Text>
                            {item.author?.isVerified && <ShieldCheck size={12} color='#B5477A' fill="rgba(194,24,91,0.1)" />}
                        </View>
                        <Text style={styles.authorMeta}>{item.author?.city?.toUpperCase() || 'INDIA'} · {timeAgo(item.createdAt)}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[styles.typePill, item.type === 'portfolio' && styles.typePillGold]}>
                    <Text style={[styles.typeText, item.type === 'portfolio' && styles.typeTextGold]}>
                        {item.type === 'portfolio' ? '✦ MASTERWORK' : item.type === 'video' ? '▶ CINEMATIC' : '◈ STATUS'}
                    </Text>
                </View>
            </View>

            {/* Content */}
            <Text style={styles.postContent}>{item.content}</Text>

            {/* Image */}
            {item.image && (
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
                </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
                    <Heart size={18} color={likedPosts[item.id] ? '#B5477A' : '#7B2D50'} fill={likedPosts[item.id] ? '#B5477A' : 'transparent'} />
                    <Text style={[styles.actionCount, likedPosts[item.id] && { color: '#B5477A' }]}>
                        {(item.likesCount || 0) + (likedPosts[item.id] ? 1 : 0)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <MessageCircle size={18} color="#7B2D50" />
                    <Text style={styles.actionCount}>{item.commentsCount || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <Share2 size={18} color="#7B2D50" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { marginLeft: 'auto' }]}>
                    <Bookmark size={18} color="#7B2D50" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.header}>
                <View>
                    <Text style={styles.brandMini}>🌸 BRIDAL CONNECT</Text>
                    <Text style={styles.headerTitle}>HOME FEED</Text>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerBtn} onPress={() => router.push('/notifications')}>
                        <Bell size={20} color='#B5477A' />
                        <View style={styles.notifDot} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerBtn} onPress={() => router.push('/(tabs)/search')}>
                        <Search size={20} color='#B5477A' />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.feedContent}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={10}
                initialNumToRender={3}
                onRefresh={fetchFeed}
                refreshing={loading}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color='#B5477A' />
                        ) : (
                            <Text style={styles.emptyText}>Feed loading...</Text>
                        )}
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/post')}>
                <Plus size={26} color="#FFFFFF" strokeWidth={3} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
        backgroundColor: '#FDF0F5', borderBottomWidth: 1, borderBottomColor: '#E8DDE2',
    },
    brandMini: { fontSize: 8, fontWeight: '900', color: '#B5477A', letterSpacing: 3, marginBottom: 2 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#6B2D50', letterSpacing: -0.5 },
    headerActions: { flexDirection: 'row', gap: 10 },
    headerBtn: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: '#E8DDE2',
    },
    notifDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#B5477A' },
    feedContent: { paddingBottom: 100, paddingTop: 8 },
    postCard: {
        backgroundColor: '#FDF0F5',
        marginHorizontal: 16, marginVertical: 8,
        borderRadius: 24, padding: 20,
        borderWidth: 1, borderColor: '#E8DDE2',
        shadowColor: '#B5477A', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    authorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    authorLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#FCE4EC', borderWidth: 2, borderColor: '#F48FB1' },
    nameInline: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
    authorName: { fontSize: 14, fontWeight: '900', color: '#6B2D50', letterSpacing: 0.3 },
    authorMeta: { fontSize: 9, color: '#9E8A92', fontWeight: '700', letterSpacing: 1 },
    typePill: {
        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
        backgroundColor: '#FFF0F5', borderWidth: 1, borderColor: '#E8DDE2',
    },
    typePillGold: { backgroundColor: 'rgba(194,24,91,0.1)', borderColor: 'rgba(194,24,91,0.25)' },
    typeText: { fontSize: 7, fontWeight: '900', color: '#9E8A92', letterSpacing: 0.5 },
    typeTextGold: { color: '#B5477A' },
    postContent: { fontSize: 14, color: '#6B2D50', lineHeight: 22, fontWeight: '500', marginBottom: 14 },
    imageWrapper: { borderRadius: 18, overflow: 'hidden', marginBottom: 14, borderWidth: 1, borderColor: '#E8DDE2' },
    postImage: { width: '100%', height: 220 },
    actions: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#FFF0F5' },
    actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12 },
    actionCount: { fontSize: 12, fontWeight: '800', color: '#7B2D50' },
    emptyContainer: { padding: 80, alignItems: 'center' },
    emptyText: { color: '#9E8A92', fontWeight: '900', fontSize: 10, letterSpacing: 2 },
    fab: {
        position: 'absolute', bottom: 28, right: 24,
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: '#B5477A',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#B5477A', shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
});
