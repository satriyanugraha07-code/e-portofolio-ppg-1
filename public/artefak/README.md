# Folder Artefak

Taruh file artefak sesuai kategori agar katalog di halaman Artefak mudah dirawat.

- `rpp/`: RPP, modul ajar, bahan ajar, handbook.
- `materi/`: bahan ajar, modul pembelajaran, handout, dan handbook siswa.
- `lkm/`: lembar kerja siswa atau worksheet.
- `media/`: PPT, video, gambar, atau media presentasi.
- `asesmen/`: instrumen asesmen, rubrik, kisi-kisi, dan hasil evaluasi.
- `lainnya/`: file pendukung yang belum masuk kategori lain.

Setelah file dimasukkan, update metadata di `src/data/artefak.ts`. Ubah `action` dari `{ type: 'placeholder' }` ke `{ type: 'file', href: 'artefak/nama-folder/nama-file.pdf' }` jika tombol kartu harus membuka file langsung.
