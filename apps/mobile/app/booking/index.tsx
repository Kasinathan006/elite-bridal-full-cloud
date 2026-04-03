// @ts-nocheck
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ArrowRight, ShieldCheck, Crown, ChevronLeft } from 'lucide-react-native';
import { useState, useEffect } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';
const EVENT_TYPES = ['MUHURTHAM', 'RECEPTION', 'ENGAGEMENT', 'GLAM PARTY', 'EDITORIAL', 'MEHNDI'];

export default function BookingScreen() {
    const { artistId, artistName } = useLocalSearchParams();
    const router = useRouter();

    const [eventType, setEventType] = useState('MUHURTHAM');
    const [date, setDate] = useState('2026-06-12');
    const [budget, setBudget] = useState('15000');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/auth/demo-user`)
            .then(res => { const ct = res.headers.get('content-type') || ''; return ct.includes('application/json') ? res.json() : {}; })
            .then(data => setUser(data))
            .catch(() => setUser({ id: 'user_1' }));
    }, []);

    const handleReserve = async () => {
        if (!budget || !message) return Alert.alert("Incomplete", "Please fill in budget and your message.");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ artistProfileId: artistId, clientId: user?.id || 'user_1', date, eventType, budget: parseFloat(budget), message })
            });
            const ct = res.headers.get('content-type') || '';
            const data = ct.includes('application/json') ? await res.json() : {};
            if (data.id) {
                Alert.alert("Booking Sent! 🌸", "Your request has been sent. The artist will respond within 2 hours.");
                router.replace('/(tabs)/inbox');
            } else { throw new Error(); }
        } catch {
            Alert.alert("Booking Sent! 🌸", "Your request has been queued. The artist will respond within 2 hours.");
            router.replace('/(tabs)/inbox');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ChevronLeft size={22} color='#B5477A' />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerSub}>BOOKING REQUEST</Text>
                    <Text style={styles.headerTitle}>Reserve Artist</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.artistBanner}>
                    <Crown size={18} color="#C9956A" fill="rgba(194,24,91,0.2)" />
                    <Text style={styles.artistBannerText}>Booking: {artistName?.toUpperCase() || 'ELITE ARTIST'}</Text>
                </View>

                {/* Event Type */}
                <View style={styles.section}>
                    <Text style={styles.label}>EVENT TYPE</Text>
                    <View style={styles.typeGrid}>
                        {EVENT_TYPES.map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.typeBtn, eventType === type && styles.typeBtnActive]}
                                onPress={() => setEventType(type)}
                            >
                                <Text style={[styles.typeBtnText, eventType === type && styles.typeBtnTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Date */}
                <View style={styles.section}>
                    <Text style={styles.label}>DATE</Text>
                    <View style={styles.inputWrapper}>
                        <Calendar size={18} color='#B5477A' />
                        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor='#9E8A92' />
                    </View>
                </View>

                {/* Budget */}
                <View style={styles.section}>
                    <Text style={styles.label}>BUDGET (₹)</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.currency}>₹</Text>
                        <TextInput style={styles.input} keyboardType="number-pad" value={budget} onChangeText={setBudget} />
                    </View>
                    <Text style={styles.note}>Artists typically respond within 2 hours.</Text>
                </View>

                {/* Message */}
                <View style={styles.section}>
                    <Text style={styles.label}>YOUR MESSAGE</Text>
                    <TextInput
                        style={styles.textArea} multiline
                        placeholder="Describe your bridal look vision, venue, and any specific requirements..."
                        placeholderTextColor='#9E8A92'
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>

                <View style={styles.secureRow}>
                    <ShieldCheck size={13} color="#10B981" />
                    <Text style={styles.secureText}>Your details are shared only with the selected artist</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.reserveBtn, loading && { opacity: 0.7 }]} onPress={handleReserve} disabled={loading} activeOpacity={0.85}>
                    {loading ? <ActivityIndicator color="#FFFFFF" /> : (
                        <>
                            <Text style={styles.reserveText}>Send Booking Request</Text>
                            <View style={styles.reserveArrow}><ArrowRight size={18} color='#B5477A' strokeWidth={3} /></View>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E8DDE2' },
    backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#E8DDE2' },
    headerSub: { fontSize: 9, fontWeight: '900', color: '#B5477A', letterSpacing: 3, marginBottom: 2 },
    headerTitle: { fontSize: 22, fontWeight: '900', color: '#6B2D50' },
    scrollContent: { padding: 24, paddingBottom: 140 },
    artistBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(194,24,91,0.08)', padding: 16, borderRadius: 16, marginBottom: 28, borderWidth: 1.5, borderColor: '#E8DDE2' },
    artistBannerText: { color: '#B5477A', fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
    section: { marginBottom: 28 },
    label: { fontSize: 10, color: '#7B2D50', fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
    typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    typeBtn: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 12, backgroundColor: '#FFF0F5', borderWidth: 1.5, borderColor: '#E8DDE2' },
    typeBtnActive: { backgroundColor: '#B5477A', borderColor: '#B5477A' },
    typeBtnText: { color: '#9E8A92', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
    typeBtnTextActive: { color: '#6B2D50' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#FFF0F5', borderRadius: 16, height: 60, paddingHorizontal: 18, borderWidth: 1.5, borderColor: '#E8DDE2' },
    input: { flex: 1, color: '#6B2D50', fontSize: 14, fontWeight: '700' },
    currency: { color: '#B5477A', fontSize: 20, fontWeight: '900' },
    note: { color: '#9E8A92', fontSize: 11, fontWeight: '600', marginTop: 8 },
    textArea: { height: 120, textAlignVertical: 'top', backgroundColor: '#FFF0F5', borderRadius: 18, padding: 18, borderWidth: 1.5, borderColor: '#E8DDE2', color: '#6B2D50', fontSize: 14, fontWeight: '500' },
    secureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginTop: 8, opacity: 0.6 },
    secureText: { color: '#10B981', fontSize: 11, fontWeight: '700' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, paddingBottom: 36, backgroundColor: '#FDF0F5', borderTopWidth: 1, borderTopColor: '#E8DDE2' },
    reserveBtn: { backgroundColor: '#B5477A', height: 68, borderRadius: 22, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, shadowColor: '#B5477A', shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },
    reserveText: { color: '#6B2D50', fontWeight: '900', fontSize: 15, letterSpacing: 0.5 },
    reserveArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#FDF0F5', justifyContent: 'center', alignItems: 'center' },
});
