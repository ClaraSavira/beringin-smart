<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Laporan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Petugas Sarpras
        $petugas = User::updateOrCreate(
            ['email' => 'petugas@beringin.sch.id'],
            [
                'name'     => 'Pak Budi Santoso (Koordinator Sarpras)',
                'password' => Hash::make('password123'),
                'role'     => 'petugas',
            ]
        );

        // 2. Akun Siswa (Clara Savira)
        $siswa = User::updateOrCreate(
            ['email' => 'siswa@beringin.sch.id'],
            [
                'name'     => 'Clara Savira (Siswi XI PPLG)',
                'password' => Hash::make('password123'),
                'role'     => 'siswa',
            ]
        );

        // 3. Sampel Tiket Awal
        Laporan::updateOrCreate(
            ['lokasi' => 'Lab Komputer 3'],
            [
                'user_id'   => $siswa->id,
                'nama'      => $siswa->name,
                'kategori'  => 'Laboratorium',
                'deskripsi' => 'Kabel LAN pada deretan meja 4 putus dan mouse tidak terdeteksi.',
                'status'    => 'Menunggu',
            ]
        );

        Laporan::updateOrCreate(
            ['lokasi' => 'Ruang Teori XI PPLG 2'],
            [
                'user_id'   => $siswa->id,
                'nama'      => $siswa->name,
                'kategori'  => 'Fasilitas Kelas',
                'deskripsi' => 'Kipas angin plafon berbunyi bising dan stopkontak depan longgar.',
                'status'    => 'Sedang Diproses',
            ]
        );
    }
}
