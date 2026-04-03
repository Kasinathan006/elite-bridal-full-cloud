// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Alert } from 'react-native';
import { Crown, ArrowRight, Phone, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const safeJson = async (res) => {
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error(`Non-JSON (${res.status})`);
        return res.json();
    };

    const handleSendOtp = async () => {
        if (!phone || phone.length < 10) return Alert.alert("Invalid Phone", "Enter a valid 10-digit mobile number.");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/send-otp`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            const data = await safeJson(res);
            if (data.success) {
                setStep(2);
                Alert.alert("OTP Sent 💌", "Check your phone for the access code.");
            } else {
                Alert.alert("Failed", data.error || "Unable to send OTP.");
            }
        } catch (error) {
            Alert.alert("Network Error", "Unable to connect to the backend. Please check your connection.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) return Alert.alert("Enter OTP", "Please enter the 6-digit code.");
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp })
            });
            const data = await safeJson(res);
            if (data.success) {
                router.replace('/(tabs)');
            } else {
                Alert.alert("Wrong OTP", "The code doesn't match. Try again.");
            }
        } catch (error) {
            Alert.alert("Authentication Failed", "Unable to verify your OTP with the server.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.main} contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoCircle}>
                    <Crown size={40} color="#FFFFFF" fill="#FFFFFF" />
                </View>
                <Text style={styles.brand}>🌸 BRIDAL CONNECT</Text>
                <Text style={styles.title}>{step === 1 ? 'Welcome Back' : 'Enter Your Code'}</Text>
                <Text style={styles.subtitle}>{step === 1 ? 'Sign in to your artist profile' : `Code sent to +91 ${phone}`}</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                {step === 1 ? (
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>MOBILE NUMBER</Text>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.countryCode}>+91</Text>
                            <View style={styles.divider} />
                            <Phone size={16} color='#B5477A' style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Enter mobile number"
                                placeholderTextColor='#9E8A92'
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>VERIFICATION CODE</Text>
                        <View style={styles.inputWrapper}>
                            <Lock size={16} color='#B5477A' style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Enter 6-digit OTP"
                                placeholderTextColor='#9E8A92'
                                style={styles.input}
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setStep(1)}>
                            <Text style={styles.changeNum}>Change number? Tap here</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.loginBtn, loading && { opacity: 0.7 }]}
                    onPress={step === 1 ? handleSendOtp : handleVerifyOtp}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    <Text style={styles.loginText}>{loading ? 'Please wait...' : step === 1 ? 'Send OTP' : 'Verify & Enter'}</Text>
                    <View style={styles.btnArrow}>
                        <ArrowRight size={20} color="#FFFFFF" strokeWidth={3} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>New to Bridal Connect?</Text>
                <TouchableOpacity onPress={() => router.push('/auth/join')}>
                    <Text style={styles.joinLink}>Create your artist profile →</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.trust}>
                <ShieldCheck size={12} color='#B5477A' />
                <Text style={styles.trustText}>Secured & verified for Indian bridal professionals</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: { flex: 1, backgroundColor: '#FDF0F5' },
    container: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 80, paddingBottom: 60 },
    header: { alignItems: 'center', marginBottom: 56 },
    logoCircle: {
        width: 88, height: 88, borderRadius: 28,
        backgroundColor: '#B5477A',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#B5477A', shadowOpacity: 0.35, shadowRadius: 20, shadowOffset: { width: 0, height: 8 },
        elevation: 10,
    },
    brand: { fontSize: 11, fontWeight: '900', color: '#B5477A', letterSpacing: 3, marginBottom: 12 },
    title: { fontSize: 28, fontWeight: '900', color: '#6B2D50', letterSpacing: -0.5, marginBottom: 8 },
    subtitle: { fontSize: 13, color: '#9E8A92', fontWeight: '500', textAlign: 'center' },
    form: { gap: 28 },
    inputGroup: { gap: 10 },
    label: { fontSize: 10, color: '#7B2D50', fontWeight: '900', letterSpacing: 2 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFF0F5', borderRadius: 18, height: 68,
        paddingHorizontal: 20, borderWidth: 1.5, borderColor: '#E8DDE2',
    },
    countryCode: { fontSize: 16, fontWeight: '900', color: '#6B2D50', marginRight: 12 },
    divider: { width: 1, height: 24, backgroundColor: '#F8BBD9', marginRight: 12 },
    input: { flex: 1, color: '#6B2D50', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
    changeNum: { color: '#B5477A', fontSize: 12, fontWeight: '700', textDecorationLine: 'underline', marginTop: 4 },
    loginBtn: {
        backgroundColor: '#B5477A', height: 68, borderRadius: 22,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16,
        shadowColor: '#B5477A', shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    loginText: { color: '#6B2D50', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 },
    btnArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#9E8A92', justifyContent: 'center', alignItems: 'center' },
    footer: { marginTop: 'auto', alignItems: 'center', gap: 10, paddingTop: 48 },
    footerText: { color: '#9E8A92', fontSize: 13, fontWeight: '600' },
    joinLink: { color: '#B5477A', fontSize: 14, fontWeight: '900' },
    trust: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginTop: 28, opacity: 0.6 },
    trustText: { color: '#7B2D50', fontSize: 10, fontWeight: '700' },
});
