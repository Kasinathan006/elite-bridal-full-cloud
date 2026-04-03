// @ts-nocheck
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, FlatList, StatusBar } from 'react-native';
import { Settings, MapPin, Star, ShieldCheck, Mail, Phone, Instagram, Calendar, Crown, ChevronLeft, ArrowUpRight, Grid, Bookmark, LayoutGrid, Clock, Award, Briefcase } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 3;

export default function ProfileScreen() {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/profiles/username/lakshmistudio`)
            .then(res => {
                const ct = res.headers.get('content-type') || '';
                return ct.includes('application/json') ? res.json() : null;
            })
            .then(data => {
                setProfile(data);
                setLoading(false);
            })
            .catch(err => {
                console.warn("Fetch profile failed", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <View style={styles.center}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Text style={styles.loadingText}>OPENING VAULT ARCHIVE...</Text>
        </View>
    );

    if (!profile) return <View style={styles.center}><Text style={styles.errorText}>RECORD NOT FOUND</Text></View>;

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Cinematic Header Module */}
                <View style={styles.headerContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' }}
                        style={styles.coverPhoto}
                    />
                    <View style={styles.coverOverlay} />

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <ChevronLeft size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Settings size={22} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileAbstract}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: profile.portfolioPhotos?.[0]?.url || 'https://i.pravatar.cc/150' }}
                                style={styles.avatar}
                            />
                            <View style={styles.crownBadge}>
                                <Crown size={16} color="#1A1A1A" fill="#1A1A1A" />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Identity Module */}
                <View style={styles.identitySection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.displayName}>{profile.displayName}</Text>
                        <View style={styles.verificationBadge}>
                            <ShieldCheck size={10} color="#10B981" />
                            <Text style={styles.vLabel}>V4.1 AUTHENTIC</Text>
                        </View>
                    </View>

                    <Text style={styles.tagline}>{profile.tagline?.toUpperCase() || 'ELITE HERITAGE ARTIST'}</Text>

                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <MapPin size={12} color='#B5477A' strokeWidth={3} />
                            <Text style={styles.metaText}>{profile.city?.toUpperCase()}</Text>
                        </View>
                        <View style={styles.metaDot} />
                        <View style={styles.metaItem}>
                            <Star size={12} color="#C9956A" fill='#B5477A' />
                            <Text style={styles.metaText}>{profile.avgRating || '5.0'} GRADE</Text>
                        </View>
                    </View>

                    {/* Authority Metrics */}
                    <View style={styles.metricsRow}>
                        <View style={styles.metricBox}>
                            <Text style={styles.metricValue}>{profile.followerCount || '1.2K'}</Text>
                            <Text style={styles.metricLabel}>NETWORK</Text>
                        </View>
                        <View style={styles.metricDivider} />
                        <View style={styles.metricBox}>
                            <Text style={styles.metricValue}>124</Text>
                            <Text style={styles.metricLabel}>ENGAGEMENTS</Text>
                        </View>
                        <View style={styles.metricDivider} />
                        <View style={styles.metricBox}>
                            <Text style={styles.metricValue}>98%</Text>
                            <Text style={styles.metricLabel}>PRESTIGE</Text>
                        </View>
                    </View>

                    {/* Protocol Actions */}
                    <View style={styles.actionGrid}>
                        <TouchableOpacity style={styles.primaryAction} onPress={() => router.push('/booking')}>
                            <Text style={styles.primaryActionText}>INITIALIZE RESERVATION</Text>
                            <ArrowUpRight size={18} color='#B5477A' strokeWidth={3} />
                        </TouchableOpacity>
                        <View style={styles.secondaryActions}>
                            <TouchableOpacity style={styles.squareAction}>
                                <Mail size={22} color="#FFFFFF" strokeWidth={2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.squareAction}>
                                <Instagram size={22} color="#FFFFFF" strokeWidth={2} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.squareAction}>
                                <Bookmark size={22} color="#FFFFFF" strokeWidth={2} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Narrative Section */}
                    <View style={styles.narrativeSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionLine} />
                            <Text style={styles.sectionTitle}>THE NARRATIVE</Text>
                        </View>
                        <Text style={styles.bioText}>{profile.bio || 'Architecting timeless bridal aesthetics with clinical precision and heritage soul.'}</Text>

                        {/* Credentials Module */}
                        <View style={styles.credentialsRow}>
                            <View style={styles.credential}>
                                <Award size={14} color="#C9956A" />
                                <Text style={styles.credText}>MAC PRO CERTIFIED</Text>
                            </View>
                            <View style={styles.credential}>
                                <Briefcase size={14} color='#B5477A' />
                                <Text style={styles.credText}>8+ YEARS INTEL</Text>
                            </View>
                        </View>
                    </View>

                    {/* Masterworks Vault */}
                    <View style={styles.vaultSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionLine} />
                            <Text style={styles.sectionTitle}>MASTERWORKS VAULT</Text>
                            <TouchableOpacity style={styles.gridMode}>
                                <LayoutGrid size={18} color='#B5477A' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.photoGrid}>
                            {profile.portfolioPhotos?.map((photo, idx) => (
                                <TouchableOpacity key={photo.id || idx} style={styles.vaultItem}>
                                    <Image source={{ uri: photo.url }} style={styles.vaultImage} />
                                    <View style={styles.vaultOverlay}>
                                        <Text style={styles.vaultId}>INDEX #{2024 + idx}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundcolor: '#6B2D50' },
    container: { flex: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundcolor: '#6B2D50' },
    loadingText: { color: '#B5477A', fontWeight: '900', fontSize: 10, letterSpacing: 4 },
    errorText: { color: '#9E8A92', fontWeight: '900', fontSize: 10, letterSpacing: 2 },
    headerContainer: { height: 320, position: 'relative', backgroundcolor: '#6B2D50' },
    coverPhoto: { width: '100%', height: '100%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
    coverOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26, 26, 26, 0.5)', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 },
    headerActions: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    iconBtn: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(26, 26, 26, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#9E8A92'
    },
    profileAbstract: {
        position: 'absolute',
        bottom: -60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
        padding: 8,
        backgroundcolor: '#6B2D50',
        borderRadius: 50, // High-radius container
        borderWidth: 1,
        borderColor: '#E8DDE2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    avatar: { width: 120, height: 120, borderRadius: 42 },
    crownBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: '#B5477A',
        width: 36,
        height: 36,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        bordercolor: '#6B2D50',
    },
    identitySection: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 100 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
    displayName: { fontSize: 26, fontWeight: '900', color: '#6B2D50', letterSpacing: -0.5, textTransform: 'uppercase' },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)'
    },
    vLabel: { color: '#10B981', fontSize: 7, fontWeight: '900', letterSpacing: 1 },
    tagline: { fontSize: 10, color: '#B5477A', fontWeight: '900', textAlign: 'center', marginTop: 12, letterSpacing: 3 },
    metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, gap: 16 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    metaText: { color: '#9E8A92', fontWeight: '900', fontSize: 9, letterSpacing: 1.5 },
    metaDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#F8BBD9' },
    metricsRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF0F5',
        borderRadius: 25,
        marginTop: 40,
        paddingVertical: 24,
        borderWidth: 1,
        borderColor: '#E8DDE2',
    },
    metricBox: { flex: 1, alignItems: 'center' },
    metricDivider: { width: 1, height: 24, backgroundColor: '#F8BBD9' },
    metricValue: { fontSize: 20, fontWeight: '900', color: '#6B2D50', letterSpacing: -1 },
    metricLabel: { fontSize: 8, color: '#9E8A92', marginTop: 6, fontWeight: '900', letterSpacing: 2 },
    actionGrid: { marginTop: 40, gap: 12 },
    primaryAction: {
        backgroundColor: '#B5477A',
        height: 68,
        borderRadius: 22,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#B5477A',
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    primaryActionText: { color: '#6B2D50', fontWeight: '900', fontSize: 13, letterSpacing: 2 },
    secondaryActions: { flexDirection: 'row', gap: 12 },
    squareAction: {
        flex: 1,
        backgroundColor: '#FFF0F5',
        height: 64,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8DDE2',
    },
    narrativeSection: { marginTop: 48 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    sectionLine: { width: 30, height: 2, backgroundColor: '#B5477A' },
    sectionTitle: { fontSize: 10, fontWeight: '900', color: '#6B2D50', letterSpacing: 4 },
    gridMode: { marginLeft: 'auto' },
    bioText: { fontSize: 15, color: '#9E8A92', lineHeight: 26, fontWeight: '400', italic: true },
    credentialsRow: { flexDirection: 'row', gap: 16, marginTop: 24 },
    credential: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF0F5', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#E8DDE2' },
    credText: { color: '#B5477A', fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    vaultSection: { marginTop: 48 },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -2 },
    vaultItem: { width: COLUMN_WIDTH - 2, height: COLUMN_WIDTH * 1.3, margin: 1, position: 'relative' },
    vaultImage: { width: '100%', height: '100%', borderRadius: 12 },
    vaultOverlay: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(194,24,91,0.25)'
    },
    vaultId: { color: '#B5477A', fontSize: 7, fontWeight: '900', letterSpacing: 0.5 }
});

