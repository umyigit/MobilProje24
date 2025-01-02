import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HipoglisemiScreen = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={require('../../assets/images/hipoglisemi.webp')} 
            style={styles.background}
        >
             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-o-left" size={30} color="black" />
               </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.column}>
                    <View style={styles.card}>
                        <Image
                            source={require('../../assets/images/hipoback.jpg')}
                            style={styles.image}
                        />
                        <Text style={styles.title}>DÜŞÜK ŞEKER HİPOGLİSEMİ NEDİR</Text>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>Düşük şeker, genellikle
                                kan şekerinin (glukoz) anormal derecede düşük seviyelere
                                inmesi durumudur. Kan şekerinin 70 mg/dL (miligram/desilitre)
                                altına düşmesi bu durumu ifade eder. Belirtileri kişiden kişiye değişiklik gösterebilir ve 
                                kan şekerinin ne kadar düştüğüne bağlı olarak farklı şiddetlerde olabilir.
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
                            <Text style={styles.listItem}>Titreme ve Terleme</Text>
                            <Text style={styles.listItem}>Ani Açlık Hissi</Text>
                            <Text style={styles.listItem}>Yorgunluk</Text>
                            <Text style={styles.listItem}>Baş Dönmesi veya Sersemlik</Text>
                            <Text style={styles.listItem}>Sinirlilik veya Ani Duygu Değişimleri</Text>
                            <Text style={styles.listItem}>Bulanık Görme</Text>
                            <Text style={styles.listItem}>Bayılma veya Bilinç Kaybı</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.column}>
                    <View style={styles.card}> 
                        <Text style={styles.title}>NE YAPMALIYIZ</Text>
                        <View style={styles.list}>
                            <Text style={styles.listItem}>Belirtileri fark edildiğinde hızlı 
                                hareket etmek önemlidir. Hafif veya orta şiddetteki hipoglisemi durumlarında,
                                hızlı sindirilen karbonhidratlar (meyve suyu, şekerli içecekler, glukoz tabletleri) almak yararlıdır
                                . Daha ciddidurumlarda veya bilinç kaybı 
                                olduğunda, acil tıbbi müdahale gereklidir.
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
        marginTop: 20,
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
        marginTop: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10, 
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
        top: 20,
        left: 10,
        zIndex: 100, 
    },
});

export default HipoglisemiScreen;
