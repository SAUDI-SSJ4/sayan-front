import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import { RiTwitterXFill, RiEdit2Line, RiExternalLinkLine } from "react-icons/ri";
import { FaFacebook, FaSnapchatGhost, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInfoCircle } from "react-icons/fa";

// Assets
import defaultAcademyImage from "../../../assets/icons/Acadmy.png";
import defaultHeaderImage from "../../../assets/images/BannerBg.png";
import Insta from "../../../assets/icons/Insta.svg";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const profileInfo = useSelector((state) => state.academyUser.academy);
  const { user = {}, academy = {} } = profileInfo || {};
  const { 
    name: userName, 
    email: userEmail, 
    phone: userPhone, 
  } = user || {};

  const {
    name: academyName,
    email: academyEmail,
    facebook,
    twitter,
    instagram,
    snapchat,
    image: academyImage,
    cover,
    address,
    about,
    phone: academyPhone,
    support_phone: academySupportPhone,
  } = academy || {};

  // طباعة بيانات الأكاديمية للتحقق
  console.log("Academy Profile Data:", academy);

  // استخدام support_phone كأولوية، ثم phone كبديل
  const displayPhone = academySupportPhone || academyPhone;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // محاكاة تحميل
    return () => clearTimeout(timer);
  }, []);

  const extractUsername = (url) => {
    if (!url) return "";
    try {
      const path = new URL(url).pathname;
      return path.split("/").filter(Boolean).pop() || url;
    } catch (e) {
      // إذا لم يكن الرابط صحيحًا، حاول تقسيمه بالطريقة القديمة
      return url.split("/").pop() || url;
    }
  };
  
  const openSocialLink = (url) => {
    if (!url) return;
    let fullUrl = url;
    if (!url.match(/^https?:\/\//i)) {
      fullUrl = 'https://' + url;
    }
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };


  // Placeholder for loading state if not using Shimmer
  const LoadingPlaceholder = ({ width = '100%', height = '20px', borderRadius = '4px', marginBottom = '8px' }) => (
    <div 
      style={{
        width,
        height,
        backgroundColor: '#e0e0e0', // لون رمادي فاتح
        borderRadius,
        marginBottom
      }}
    />
  );

  // Style definitions (تم الإبقاء عليها لتحقيق التصميم)
  const styles = {
    container: {
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      padding: '20px',
      overflow: 'hidden',
    },
    coverContainer: {
      height: '240px',
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f0f0f0', // لون احتياطي أثناء التحميل
    },
    coverImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    coverOverlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
      height: '80px',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '16px',
      color: 'white',
      fontSize: '14px',
    },
    profileSection: {
      marginTop: '-50px', // تعديل طفيف للموضع
      position: 'relative',
      zIndex: '10',
      padding: '0 20px',
    },
    profileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: '24px',
    },
    profileImageContainer: {
      position: 'relative',
      marginRight: '16px', // RTL: marginLeft
    },
    profileImage: {
      width: '120px',
      height: '120px',
      borderRadius: '16px',
      objectFit: 'cover',
      border: '4px solid white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f8f9fa', // لون احتياطي
    },
    updateButton: {
      backgroundColor: '#0062FF',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 98, 255, 0.15)',
    },
    infoCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      padding: '24px',
      height: '100%',
    },
    cardHeader: {
      borderBottom: '1px solid #f0f2f5',
      paddingBottom: '16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2B3674',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    infoRow: {
      marginBottom: '16px',
    },
    infoLabel: {
      fontSize: '14px',
      color: '#7E8799',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    infoValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#2B3674',
      wordBreak: 'break-word',
    },
    socialCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      padding: '24px',
      height: '100%',
    },
    socialRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f0f2f5',
      cursor: 'pointer',
      borderRadius: '8px', // لإعطاء شكل عند الـ hover إذا أردت إضافته لاحقًا
    },
    socialInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    socialIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f6f8fb',
    },
    socialName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2B3674',
      margin: '0 0 4px 0',
    },
    socialUsername: {
      fontSize: '14px',
      color: '#7E8799',
    },
    emptyState: {
      padding: '30px',
      textAlign: 'center',
      color: '#7E8799',
    },
    nameText: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2B3674',
      margin: '8px 0 4px 0',
    },
    emailText: {
      fontSize: '16px',
      color: '#7E8799',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    badge: {
      backgroundColor: '#0062FF',
      color: 'white',
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '8px',
      marginLeft: '8px',
    },
    linkIcon: {
      cursor: 'pointer',
      color: '#0062FF',
      marginLeft: '8px',
    },
    infoGridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // تحسين بسيط للتجاوب
      gap: '16px',
    }
  };

  return (
    <div style={styles.container} className="mt-3">
        {/* Cover Image Section */}
        <div style={styles.coverContainer}>
          {isLoading ? (
            <LoadingPlaceholder height="240px" borderRadius="12px" marginBottom="0" />
          ) : (
            <>
              <img 
                src={cover || defaultHeaderImage}  
                alt="غلاف الأكاديمية"
                style={styles.coverImage}
              />

            </>
          )}
        </div>

        {/* Profile Header Section */}
        <div style={styles.profileSection}>
          <div style={styles.profileHeader}>
            <div className="d-flex align-items-center"> {/* تعديل بسيط للمحاذاة */}
              <div style={styles.profileImageContainer}>
                {isLoading ? (
                  <LoadingPlaceholder width="120px" height="120px" borderRadius="16px" marginBottom="0" />
                ) : (
                  <img 
                    src={academyImage || defaultAcademyImage} 
                    alt={academyName || "ملف الأكاديمية"}
                    style={styles.profileImage}
                  />
                )}
              </div>
              
              <div>
                {isLoading ? (
                  <div style={{ marginTop: '10px' }}> {/* تعديل ليتناسب مع إزالة marginTop من profileSection */}
                    <LoadingPlaceholder width="200px" height="28px" />
                    <LoadingPlaceholder width="160px" height="20px" />
                  </div>
                ) : (
                  <>
                    <h2 style={styles.nameText}>
                      {academyName || userName || "اسم الأكاديمية"}
                    </h2>
                    <p style={styles.emailText}>
                      <FaEnvelope size={16} style={{marginRight: '6px'}}/> {/* تعديل بسيط لإضافة أيقونة */}
                      {academyEmail || userEmail || "البريد الإلكتروني غير متوفر"}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <button 
              style={styles.updateButton}
              onClick={() => navigate("/academy/Profile/edit")}
            >
              <RiEdit2Line size={18} style={{marginRight: '8px'}}/> {/* تعديل بسيط لإضافة أيقونة */}
              تحديث المعلومات
            </button>
          </div>
        </div>

        {/* Information Cards Section */}
        <div className="row g-4 mt-1">
          {/* Personal Information Card */}
          <div className="col-lg-6 col-md-12">
            <div style={styles.infoCard}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  <FaInfoCircle size={18} color="#0062FF" style={{marginRight: '8px'}}/>
                  المعلومات الشخصية
                </h2>
              </div>
              
              {isLoading ? (
                <div style={{padding: '20px'}}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <LoadingPlaceholder width="120px" height="16px" />
                      <LoadingPlaceholder width="100%" height="20px" />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.infoGridContainer}>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>الاسم</div>
                    <div style={styles.infoValue}>
                      {academyName || userName || "غير متوفر"}
                    </div>
                  </div>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}><FaEnvelope size={14} style={{marginRight: '6px'}}/>البريد الالكتروني</div>
                    <div style={styles.infoValue}>
                      {userEmail || academyEmail || "غير متوفر"}
                    </div>
                  </div>
                  {(userPhone || displayPhone) && (
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}><FaPhone size={14} style={{marginRight: '6px'}}/>رقم الهاتف</div>
                      <div style={styles.infoValue}>{displayPhone || userPhone}</div>
                    </div>
                  )}
                  {address && (
                    <div style={styles.infoRow}>
                      <div style={styles.infoLabel}><FaMapMarkerAlt size={14} style={{marginRight: '6px'}}/>العنوان</div>
                      <div style={styles.infoValue}>{address}</div>
                    </div>
                  )}
                </div>
              )}
              
              {about && !isLoading && (
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f2f5' }}>
                  <div style={{...styles.infoLabel, marginBottom: '8px'}}>
                    حول الأكاديمية
                    <span style={styles.badge}>نبذة</span>
                  </div>
                  <div style={{...styles.infoValue, lineHeight: '1.7'}}>
                    {about}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media Card */}
          <div className="col-lg-6 col-md-12">
            <div style={styles.socialCard}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  <RiTwitterXFill size={18} color="#0062FF" style={{marginRight: '8px'}}/>
                  وسائل التواصل الاجتماعي
                </h2>
              </div>
              
              {isLoading ? (
                <div style={{padding: '20px'}}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <LoadingPlaceholder width="48px" height="48px" borderRadius="12px" marginBottom="0"/>
                      <div style={{ flex: 1 }}>
                        <LoadingPlaceholder width="100px" height="16px" />
                        <LoadingPlaceholder width="160px" height="14px" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {!twitter && !facebook && !instagram && !snapchat ? (
                    <div style={styles.emptyState}>
                      <p>لم يتم إضافة وسائل تواصل اجتماعي بعد.</p>
                      <button 
                        style={{...styles.updateButton, marginTop: '16px'}}
                        onClick={() => navigate("/academy/Profile/edit")}
                      >
                        <RiEdit2Line size={18} style={{marginRight: '8px'}}/>
                        إضافة الآن
                      </button>
                    </div>
                  ) : (
                    <div className="socialLinks">
                      {twitter && (
                        <div style={styles.socialRow} onClick={() => openSocialLink(twitter)}>
                          <div style={styles.socialInfo}>
                            <div style={styles.socialIcon}><RiTwitterXFill style={{ fontSize: "28px" }} /></div>
                            <div>
                              <h3 style={styles.socialName}>Twitter</h3>
                              <span style={styles.socialUsername}>@{extractUsername(twitter)}</span>
                            </div>
                          </div>
                          <RiExternalLinkLine style={styles.linkIcon} size={20} />
                        </div>
                      )}
                      {facebook && (
                        <div style={styles.socialRow} onClick={() => openSocialLink(facebook)}>
                          <div style={styles.socialInfo}>
                            <div style={styles.socialIcon}><FaFacebook style={{ fontSize: "28px", color: "#0E85FF" }} /></div>
                            <div>
                              <h3 style={styles.socialName}>Facebook</h3>
                              <span style={styles.socialUsername}>@{extractUsername(facebook)}</span>
                            </div>
                          </div>
                          <RiExternalLinkLine style={styles.linkIcon} size={20} />
                        </div>
                      )}
                      {snapchat && (
                        <div style={styles.socialRow} onClick={() => openSocialLink(snapchat)}>
                          <div style={styles.socialInfo}>
                            <div style={styles.socialIcon}><FaSnapchatGhost style={{ fontSize: "28px", color: "#F7CF00" }} /></div>
                            <div>
                              <h3 style={styles.socialName}>Snapchat</h3>
                              <span style={styles.socialUsername}>@{extractUsername(snapchat)}</span>
                            </div>
                          </div>
                          <RiExternalLinkLine style={styles.linkIcon} size={20} />
                        </div>
                      )}
                      {instagram && (
                        <div style={styles.socialRow} onClick={() => openSocialLink(instagram)}>
                          <div style={styles.socialInfo}>
                            <div style={styles.socialIcon}><img src={Insta} width={28} alt="Instagram" /></div>
                            <div>
                              <h3 style={styles.socialName}>Instagram</h3>
                              <span style={styles.socialUsername}>@{extractUsername(instagram)}</span>
                            </div>
                          </div>
                          <RiExternalLinkLine style={styles.linkIcon} size={20} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;