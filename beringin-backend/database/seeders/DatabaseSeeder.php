<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Laporan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database for Beringin Smart (Clara Savira Edition).
     */
    public function run(): void
    {
        // 1. Akun Petugas Sarpras
        $petugas = User::updateOrCreate(
            ['email' => 'petugas@beringin.sch.id'],
            [
                'name'     => 'Ibu Ratna (Petugas Sarpras)',
                'password' => Hash::make('password123'),
                'role'     => 'petugas',
            ]
        );

        // 2. Akun Siswa (Clara Savira)
        $siswa = User::updateOrCreate(
            ['email' => 'clara@beringin.sch.id'],
            [
                'name'     => 'Clara Savira (XI PPLG 2)',
                'password' => Hash::make('password123'),
                'role'     => 'siswa',
            ]
        );

        // Siswa Umum (Opsional untuk testing multi-siswa)
        $siswaUmum = User::updateOrCreate(
            ['email' => 'siswa@beringin.sch.id'],
            [
                'name'     => 'Dimas Pratama (XI PPLG 1)',
                'password' => Hash::make('password123'),
                'role'     => 'siswa',
            ]
        );

        // 3. Data Awal Laporan Pengaduan
        Laporan::updateOrCreate(
            ['lokasi' => 'Lab Multimedia & RPL'],
            [
                'user_id'   => $siswa->id,
                'nama'      => $siswa->name,
                'kategori'  => 'Laboratorium',
                'deskripsi' => 'Kabel konektor HDMI proyektor lab goyang dan router Wi-Fi lab sering mati mendadak.',
                'status'    => 'Menunggu',
            ]
        );

        Laporan::updateOrCreate(
            ['lokasi' => 'Ruang Teori XI PPLG 2'],
            [
                'user_id'   => $siswa->id,
                'nama'      => $siswa->name,
                'kategori'  => 'Fasilitas Kelas',
                'deskripsi' => 'Kipas angin gantung sisi timur berbunyi keras dan stopkontak dekat papan tulis kendor.',
                'status'    => 'Sedang Diproses',
            ]
        );

        Laporan::updateOrCreate(
            ['lokasi' => 'Taman Belakang Gedung C'],
            [
                'user_id'   => $siswaUmum->id,
                'nama'      => $siswaUmum->name,
                'kategori'  => 'Lingkungan/Taman',
                'deskripsi' => 'Kran wastafel cuci tangan patah sehingga air merembes ke jalan setapak.',
                'status'    => 'Selesai',
            ]
        );
    }
}
