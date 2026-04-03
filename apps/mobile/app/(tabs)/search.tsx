// @ts-nocheck
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar, ActivityIndicator, Image } from 'react-native';
import { Search as SearchIcon, Sliders, ArrowRight, ShieldCheck, Star } from 'lucide-react-native';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';
const CATEGORIES = ['ALL', 'MAKEUP', 'HAIR', 'SAREE', 'MEHNDI', 'FLORAL'];

const MOCK_ARTISTS = [
    { id: '1', displayName: 'Aisha Makeup Studio', city: 'Chennai', specializations: 'Bridal Makeup', avgRating: 4.9, priceMin: 8000, isVerified: true, portfolioPhotos: [{ url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400' }] },
    { id: '2', displayName: 'Riya Aesthetics', city: 'Bangalore', specializations: 'Hair Stylist', avgRating: 4.7, priceMin: 5000, isVerified: true, portfolioPhotos: [{ url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400' }] },
    { id: '3', displayName: 'Nithya Bridal Arts', city: 'Coimbatore', specializations: 'Mehndi Artist', avgRating: 5.0, priceMin: 3500, isVerified: false, portfolioPhotos: [{ url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400' }] },
    { id: '4', displayName: 'Priya Heritage Studio', city: 'Madurai', specializations: 'Saree Draping', avgRating: 4.8, priceMin: 4500, isVerified: true, portfolioPhotos: [{ url: 'https://images.unsplash.com/photo-1583935293285-d8aa497ce93d?w=400' }] },
];

export default function SearchScreen() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchResults = useCallback(async () => {
        setLoading(true);
        try {
            const catParam = selectedCategory !== 'ALL' ? `&specialization=${selectedCategory}` : '';
            const res = await fetch(`${API_URL}/search/profiles?q=${query}${catParam}`);
            const ct = res.headers.get('content-type') || '';
            const data = ct.includes('application/json') ? await res.json() : [];
            setResults(Array.isArray(data) && data.length > 0 ? data : MOCK_ARTISTS);
        } catch {
            setResults(MOCK_ARTISTS);
        } finally {
            setLoading(false);
        }
    }, [query, selectedCategory]);

    useEffect(() => { fetchResults(); }, [selectedCategory]);

    const renderArtist = ({ item }) => (
        <TouchableOpacity style={styles.artistCard} onPress={() => router.push(`/details/artist?id=${item.id}`)} activeOpacity={0.8}>
            <Image
                source={{ uri: item.portfolioPhotos?.[0]?.url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400' }}
                style={styles.artistImage}
            />
            <View style={styles.artistInfo}>
                <View style={styles.nameRow}>
                    <Text style={styles.artistName} numberOfLines={1}>{item.displayName}</Text>
                    {item.isVerified && <ShieldCheck size={14} color='#B5477A' fill="rgba(194,24,91,0.1)" />}
                </View>
                <Text style={styles.artistCity}>{item.city?.toUpperCase()} · {item.specializations?.toUpperCase() || 'PRO ARTIST'}</Text>
                <View style={styles.ratingRow}>
                    <Star size={10} color="#C9956A" fill='#B5477A' />
                    <Text style={styles.ratingText}>{item.avgRating?.toFixed(1) || '5.0'}</Text>
                    <View style={styles.pricePill}>
                        <Text style={styles.priceText}>₹{(item.priceMin || 5000).toLocaleString('en-IN')}+</Text>
                    </View>
                </View>
            </View>
            <View style={styles.arrowBtn}>
                <ArrowRight size={16} color='#B5477A' strokeWidth={3} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <Text style={styles.headerSub}>DISCOVERY</Text>
                <Text style={styles.headerTitle}>FIND ARTISTS</Text>
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <SearchIcon size={16} color='#B5477A' strokeWidth={3} />
                        <TextInput
                            placeholder="Search bridal artists..."
                            placeholderTextColor='#9E8A92'
                            style={styles.input}
                            value={query}
                            onChangeText={setQuery}
                            onSubmitEditing={fetchResults}
                            returnKeyType="search"
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn} onPress={fetchResults}>
                        <Sliders size={18} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={results}
                renderItem={renderArtist}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={6}
                windowSize={8}
                initialNumToRender={4}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={() => (
                    <View style={styles.catSection}>
                        {CATEGORIES.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setSelectedCategory(cat)}
                                style={[styles.catBtn, selectedCategory === cat && styles.catBtnActive]}
                            >
                                <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        {loading ? <ActivityIndicator size="large" color='#B5477A' /> :
                            <Text style={styles.emptyText}>No artists found. Try a different filter.</Text>}
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: {
        paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20,
        backgroundColor: '#FDF0F5', borderBottomWidth: 1, borderBottomColor: '#E8DDE2',
    },
    headerSub: { fontSize: 9, fontWeight: '900', color: '#B5477A', letterSpacing: 4, marginBottom: 2 },
    headerTitle: { fontSize: 26, fontWeight: '900', color: '#6B2D50', letterSpacing: -0.5, marginBottom: 16 },
    searchRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    searchBar: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFF0F5', paddingHorizontal: 16, height: 52,
        borderRadius: 16, borderWidth: 1.5, borderColor: '#E8DDE2',
    },
    input: { marginLeft: 10, flex: 1, fontSize: 13, color: '#6B2D50', fontWeight: '700' },
    filterBtn: {
        width: 52, height: 52, backgroundColor: '#B5477A', borderRadius: 16,
        justifyContent: 'center', alignItems: 'center',
    },
    listContent: { paddingBottom: 100 },
    catSection: {
        flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, gap: 8,
        backgroundColor: '#FDF0F5', flexWrap: 'wrap',
    },
    catBtn: {
        paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12,
        backgroundColor: '#FFF0F5', borderWidth: 1.5, borderColor: '#E8DDE2',
    },
    catBtnActive: { backgroundColor: '#B5477A', borderColor: '#B5477A' },
    catText: { color: '#9E8A92', fontWeight: '900', fontSize: 10, letterSpacing: 1 },
    catTextActive: { color: '#6B2D50' },
    artistCard: {
        flexDirection: 'row', backgroundColor: '#FDF0F5',
        borderRadius: 24, padding: 16, marginHorizontal: 16, marginBottom: 12,
        borderWidth: 1.5, borderColor: '#E8DDE2', alignItems: 'center',
        shadowColor: '#B5477A', shadowOpacity: 0.07, shadowRadius: 10, elevation: 2,
    },
    artistImage: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#FCE4EC', borderWidth: 2, borderColor: '#F48FB1' },
    artistInfo: { flex: 1, marginLeft: 16 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    artistName: { fontSize: 14, fontWeight: '900', color: '#6B2D50', flex: 1 },
    artistCity: { color: '#9E8A92', fontSize: 9, fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { color: '#B5477A', fontSize: 12, fontWeight: '900' },
    pricePill: { backgroundColor: '#FFF0F5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#E8DDE2' },
    priceText: { color: '#7B2D50', fontWeight: '900', fontSize: 11 },
    arrowBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#E8DDE2' },
    empty: { padding: 80, alignItems: 'center' },
    emptyText: { color: '#9E8A92', fontWeight: '700', fontSize: 13, textAlign: 'center' },
});
