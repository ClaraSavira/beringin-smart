import React, { useState, useContext } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonChip,
  IonButtons,
  IonSearchbar,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  documentTextOutline,
  sendOutline,
  businessOutline,
  personOutline,
  locationOutline,
  listOutline,
  statsChartOutline,
  checkmarkCircleOutline,
  timeOutline,
  chevronForwardOutline,
  logOutOutline,
  funnelOutline,
  sparklesOutline,
  addCircleOutline,
  cubeOutline,
  handRightOutline,
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { LaporanContext } from '../context/LaporanContext';
import './Home.css';

const Home: React.FC = () => {
  const router = useIonRouter();
  const { laporanList, tambahLaporan, refreshLaporan } = useContext(LaporanContext);

  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('dark');

  const [activeTab, setActiveTab] = useState<'daftar' | 'buat'>('daftar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const userRole = localStorage.getItem('role') || 'siswa';
  const userJson = localStorage.getItem('user');
  const currentUser = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const totalLaporan = laporanList.length;
  const laporanSelesai = laporanList.filter((item) => item.status === 'Selesai').length;
  const laporanPending = totalLaporan - laporanSelesai;

  const filteredList = laporanList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.lokasi.toLowerCase().includes(query) ||
      (item.nama && item.nama.toLowerCase().includes(query)) ||
      (item.nama_pelapor && item.nama_pelapor.toLowerCase().includes(query)) ||
      item.deskripsi.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !lokasi || !kategori || !deskripsi) {
      setToastMessage('Mohon isi seluruh data pengaduan!');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setSubmitting(true);
    const success = await tambahLaporan({ nama, lokasi, kategori, deskripsi });
    setSubmitting(false);

    if (success) {
      setNama('');
      setLokasi('');
      setKategori('');
      setDeskripsi('');
      setToastMessage('Pengaduan Anda berhasil dikirim ke server!');
      setToastColor('success');
      setShowToast(true);
      setActiveTab('daftar');
    } else {
      setToastMessage('Gagal mengirim laporan! Periksa koneksi backend.');
      setToastColor('danger');
      setShowToast(true);
    }
  };

  const categories = ['Semua', 'Fasilitas Kelas', 'Laboratorium', 'Lingkungan/Taman'];

  return (
    <IonPage>
      {/* Mobile-Friendly Responsive Header */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="home-header-toolbar">
          <div slot="start" className="mobile-header-brand">
            <div className="mobile-logo-box">
              <IonIcon icon={cubeOutline} />
            </div>

            <div className="mobile-brand-text">
              <h1 className="mobile-brand-title">SIPRA Mobile</h1>
              <div className="mobile-brand-subtitle">
                <span>SMKN 1</span>
                <span>•</span>
                <span
                  style={{
                    color: userRole === 'petugas' ? '#34d399' : '#c4b5fd',
                    fontWeight: 700,
                  }}
                >
                  {userRole === 'petugas' ? 'Petugas Sarpras' : 'Siswa'}
                </span>
              </div>
            </div>
          </div>

          <IonButtons slot="end" className="mobile-header-end">
            <div className="mobile-avatar-pill">
              <div
                className="mobile-avatar-circle"
                style={{ background: userRole === 'petugas' ? '#059669' : '#7c3aed' }}
              >
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <span className="mobile-user-name">
                {currentUser?.name ? currentUser.name.split(' ')[0] : 'Clara'}
              </span>
            </div>

            <IonButton
              color="light"
              fill="clear"
              size="small"
              onClick={handleLogout}
              className="mobile-logout-btn"
              title="Keluar"
            >
              <IonIcon slot="icon-only" icon={logOutOutline} style={{ fontSize: '1.25rem' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#faf5ff' } as React.CSSProperties}>
        <IonGrid fixed style={{ maxWidth: '1200px', padding: 0 }}>
          {/* Greeting Banner */}
          <div className="home-hero-greeting">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', display: 'flex', alignItems: 'center' }}>
                  Halo, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Clara'}
                  <IonIcon icon={handRightOutline} style={{ color: '#8b5cf6', fontSize: '1.15rem', marginLeft: '6px' }} />
                </h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#6b7280' }}>
                  {userRole === 'petugas' ? 'Monitoring & penanganan sarana prasarana.' : 'Layanan pelaporan kerusakan fasilitas sekolah.'}
                </p>
              </div>

              <IonButton
                size="small"
                fill="outline"
                color="primary"
                onClick={() => refreshLaporan()}
                style={{ height: '30px', fontWeight: 600, fontSize: '0.75rem', '--border-radius': '16px' }}
              >
                <IonIcon slot="icon-only" icon={sparklesOutline} />
              </IonButton>
            </div>
          </div>

          {/* Compact 3-Column Mobile Stats Grid */}
          <IonRow className="mobile-stats-row">
            {/* Total */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-purple)',
                  padding: '10px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.3rem', color: '#7c3aed' }}>
                  <IonIcon icon={statsChartOutline} />
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4c1d95', lineHeight: 1.1 }}>
                  {totalLaporan}
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase' }}>
                  Total
                </div>
              </div>
            </IonCol>

            {/* Proses */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-amber)',
                  padding: '10px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.3rem', color: '#d97706' }}>
                  <IonIcon icon={timeOutline} />
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400e', lineHeight: 1.1 }}>
                  {laporanPending}
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                  Proses
                </div>
              </div>
            </IonCol>

            {/* Selesai */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-teal)',
                  padding: '10px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.3rem', color: '#059669' }}>
                  <IonIcon icon={checkmarkCircleOutline} />
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#065f46', lineHeight: 1.1 }}>
                  {laporanSelesai}
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                  Selesai
                </div>
              </div>
            </IonCol>
          </IonRow>

          {/* Segment Mobile */}
          <div className="ion-hide-lg-up">
            <IonSegment
              value={activeTab}
              onIonChange={(e) => setActiveTab(e.detail.value as 'daftar' | 'buat')}
              className="mobile-view-segment"
            >
              <IonSegmentButton value="daftar">
                <IonLabel>
                  <IonIcon icon={listOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Daftar ({filteredList.length})
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="buat">
                <IonLabel>
                  <IonIcon icon={addCircleOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Buat Tiket
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          <IonRow>
            {/* Form */}
            <IonCol
              size="12"
              sizeLg="5"
              className={activeTab !== 'buat' ? 'ion-hide-lg-down' : ''}
              style={{ marginBottom: '16px' }}
            >
              <IonCard className="bs-form-card" style={{ margin: 0 }}>
                <IonCardHeader style={{ borderBottom: '1px solid #f3e8ff', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: '#faf5ff',
                        color: '#7c3aed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IonIcon icon={documentTextOutline} />
                    </div>
                    <div>
                      <IonCardSubtitle style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                        LAYANAN SARPRAS
                      </IonCardSubtitle>
                      <IonCardTitle style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e1b4b' }}>
                        Buat Pengaduan Baru
                      </IonCardTitle>
                    </div>
                  </div>
                </IonCardHeader>

                <IonCardContent style={{ padding: '16px' }}>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
                        Nama Pelapor
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e9d5ff', borderRadius: '10px', padding: '0 10px', background: '#faf5ff' }}>
                        <IonIcon icon={personOutline} style={{ color: '#7c3aed', marginRight: '8px' }} />
                        <IonInput
                          placeholder="Nama lengkap pelapor"
                          value={nama}
                          onIonInput={(e) => setNama(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
                        Lokasi / Ruangan
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e9d5ff', borderRadius: '10px', padding: '0 10px', background: '#faf5ff' }}>
                        <IonIcon icon={locationOutline} style={{ color: '#7c3aed', marginRight: '8px' }} />
                        <IonInput
                          placeholder="Contoh: Lab PPLG 2"
                          value={lokasi}
                          onIonInput={(e) => setLokasi(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
                        Kategori Fasilitas
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e9d5ff', borderRadius: '10px', padding: '0 10px', background: '#faf5ff' }}>
                        <IonIcon icon={listOutline} style={{ color: '#7c3aed', marginRight: '8px' }} />
                        <IonSelect
                          value={kategori}
                          placeholder="Pilih kategori"
                          onIonChange={(e) => setKategori(e.detail.value)}
                          style={{ width: '100%', fontSize: '0.88rem' }}
                        >
                          <IonSelectOption value="Fasilitas Kelas">Fasilitas Kelas</IonSelectOption>
                          <IonSelectOption value="Laboratorium">Laboratorium</IonSelectOption>
                          <IonSelectOption value="Lingkungan/Taman">Lingkungan/Taman</IonSelectOption>
                        </IonSelect>
                      </div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>
                        Deskripsi Kerusakan
                      </label>
                      <div style={{ border: '1.5px solid #e9d5ff', borderRadius: '10px', padding: '4px 10px', background: '#faf5ff' }}>
                        <IonTextarea
                          rows={3}
                          placeholder="Jelaskan detail kendala..."
                          value={deskripsi}
                          onIonInput={(e) => setDeskripsi(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <IonButton
                      expand="block"
                      type="submit"
                      disabled={submitting}
                      style={{
                        height: '44px',
                        margin: 0,
                        '--background': 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                        '--border-radius': '10px',
                        '--box-shadow': '0 4px 14px rgba(124, 58, 237, 0.3)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {submitting ? (
                        <IonSpinner name="crescent" color="light" />
                      ) : (
                        <>
                          <IonIcon slot="start" icon={sendOutline} /> Kirim Pengaduan
                        </>
                      )}
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* List Tiket */}
            <IonCol
              size="12"
              sizeLg="7"
              className={activeTab !== 'daftar' ? 'ion-hide-lg-down' : ''}
            >
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b' }}>
                      Daftar Pengaduan
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {filteredList.length} dari {totalLaporan} tiket
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      padding: '3px 8px',
                      borderRadius: '16px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#059669',
                    }}
                  >
                    <span className="bs-pulse-dot" style={{ backgroundColor: '#10b981' }} />
                    Live Sync
                  </div>
                </div>

                <IonSearchbar
                  value={searchQuery}
                  onIonInput={(e) => setSearchQuery(e.detail.value!)}
                  placeholder="Cari ruangan, pelapor, kendala..."
                  style={{
                    padding: 0,
                    '--background': '#ffffff',
                    '--border-radius': '10px',
                    '--box-shadow': '0 1px 4px rgba(124,58,237,0.06)',
                  } as React.CSSProperties}
                />

                <div className="category-filter-scroll">
                  {categories.map((cat) => (
                    <IonChip
                      key={cat}
                      className={selectedCategory === cat ? 'filter-chip-active' : 'filter-chip-inactive'}
                      onClick={() => setSelectedCategory(cat)}
                      style={{ cursor: 'pointer', fontSize: '0.75rem', height: '28px' }}
                    >
                      {cat === 'Semua' && <IonIcon icon={funnelOutline} style={{ marginRight: '3px' }} />}
                      {cat}
                    </IonChip>
                  ))}
                </div>
              </div>

              {filteredList.length === 0 ? (
                <div className="empty-state-box">
                  <IonIcon icon={businessOutline} style={{ fontSize: '2.5rem', opacity: 0.4, marginBottom: '6px' }} />
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Tidak ada pengaduan</p>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    Coba ganti filter atau pencarian
                  </span>
                </div>
              ) : (
                <IonList style={{ background: 'transparent', padding: 0 }}>
                  {filteredList.map((item) => (
                    <div
                      key={item.id}
                      className="ticket-card-hover"
                      onClick={() => router.push(`/detail/${item.id}`)}
                      style={{
                        background: '#ffffff',
                        padding: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(124, 58, 237, 0.03)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span
                              style={{
                                background: '#faf5ff',
                                color: '#7c3aed',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                padding: '2px 7px',
                                borderRadius: '6px',
                                border: '1px solid #ddd6fe',
                              }}
                            >
                              {item.kategori}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                              #{item.id}
                            </span>
                          </div>

                          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', fontWeight: 800, color: '#1e1b4b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.lokasi}
                          </h4>
                        </div>

                        {item.status === 'Selesai' ? (
                          <div className="bs-badge-completed" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                            <IonIcon icon={checkmarkCircleOutline} /> Selesai
                          </div>
                        ) : (
                          <div className="bs-badge-pending" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                            <span className="bs-pulse-dot" /> {item.status || 'Menunggu'}
                          </div>
                        )}
                      </div>

                      <p style={{ margin: '2px 0 10px 0', fontSize: '0.82rem', color: '#4b5563', lineHeight: '1.4' }}>
                        {item.deskripsi.length > 80 ? `${item.deskripsi.substring(0, 80)}...` : item.deskripsi}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid #f3e8ff',
                          paddingTop: '8px',
                          fontSize: '0.75rem',
                          color: '#6b7280',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                          <IonIcon icon={personOutline} style={{ color: '#9ca3af', flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Pelapor: <strong style={{ color: '#1f2937' }}>{item.nama_pelapor || item.nama}</strong>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <span>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : item.tanggal || '-'}
                          </span>
                          <IonIcon icon={chevronForwardOutline} style={{ color: '#9ca3af' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
