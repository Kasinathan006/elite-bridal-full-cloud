// @ts-nocheck
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Briefcase, MapPin, Calendar, ArrowRight, ShieldCheck, Star, ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const MOCK_GIGS = [
    { id: '1', title: 'Luxury Muhurtham — Lead Makeup', description: 'Elite artist required for high-profile wedding in Chennai. Must have 5+ years in traditional silk saree and long-wear HD makeup.', location: 'Chennai, Tamil Nadu', date: '2026-06-12T00:00:00.000Z', budget: 45000, status: 'OPEN', creator: { displayName: 'Prabha Events Co.' } },
    { id: '2', title: 'Bollywood Glam Reception', description: 'Collaborative project for 500+ guests. Looking for 2 assistants for guest makeup. High speed and precision mandatory.', location: 'Bangalore, Karnataka', date: '2026-05-20T00:00:00.000Z', budget: 15000, status: 'OPEN', creator: { displayName: 'Aura Weddings' } },
    { id: '3', title: 'South Indian Bridal Package', description: 'Full bridal package — makeup + hair + saree draping. Budget negotiable for the right artist.', location: 'Coimbatore, Tamil Nadu', date: '2026-07-04T00:00:00.000Z', budget: 35000, status: 'OPEN', creator: { displayName: 'Private Client' } },
];

export default function GigsScreen() {
    const router = useRouter();
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/gigs`)
            .then(res => { const ct = res.headers.get('content-type') || ''; return ct.includes('application/json') ? res.json() : []; })
            .then(data => setGigs(Array.isArray(data) && data.length > 0 ? data : MOCK_GIGS))
            .catch(() => setGigs(MOCK_GIGS))
            .finally(() => setLoading(false));
    }, []);

    const renderGig = ({ item }) => (
        <TouchableOpacity style={styles.gigCard} activeOpacity={0.8}>
            <View style={styles.gigTop}>
                <View style={[styles.statusPill, item.status === 'OPEN' && styles.statusOpen]}>
                    <Text style={[styles.statusText, item.status === 'OPEN' && styles.statusTextOpen]}>● {item.status}</Text>
                </View>
                <Text style={styles.budgetText}>₹{(item.budget || 0).toLocaleString('en-IN')}</Text>
            </View>
            <Text style={styles.gigTitle}>{item.title}</Text>
            <Text style={styles.gigDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.gigMeta}>
                <View style={styles.metaItem}>
                    <MapPin size={12} color='#B5477A' />
                    <Text style={styles.metaText}>{item.location}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Calendar size={12} color='#B5477A' />
                    <Text style={styles.metaText}>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                </View>
            </View>
            <View style={styles.gigFooter}>
                <Text style={styles.postedBy}>by {item.creator?.displayName || 'Client'}</Text>
                <TouchableOpacity style={styles.applyBtn}>
                    <Text style={styles.applyText}>Apply Now</Text>
                    <ArrowRight size={14} color="#FFFFFF" strokeWidth={3} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <Text style={styles.headerSub}>OPPORTUNITIES</Text>
                <Text style={styles.headerTitle}>GIGS & PROJECTS</Text>
            </View>
            <FlatList
                data={gigs}
                renderItem={renderGig}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        {loading ? <ActivityIndicator size="large" color='#B5477A' /> : <Text style={styles.emptyText}>No gigs right now. Check back soon!</Text>}
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
    headerTitle: { fontSize: 26, fontWeight: '900', color: '#6B2D50' },
    listContent: { padding: 16, paddingBottom: 100 },
    gigCard: {
        backgroundColor: '#FDF0F5', borderRadius: 24, padding: 22,
        marginBottom: 16, borderWidth: 1.5, borderColor: '#E8DDE2',
        shadowColor: '#B5477A', shadowOpacity: 0.06, shadowRadius: 12, elevation: 2,
    },
    gigTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    statusPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, backgroundColor: '#F5F5F5' },
    statusOpen: { backgroundColor: 'rgba(194,24,91,0.1)' },
    statusText: { fontSize: 9, fontWeight: '900', color: '#9E8A92', letterSpacing: 1 },
    statusTextOpen: { color: '#B5477A' },
    budgetText: { fontSize: 20, fontWeight: '900', color: '#B5477A' },
    gigTitle: { fontSize: 16, fontWeight: '900', color: '#6B2D50', marginBottom: 8, lineHeight: 22 },
    gigDesc: { fontSize: 13, color: '#9E8A92', lineHeight: 20, marginBottom: 16 },
    gigMeta: { gap: 8, marginBottom: 20 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    metaText: { fontSize: 12, color: '#7B2D50', fontWeight: '700' },
    gigFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: '#FFF0F5' },
    postedBy: { fontSize: 11, color: '#9E8A92', fontWeight: '700' },
    applyBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#B5477A', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14 },
    applyText: { color: '#6B2D50', fontWeight: '900', fontSize: 12 },
    empty: { padding: 80, alignItems: 'center' },
    emptyText: { color: '#9E8A92', fontWeight: '700', fontSize: 14, textAlign: 'center' },
});
