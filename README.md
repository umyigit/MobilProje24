# **DiyabetApp Mobil Projesi**

Bu proje, **diyabet hastalarının kullanımı için tasarlanmış** bir mobil uygulamadır. Aşağıda, projenin çalıştırılması için gerekli adımlar ve bağımlılıklar açıklanmıştır.

---

## 🚀 **Projenin Gereksinimleri**
Projeyi çalıştırmak için aşağıdaki araçların kurulu olması gerekmektedir:

- **Node.js** (v14 veya üstü) - [İndir](https://nodejs.org/)
- **npm** (Node Package Manager)
- **Expo CLI** (Expo komut satırı aracı)
- **Android Studio** (Cihaz emülatörü çalıştırmak için, fiziksel cihazla test ediyorsanız gerekmez.)

---

## 📦 **Projenin Kurulumu**
1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/umyigit/MobilProje24.git
   cd MobilProje24
   ```

2. **Gerekli Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Expo CLI Yükleyin:**
   ```bash
   npm install -g expo-cli
   ```

---

## ▶️ **Projenin Çalıştırılması**
Projeyi çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

- **Geliştirme Modunda Başlatma:**
  ```bash
  npm start
  ```
  veya
  ```bash
  expo start
  ```
- **Android Cihazda Çalıştırma:**
  ```bash
  npm run android
  ```
- **Web Tarayıcısında Çalıştırma:**
  ```bash
  npm run web
  ```

---

## 🌳 **Merge Edilen Branchler Listesi**

- **Yazar:** MedineUzun
- **Commit Link:** [7974d1fcfdcedb9e5f40a0908bac21c639a6bf8e](https://github.com/umyigit/MobilProje24/commit/7974d1fcfdcedb9e5f40a0908bac21c639a6bf8e)
- **Merge Edilen Branch:** `develop-authorization`
- **Açıklama:**
   - **Hasta Giriş ve Üye Ol** özellikleri eklendi.
   - Kullanıcıların giriş yapabileceği ve yeni hesap oluşturabileceği ekranlar tasarlandı.
   - Firebase ile kimlik doğrulama işlemleri entegre edildi.
   - **JWT Token** tabanlı yetkilendirme eklendi.
   - Lottie animasyonları kullanılarak kullanıcı arayüzü zenginleştirildi.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/app/(tabs)/AppScreen.tsx`
   - `diyabetapp/app/(tabs)/LoginScreen.tsx`
   - `diyabetapp/app/(tabs)/SignUpScreen.tsx`

---

- **Yazar:** umyigit
- **Commit Link:** [4161841d4fd72c4036b88f3e4c9f22d8d9506f9a](https://github.com/umyigit/MobilProje24/commit/4161841d4fd72c4036b88f3e4c9f22d8d9506f9a)
- **Merge Edilen Branch:** `develop-background-process`
- **Açıklama:**
   - **Arka Plan İşlemleri** geliştirildi.
   - Uygulamanın arka planında çalışan süreçler eklendi veya iyileştirildi.
   - Performans ve kullanıcı deneyimi artırıldı.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/package-lock.json`
   - `diyabetapp/package.json`
   - `pythondiyabetapp/flaskdiyabetapp/config.py`
   - `pythondiyabetapp/flaskdiyabetapp/login/login.py`

 ---

 - **Yazar:** kevserunlu1
- **Commit Link:** [f9738ca9e9eb7f901612bc464e2e130534c492d9](https://github.com/umyigit/MobilProje24/commit/f9738ca9e9eb7f901612bc464e2e130534c492d9)
- **Merge Edilen Branch:** `develop-restful-api`
- **Açıklama:**
   - **Login ve Signup API**'leri eklendi.
   - `app.py` dosyası oluşturuldu ve uygulamaya dahil edildi.
   - Kullanıcı kimlik doğrulama ve yeni kullanıcı kaydı için gerekli API uç noktaları tanımlandı.

- **Değişiklik Yapılan Dosyalar:**
   - `pythondiyabetapp/flaskdiyabetapp/app.py`

---

- **Yazar:** Salihaunersoy
- **Commit Link:** [3f4718a4fed5c7f7d0ef5a118e10fe617810840c](https://github.com/umyigit/MobilProje24/commit/3f4718a4fed5c7f7d0ef5a118e10fe617810840c)
- **Merge Edilen Branch:** `develop-local-database`
- **Açıklama:**
   - **Veritabanı Bağlantısı** eklendi.
   - Uygulama ile veritabanı arasında bağlantı kuruldu.
   - `app.py` ve `run.py` dosyaları oluşturuldu ve gerekli yapılandırmalar yapıldı.

- **Değişiklik Yapılan Dosyalar:**
   - `pythondiyabetapp/app.py`
   - `pythondiyabetapp/run.py`

---

- **Yazar:** MedineUzun
- **Commit Link:** [dc1ea32bb978456309943a66169fc5b32f5b697f](https://github.com/umyigit/MobilProje24/commit/dc1ea32bb978456309943a66169fc5b32f5b697f)
- **Merge Edilen Branch:** `develop-broadcast-receiver`
- **Açıklama:**
   - **Android Cihaza Bildirim Gönderme** özelliği eklendi.
   - Uygulama üzerinden Android cihazlara bildirim gönderme işlevi entegre edildi.
   - Bildirimlerin yönetimi ve gönderimi için gerekli servisler oluşturuldu.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/app/(tabs)/NotificationScreen.tsx`
   - `diyabetapp/app/(tabs)/NotificationsService.tsx`
   - `pythondiyabetapp/flaskdiyabetapp/notification/notification.py`

---

- **Yazar:** MedineUzun
- **Commit Link:** [c0290921daa31c54a61812d72c6918873d7af023](https://github.com/umyigit/MobilProje24/commit/c0290921daa31c54a61812d72c6918873d7af023)
- **Merge Edilen Branch:** `develop-ui`
- **Açıklama:**
   - **Kullanıcı Arayüzü** geliştirildi.
   - Hiperglisemi ve Hipoglisemi ekranları oluşturuldu.
   - İnsülin türleri için Basal, Bolus ve PreMixed insülin ekranları eklendi.
   - Kullanıcı deneyimini artırmak için görseller ve açıklamalar eklendi.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/app/(tabs)/HiperglisemiScreen.tsx`
   - `diyabetapp/app/(tabs)/HipoglisemiScreen.tsx`
   - `diyabetapp/app/(tabs)/InsulinTypes/Basal_Insulin.tsx`
   - `diyabetapp/app/(tabs)/InsulinTypes/Bolus_Insulin.tsx`
   - `diyabetapp/app/(tabs)/InsulinTypes/PreMixed_Insulin.tsx`

---

- **Yazar:** umyigit
- **Commit Link:** [489d57faa3bfb323aa1cbd594ced62ab4e230cf5](https://github.com/umyigit/MobilProje24/commit/489d57faa3bfb323aa1cbd594ced62ab4e230cf5)
- **Merge Edilen Branch:** `develop-sensor`
- **Açıklama:**
   - **Hareket Sensörü** özelliği eklendi.
   - Cihazın hareket sensöründen veri almak için gerekli fonksiyonlar ve arayüzler oluşturuldu.
   - Kullanıcıların cihazın hareket verilerini gerçek zamanlı olarak görüntüleyebileceği bir ekran tasarlandı.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/components/MotionScreen.tsx`
   - `diyabetapp/hooks/useMotionSensor.ts`

---

- **Yazar:** kevserunlu1
- **Commit Link:** [a097d6e5fa59cd6113c8d2b3a94bd5631d89dfcc](https://github.com/umyigit/MobilProje24/commit/a097d6e5fa59cd6113c8d2b3a94bd5631d89dfcc)
- **Merge Edilen Branch:** `develop-storage-basic-data`
- **Açıklama:**
   - **İnsülin Bilgisi** özelliği eklendi.
   - Local storage'dan insülin bilgisi alındı ve tablo oluşturuldu.
   - Kullanıcıların insülin bilgilerini görüntüleyebileceği bir arayüz tasarlandı.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/app/(tabs)/InsulinTable.tsx`

---

- **Yazar:** Salihaunersoy
- **Commit Link:** [6bdb6adf1b88a115f7fc9e333c35bfe649053606](https://github.com/umyigit/MobilProje24/commit/6bdb6adf1b88a115f7fc9e333c35bfe649053606)
- **Merge Edilen Branch:** `develop-cloud-service`
- **Açıklama:**
   - **Kan Şekeri ve İnsülin Değerleri** bulut servisi üzerinden alındı.
   - Uygulama, kullanıcının kan şekeri ve insülin verilerini bulut tabanlı bir hizmetten çekebilecek şekilde güncellendi.
   - Veri senkronizasyonu ve güncel sağlık verilerinin alınması sağlandı.

- **Değişiklik Yapılan Dosyalar:**
   - `pythondiyabetapp/flaskdiyabetapp/insulin_control/insulin_control.py`
   - `pythondiyabetapp/flaskdiyabetapp/insulin_record/insulin_record.py`

---

- **Yazar:** umyigit
- **Commit Link:** [2a09923acb87b94866a96e17d995b11a0bce4813](https://github.com/umyigit/MobilProje24/commit/2a09923acb87b94866a96e17d995b11a0bce4813)
- **Merge Edilen Branch:** `develop-connectivity`
- **Açıklama:**
   - **Bluetooth Bağlantısı** özelliği eklendi.
   - Uygulama, Bluetooth cihazları tarama ve bağlanma yeteneği kazandı.
   - Kullanıcıların Bluetooth özellikli cihazlarla etkileşim kurabilmesi sağlandı.

- **Değişiklik Yapılan Dosyalar:**
   - `diyabetapp/components/BluetoothScreen.tsx`
   - `diyabetapp/hooks/useBluetooth.ts`

## 📦 **Proje Yapısı:**
```plaintext
📦 root
├── 📁 components      # React Native bileşenleri
├── 📁 hooks           # Custom hook dosyaları
├── 📁 screens         # Uygulama ekranları
├── 📁 services        # API ve veri servisleri
├── 📁 assets          # Görseller ve ikonlar
├── 📁 scripts         # Yardımcı scriptler
├── 📄 package.json    # Proje bağımlılıkları
├── 📄 App.tsx         # Uygulamanın giriş noktası
└── 📄 README.md       # Proje dokümantasyonu
```
