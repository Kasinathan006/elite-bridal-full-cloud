// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, MapPin, ShieldCheck, ChevronLeft, ArrowRight, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const ROLES = [
    { id: 'Makeup Artistry', label: '💄 Makeup Artistry', sub: 'HD, Airbrush, Bridal' },
    { id: 'Hair Styling', label: '💇 Hair Styling', sub: 'Updos, Extensions, Cuts' },
    { id: 'Saree Draping', label: '🥻 Saree Draping', sub: 'Traditional & Modern' },
    { id: 'Photography', label: '📸 Photography', sub: 'Bridal & Candid' },
    { id: 'Mehndi', label: '🌿 Mehndi Artist', sub: 'Bridal & Arabic' },
    { id: 'Floral Jewelry', label: '🌸 Floral Jewelry', sub: 'Gajra & Arrangements' },
];

export default function JoinScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', location: '', specialization: '' });

    const handleNext = async () => {
        if (step === 1) {
            if (!formData.name || !formData.location) return Alert.alert("Incomplete", "Please fill in your name and city.");
            setStep(2);
        } else if (step === 2) {
            if (!formData.specialization) return Alert.alert("Choose Your Craft", "Select your primary specialization.");
            setStep(3);
        } else {
            setLoading(true);
            try {
                // Real registration route requiring an active backend
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: '9000090000', profile: { displayName: formData.name, city: formData.location, specializations: formData.specialization } })
                });
                const ct = res.headers.get('content-type') || '';
                const data = ct.includes('application/json') ? await res.json() : {};

                if (data.success) {
                    router.replace('/(tabs)');
                } else {
                    Alert.alert("Registration Failed", data.error || "Server rejected the registration package.");
                }
            } catch (error) {
                Alert.alert("Network Error", "Unable to establish connection to the Bridal Connect server.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.main}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
                        <ChevronLeft size={22} color='#B5477A' />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.stepLabel}>STEP {step} of 3</Text>
                        <Text style={styles.stepTitle}>
                            {step === 1 ? 'Your Identity' : step === 2 ? 'Your Craft' : 'You\'re All Set!'}
                        </Text>
                    </View>
                </View>

                {/* Progress */}
                <View style={styles.progressBar}>
                    {[1, 2, 3].map(s => (
                        <View key={s} style={[styles.progressNode, step >= s && styles.progressNodeActive]} />
                    ))}
                </View>

                {/* Step 1 */}
                {step === 1 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionDesc}>Tell us about your brand</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>PROFESSIONAL NAME / STUDIO NAME</Text>
                            <View style={styles.inputWrapper}>
                                <User size={18} color='#B5477A' style={{ marginRight: 12 }} />
                                <TextInput
                                    placeholder="e.g. Lakshmi Bridal Studio"
                                    placeholderTextColor='#9E8A92'
                                    style={styles.input}
                                    value={formData.name}
                                    onChangeText={(t) => setFormData({ ...formData, name: t })}
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>YOUR CITY</Text>
                            <View style={styles.inputWrapper}>
                                <MapPin size={18} color='#B5477A' style={{ marginRight: 12 }} />
                                <TextInput
                                    placeholder="e.g. Chennai, Bangalore, Coimbatore"
                                    placeholderTextColor='#9E8A92'
                                    style={styles.input}
                                    value={formData.location}
                                    onChangeText={(t) => setFormData({ ...formData, location: t })}
                                />
                            </View>
                        </View>
                    </View>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionDesc}>Choose your primary specialization</Text>
                        <View style={styles.roleGrid}>
                            {ROLES.map(role => (
                                <TouchableOpacity
                                    key={role.id}
                                    style={[styles.roleBtn, formData.specialization === role.id && styles.roleBtnActive]}
                                    onPress={() => setFormData({ ...formData, specialization: role.id })}
                                >
                                    <Text style={[styles.roleEmoji]}>{role.label}</Text>
                                    <Text style={[styles.roleSub, formData.specialization === role.id && styles.roleSubActive]}>{role.sub}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <View style={styles.section}>
                        <View style={styles.successBox}>
                            <View style={styles.successIcon}>
                                <Sparkles size={48} color="#FFFFFF" />
                            </View>
                            <Text style={styles.successTitle}>Welcome to the Guild! 🌸</Text>
                            <Text style={styles.successDesc}>
                                {formData.name} from {formData.location} — your artist profile is ready to go live!
                            </Text>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryItem}>💄 Specialization: {formData.specialization}</Text>
                                <Text style={styles.summaryItem}>📍 City: {formData.location}</Text>
                                <Text style={styles.summaryItem}>✅ Profile verification: Pending</Text>
                            </View>
                        </View>
                    </View>
                )}

                <TouchableOpacity style={[styles.nextBtn, loading && { opacity: 0.7 }]} onPress={handleNext} disabled={loading}>
                    {loading
                        ? <ActivityIndicator color="#FFFFFF" />
                        : <Text style={styles.nextText}>{step === 3 ? 'Enter the Guild' : 'Continue'}</Text>
                    }
                    {!loading && <View style={styles.nextArrow}><ArrowRight size={20} color='#B5477A' strokeWidth={3} /></View>}
                </TouchableOpacity>

                <View style={styles.trust}>
                    <ShieldCheck size={12} color='#B5477A' />
                    <Text style={styles.trustText}>Your profile is secured and visible only to verified clients</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: '#FDF0F5' },
    container: { flexGrow: 1, padding: 28, paddingTop: 60, paddingBottom: 60 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 32 },
    backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#E8DDE2' },
    stepLabel: { fontSize: 10, color: '#B5477A', fontWeight: '900', letterSpacing: 3, marginBottom: 4 },
    stepTitle: { fontSize: 22, fontWeight: '900', color: '#6B2D50' },
    progressBar: { flexDirection: 'row', gap: 8, marginBottom: 40 },
    progressNode: { flex: 1, height: 5, borderRadius: 3, backgroundColor: '#FCE4EC' },
    progressNodeActive: { backgroundColor: '#B5477A' },
    section: { gap: 24 },
    sectionDesc: { fontSize: 14, color: '#9E8A92', fontWeight: '600' },
    inputGroup: { gap: 10 },
    label: { fontSize: 10, color: '#7B2D50', fontWeight: '900', letterSpacing: 2 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFF0F5', borderRadius: 18, height: 64,
        paddingHorizontal: 20, borderWidth: 1.5, borderColor: '#E8DDE2',
    },
    input: { flex: 1, color: '#6B2D50', fontSize: 14, fontWeight: '700' },
    roleGrid: { gap: 12 },
    roleBtn: {
        padding: 20, borderRadius: 20, backgroundColor: '#FFF0F5',
        borderWidth: 1.5, borderColor: '#E8DDE2',
    },
    roleBtnActive: { backgroundColor: '#FCE4EC', borderColor: '#B5477A', borderWidth: 2 },
    roleEmoji: { fontSize: 15, fontWeight: '800', color: '#6B2D50', marginBottom: 4 },
    roleSub: { fontSize: 11, color: '#9E8A92', fontWeight: '600' },
    roleSubActive: { color: '#7B2D50' },
    successBox: { alignItems: 'center', gap: 20, paddingVertical: 24 },
    successIcon: { width: 100, height: 100, borderRadius: 32, backgroundColor: '#B5477A', justifyContent: 'center', alignItems: 'center', shadowColor: '#B5477A', shadowOpacity: 0.35, shadowRadius: 20, elevation: 8 },
    successTitle: { fontSize: 24, fontWeight: '900', color: '#6B2D50', textAlign: 'center' },
    successDesc: { fontSize: 14, color: '#9E8A92', textAlign: 'center', lineHeight: 22, fontWeight: '500' },
    summaryCard: { backgroundColor: '#FFF0F5', borderRadius: 20, padding: 20, width: '100%', gap: 10, borderWidth: 1.5, borderColor: '#E8DDE2' },
    summaryItem: { fontSize: 13, color: '#7B2D50', fontWeight: '700' },
    nextBtn: {
        marginTop: 48, backgroundColor: '#B5477A', height: 68, borderRadius: 22,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16,
        shadowColor: '#B5477A', shadowOpacity: 0.35, shadowRadius: 16, elevation: 8,
    },
    nextText: { color: '#6B2D50', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
    nextArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#FDF0F5', justifyContent: 'center', alignItems: 'center' },
    trust: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginTop: 24, opacity: 0.6 },
    trustText: { color: '#7B2D50', fontSize: 10, fontWeight: '700', textAlign: 'center' },
});
