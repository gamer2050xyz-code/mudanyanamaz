# Mudanya Namaz Vakitleri

Bursa Mudanya için namaz vakitlerini gösteren, telefonda uygulama gibi kullanılabilen (PWA) statik web sitesi. Derleme gerektirmez.

## GitHub Pages'e yükleme

1. GitHub'da yeni bir repo oluşturun (ör. `namaz-vakitleri`).
2. Bu klasörün **içindeki** dosyaları repoya yükleyin (`index.html` reponun ana dizininde olmalı).
3. Repo > **Settings > Pages** > *Build and deployment* altında **Deploy from a branch** seçin, branch olarak `main` ve klasör olarak `/ (root)` seçip kaydedin.
4. Bir dakika kadar sonra site `https://KULLANICI_ADINIZ.github.io/namaz-vakitleri/` adresinde yayında olur.

Telefonda siteyi açıp tarayıcı menüsünden **Ana ekrana ekle** derseniz uygulama gibi çalışır, internet olmadan da açılır.

## Veri hakkında

- `data.js` içindeki günler için Diyanet'le uyumlu yayınlanmış Mudanya değerleri kullanılır (24.09–08.10.2026).
- Listede olmayan günler, Diyanet yöntemine yakın (İmsak 18°, Yatsı 17°) astronomik hesapla bulunur; resmî değerden ±1–2 dk sapabilir.
- Resmî değerler için: https://namazvakitleri.diyanet.gov.tr
- Yıllık Diyanet listesini `data.js` içine aynı biçimde eklerseniz tüm günler resmî değerle gösterilir.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Sayfa |
| `style.css` | Görünüm (açık/koyu tema) |
| `app.js` | Hesaplama ve arayüz |
| `data.js` | Gün bazlı vakit listesi |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Çevrimdışı çalışma ve ana ekrana ekleme |
