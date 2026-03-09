# Sistem Pelacakan Alumni Publik

## Deskripsi Sistem
Sistem ini dibuat untuk melakukan pelacakan alumni melalui sumber publik seperti Google Scholar, ORCID, dan website umum.

Sistem bekerja dengan cara:
- Membuat profil target alumni
- Menghasilkan query pencarian
- Mengambil kandidat hasil pencarian
- Mengekstrak sinyal identitas
- Menghitung confidence score
- Melakukan cross validation
- Menyimpan evidence pelacakan

---

## Link Project

Source Code:
https://github.com/muhammadariifin-stack/alumni-tracking-system

Live Website:
https://muhammadarifin-stack.github.io/alumni-tracking-system/

---

## Pengujian Sistem

| No | Fitur Sistem | Skenario Pengujian | Hasil yang Diharapkan | Hasil |
|----|--------------|-------------------|----------------------|------|
| 1 | Menampilkan Data Alumni | Membuka halaman web | Data alumni muncul | Berhasil |
| 2 | Generate Profil Alumni | Sistem membuat variasi nama dan afiliasi | Profil target terbentuk | Berhasil |
| 3 | Generate Query Pencarian | Sistem membuat query pencarian alumni | Query berhasil dibuat | Berhasil |
| 4 | Pencarian Kandidat | Sistem mengambil kandidat dari sumber publik (simulasi) | Kandidat ditemukan | Berhasil |
| 5 | Ekstraksi Sinyal | Sistem mengekstrak nama, afiliasi, lokasi | Data sinyal terbaca | Berhasil |
| 6 | Perhitungan Confidence Score | Sistem menghitung skor kecocokan | Score muncul | Berhasil |
| 7 | Cross Validation | Sistem memverifikasi kandidat dari beberapa sumber | Confidence meningkat | Berhasil |
| 8 | Penentuan Status Alumni | Sistem menentukan status alumni | Status berubah | Berhasil |
| 9 | Penyimpanan Evidence | Sistem menyimpan bukti pelacakan | Evidence tercatat | Berhasil |

---

## Catatan
Sistem ini menggunakan simulasi hasil pencarian karena beberapa sumber seperti Google Scholar memiliki batasan penggunaan API dan Terms of Service. Simulasi digunakan untuk menunjukkan alur sistem pelacakan alumni secara konseptual.
