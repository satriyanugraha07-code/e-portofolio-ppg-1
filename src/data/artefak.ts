export type ArtifactSiklus = 'siklus-1' | 'siklus-2' | 'siklus-3';
export type ArtifactCategory = 'rpp' | 'materi' | 'lkm' | 'media' | 'asesmen' | 'lainnya';

export type ArtifactAction =
  | { type: 'file'; href: string }
  | { type: 'placeholder' };

export type ArtifactItem = {
  id: string;
  title: string;
  category: ArtifactCategory;
  siklus: ArtifactSiklus;
  badge: string;
  fileType: string;
  fileName: string;
  preview?: string;
  summary: string;
  tags: string[];
  action: ArtifactAction;
  analysis: {
    konteks: string;
    tujuan: string[];
    kelebihan: string[];
    kekurangan: string[];
  };
  cover: {
    kicker: string;
    title: string;
    subtitle: string;
    accent: string;
    accentSoft: string;
  };
};

export const artifactSiklusTabs: Array<{ id: 'semua' | ArtifactSiklus; label: string }> = [
  { id: 'semua', label: 'Semua Siklus' },
  { id: 'siklus-1', label: 'Siklus 1' },
  { id: 'siklus-2', label: 'Siklus 2' },
  { id: 'siklus-3', label: 'Siklus 3' }
];

export const artifactCategories: Array<{ id: 'semua' | ArtifactCategory; label: string }> = [
  { id: 'semua', label: 'Semua' },
  { id: 'rpp', label: 'RPP' },
  { id: 'materi', label: 'Materi' },
  { id: 'lkm', label: 'LKM' },
  { id: 'media', label: 'Media' },
  { id: 'asesmen', label: 'Asesmen' },
  { id: 'lainnya', label: 'Lainnya' }
];

