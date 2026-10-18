import React, { useContext, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  personOutline,
  calendarOutline,
  locationOutline,
  businessOutline,
  alertCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { LaporanContext } from '../context/LaporanContext';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const idLaporan = id || '';
  const { getLaporanById, ubahStatusLaporan } = useContext(LaporanContext);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('dark');

  const laporan = getLaporanById(idLaporan);
  const role = localStorage.getItem('role') || 'siswa';

  const handleSelesai = async () => {
    if (!idLaporan) return;
    setLoading(true);
    const success = await ubahStatusLaporan(idLaporan, 'Selesai');
    setLoading(false);

    if (success) {
      setToastMsg('Status pengaduan berhasil diubah menjadi Selesai!');
      setToastColor('success');
      setShowToast(true);
    } else {
      setToastMsg('Gagal memperbarui status! Periksa hak akses petugas.');
      setToastColor('danger');
      setShowToast(true);
    }
  };

  if (!laporan) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar style={{ '--background': 'linear-gradient(135deg, #09090b 0%, #1e1b4b 100%)', '--color': '#ffffff' } as React.CSSProperties}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="Kembali" color="light" />
            </IonButtons>
            <IonTitle style={{ fontWeight: 700 }}>Detail Pengaduan</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center" style={{ '--background': '#faf5ff' } as React.CSSProperties}>
          <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', background: '#ffffff', borderRadius: '18px', border: '1px solid #e9d5ff' }}>
            <IonIcon icon={alertCircleOutline} style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 6px 0', fontWeight: 800, color: '#1e1b4b' }}>Tiket Tidak Ditemukan</h3>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
              Data laporan ini tidak tersedia di basis data server.
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const isCompleted = laporan.status === 'Selesai';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'linear-gradient(135deg, #09090b 0%, #1e1b4b 60%, #4338ca 100%)', '--color': '#ffffff' } as React.CSSProperties}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
          </IonButtons>
          <IonTitle style={{ fontWeight: 800, letterSpacing: '-0.3px', fontSize: '1.05rem' }}>
            Tiket #{laporan.id}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#faf5ff' } as React.CSSProperties}>
        <div style={{ maxWidth: '640px', margin: '20px auto' }}>
          <IonCard
            style={{
              margin: 0,
              borderRadius: '22px',
              boxShadow: '0 10px 30px -5px rgba(124, 58, 237, 0.08)',
              border: '1px solid #e9d5ff',
              overflow: 'hidden',
              background: '#ffffff',
            }}
          >
            {/* Top Status Header */}
            <div
              style={{
                background: isCompleted
                  ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
                  : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                padding: '16px 20px',
                borderBottom: `1px solid ${isCompleted ? '#a7f3d0' : '#fde68a'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    background: '#ffffff',
                    color: '#7c3aed',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd6fe',
                  }}
                >
                  <IonIcon icon={businessOutline} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {laporan.kategori}
                </span>
              </div>

              {isCompleted ? (
                <div
                  style={{
                    background: '#059669',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <IonIcon icon={checkmarkCircleOutline} />
                  Selesai
                </div>
              ) : (
                <div
                  style={{
                    background: '#d97706',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span className="bs-pulse-dot" style={{ backgroundColor: '#ffffff' }} />
                  {laporan.status || 'Dalam Proses'}
                </div>
              )}
            </div>

            <IonCardContent style={{ padding: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <IonIcon icon={locationOutline} style={{ color: '#7c3aed', fontSize: '1.4rem' }} />
                <h1 style={{ margin: 0, fontWeight: 800, fontSize: '1.5rem', color: '#1e1b4b' }}>
                  {laporan.lokasi}
                </h1>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                  background: '#faf5ff',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: '1px solid #f3e8ff',
                  margin: '16px 0 20px 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#ede9fe',
                      color: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IonIcon icon={personOutline} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>PELAPOR</span>
                    <strong style={{ fontSize: '0.85rem', color: '#1f2937' }}>
                      {laporan.nama_pelapor || laporan.nama || 'Anonim'}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IonIcon icon={calendarOutline} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>TANGGAL MASUK</span>
                    <strong style={{ fontSize: '0.85rem', color: '#1f2937' }}>
                      {laporan.created_at
                        ? new Date(laporan.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : laporan.tanggal || '-'}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px',
                  }}
                >
                  Detail Masalah / Kerusakan
                </span>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e9d5ff',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    color: '#374151',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                  }}
                >
                  {laporan.deskripsi}
                </div>
              </div>

              {isCompleted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '14px',
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    color: '#166534',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '1.3rem' }} />
                  Penanganan Pengaduan Selesai
                </div>
              ) : role === 'petugas' ? (
                <div>
                  <IonButton
                    expand="block"
                    color="success"
                    onClick={handleSelesai}
                    disabled={loading}
                    style={{
                      height: '48px',
                      margin: 0,
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      letterSpacing: '0.5px',
                      '--border-radius': '12px',
                      '--box-shadow': '0 8px 18px rgba(5, 150, 105, 0.35)',
                    }}
                  >
                    {loading ? (
                      <IonSpinner name="crescent" color="light" />
                    ) : (
                      <>
                        <IonIcon slot="start" icon={checkmarkCircleOutline} style={{ fontSize: '1.25rem' }} />
                        TANDAI LAPORAN SELESAI
                      </>
                    )}
                  </IonButton>
                  <span style={{ display: 'block', textAlign: 'center', fontSize: '0.72rem', color: '#9ca3af', marginTop: '6px' }}>
                    *Status akan diperbarui di server backend.
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '12px 16px',
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    color: '#b45309',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <IonIcon icon={informationCircleOutline} style={{ fontSize: '1.1rem' }} />
                  Laporan sedang dalam antrean pengerjaan Tim Sarpras SMKN 1 Beringin.
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={3000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
