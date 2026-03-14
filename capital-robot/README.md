# ⚡ Capital Robot — Paper Trading

> Capital.com için React tabanlı otomatik trading robotu simülasyonu.  
> Gerçek piyasa verilerini kullanarak **risksiz** strateji testi yapın.

![Paper Trading](https://img.shields.io/badge/mod-paper%20trading-22c55e?style=flat-square)
![React](https://img.shields.io/badge/React-18-38bdf8?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-a78bfa?style=flat-square)

---

## 🚀 Özellikler

- 🔌 Capital.com API entegrasyonu (paper trading modu)
- 📊 Gerçek zamanlı fiyat takibi — Forex, Kripto, Hisse, Emtia
- 🧠 4 farklı strateji: RSI+MACD, Bollinger Bands, EMA Crossover, Scalping
- 🛡️ Otomatik Stop-Loss & Take-Profit yönetimi
- 📋 İşlem geçmişi ve performans istatistikleri
- 🖥️ Canlı robot logları

---

## 📦 Kurulum

```bash
# 1. Repoyu klonlayın
git clone https://github.com/KULLANICI_ADINIZ/capital-robot.git
cd capital-robot

# 2. Bağımlılıkları yükleyin
npm install

# 3. Uygulamayı başlatın
npm start
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

---

## ⚙️ Kullanım

1. **Kurulum** sekmesine gidin
2. Capital.com API Key ve Secret girin
   - Capital.com → Settings → API → Create API Key
3. İşlem yapmak istediğiniz piyasaları seçin
4. Strateji ve risk parametrelerini ayarlayın
5. **Dashboard**'a dönüp robotu başlatın ▶

---

## 📁 Proje Yapısı

```
capital-robot/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TopBar.jsx        # Üst bilgi çubuğu
│   │   ├── Dashboard.jsx     # Ana gösterge paneli
│   │   ├── Setup.jsx         # Kurulum & ayarlar
│   │   └── Panels.jsx        # Pozisyonlar, Geçmiş, Loglar
│   ├── hooks/
│   │   └── useRobot.js       # Robot mantığı (custom hook)
│   ├── utils/
│   │   ├── constants.js      # Piyasalar, stratejiler, sabitler
│   │   └── trading.js        # Hesaplama yardımcıları
│   ├── App.jsx               # Ana uygulama
│   ├── index.js              # Giriş noktası
│   └── index.css             # Global stiller
└── package.json
```

---

## ⚠️ Uyarı

Bu uygulama **simülasyon** amaçlıdır. Gerçek para yatırım kararları için profesyonel finansal danışmanlık alın.  
Trading işlemleri risk içerir — sermayenizi kaybedebilirsiniz.

---

## 📄 Lisans

MIT © 2024
