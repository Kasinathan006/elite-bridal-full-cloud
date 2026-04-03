// @ts-nocheck
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ChevronLeft, Star, MapPin, ShieldCheck, Calendar, MessageCircle, Crown, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

export default function ArtistDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/profiles/${id}`)
            .then(res => {
                const ct = res.headers.get('content-type') || '';
                return ct.includes('application/json') ? res.json() : null;
            })
            .then(data => {
                setArtist(data);
            })
            .catch(err => console.warn('Offline Mode:', err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color='#B5477A' />
        </View>
    );

    if (!artist) return (
        <View style={styles.center}>
            <Text style={styles.errorText}>RESOURCE NOT FOUND IN REGISTRY</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Text style={styles.backBtnText}>RETURN TO DISCOVERY</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Visual Header */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: artist.portfolioPhotos?.[0]?.url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800' }}
                        style={styles.heroImage}
                    />
                    <View style={styles.heroOverlay} />
                    <TouchableOpacity style={styles.topBack} onPress={() => router.back()}>
                        <ChevronLeft size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                    <View style={styles.heroHeader}>
                        <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeText}>ELITE GRADE ARTIST</Text>
                        </View>
                        <Text style={styles.heroTitle}>{artist.displayName}</Text>
                        <View style={styles.heroMeta}>
                            <Text style={styles.heroUsername}>@{artist.username}</Text>
                            <View style={styles.heroDot} />
                            <MapPin size={10} color='#B5477A' />
                            <Text style={styles.heroLocation}>{artist.city?.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>

                {/* Metrics Bar */}
                <View style={styles.metricsBar}>
                    <View style={styles.metricItem}>
                        <Text style={styles.metricValue}>{artist.avgRating || '5.0'}</Text>
                        <Text style={styles.metricLabel}>VALUATION</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                        <Text style={styles.metricValue}>{artist.followerCount || '1.2K'}</Text>
                        <Text style={styles.metricLabel}>NETWORK</Text>
                    </View>
                    <View style={styles.metricDivider} />
                    <View style={styles.metricItem}>
                        <Text style={styles.metricValue}>â‚¹{artist.priceMin || '8K'}+</Text>
                        <Text style={styles.metricLabel}>BASE RATE</Text>
                    </View>
                </View>

                {/* Bio / Bio Detail */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionDot} />
                        <Text style={styles.sectionTitle}>ARTIST VISION</Text>
                    </View>
                    <Text style={styles.bioText}>
                        {artist.bio || "No narrative established in registry. This artist operates under private institutional authority with a focus on high-fidelity bridal masterworks."}
                    </Text>

                    <View style={styles.tagsContainer}>
                        {(artist.specializations || "Makeup, Hair, Styling").split(',').map(tag => (
                            <View key={tag} style={styles.tag}>
                                <Text style={styles.tagText}>{tag.trim().toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Portfolio Preview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionDot} />
                        <Text style={styles.sectionTitle}>MASTERWORK ARCHIVE</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
                        {(artist.portfolioPhotos && artist.portfolioPhotos.length > 0 ? artist.portfolioPhotos : [1, 2, 3]).map((photo, idx) => (
                            <Image
                                key={idx}
                                source={{ uri: photo.url || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400' }}
                                style={styles.portfolioImage}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Action Protocols */}
                <View style={styles.actionSection}>
                    <View style={styles.protocolHeader}>
                        <Zap size={14} color='#B5477A' fill='#B5477A' />
                        <Text style={styles.protocolTitle}>TRANSMISSION PROTOCOLS</Text>
                    </View>
                    <View style={styles.protocolGrid}>
                        <TouchableOpacity style={styles.pCard}>
                            <MessageCircle size={20} color="#FFFFFF" strokeWidth={2} />
                            <Text style={styles.pLabel}>OPEN CHANNEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pCard}>
                            <Share2 size={20} color="#FFFFFF" strokeWidth={2} />
                            <Text style={styles.pLabel}>DISTRIBUTE DATA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pCard}>
                            <Heart size={20} color="#FFFFFF" strokeWidth={2} />
                            <Text style={styles.pLabel}>INDEX ASSET</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Booking CTA */}
            <View style={styles.ctaBar}>
                <View style={styles.ctaPricing}>
                    <Text style={styles.ctaLabel}>PROPOSED VALUATION</Text>
                    <Text style={styles.ctaPrice}>â‚¹{artist.priceMin?.toLocaleString() || '15,000'}</Text>
                </View>
                <TouchableOpacity
                    style={styles.ctaBtn}
                    onPress={() => router.push({
                        pathname: '/booking',
                        params: { artistId: artist.id, artistName: artist.displayName }
                    })}
                >
                    <Text style={styles.ctaText}>INITIATE RESERVE</Text>
                    <View style={styles.ctaIcon}>
                        <Crown size={16} color="#1A1A1A" fill="#1A1A1A" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF0F5' },
    errorText: { color: '#9E8A92', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
    backBtn: { marginTop: 24, padding: 16, borderBottomWidth: 1, borderBottomColor: '#B5477A' },
    backBtnText: { color: '#B5477A', fontSize: 9, fontWeight: '900', letterSpacing: 3 },
    heroContainer: { height: 500, position: 'relative' },
    heroImage: { width: '100%', height: '100%' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0.8 },
    topBack: { position: 'absolute', top: 60, left: 24, width: 44, height: 44, borderRadius: 15, backgroundColor: 'rgba(26,26,26,0.6)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#9E8A92' },
    heroHeader: { position: 'absolute', bottom: 40, left: 24, right: 24 },
    heroBadge: { alignSelf: 'flex-start', backgroundColor: '#B5477A', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 12 },
    heroBadgeText: { color: '#6B2D50', fontSize: 8, fontWeight: '900', letterSpacing: 1.5 },
    heroTitle: { color: '#6B2D50', fontSize: 36, fontWeight: '900', letterSpacing: -1, italic: true },
    heroMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 8 },
    heroUsername: { color: '#9E8A92', fontSize: 11, fontWeight: '800' },
    heroDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#B5477A' },
    heroLocation: { color: '#6B2D50', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    metricsBar: { flexDirection: 'row', backgroundColor: '#FFF0F5', marginHorizontal: 24, marginTop: -40, borderRadius: 25, height: 100, alignItems: 'center', paddingHorizontal: 12, borderWidth: 1, borderColor: '#E8DDE2' },
    metricItem: { flex: 1, alignItems: 'center' },
    metricValue: { color: '#6B2D50', fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
    metricLabel: { color: '#9E8A92', fontSize: 7, fontWeight: '900', letterSpacing: 1.5, marginTop: 4 },
    metricDivider: { width: 1, height: 40, backgroundColor: '#F8BBD9' },
    section: { padding: 24, marginTop: 12 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    sectionDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#B5477A' },
    sectionTitle: { color: '#9E8A92', fontSize: 9, fontWeight: '900', letterSpacing: 3 },
    bioText: { color: '#9E8A92', fontSize: 15, lineHeight: 26, fontWeight: '500', italic: true },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 24 },
    tag: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: '#FFF0F5', borderWidth: 1, borderColor: '#E8DDE2' },
    tagText: { color: '#B5477A', fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    portfolioScroll: { marginTop: 8 },
    portfolioImage: { width: width * 0.45, height: width * 0.6, borderRadius: 18, marginRight: 12, backgroundColor: '#FFF0F5' },
    actionSection: { padding: 24 },
    protocolHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
    protocolTitle: { color: '#9E8A92', fontSize: 8, fontWeight: '900', letterSpacing: 2 },
    protocolGrid: { flexDirection: 'row', gap: 12 },
    pCard: { flex: 1, height: 100, backgroundColor: '#FFF0F5', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#E8DDE2' },
    pLabel: { color: '#9E8A92', fontSize: 7, fontWeight: '900', letterSpacing: 1 },
    ctaBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, backgroundColor: '#FFF0F5', borderTopWidth: 1, borderTopColor: '#E8DDE2', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 15 },
    ctaPricing: { flex: 1 },
    ctaLabel: { color: '#9E8A92', fontSize: 7, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
    ctaPrice: { color: '#6B2D50', fontSize: 22, fontWeight: '900' },
    ctaBtn: { backgroundColor: '#B5477A', height: 64, borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 16, shadowColor: '#B5477A', shadowOpacity: 0.3, shadowRadius: 15, elevation: 5 },
    ctaText: { color: '#6B2D50', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
    ctaIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(26,26,26,0.1)', justifyContent: 'center', alignItems: 'center' }
});

