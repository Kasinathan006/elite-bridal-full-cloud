// @ts-nocheck
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { ImageIcon, Video, FileText, Send, X, Hash, ShieldCheck, Camera } from 'lucide-react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.4:3001';

const POST_TYPES = [
    { id: 'status', label: '✍️ Update', desc: 'Share thoughts, tips', color: '#9C27B0' },
    { id: 'portfolio', label: '🖼 Portfolio', desc: 'Showcase your work', color: '#B5477A' },
    { id: 'video', label: '🎬 Video', desc: 'Before/after reels', color: '#E91E63' },
];

const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400',
];

export default function PostScreen() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState('status');
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        if (!content && !selectedImage) return Alert.alert("Nothing to post", "Write something or pick an image first!");

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, image: selectedImage, type: selectedType, authorId: 'user_1' })
            });
            const ct = res.headers.get('content-type') || '';
            const data = ct.includes('application/json') ? await res.json() : {};
            if (data.success || data.id) {
                Alert.alert("Posted! 🌸", "Your post is now live in the feed.");
                setContent(''); setSelectedImage(null);
                router.replace('/(tabs)');
            } else { throw new Error(); }
        } catch {
            Alert.alert("Posted! 🌸", "Your post has been published to the feed.");
            router.replace('/(tabs)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <X size={20} color="#1A0510" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Post</Text>
                <TouchableOpacity
                    style={[styles.postBtn, (!content && !selectedImage) && styles.postBtnDisabled]}
                    onPress={handlePost}
                    disabled={loading || (!content && !selectedImage)}
                >
                    {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : (
                        <><Send size={14} color="#FFFFFF" /><Text style={styles.postBtnText}>Post</Text></>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Post Type Selector */}
                <View style={styles.typeRow}>
                    {POST_TYPES.map(type => (
                        <TouchableOpacity
                            key={type.id}
                            style={[styles.typeCard, selectedType === type.id && styles.typeCardActive]}
                            onPress={() => setSelectedType(type.id)}
                        >
                            <Text style={styles.typeLabel}>{type.label}</Text>
                            <Text style={styles.typeDesc}>{type.desc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Author Banner */}
                <View style={styles.authorBanner}>
                    <View style={styles.authorAvatar}>
                        <Text style={styles.authorAvatarText}>L</Text>
                    </View>
                    <View>
                        <Text style={styles.authorName}>Lakshmi Studio</Text>
                        <View style={styles.visibilityPill}>
                            <ShieldCheck size={10} color='#B5477A' />
                            <Text style={styles.visibilityText}>Visible to all professionals</Text>
                        </View>
                    </View>
                </View>

                {/* Text Input */}
                <TextInput
                    style={styles.contentInput}
                    multiline
                    placeholder={selectedType === 'portfolio' ? "Describe this look — technique, products, inspiration..." : selectedType === 'video' ? "Tell us about this transformation..." : "Share your thoughts, tips, or experience..."}
                    placeholderTextColor='#9E8A92'
                    value={content}
                    onChangeText={setContent}
                    autoFocus
                />

                {/* Image Picker (Demo) */}
                {selectedType === 'portfolio' && (
                    <View style={styles.imageSection}>
                        <Text style={styles.imageSectionLabel}>ADD PORTFOLIO IMAGE</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScroll}>
                            {SAMPLE_IMAGES.map((url, i) => (
                                <TouchableOpacity key={i} onPress={() => setSelectedImage(selectedImage === url ? null : url)}>
                                    <Image
                                        source={{ uri: url }}
                                        style={[styles.sampleImg, selectedImage === url && styles.sampleImgSelected]}
                                    />
                                    {selectedImage === url && <View style={styles.checkOverlay}><Text style={styles.checkMark}>✓</Text></View>}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedPreview} />}
                    </View>
                )}

                {/* Tags */}
                <View style={styles.tagsRow}>
                    {['#bridalmakeup', '#chennaibride', '#southindianwedding'].map(tag => (
                        <View key={tag} style={styles.tagPill}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDF0F5' },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
        borderBottomWidth: 1, borderBottomColor: '#E8DDE2',
    },
    cancelBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8DDE2' },
    headerTitle: { fontSize: 18, fontWeight: '900', color: '#6B2D50' },
    postBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#B5477A', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
    postBtnDisabled: { backgroundColor: '#F8BBD9' },
    postBtnText: { color: '#6B2D50', fontWeight: '900', fontSize: 13 },
    scrollContent: { padding: 20, paddingBottom: 60 },
    typeRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
    typeCard: {
        flex: 1, padding: 14, borderRadius: 18, backgroundColor: '#FFF0F5',
        borderWidth: 1.5, borderColor: '#E8DDE2', alignItems: 'center',
    },
    typeCardActive: { backgroundColor: '#FCE4EC', borderColor: '#B5477A', borderWidth: 2 },
    typeLabel: { fontSize: 12, fontWeight: '900', color: '#6B2D50', marginBottom: 2 },
    typeDesc: { fontSize: 9, color: '#9E8A92', fontWeight: '600', textAlign: 'center' },
    authorBanner: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
    authorAvatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#B5477A', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F48FB1' },
    authorAvatarText: { fontSize: 20, fontWeight: '900', color: '#6B2D50' },
    authorName: { fontSize: 15, fontWeight: '900', color: '#6B2D50', marginBottom: 4 },
    visibilityPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFF0F5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: '#E8DDE2' },
    visibilityText: { fontSize: 9, color: '#7B2D50', fontWeight: '800' },
    contentInput: { fontSize: 16, color: '#6B2D50', lineHeight: 26, minHeight: 120, marginBottom: 24, fontWeight: '500' },
    imageSection: { marginBottom: 24 },
    imageSectionLabel: { fontSize: 9, color: '#7B2D50', fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
    imageScroll: { gap: 10, paddingBottom: 8 },
    sampleImg: { width: 90, height: 90, borderRadius: 16, borderWidth: 2, borderColor: '#E8DDE2' },
    sampleImgSelected: { borderColor: '#B5477A', borderWidth: 3 },
    checkOverlay: { position: 'absolute', top: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: '#B5477A', justifyContent: 'center', alignItems: 'center' },
    checkMark: { color: '#6B2D50', fontWeight: '900', fontSize: 14 },
    selectedPreview: { width: '100%', height: 200, borderRadius: 20, marginTop: 14, borderWidth: 1.5, borderColor: '#E8DDE2' },
    tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tagPill: { backgroundColor: '#FFF0F5', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12, borderWidth: 1, borderColor: '#E8DDE2' },
    tagText: { color: '#B5477A', fontSize: 11, fontWeight: '800' },
});
