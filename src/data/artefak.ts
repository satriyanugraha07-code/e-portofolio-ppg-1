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
    kajianTeori: string;
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
      ],
      kajianTeori: 'Melalui kajian teori yang dipelajari pada mata kuliah PPG, RPP ini dapat dibaca dengan prinsip constructive alignment, yaitu keselarasan antara tujuan, aktivitas belajar, dan asesmen. RPP juga sejalan dengan pembelajaran berdiferensiasi karena rancangan ideal perlu memberi ruang bantuan, variasi contoh, dan penguatan sesuai kesiapan belajar peserta didik. Dalam konteks gambar teknik, perencanaan yang baik harus menghubungkan konsep, praktik, dan refleksi agar pembelajaran tidak berhenti pada penyampaian materi.'
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
    id: 'materi-siklus-1',
    title: 'Materi Siklus 1 - Cara-Cara Proyeksi',
    category: 'materi',
    siklus: 'siklus-1',
    badge: 'Materi',
    fileType: 'PDF',
    fileName: 'Siklus-1-Materi,Bahan Ajar.pdf',
    preview: 'artefak/previews/materi-siklus-1.png',
    summary: 'Bahan ajar gambar teknik mesin tentang cara-cara proyeksi pada gambar kerja, termasuk proyeksi sudut pertama dan sudut ketiga.',
    tags: ['Bahan Ajar', 'Proyeksi', 'Standar ISO'],
    action: { type: 'file', href: 'artefak/materi/Siklus-1-Materi,Bahan Ajar.pdf' },
    analysis: {
      konteks: 'Bahan ajar ini menjadi sumber materi utama untuk membantu peserta didik memahami cara proyeksi yang dipergunakan pada gambar kerja teknik mesin.',
      tujuan: [
        'Menjelaskan dasar proyeksi gambar kerja melalui bidang horizontal, bidang vertikal, dan pembagian kuadran.',
        'Membantu siswa membedakan proyeksi sudut pertama dan proyeksi sudut ketiga.',
        'Menjadi rujukan konsep sebelum siswa mengerjakan LKM gambar proyeksi.'
      ],
      kelebihan: [
        'Materi bersumber dari rujukan gambar teknik mesin menurut standar ISO sehingga kuat secara konsep.',
        'Pembahasan proyeksi disusun dari konsep ruang dan bidang proyeksi sehingga membantu siswa memahami asal susunan tampak.',
        'Bahan ajar sesuai dengan kebutuhan dasar sebelum siswa masuk ke praktik menggambar proyeksi.'
      ],
      kekurangan: [
        'Tampilan materi masih perlu dipadukan dengan contoh visual yang lebih dekat dengan benda kerja siswa.',
        'Bagian rangkuman dan cek pemahaman dapat ditambahkan agar siswa lebih mudah mengulang materi secara mandiri.',
        'Istilah teknis perlu diberi penguatan melalui glosarium singkat supaya tidak membebani siswa pemula.'
      ],
      kajianTeori: 'Dalam kajian teori PPG, bahan ajar ini berperan sebagai scaffolding konseptual sebelum siswa melakukan praktik. Materi proyeksi yang abstrak perlu disajikan secara bertahap, dimulai dari konsep bidang proyeksi, posisi benda, lalu susunan tampak. Agar lebih mendukung pembelajaran mendalam, bahan ajar sebaiknya tidak hanya menjadi bacaan, tetapi disambungkan dengan pertanyaan pemantik, contoh visual, latihan membaca gambar, dan refleksi singkat.'
    },
    cover: {
      kicker: 'Bahan Ajar',
      title: 'Cara Proyeksi',
      subtitle: 'Standar ISO',
      accent: '#38bdf8',
      accentSoft: 'rgba(56, 189, 248, 0.2)'
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
      ],
      kajianTeori: 'Berdasarkan kajian teori asesmen dalam mata kuliah PPG, instrumen ini menunjukkan penerapan assessment for learning karena hasil penilaian dapat digunakan untuk membaca pemahaman siswa dan menentukan bantuan berikutnya. Adanya asesmen diagnostik, observasi proses, penilaian produk, dan refleksi membuat penilaian tidak hanya berfungsi sebagai skor akhir. Instrumen ini akan lebih kuat apabila rubrik dan indikator kesalahan dibuat operasional agar umpan balik lebih cepat, jelas, dan mendukung perbaikan belajar siswa.'
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
      ],
      kajianTeori: 'LKM pertemuan 1 relevan dengan teori konstruktivisme dan scaffolding yang dipelajari dalam PPG. Siswa tidak hanya menerima penjelasan, tetapi membangun pemahaman proyeksi melalui pengamatan benda dan praktik menggambar. Petunjuk kerja berperan sebagai bantuan awal agar siswa dapat mengikuti langkah secara bertahap. Agar lebih kuat secara pedagogis, LKM perlu memberi contoh standar hasil dan ruang refleksi supaya siswa dapat menilai kembali proses serta kualitas gambarnya.'
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
      ],
      kajianTeori: 'Kajian teori PPG menunjukkan bahwa LKM pertemuan 2 mendukung pembelajaran bermakna karena siswa membandingkan konsep baru, yaitu Proyeksi Amerika, dengan konsep yang telah dipelajari sebelumnya. Pendekatan ini membantu transfer belajar dan memperkuat pemahaman melalui perbedaan posisi tampak. Dari sisi scaffolding, lembar kerja sudah menjadi panduan praktik, tetapi akan lebih efektif jika dilengkapi indikator cek mandiri agar siswa dapat memonitor ketepatan pekerjaannya.'
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
      ],
      kajianTeori: 'LKM pertemuan 3 dapat dianalisis melalui teori experiential learning dan mastery learning yang dipelajari dalam PPG. Siswa diberi kesempatan memperkuat keterampilan melalui latihan lanjutan, koreksi, dan penyempurnaan gambar. Tugas melengkapi gambar mendorong siswa membaca bentuk, mengambil keputusan, dan memperbaiki hasil kerja. Supaya proses belajarnya lebih terlihat, LKM perlu menambahkan umpan balik atau penilaian mandiri agar siswa mengetahui bagian mana yang sudah tepat dan bagian mana yang perlu diperbaiki.'
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
    id: 'media-siklus-1',
    title: 'Media Presentasi Siklus 1 - Proyeksi',
    category: 'media',
    siklus: 'siklus-1',
    badge: 'Media',
    fileType: 'PDF',
    fileName: 'Siklus-1-Media.pdf',
    preview: 'artefak/previews/media-siklus-1.png',
    summary: 'Media pembelajaran untuk membaca gambar teknik, memahami gambar proyeksi, serta membedakan Proyeksi Amerika dan Proyeksi Eropa.',
    tags: ['Presentasi', 'Proyeksi', 'Gambar Teknik'],
    action: { type: 'file', href: 'artefak/media/Siklus-1-Media.pdf' },
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
        'File media perlu disandingkan dengan LKM agar siswa tidak hanya menerima materi secara pasif.'
      ],
      kajianTeori: 'Media presentasi ini sesuai dengan kajian teori multimedia learning dalam PPG karena materi gambar teknik sangat membutuhkan dukungan visual. Kombinasi teks, gambar, dan contoh proyeksi dapat membantu siswa membangun representasi konsep yang lebih jelas. Namun, media perlu tetap menjaga beban kognitif agar informasi tidak terlalu padat dalam satu slide. Media juga sebaiknya dipadukan dengan pertanyaan pemantik dan LKM supaya siswa tidak hanya melihat, tetapi aktif memproses konsep yang sedang dipelajari.'
    },
    cover: {
      kicker: 'Media Gambar Teknik',
      title: 'Proyeksi',
      subtitle: 'Amerika & Eropa',
      accent: '#a78bfa',
      accentSoft: 'rgba(167, 139, 250, 0.2)'
    }
  },
  {
    id: 'rpp-siklus-2',
    title: 'RPP Siklus 2 - Potongan/Irisan',
    category: 'rpp',
    siklus: 'siklus-2',
    badge: 'RPP',
    fileType: 'PDF',
    fileName: 'RPP Siklus 2.pdf',
    preview: 'artefak/previews/rpp-siklus-2.png',
    summary: 'Perencanaan pembelajaran mendalam untuk topik potongan/irisan gambar teknik melalui job bagian kopling dan benda kerja teknik.',
    tags: ['Potongan', 'Irisan', 'Job Kopling'],
    action: { type: 'file', href: 'artefak/rpp/RPP Siklus 2.pdf' },
    analysis: {
      konteks: 'RPP siklus 2 disusun untuk pembelajaran gambar teknik pada topik potongan atau irisan, yaitu cara memperlihatkan bagian dalam benda kerja agar gambar lebih komunikatif.',
      tujuan: [
        'Mengarahkan siswa memahami fungsi potongan dalam membaca dan membuat gambar kerja.',
        'Menuntun pembelajaran dari pengenalan bidang potong sampai praktik membuat gambar potongan.',
        'Menghubungkan konsep potongan dengan job nyata seperti bagian kopling dan dudukan poros.'
      ],
      kelebihan: [
        'RPP sudah memuat karakteristik awal siswa yang telah mengenal alat gambar, jenis garis, satuan ukuran, dan proyeksi dasar.',
        'Materi potongan dijabarkan cukup rinci, mulai dari bidang potong, arah pandang, garis potong, huruf penanda, arsiran, dan jenis-jenis potongan.',
        'Rancangan pembelajaran mengaitkan teori gambar teknik dengan job praktik sehingga lebih relevan untuk kelas kejuruan.'
      ],
      kekurangan: [
        'Contoh miskonsepsi umum saat membaca garis potong dan arah pandang dapat dibuat lebih eksplisit.',
        'Strategi diferensiasi untuk siswa yang kesulitan membaca bentuk dalam benda masih bisa diperinci.',
        'Refleksi per pertemuan dapat dibuat lebih operasional agar mudah dipakai untuk revisi siklus berikutnya.'
      ],
      kajianTeori: 'RPP ini sejalan dengan prinsip constructive alignment karena tujuan, aktivitas, media, LKM, dan asesmen diarahkan pada kompetensi menggambar potongan. Dari perspektif experiential learning, siswa perlu mengalami proses membaca benda, menentukan bidang potong, menggambar, menerima umpan balik, lalu memperbaiki hasil. RPP akan semakin kuat jika memuat strategi scaffolding visual dan diferensiasi bantuan, karena topik potongan menuntut kemampuan spasial yang tidak sama pada setiap siswa.'
    },
    cover: {
      kicker: 'Perangkat Pembelajaran',
      title: 'RPP Potongan',
      subtitle: 'Gambar Teknik Mesin',
      accent: '#f97316',
      accentSoft: 'rgba(249, 115, 22, 0.2)'
    }
  },
  {
    id: 'materi-siklus-2',
    title: 'Materi Siklus 2 - Potongan/Irisan',
    category: 'materi',
    siklus: 'siklus-2',
    badge: 'Materi',
    fileType: 'PDF',
    fileName: 'Siklus-2-Materi,Bahan Ajar.pdf',
    preview: 'artefak/previews/materi-siklus-2.png',
    summary: 'Bahan ajar tentang potongan/irisan, penyajian potongan, jenis potongan, penampang tipis, bagian yang tidak boleh dipotong, dan aturan arsir.',
    tags: ['Bahan Ajar', 'Potongan', 'Arsir'],
    action: { type: 'file', href: 'artefak/materi/Siklus-2-Materi,Bahan Ajar.pdf' },
    analysis: {
      konteks: 'Materi siklus 2 mendukung pembelajaran gambar potongan untuk memperjelas bagian dalam benda yang tidak terbaca baik jika hanya menggunakan garis tersembunyi.',
      tujuan: [
        'Menjelaskan fungsi gambar potongan dalam mengurangi kerumitan garis gores.',
        'Mengenalkan berbagai jenis potongan dan aturan penyajiannya pada gambar teknik.',
        'Memberi dasar teori tentang arsiran, penampang, dan bagian benda yang tidak boleh dipotong.'
      ],
      kelebihan: [
        'Ruang lingkup materi lengkap untuk topik potongan, mulai dari alasan penggunaan sampai aturan teknis penyajian.',
        'Materi membantu siswa memahami bahwa potongan adalah strategi komunikasi gambar, bukan sekadar menggambar ulang benda.',
        'Pembahasan arsir dan jenis potongan mendukung ketelitian praktik menggambar.'
      ],
      kekurangan: [
        'Materi akan lebih kuat jika setiap jenis potongan diberi contoh job yang sama dengan LKM.',
        'Bagian latihan singkat setelah submateri dapat ditambah agar siswa langsung menguji pemahaman.',
        'Perlu penyederhanaan istilah pada bagian awal agar siswa kelas X tidak merasa materi terlalu padat.'
      ],
      kajianTeori: 'Bahan ajar ini mendukung pembelajaran bermakna karena konsep potongan dikaitkan dengan masalah nyata dalam gambar teknik, yaitu bagian dalam benda yang sulit terbaca. Dalam kerangka multimedia learning, materi potongan perlu didampingi visual yang jelas agar beban kognitif siswa tetap terkendali. Bahan ajar ini juga dapat menjadi pijakan scaffolding: siswa membaca konsep terlebih dahulu, melihat contoh, lalu menerapkan aturan melalui LKM dan asesmen produk gambar.'
    },
    cover: {
      kicker: 'Bahan Ajar',
      title: 'Potongan',
      subtitle: 'Irisan & Arsir',
      accent: '#fb923c',
      accentSoft: 'rgba(251, 146, 60, 0.2)'
    }
  },
  {
    id: 'lkm-siklus-2-pertemuan-1',
    title: 'LKM Siklus 2 - Pertemuan 1',
    category: 'lkm',
    siklus: 'siklus-2',
    badge: 'LKM P1',
    fileType: 'PDF',
    fileName: 'Siklus-2-LKM 1.pdf',
    preview: 'artefak/previews/lkm-1-siklus-2.png',
    summary: 'Lembar kerja untuk menggambar potongan dasar A-A pada bagian kopling dengan memperhatikan ukuran, garis sumbu, garis arsir, dan kerapian gambar.',
    tags: ['LKM', 'Potongan A-A', 'Kopling'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-2-LKM 1.pdf' },
    analysis: {
      konteks: 'LKM pertemuan 1 siklus 2 digunakan untuk mengarahkan siswa memahami konsep potongan dasar melalui job bagian kopling.',
      tujuan: [
        'Membantu siswa mengidentifikasi bidang potong A-A, garis sumbu, garis arsir, dan ukuran utama.',
        'Melatih siswa menggambar ulang potongan bagian kopling sesuai kaidah gambar teknik.',
        'Membiasakan ketelitian ukuran, ketebalan garis, arsir, dan kelengkapan etiket gambar.'
      ],
      kelebihan: [
        'Tugas praktik langsung menggunakan benda kerja yang konkret sehingga siswa melihat fungsi potongan secara nyata.',
        'Petunjuk kerja mengarahkan siswa membaca pandangan atas dan hasil potongan sebelum menggambar.',
        'Kriteria kerapian, ukuran, garis, arsir, dan etiket sudah ditegaskan dalam instruksi.'
      ],
      kekurangan: [
        'Ruang jawaban reflektif dapat diperluas agar siswa menuliskan kesulitan saat membaca bidang potong.',
        'Contoh kesalahan arsir atau posisi garis sumbu dapat ditambahkan sebagai pembanding.',
        'Instruksi remedial untuk siswa yang belum tepat membaca ukuran masih dapat dibuat lebih jelas.'
      ],
      kajianTeori: 'LKM ini sesuai dengan pendekatan experiential learning karena siswa belajar potongan melalui pengalaman menggambar job konkret. Petunjuk bertahap menjadi scaffolding agar siswa tidak langsung masuk ke produk akhir tanpa memahami objek, bidang potong, dan ukuran. Untuk memperkuat assessment for learning, LKM dapat dilengkapi cek mandiri singkat sehingga siswa dapat menilai ketepatan garis, arsir, ukuran, dan etiket sebelum dikumpulkan.'
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'Job Kopling',
      subtitle: 'Potongan A-A',
      accent: '#facc15',
      accentSoft: 'rgba(250, 204, 21, 0.2)'
    }
  },
  {
    id: 'lkm-siklus-2-pertemuan-2-3',
    title: 'LKM Siklus 2 - Pertemuan 2 dan 3',
    category: 'lkm',
    siklus: 'siklus-2',
    badge: 'LKM P2-3',
    fileType: 'PDF',
    fileName: 'Siklus-2-LKM 2.pdf',
    preview: 'artefak/previews/lkm-2-siklus-2.png',
    summary: 'Lembar kerja lanjutan untuk membaca dan melengkapi gambar potongan pompa melalui bidang potong A-B, C-D, dan A-C.',
    tags: ['LKM', 'Potongan Pompa', 'Bidang Potong'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-2-LKM 2.pdf' },
    analysis: {
      konteks: 'LKM pertemuan 2 dan 3 siklus 2 memperluas latihan potongan dari job sederhana menuju potongan pompa yang memiliki beberapa bidang potong.',
      tujuan: [
        'Menguatkan kemampuan siswa membaca beberapa bidang potong pada satu benda kerja.',
        'Melatih siswa melengkapi gambar potongan pompa sesuai ukuran, radius, garis sumbu, dan arsir.',
        'Mendorong siswa memahami hubungan antara pandangan utama dan hasil potongan.'
      ],
      kelebihan: [
        'Tingkat tantangan meningkat secara wajar setelah siswa berlatih potongan dasar.',
        'LKM menekankan pengamatan pandangan utama, potongan A-B, C-D, dan area A-C yang harus dilengkapi.',
        'Aktivitas cocok untuk mengukur pemahaman spasial dan ketelitian gambar teknik.'
      ],
      kekurangan: [
        'Karena kompleksitas job meningkat, LKM perlu menyediakan contoh langkah awal agar siswa tidak berhenti pada tahap membaca gambar.',
        'Bagian pertanyaan pemantik dapat dibuat lebih spesifik pada hubungan bidang potong dan hasil gambar.',
        'Rubrik ringkas di dalam LKM dapat membantu siswa memahami prioritas penilaian.'
      ],
      kajianTeori: 'LKM ini menunjukkan penerapan pembelajaran bertahap dari sederhana ke kompleks. Secara konstruktivistik, siswa membangun pemahaman baru dengan membandingkan job potongan sebelumnya dengan job pompa yang lebih rumit. Scaffolding perlu dijaga melalui contoh awal, diskusi titik sulit, dan umpan balik selama proses, karena kemampuan membaca beberapa bidang potong sangat bergantung pada visualisasi spasial siswa.'
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'Potongan Pompa',
      subtitle: 'Pertemuan 2-3',
      accent: '#eab308',
      accentSoft: 'rgba(234, 179, 8, 0.2)'
    }
  },
  {
    id: 'media-siklus-2',
    title: 'Media Presentasi Siklus 2 - Potongan/Irisan',
    category: 'media',
    siklus: 'siklus-2',
    badge: 'Media',
    fileType: 'PDF',
    fileName: 'Siklus-2-Media.pdf',
    preview: 'artefak/previews/media-siklus-2.png',
    summary: 'Media ajar tentang konsep benda dipotong untuk memperjelas bentuk dalam, bidang potong, garis potong, arah pandang, dan arsir.',
    tags: ['Presentasi', 'Potongan', 'Visualisasi'],
    action: { type: 'file', href: 'artefak/media/Siklus-2-Media.pdf' },
    analysis: {
      konteks: 'Media siklus 2 digunakan untuk menjelaskan alasan dan prinsip gambar potongan sebelum siswa mengerjakan job potongan pada LKM.',
      tujuan: [
        'Memvisualkan fungsi potongan untuk memperjelas bagian dalam benda kerja.',
        'Membantu siswa membedakan bidang potong, garis potong, arah pandang, dan hasil potongan.',
        'Menjadi pengantar sebelum praktik menggambar potongan pada job kopling dan pompa.'
      ],
      kelebihan: [
        'Media memiliki alur yang jelas dari benda utuh menuju gambar potongan.',
        'Pesan utama potongan sebagai cara membaca bentuk dalam disampaikan secara ringkas.',
        'Media sesuai dengan kebutuhan visual topik potongan yang sulit dipahami jika hanya dijelaskan lisan.'
      ],
      kekurangan: [
        'Aktivitas cek pemahaman di tengah slide dapat ditambahkan agar siswa aktif membaca visual.',
        'Contoh perbandingan antara garis gores dan gambar potongan dapat diperbanyak.',
        'Media perlu dikaitkan langsung dengan LKM agar transisi dari penjelasan ke praktik lebih lancar.'
      ],
      kajianTeori: 'Media ini kuat dari sisi multimedia learning karena topik potongan membutuhkan representasi visual. Penyajian bertahap dari benda utuh ke potongan membantu mengurangi beban kognitif dan memperjelas hubungan antarbagian gambar. Dalam pembelajaran mendalam, media sebaiknya tidak hanya menyampaikan informasi, tetapi juga memantik prediksi siswa tentang arah potong, bagian yang diarsir, dan informasi yang muncul setelah benda dipotong.'
    },
    cover: {
      kicker: 'Media Ajar',
      title: 'Potongan',
      subtitle: 'Visualisasi Bentuk Dalam',
      accent: '#c084fc',
      accentSoft: 'rgba(192, 132, 252, 0.2)'
    }
  },
  {
    id: 'asesmen-siklus-2',
    title: 'Instrumen Asesmen Siklus 2',
    category: 'asesmen',
    siklus: 'siklus-2',
    badge: 'Asesmen',
    fileType: 'PDF',
    fileName: 'Siklus-2-Asesment.pdf',
    preview: 'artefak/previews/asesmen-siklus-2.png',
    summary: 'Instrumen asesmen produk gambar potongan/irisan untuk tiga pertemuan, berfokus pada observasi proses dan penilaian hasil gambar.',
    tags: ['Rubrik', 'Potongan', 'Produk Gambar'],
    action: { type: 'file', href: 'artefak/asesmen/Siklus-2-Asesment.pdf' },
    analysis: {
      konteks: 'Instrumen asesmen siklus 2 digunakan untuk menilai produk gambar potongan/irisan, proses kerja, dan verifikasi pemahaman siswa secara singkat.',
      tujuan: [
        'Menilai kualitas gambar potongan berdasarkan ukuran, garis, arsiran, kerapian, dan etiket.',
        'Memantau sikap dan proses kerja seperti disiplin, ketelitian, kemandirian, tanggung jawab, dan komunikasi.',
        'Memberi dasar umpan balik untuk memperbaiki pemahaman siswa tentang potongan.'
      ],
      kelebihan: [
        'Instrumen menekankan penilaian praktik, bukan pilihan ganda, sehingga sesuai dengan karakter gambar teknik.',
        'Fokus penilaian produk dan sikap/proses sudah dibedakan dengan jelas.',
        'Kisi-kisi tiga pertemuan membantu guru membaca progres dari potongan dasar sampai produk akhir.'
      ],
      kekurangan: [
        'Rubrik dapat dibuat lebih ringkas dalam format cek cepat agar mudah digunakan saat kelas praktik berlangsung.',
        'Contoh kriteria skor untuk arsir, ukuran, dan ketepatan bidang potong dapat dibuat lebih konkret.',
        'Ruang catatan umpan balik individual dapat ditambah agar hasil asesmen langsung menjadi bahan perbaikan siswa.'
      ],
      kajianTeori: 'Instrumen ini mencerminkan assessment for learning karena penilaian tidak hanya menghasilkan skor, tetapi juga membaca proses dan kebutuhan perbaikan. Penilaian produk gambar sesuai dengan prinsip autentik dalam pembelajaran kejuruan, karena kemampuan siswa terlihat melalui karya praktik. Agar lebih kuat, rubrik perlu sangat operasional sehingga guru dapat memberi umpan balik cepat tentang kesalahan garis, ukuran, arsir, dan pemahaman bidang potong.'
    },
    cover: {
      kicker: 'Instrumen Asesmen',
      title: 'Rubrik Potongan',
      subtitle: 'Produk Gambar',
      accent: '#f472b6',
      accentSoft: 'rgba(244, 114, 182, 0.2)'
    }
  },
  {
    id: 'rpp-siklus-3',
    title: 'RPP Siklus 3 - Aturan Memberi Ukuran',
    category: 'rpp',
    siklus: 'siklus-3',
    badge: 'RPP',
    fileType: 'PDF',
    fileName: 'RPP Siklus 3 .pdf',
    preview: 'artefak/previews/rpp-siklus-3.png',
    summary: 'Perencanaan pembelajaran gambar teknik tentang aturan dasar, cara-cara, dan dasar umum memberi ukuran pada gambar kerja.',
    tags: ['Pemberian Ukuran', 'Gambar Kerja', 'Fase E'],
    action: { type: 'file', href: 'artefak/rpp/RPP Siklus 3 .pdf' },
    analysis: {
      konteks: 'RPP siklus 3 berfokus pada aturan memberi ukuran agar gambar kerja dapat dibaca jelas, konsisten, dan tidak menimbulkan salah tafsir.',
      tujuan: [
        'Mengarahkan siswa memahami fungsi ukuran sebagai bahasa produksi pada gambar teknik.',
        'Melatih siswa menerapkan garis ukur, garis bantu, angka ukuran, satuan, dan simbol ukuran secara tepat.',
        'Menghubungkan aturan ukuran dengan keterbacaan gambar kerja dan kebutuhan praktik teknik mesin.'
      ],
      kelebihan: [
        'RPP mengidentifikasi kemampuan awal siswa terkait jenis garis, satuan ukuran, dan pembacaan gambar kerja sederhana.',
        'Materi memberi ukuran dijabarkan pada unsur teknis yang penting seperti garis ukur, garis bantu, angka ukuran, ujung garis ukur, satuan, sudut, busur, dan bagian simetris.',
        'Rancangan relevan dengan kebutuhan industri karena ukuran menentukan keterbacaan dan ketepatan produksi benda kerja.'
      ],
      kekurangan: [
        'Contoh gambar benar dan salah dalam pemberian ukuran dapat dibuat lebih eksplisit.',
        'Kegiatan latihan perlu memberi ruang koreksi bertahap karena kesalahan ukuran sering baru terlihat setelah gambar selesai.',
        'Strategi pengayaan untuk siswa yang cepat selesai dapat ditambahkan, misalnya analisis gambar kerja yang lebih kompleks.'
      ],
      kajianTeori: 'RPP ini sesuai dengan pembelajaran berbasis kompetensi karena fokusnya bukan hanya mengetahui aturan, tetapi mampu menerapkan ukuran pada gambar kerja. Dalam perspektif mastery learning, siswa perlu mendapat latihan, koreksi, dan kesempatan memperbaiki gambar sampai standar ketepatan tercapai. RPP akan semakin kuat jika menggabungkan contoh visual, umpan balik formatif, dan rubrik operasional agar siswa memahami bahwa ukuran adalah bagian penting dari komunikasi teknik.'
    },
    cover: {
      kicker: 'Perangkat Pembelajaran',
      title: 'RPP Ukuran',
      subtitle: 'Gambar Kerja',
      accent: '#60a5fa',
      accentSoft: 'rgba(96, 165, 250, 0.2)'
    }
  },
  {
    id: 'materi-siklus-3',
    title: 'Materi Siklus 3 - Aturan Memberi Ukuran',
    category: 'materi',
    siklus: 'siklus-3',
    badge: 'Materi',
    fileType: 'PDF',
    fileName: 'Siklus-3-Materi,Bahan Ajar.pdf',
    preview: 'artefak/previews/materi-siklus-3.png',
    summary: 'Buku ajar gambar teknik mesin tentang aturan dasar, cara memberi ukuran, dan dasar umum memberi ukuran pada gambar kerja.',
    tags: ['Bahan Ajar', 'Ukuran', 'Gambar Kerja'],
    action: { type: 'file', href: 'artefak/materi/Siklus-3-Materi,Bahan Ajar.pdf' },
    analysis: {
      konteks: 'Materi siklus 3 disusun sebagai bahan pembelajaran aturan pemberian ukuran pada gambar teknik mesin.',
      tujuan: [
        'Membantu peserta didik memahami fungsi garis ukur, garis bantu, angka ukuran, satuan, toleransi, dan lambang.',
        'Menuntun siswa membaca dan menerapkan ukuran agar gambar kerja mudah dipahami.',
        'Menjadi pendamping media dan LKM saat siswa mengerjakan gambar kerja.'
      ],
      kelebihan: [
        'Materi disusun ulang dengan tampilan yang lebih rapi dan modern sehingga mudah dipakai sebagai bahan ajar.',
        'Ruang lingkup mencakup aturan dasar, cara memberi ukuran, dan dasar umum memberi ukuran.',
        'Materi menekankan ketelitian, kerapian, dan keterbacaan sebagai karakter penting gambar teknik.'
      ],
      kekurangan: [
        'Beberapa gambar masih berupa placeholder sehingga perlu diganti dengan gambar kerja yang final dan jelas.',
        'Latihan bertahap dapat ditambah setelah tiap subbab agar siswa langsung menerapkan aturan ukuran.',
        'Contoh kesalahan umum pemberian ukuran perlu disediakan agar siswa dapat menghindari miskonsepsi.'
      ],
      kajianTeori: 'Bahan ajar ini mendukung pembelajaran mandiri karena materi tersusun sistematis dan dapat dibaca sebelum atau sesudah praktik. Dari sisi teori beban kognitif, topik ukuran memerlukan contoh visual yang bersih agar siswa tidak bingung membaca garis ukur, angka, dan simbol. Karena masih ada placeholder gambar, kualitas bahan ajar akan meningkat ketika guru menambahkan gambar HD yang sesuai dengan job siswa dan memberi latihan cek mandiri pada tiap bagian.'
    },
    cover: {
      kicker: 'Bahan Ajar',
      title: 'Aturan Ukuran',
      subtitle: 'Bab 10-12',
      accent: '#93c5fd',
      accentSoft: 'rgba(147, 197, 253, 0.2)'
    }
  },
  {
    id: 'lkm-siklus-3-pertemuan-4',
    title: 'LKM Siklus 3 - Konstruksi Geometris 2',
    category: 'lkm',
    siklus: 'siklus-3',
    badge: 'LKM P4',
    fileType: 'PDF',
    fileName: 'Siklus-3-LKM .pdf',
    preview: 'artefak/previews/lkm-siklus-3.png',
    summary: 'Lembar kerja praktik menggambar ulang job Konstruksi Geometris 2 dengan memperhatikan pandangan, potongan, ukuran, radius, ulir, garis sumbu, dan arsiran.',
    tags: ['LKM', 'Konstruksi Geometris', 'Ukuran'],
    action: { type: 'file', href: 'artefak/lkm/Siklus-3-LKM .pdf' },
    analysis: {
      konteks: 'LKM siklus 3 digunakan untuk menerapkan aturan memberi ukuran melalui job Konstruksi Geometris 2 pada gambar teknik atau CAD 1.',
      tujuan: [
        'Melatih siswa membaca gambar kerja yang memuat pandangan, potongan, ukuran, radius, ulir, garis sumbu, dan arsiran.',
        'Mengarahkan siswa menggambar ulang job sesuai ukuran dan kaidah gambar teknik.',
        'Membiasakan siswa memeriksa kerapian, proporsi, etiket, dan penghapusan garis bantu sebelum pengumpulan.'
      ],
      kelebihan: [
        'LKM memberi tugas praktik yang autentik dan sesuai karakter pembelajaran gambar teknik.',
        'Instruksi kerja menekankan detail ukuran, garis, arsiran, dan etiket sehingga standar produk jelas.',
        'Tugas dapat dikerjakan manual atau digital sehingga fleksibel mengikuti fasilitas kelas.'
      ],
      kekurangan: [
        'Karena job cukup kompleks, perlu contoh pembacaan ukuran awal agar siswa tidak salah memahami bentuk.',
        'Bagian refleksi dan cek mandiri dapat ditambahkan sebelum siswa mengumpulkan gambar.',
        'Kriteria penilaian singkat di halaman LKM akan membantu siswa mengetahui prioritas kualitas gambar.'
      ],
      kajianTeori: 'LKM ini relevan dengan teori pembelajaran praktik dan mastery learning. Siswa tidak cukup memahami aturan ukuran secara verbal, tetapi harus menerapkannya pada produk gambar yang lengkap. Proses membaca, menggambar, memeriksa, dan menghapus garis bantu adalah bentuk latihan berulang yang membangun ketelitian. Agar pembelajaran lebih formatif, guru dapat menambahkan cek mandiri dan sesi umpan balik sebelum penilaian akhir.'
    },
    cover: {
      kicker: 'Lembar Kerja Murid',
      title: 'Geometris 2',
      subtitle: 'Ukuran & Potongan',
      accent: '#34d399',
      accentSoft: 'rgba(52, 211, 153, 0.2)'
    }
  },
  {
    id: 'media-siklus-3',
    title: 'Media Presentasi Siklus 3 - Aturan Memberi Ukuran',
    category: 'media',
    siklus: 'siklus-3',
    badge: 'Media',
    fileType: 'PDF',
    fileName: 'Siklus-3-Media.pdf',
    preview: 'artefak/previews/media-siklus-3.png',
    summary: 'Media ajar tentang fungsi ukuran, garis ukur, garis bantu, angka ukur, toleransi, dimensi fungsional, satuan, dan desimal.',
    tags: ['Presentasi', 'Pemberian Ukuran', 'Gambar Teknik'],
    action: { type: 'file', href: 'artefak/media/Siklus-3-Media.pdf' },
    analysis: {
      konteks: 'Media siklus 3 digunakan untuk mengenalkan aturan memberi ukuran sebagai bahasa produksi pada gambar teknik.',
      tujuan: [
        'Menjelaskan mengapa ukuran harus jelas, konsisten, dan tidak ambigu.',
        'Membantu siswa membedakan garis ukur, garis bantu, angka ukur, toleransi, dan dimensi fungsional.',
        'Menjadi jembatan dari bahan ajar menuju praktik menggambar pada LKM.'
      ],
      kelebihan: [
        'Media memiliki alur ringkas yang memudahkan siswa memahami fokus pembelajaran.',
        'Penekanan pada prinsip jelas, terbaca, dan tidak ambigu sesuai dengan tujuan gambar kerja.',
        'Media membantu guru mengarahkan perhatian siswa pada unsur ukuran sebelum masuk ke tugas praktik.'
      ],
      kekurangan: [
        'Slide akan lebih kuat jika dilengkapi contoh visual ukuran yang benar dan salah.',
        'Perlu pertanyaan cepat atau latihan singkat agar siswa langsung menerapkan konsep setelah penjelasan.',
        'Hubungan setiap aturan dengan job Konstruksi Geometris 2 dapat diperjelas agar siswa melihat relevansi langsung.'
      ],
      kajianTeori: 'Media ini sesuai dengan prinsip multimedia learning karena membantu memadatkan konsep aturan ukuran menjadi alur visual yang mudah dipahami. Topik ukuran membutuhkan perhatian pada detail kecil, sehingga media perlu menjaga keterbacaan dan menghindari informasi terlalu padat. Dalam pembelajaran mendalam, media sebaiknya diikuti aktivitas membandingkan contoh benar-salah dan diskusi alasan teknis di balik setiap aturan.'
    },
    cover: {
      kicker: 'Media Ajar',
      title: 'Ukuran',
      subtitle: 'Jelas & Tidak Ambigu',
      accent: '#818cf8',
      accentSoft: 'rgba(129, 140, 248, 0.2)'
    }
  },
  {
    id: 'asesmen-siklus-3',
    title: 'Instrumen Asesmen Siklus 3',
    category: 'asesmen',
    siklus: 'siklus-3',
    badge: 'Asesmen',
    fileType: 'PDF',
    fileName: 'Siklus-3-Asesment.pdf',
    preview: 'artefak/previews/asesmen-siklus-3.png',
    summary: 'Instrumen asesmen praktik gambar kerja Konstruksi Geometris 2 dan aturan memberi ukuran, dengan fokus pada diagnostik, formatif, dan sumatif.',
    tags: ['Rubrik', 'Ukuran', 'Praktik Gambar'],
    action: { type: 'file', href: 'artefak/asesmen/Siklus-3-Asesment.pdf' },
    analysis: {
      konteks: 'Instrumen asesmen siklus 3 menilai praktik gambar kerja dengan fokus pada aturan memberi ukuran dan job Konstruksi Geometris 2.',
      tujuan: [
        'Mengetahui kemampuan awal siswa dalam membaca gambar kerja dan aturan memberi ukuran.',
        'Memantau proses siswa saat mengerjakan gambar, termasuk ketelitian membaca ukuran, potongan, garis sumbu, dan arsiran.',
        'Menilai kualitas gambar akhir sebagai bukti keterampilan praktik.'
      ],
      kelebihan: [
        'Instrumen membagi asesmen menjadi diagnostik, formatif, dan sumatif sehingga alur penilaian lebih lengkap.',
        'Penilaian berfokus pada praktik gambar, bukan pilihan ganda, sehingga sesuai dengan kompetensi kejuruan.',
        'Dasar penilaian selaras dengan RPP, materi, dan LKM karena sama-sama menekankan aturan ukuran dan kualitas gambar kerja.'
      ],
      kekurangan: [
        'Deskriptor skor perlu dibuat sangat konkret agar penilaian antarpenilai lebih konsisten.',
        'Ruang umpan balik individual dapat ditambah untuk mencatat kesalahan ukuran, garis, dan etiket.',
        'Contoh produk dengan kategori sangat baik, cukup, dan perlu perbaikan dapat membantu siswa memahami standar.'
      ],
      kajianTeori: 'Instrumen ini kuat secara pedagogis karena menggabungkan asesmen diagnostik, formatif, dan sumatif. Dalam assessment for learning, formatif menjadi bagian penting untuk membaca proses siswa sebelum produk akhir dinilai. Pada pembelajaran gambar teknik, rubrik harus operasional agar guru dapat menilai ketepatan ukuran, keterbacaan garis, kerapian, dan kelengkapan etiket secara konsisten. Dengan umpan balik yang jelas, asesmen menjadi alat perbaikan, bukan hanya penentuan nilai.'
    },
    cover: {
      kicker: 'Instrumen Asesmen',
      title: 'Asesmen Ukuran',
      subtitle: 'Praktik Gambar',
      accent: '#fb7185',
      accentSoft: 'rgba(251, 113, 133, 0.2)'
    }
  }
];
