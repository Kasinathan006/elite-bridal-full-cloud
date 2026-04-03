// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { Search, Bell, Filter, Star, Heart, MessageSquare, Plus, Home, Grid, User } from 'lucide-react-native';

const API_URL = 'http://localhost:3001'; // Use IP if on physical device

export default function App() {
    const [artists, setArtists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/search/profiles`);
            const data = await response.json();
            setArtists(data);
        } catch (error) {
            console.error('Mobile fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#1A1A2E]">
            {/* Header */}
            <View className="px-6 pt-16 pb-6 flex-row justify-between items-center">
                <View>
                    <Text className="text-gray-400 text-sm font-medium">Welcome back,</Text>
                    <Text className="text-white text-2xl font-bold">Bridal Connect</Text>
                </View>
                <TouchableOpacity className="bg-white/10 p-3 rounded-full border border-white/20">
                    <Bell size={20} color="#FFF" />
                    <View className="absolute top-2 right-2 w-2 h-2 bg-[#B5477A] rounded-full border-2 border-[#1A1A2E]" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="px-6 pb-4">
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 py-3">
                        <Search size={20} color="#666" />
                        <TextInput
                            placeholder="Search artists, studios..."
                            placeholderTextColor="#666"
                            className="flex-1 ml-3 text-white"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity className="bg-[#B5477A] p-4 rounded-2xl shadow-lg shadow-[#B5477A]/20">
                        <Filter size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                {/* Quick Actions */}
                <View className="flex-row justify-between mb-8">
                    {[
                        { label: 'Booking', icon: MessageSquare, color: '#B5477A' },
                        { label: 'Crew', icon: Grid, color: '#4CAF50' },
                        { label: 'Projects', icon: Plus, color: '#2196F3' }
                    ].map((item, idx) => (
                        <TouchableOpacity key={idx} className="items-center">
                            <View className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl items-center justify-center mb-2">
                                <item.icon size={24} color={item.color} />
                            </View>
                            <Text className="text-gray-400 text-xs font-medium">{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Featured Artists Section */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-white text-xl font-bold">Top Performance</Text>
                    <TouchableOpacity onPress={fetchArtists}>
                        <Text className="text-[#B5477A] text-sm font-semibold">Refresh</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#B5477A" className="mt-10" />
                ) : (
                    artists.map((artist) => (
                        <TouchableOpacity
                            key={artist.id}
                            className="bg-white/5 border border-white/10 rounded-3xl p-4 mb-6"
                        >
                            <View className="flex-row items-center">
                                <Image
                                    source={{ uri: artist.portfolioPhotos?.[0]?.url || 'https://images.unsplash.com/photo-1594463750939-ebb6bd206637?auto=format&fit=crop&w=400&q=80' }}
                                    className="w-16 h-16 rounded-2xl"
                                />
                                <View className="flex-1 ml-4">
                                    <Text className="text-white font-bold text-lg">{artist.displayName}</Text>
                                    <View className="flex-row items-center mt-1">
                                        <Star size={12} color="#FFD700" fill="#FFD700" />
                                        <Text className="text-gray-400 text-xs ml-1 font-medium">4.9 (124 reviews)</Text>
                                    </View>
                                </View>
                                <View className="bg-[#B5477A]/20 px-3 py-1.5 rounded-full border border-[#B5477A]/30">
                                    <Text className="text-[#B5477A] text-xs font-bold">₹{artist.priceMin / 1000}k</Text>
                                </View>
                            </View>

                            <View className="flex-row gap-2 mt-4">
                                {(artist.specializations || "").split(',').slice(0, 3).map((tag: string) => (
                                    tag.trim() ? (
                                        <View key={tag} className="bg-white/5 px-3 py-1 rounded-lg">
                                            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{tag.trim()}</Text>
                                        </View>
                                    ) : null
                                ))}
                            </View>
                        </TouchableOpacity>
                    ))
                )}

                <View className="h-20" />
            </ScrollView>

            {/* Bottom Nav */}
            <View className="absolute bottom-0 left-0 right-0 h-24 bg-[#1A1A2E]/90 backdrop-blur-3xl px-8 flex-row justify-between items-center border-t border-white/5">
                <Home size={24} color="#FFF" />
                <Grid size={24} color="#666" />
                <View className="w-14 h-14 bg-[#B5477A] rounded-2xl items-center justify-center -mt-10 shadow-2xl shadow-[#B5477A]/50">
                    <Plus size={28} color="#FFF" />
                </View>
                <MessageSquare size={24} color="#666" />
                <User size={24} color="#666" />
            </View>
        </View>
    );
}
