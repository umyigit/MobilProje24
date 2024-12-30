import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image,TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  RootStackParamList2 } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PreMixed_Insulin = () => {

const premixed = require('../../../assets/images/karışım.jpg');
type NavigationType = StackNavigationProp<RootStackParamList2, 'InsulinTypes'>;
const navigation = useNavigation<NavigationType>();
  const boxes = [
    {
      image: premixed,
      title: 'Etki ve Kullanım:',
      content: [
        "Etkinin başlaması: 30-60 dakika (değişken)",
        "Etki süresi: 10-16 saat (değişken)",
        "Kısa ve uzun etkili insülinler bir arada hazırlanır.",
        "Hem açlık hem de tokluk şekerinde etkilidir.",
      ]
    },
    {
      title: 'Uygulama Alanları:',
      content: [
        "Karın, uyluk, üst kol ve kalçadan uygulanabilir.",
        "Karın en hızlı, kalça en yavaş emilimin olduğu bölgelerdir.",
      ]
    },
    {
      title: 'Yan Etkileri:',
      content: [
        "Hipoglisemi (Düşük Kan Şekeri)",
        "Alerjik Reaksiyonlar",
        "Lipodistrofi"
      ]
    },
    {
      title: 'Dikkat Edilmesi Gerekenler:',
      content: [
        "Doktorunuzun verdiği dozaj ve kullanım talimatlarına kesinlikle uyunuz.",
        "Doz atlamayınız veya fazladan doz almayınız.",
        "Hipoglisemi veya hiperglisemi belirtileri durumunda derhal doktorunuza başvurunuz.",
        "Sağlıklı bir diyet ve düzenli egzersiz, insülin tedavisinin etkinliğini artırır. Ani ve yoğun egzersizlerden önce doktorunuza danışınız."
      ]
    },
    {
      title: 'Depolama Özellikleri:',
      content: [
        "Kullanılmayan insülin kalemleri veya flakonları buzdolabında (2-8°C) saklanmalıdır.",
        "Son kullanma tarihine dikkat edilmelidir. Tarihi geçmiş insülin kullanılmamalıdır.",
        "Kullanılan insülin oda sıcaklığında (25°C'ye kadar) saklanabilir ve genellikle 28 gün içinde kullanılmalıdır. (Üretici talimatlarına göre değişebilir)."
      ]
    }
  ];

  return (
    <ImageBackground source={premixed} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerLeft}>
          <FontAwesome name="arrow-circle-o-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>KARIŞIM İNSÜLİNLER</Text>
        {boxes.map((box, index) => (
          <View key={index} style={styles.box}>
            {box.image && <Image source={box.image} style={styles.image} />}
            <Text style={styles.title}>{box.title}</Text>
            {box.content.map((contentLine, contentIndex) => (
              <View key={contentIndex} style={styles.contentRow}>
                <MaterialCommunityIcons name="circle-medium" size={24} color="black" />
                <Text style={styles.content}>{contentLine}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  headerLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop: 43, 
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
    paddingTop: 30, 
  },
  box: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#eee2df',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 5, 
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  image: {
    width: '90%',
    height: 300, 
    borderRadius: 10, 
    marginBottom: 10, 
    resizeMode: 'cover', 
  },

contentRow: {
  flexDirection: 'row',
  alignSelf: 'flex-start',
},
  content: {
    fontSize: 16,
    marginLeft: 5,
  }

});

export default PreMixed_Insulin;