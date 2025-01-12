import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HiperglisemiScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/images/hiperglisemi.webp')}
            style={styles.background}
        >
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-o-left" size={30} color="black" />
               </TouchableOpacity>
   
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.column}>
                    <View style={styles.card}>
                        <Image
                            source={require('../../assets/images/hiperback.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.title}>YÜKSEK ŞEKER HİPERGLİSEMİ NEDİR</Text>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>Yüksek şeker, genellikle
                                kan şekerinin normal değerlerin üzerinde olduğunu ifade
                                eder. İnsan vücudu için normal kan şekeri seviyeleri açlık 
                                durumunda 70-100 mg/dL arasında olmalıdır. Yemekten sonra ise bu seviye
                                genellikle 140 mg/dL'yi geçmemelidir. Eğer kan şekeriniz sürekli olarak bu değerlerin
                                üzerinde seyrediyorsa, bu durum yüksek şeker olarak adlandırılır.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.column}>
                    <View style={styles.card}>
                        <View style={styles.iconTitleContainer}>
                            <Icon name="alert-circle" size={24} color="#D9534F" style={styles.icon} />
                            <Text style={styles.title}>BELİRTİLERİ NELERDİR</Text>
                        </View>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>Aşırı susama</Text>
                            <Text style={styles.listItem}>Sık idrara çıkma</Text>
                            <Text style={styles.listItem}>Bulanık görme</Text>
                            <Text style={styles.listItem}>Yorgunluk ve Halsizlik</Text>
                            <Text style={styles.listItem}>Yavaş İyileşen Yaralar</Text>
                            <Text style={styles.listItem}>Kilo Kaybı</Text>
                            <Text style={styles.listItem}>Ağız Kuruluğu</Text>
                            <Text style={styles.listItem}>Mide Bulantısı ve Kusma</Text>
                            <Text style={styles.listItem}>Nefes Kokusu</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.column}>
                    <View style={styles.card}> 
                        <Text style={styles.title}>NE YAPMALIYIZ</Text>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>Yüksek şeker tedavisi, kişiye özel bir yaklaşım gerektirir.
                                Karbonhidrat alımını kontrol altında tutmak ve düşük glisemik indeksli yiyecekler 
                                tüketmek, kan şekerini dengelemeye yardımcı olabilir. Öğünlerdeki porsiyonları 
                                dikkatli bir şekilde ayarlamak, kan şekeri dalgalanmalarını azaltabilir.
                                Haftada en az 150 dakika orta düzeyde aerobik egzersiz yapılması önerilir.
                                Stres, kan şekeri seviyelerini etkileyebilir, bu nedenle stresi yönetmek 
                                için meditasyon, yoga ve diğer rahatlama teknikleri kullanılabilir.
                                Yeterli ve kaliteli uyku da kan şekeri kontrolünde önemli bir rol oynar.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    column: {
        width: '100%',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#eee2df',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        width: '99%',
        alignSelf: 'center',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 3,
    },
    iconTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    list: {
        marginVertical: 8,
    },
    listItem: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 100, 
    },
});

export default HiperglisemiScreen;