export const artifactItems: ArtifactItem[] = [
  {
    id: 'rpp-siklus-1',
    title: 'RPP Siklus 1 - Gambar Proyeksi',
    category: 'rpp',
    siklus: 'siklus-1',
    badge: 'RPP',
    fileType: 'PDF',
    fileName: 'RPP SIKLUS 1.pdf',
    preview: 'artefak/previews/rpp-siklus-1.png',
    summary: 'Perencanaan pembelajaran mendalam untuk Dasar-Dasar Teknik Mesin pada topik gambar teknik, proyeksi, dan penyajian gambar bagi peserta didik Fase E SMK.',
    tags: ['Gambar Teknik', 'Proyeksi', 'Fase E'],
    action: { type: 'file', href: 'artefak/rpp/RPP SIKLUS 1.pdf' },
    analysis: {
      konteks: 'RPP ini disusun untuk pembelajaran Dasar-Dasar Teknik Mesin pada materi gambar teknik, terutama pengenalan gambar proyeksi sebagai dasar komunikasi visual di bidang teknik.',
      tujuan: [
        'Mengarahkan alur pembelajaran proyeksi secara runtut dari pengenalan konsep sampai praktik menggambar.',
        'Menjadi pedoman guru dalam mengelola pembelajaran mendalam berbasis karakteristik peserta didik.',
        'Menghubungkan materi gambar teknik dengan kebutuhan industri dan praktik kerja teknik mesin.'
      ],
      kelebihan: [
        'Struktur pembelajaran sudah lengkap dan memuat identitas, karakteristik murid, materi, serta profil lulusan.',
        'Topik gambar proyeksi ditempatkan sebagai fondasi penting sebelum peserta didik masuk ke gambar teknik yang lebih kompleks.',
        'RPP sudah menekankan ketelitian, latihan berulang, dan keterkaitan dengan dunia nyata.'
      ],
      kekurangan: [
        'Bagian media atau contoh visual proyeksi masih perlu diperkuat agar siswa lebih cepat memahami perbedaan tampak.',
        'Diferensiasi aktivitas untuk siswa yang lambat dan cepat menangkap materi masih bisa dibuat lebih eksplisit.',
        'Ruang refleksi hasil tiap pertemuan dapat dibuat lebih operasional agar mudah dievaluasi setelah pembelajaran.'
      ]
    },
    cover: {
      kicker: 'Perangkat Pembelajaran',
      title: 'RPP Gambar Proyeksi',
      subtitle: 'Dasar-Dasar Teknik Mesin',
      accent: '#22d3ee',
      accentSoft: 'rgba(34, 211, 238, 0.2)'
    }
  },
  {
    id: 'asesmen-siklus-1',
    title: 'Instrumen Asesmen Siklus 1',
    category: 'asesmen',
    siklus: 'siklus-1',
    badge: 'Asesmen',
    fileType: 'PDF',
    fileName: 'Siklus-1-Asesment.pdf',
    preview: 'artefak/previews/asesmen-siklus-1.png',
    summary: 'Instrumen asesmen untuk tiga pertemuan gambar proyeksi: Proyeksi Eropa, Proyeksi Amerika, serta campuran dan perbandingan sistem proyeksi.',
    tags: ['Diagnostik', 'Rubrik', 'Proyeksi'],
    action: { type: 'file', href: 'artefak/asesmen/Siklus-1-Asesment.pdf' },
    analysis: {
      konteks: 'Instrumen asesmen ini mendampingi pembelajaran tiga pertemuan pada materi Proyeksi Eropa, Proyeksi Amerika, dan perbandingan kedua sistem proyeksi.',
      tujuan: [
        'Mengukur pemahaman awal, proses, dan produk gambar proyeksi peserta didik.',
        'Memberi dasar bagi guru untuk menentukan bantuan belajar dan tindak lanjut.',
        'Mendokumentasikan bukti belajar melalui LKM, gambar proyeksi, verifikasi lisan, dan rekap nilai.'
      ],
      kelebihan: [
        'Pemetaan asesmen per pertemuan sudah jelas dari materi, tujuan, bentuk asesmen, sampai output belajar.',
        'Instrumen mencakup diagnostik, observasi proses, penilaian produk, dan refleksi sehingga tidak hanya menilai hasil akhir.',
        'Topik Proyeksi Eropa dan Amerika dibedakan sehingga evaluasi lebih spesifik.'
      ],
      kekurangan: [
        'Rubrik penilaian masih perlu dibuat sangat ringkas agar mudah dipakai cepat saat praktik di kelas.',
        'Indikator kesalahan umum siswa dapat ditambah supaya guru lebih cepat memberi umpan balik.',
        'Format rekap nilai bisa dibuat lebih visual agar perkembangan tiap pertemuan mudah dibaca.'
      ]
    },
    cover: {
      kicker: 'Instrumen Asesmen',
      title: 'Asesmen Proyeksi',
      subtitle: 'Eropa, Amerika, Perbandingan',
      accent: '#7dd3fc',
      accentSoft: 'rgba(125, 211, 252, 0.18)'
    }
  },
  {
    id: 'lkm-pertemuan-1',
    title: 'LKM Siklus 1 - Pertemuan 1',
    category: 'lkm',
    siklus: 'siklus-1',
    badge: 'LKM P1',
    fileType: 'PDF',
    fileName: 'Siklus-1-LKM 1.pdf',
    preview: 'artefak/previews/lkm-1-siklus-1.png',
    summary: 'Lembar kerja untuk memahami konsep proyeksi ortogonal sistem Proyeksi Eropa dan menggambar benda sederhana sesuai kaidah gambar teknik.',
    tags: ['LKM', 'Pertemuan 1', 'Proyeksi Eropa'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-1-LKM 1.pdf' },
    analysis: {
      konteks: 'LKM pertemuan 1 digunakan untuk mengarahkan peserta didik memahami konsep proyeksi ortogonal pada sistem Proyeksi Eropa melalui aktivitas menggambar benda sederhana.',
      tujuan: [
        'Membantu peserta didik mengenali prinsip dasar Proyeksi Eropa.',
        'Melatih siswa mengamati bentuk benda dan menyusun tampak gambar secara tepat.',
        'Membiasakan penggunaan alat gambar manual dengan rapi dan teliti.'
      ],
      kelebihan: [
        'Petunjuk kerja dibuat sederhana sehingga mudah diikuti siswa saat praktik.',
        'Tujuan pembelajaran langsung mengarah pada pemahaman konsep dan produk gambar.',
        'Alat dan bahan sudah disebutkan sehingga persiapan praktik lebih jelas.'
      ],
      kekurangan: [
        'Contoh hasil akhir atau kriteria kualitas gambar bisa ditambahkan agar standar kerja siswa lebih jelas.',
        'Bagian refleksi singkat setelah menggambar belum terlihat kuat.',
        'Ruang bimbingan untuk siswa yang kesulitan membaca bentuk benda masih bisa ditambah.'
      ]
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'LKM Proyeksi Eropa',
      subtitle: 'Pertemuan 1',
      accent: '#06b6d4',
      accentSoft: 'rgba(6, 182, 212, 0.2)'
    }
  },
  {
    id: 'lkm-pertemuan-2',
    title: 'LKM Siklus 1 - Pertemuan 2',
    category: 'lkm',
    siklus: 'siklus-1',
    badge: 'LKM P2',
    fileType: 'PDF',
    fileName: 'Siklus-1-LKM 2.pdf',
    preview: 'artefak/previews/lkm-2-siklus-1.png',
    summary: 'Lembar kerja untuk memahami sistem Proyeksi Amerika dan membuat gambar proyeksi benda sederhana dengan susunan pandangan yang tepat.',
    tags: ['LKM', 'Pertemuan 2', 'Proyeksi Amerika'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-1-LKM 2.pdf' },
    analysis: {
      konteks: 'LKM pertemuan 2 berfokus pada sistem Proyeksi Amerika sebagai pembanding dari Proyeksi Eropa yang sudah dikenalkan pada pertemuan sebelumnya.',
      tujuan: [
        'Membantu peserta didik memahami konsep proyeksi ortogonal pada sistem Proyeksi Amerika.',
        'Melatih siswa membuat gambar benda sederhana menggunakan susunan pandangan Proyeksi Amerika.',
        'Menguatkan kemampuan membedakan posisi tampak antara sistem Amerika dan Eropa.'
      ],
      kelebihan: [
        'Materi melanjutkan pertemuan sebelumnya sehingga alur belajar lebih bertahap.',
        'Aktivitas menggambar tetap konkret dan berpusat pada praktik siswa.',
        'Petunjuk kerja mempertahankan fokus pada pengamatan bentuk, garis bantu, kerapian, dan ketepatan.'
      ],
      kekurangan: [
        'Perbandingan eksplisit antara Proyeksi Eropa dan Amerika masih dapat diperjelas di lembar kerja.',
        'Nomor petunjuk kerja perlu dirapikan agar konsisten dengan struktur dokumen.',
        'Indikator keberhasilan per langkah bisa ditambahkan agar siswa bisa mengecek pekerjaannya sendiri.'
      ]
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'LKM Proyeksi Amerika',
      subtitle: 'Pertemuan 2',
      accent: '#0891b2',
      accentSoft: 'rgba(8, 145, 178, 0.2)'
    }
  },
  {
    id: 'lkm-pertemuan-3',
    title: 'LKM Siklus 1 - Pertemuan 3',
    category: 'lkm',
    siklus: 'siklus-1',
    badge: 'LKM P3',
    fileType: 'PDF',
    fileName: 'Siklus-1-LKM 3.pdf',
    preview: 'artefak/previews/lkm-3-siklus-1.png',
    summary: 'Lembar kerja latihan lanjutan proyeksi ortogonal untuk melengkapi gambar benda, menjaga kerapian, dan menghapus garis bantu.',
    tags: ['LKM', 'Pertemuan 3', 'Latihan Proyeksi'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-1-LKM 3.pdf' },
    analysis: {
      konteks: 'LKM pertemuan 3 menjadi latihan lanjutan untuk memperkuat pemahaman proyeksi ortogonal melalui tugas melengkapi gambar benda dan menjaga ketepatan gambar.',
      tujuan: [
        'Menguatkan keterampilan siswa dalam membaca bentuk benda dan melengkapi gambar proyeksi.',
        'Melatih kerapian kerja gambar, termasuk penggunaan dan penghapusan garis bantu.',
        'Menjadi bukti latihan akhir sebelum evaluasi atau rekap hasil siklus.'
      ],
      kelebihan: [
        'Tugas lebih menantang karena siswa diminta melengkapi bagian gambar yang belum terisi.',
        'Penekanan pada kerapian dan penghapusan garis bantu sesuai karakter kerja gambar teknik.',
        'Cocok digunakan sebagai latihan penguatan setelah siswa mengenal sistem proyeksi.'
      ],
      kekurangan: [
        'Judul pertemuan pada dokumen perlu dicek ulang agar tidak tertukar dengan pertemuan lain.',
        'Instruksi dapat diperjelas dengan contoh area yang harus dilengkapi.',
        'Bagian umpan balik atau penilaian mandiri siswa masih bisa ditambahkan.'
      ]
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'LKM Latihan Proyeksi',
      subtitle: 'Pertemuan 3',
      accent: '#14b8a6',
      accentSoft: 'rgba(20, 184, 166, 0.2)'
    }
  },
  {
    id: 'media-ppt-1',
    title: 'Media Presentasi Siklus 1 - Proyeksi',
    category: 'media',
    siklus: 'siklus-1',
    badge: 'Media',
    fileType: 'PPTX',
    fileName: 'Siklus-1-Media.pptx',
    preview: 'artefak/previews/media-siklus-1.jpg',
    summary: 'Media pembelajaran untuk membaca gambar teknik, memahami gambar proyeksi, serta membedakan Proyeksi Amerika dan Proyeksi Eropa.',
    tags: ['Presentasi', 'Proyeksi', 'Gambar Teknik'],
    action: { type: 'file', href: 'artefak/media/Siklus-1-Media.pptx' },
    analysis: {
      konteks: 'Media presentasi ini digunakan sebagai pendukung visual untuk menjelaskan konsep gambar proyeksi, Proyeksi Eropa, dan Proyeksi Amerika dalam pembelajaran gambar teknik.',
      tujuan: [
        'Membantu siswa memahami jenis proyeksi dalam gambar teknik secara visual.',
        'Menjelaskan perbedaan mendasar antara Proyeksi Amerika dan Proyeksi Eropa.',
        'Menjadi pemantik diskusi sebelum siswa mengerjakan LKM dan praktik menggambar.'
      ],
      kelebihan: [
        'Tampilan presentasi kuat secara visual dan langsung menonjolkan topik proyeksi.',
        'Slide tujuan pembelajaran membantu siswa memahami arah materi sejak awal.',
        'Materi mendukung penjelasan guru sebelum siswa masuk ke latihan manual.'
      ],
      kekurangan: [
        'Perlu dipastikan setiap slide memiliki contoh gambar yang cukup besar agar terbaca dari belakang kelas.',
        'Akan lebih kuat jika ditambah aktivitas tanya jawab atau cek pemahaman di tengah presentasi.',
        'File PPT perlu disandingkan dengan LKM agar siswa tidak hanya menerima materi secara pasif.'
      ]
    },
    cover: {
      kicker: 'Media Gambar Teknik',
      title: 'Proyeksi',
      subtitle: 'Amerika & Eropa',
      accent: '#a78bfa',
      accentSoft: 'rgba(167, 139, 250, 0.2)'
    }
  }
];
