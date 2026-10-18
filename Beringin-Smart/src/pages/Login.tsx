import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonToast,
  IonSpinner,
  IonIcon,
  IonChip,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  sparklesOutline,
  arrowForwardOutline,
  personOutline,
  buildOutline,
  cubeOutline,
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await API.post('/login', { email, password });

      // Simpan token, role, dan user ke localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/home');
      window.location.reload();
    } catch (error: any) {
      console.error('Login Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Gagal terhubung ke API Server Laravel!');
      }
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'linear-gradient(150deg, #09090b 0%, #1e1b4b 50%, #4338ca 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: '420px', margin: '40px auto 20px auto' }}>
          {/* Logo & Branding */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                margin: '0 auto 14px auto',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.45)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <IonIcon icon={cubeOutline} style={{ fontSize: '2.2rem', color: '#ffffff' }} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: '30px',
                color: '#ddd6fe',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <IonIcon icon={sparklesOutline} /> SIPRA MOBILE • SMKN 1 BERINGIN
            </div>

            <h1 style={{ margin: '0 0 4px 0', fontSize: '1.85rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
              SIPRA Mobile
            </h1>
            <p style={{ margin: 0, color: '#c4b5fd', fontSize: '0.88rem' }}>
              Sistem Informasi Pengaduan Sarana & Prasarana
            </p>
          </div>

          {/* Login Card */}
          <IonCard
            style={{
              margin: 0,
              borderRadius: '22px',
              background: 'rgba(255, 255, 255, 0.98)',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
            }}
          >
            <IonCardContent style={{ padding: '26px 22px' }}>
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b' }}>
                  Masuk Akun
                </h2>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#6b7280' }}>
                  Silakan masukkan akun Anda untuk melanjutkan
                </p>
              </div>

              <form onSubmit={handleLogin}>
                {/* Email Input */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                    Email Sekolah
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#faf5ff',
                      border: '1.5px solid #e9d5ff',
                      borderRadius: '12px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={mailOutline} style={{ fontSize: '1.2rem', color: '#7c3aed', marginRight: '8px' }} />
                    <IonInput
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      placeholder="user@beringin.sch.id"
                      required
                      style={{ fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                    Kata Sandi
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#faf5ff',
                      border: '1.5px solid #e9d5ff',
                      borderRadius: '12px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={lockClosedOutline} style={{ fontSize: '1.2rem', color: '#7c3aed', marginRight: '8px' }} />
                    <IonInput
                      type="password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                      placeholder="••••••••"
                      required
                      style={{ fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <IonButton
                  expand="block"
                  type="submit"
                  disabled={loading}
                  style={{
                    height: '46px',
                    margin: 0,
                    '--background': 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                    '--border-radius': '12px',
                    '--box-shadow': '0 8px 18px rgba(124, 58, 237, 0.35)',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                  }}
                >
                  {loading ? (
                    <IonSpinner name="crescent" color="light" />
                  ) : (
                    <>
                      Masuk Aplikasi <IonIcon slot="end" icon={arrowForwardOutline} />
                    </>
                  )}
                </IonButton>
              </form>

              {/* Demo Quick Login */}
              <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #f3e8ff' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', fontWeight: 700, color: '#9333ea', textAlign: 'center' }}>
                  AKSES DEMO PENGUJIAN:
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <IonChip
                    outline
                    color="primary"
                    onClick={() => fillCredentials('siswa@beringin.sch.id')}
                    style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.76rem' }}
                  >
                    <IonIcon icon={personOutline} />
                    Clara (Siswa)
                  </IonChip>
                  <IonChip
                    outline
                    color="success"
                    onClick={() => fillCredentials('petugas@beringin.sch.id')}
                    style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.76rem' }}
                  >
                    <IonIcon icon={buildOutline} />
                    Pak Budi (Petugas)
                  </IonChip>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#c4b5fd' }}>
              SMK Negeri 1 Beringin • PPLG Program (SKKNI 282/2016)
            </span>
          </div>
        </div>

        <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage('')}
          message={errorMessage}
          duration={3500}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
