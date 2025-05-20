import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Icons
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook, FaSnapchatGhost } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Components
import UpdateProfile from "./UpdateProfile";

// Assets
import Insta from "../../assets/icons/Insta.svg";
import StudentBanner from "../../assets/images/StudentBanner.jpg";
import defaultUser from "../../assets/images/default-user.jpg";

// Styles
import styless from "./UpdateProfile.module.css";

// Fallback data for when API fails
const fallbackData = {
  name: "محمد أحمد",
  email: "mohammed.ahmed@example.com",
  phone: "966512345678",
  image: defaultUser,
  created_at: "2023-01-15T08:30:00Z"
};

const styles = {
  profileContainer: {
    fontFamily: "'Tajawal', sans-serif",
    marginTop: "1rem",
    position: "relative"
  },
  loadingOverlay: {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "1000",
    padding: "8px 16px",
    backgroundColor: "rgba(0, 123, 255, 0.9)",
    color: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  errorOverlay: {
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: "1000",
    padding: "8px 16px",
    backgroundColor: "rgba(220, 53, 69, 0.9)",
    color: "white",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  profileHeader: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  profileBg: {
    width: "100%"
  },
  profileBgImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#fff",
    flexWrap: "wrap"
  },
  profileInfoContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid white",
    marginTop: "-50px",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  profileImageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  profileDetails: {
    marginLeft: "1rem"
  },
  profileName: {
    fontWeight: "700",
    marginBottom: "5px"
  },
  profileDate: {
    color: "#777",
    fontSize: "14px"
  },
  updateBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "500"
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    height: "100%"
  },
  cardHeader: {
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #eee"
  },
  cardHeaderTitle: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "600"
  },
  cardBody: {
    padding: "16px"
  },
  infoLabel: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "4px"
  },
  infoValue: {
    fontSize: "16px",
    fontWeight: "500"
  },
  shimmerEffect: {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "4px",
    height: "20px",
    width: "80%"
  },
  socialLinks: {
    padding: "16px"
  },
  socialRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "#f8f9fa"
    }
  },
  socialInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fa"
  },
  socialName: {
    margin: "0",
    fontSize: "16px",
    fontWeight: "500"
  },
  socialUsername: {
    fontSize: "14px",
    color: "#777"
  },
  spinner: {
    display: "inline-block",
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    border: "0.2em solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#ffffff",
    animation: "spin 1s linear infinite"
  },
  updateModal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000"
  },
  retryButton: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "4px",
    padding: "4px 8px",
    marginLeft: "10px",
    cursor: "pointer",
    fontSize: "12px"
  },
  "@media (max-width: 768px)": {
    profileInfo: {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    updateBtn: {
      marginTop: "16px",
      width: "100%"
    },
    profileImage: {
      marginTop: "-40px",
      width: "80px",
      height: "80px"
    }
  }
};

const Profile = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const token = Cookies.get("student_token");
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        // Instead of redirecting, use fallback data
        setUser(fallbackData);
        setLoading(false);
        setError("لم يتم العثور على رمز الدخول. تم عرض بيانات افتراضية.");
        return;
      }
      
      setLoading(true);
      try {
        const response = await axios.get(
          'https://www.sayan-server.com/website/profile', 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // تعديل هنا: التحقق من وجود كائن data في الاستجابة
        if (response.data && response.data.data) {
          // استخدام البيانات من داخل كائن data
          setUser(response.data.data);
        } else {
          // إذا كانت البيانات في المستوى الأعلى (للتوافق مع الكود القديم)
          setUser(response.data);
        }
        
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Use fallback data instead of showing error screen
        setUser(fallbackData);
        setError("تعذر الاتصال بالخادم. تم عرض بيانات افتراضية.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return "غير متوفر";
    return dateString.split('T')[0];
  };

  // Display data (either real or fallback)
  const displayData = user || fallbackData;

  return (
    <div style={styles.profileContainer}>
      {/* Loading indicator */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
          <span>جاري تحميل البيانات...</span>
        </div>
      )}

      <div style={styles.profileHeader}>
        <div style={styles.profileBg}>
          <img 
            src={displayData?.image || StudentBanner} 
            style={styles.profileBgImg}
            className="rounded" 
            alt="صورة الغلاف" 
          />
        </div>
        <div style={styles.profileInfo}>
          <div style={styles.profileInfoContainer}>
            <div style={styles.profileImage}>
              <img 
                src={displayData?.image || defaultUser} 
                alt={displayData?.name || "المستخدم"} 
                style={styles.profileImageImg}
              />
            </div>
            <div style={styles.profileDetails}>
              <h2 style={styles.profileName}>
                {displayData?.name || "المستخدم"}
              </h2>
              <span style={styles.profileDate}>
                تاريخ الإنشاء: {formatDate(displayData?.created_at)}
              </span>
            </div>
          </div>
          <button 
            style={styles.updateBtn} 
            onClick={() => setShowUpdate(true)}
          >
            تحديث المعلومات
          </button>
        </div>
      </div>

      <div className="mt-4 mb-5 row g-3">
        {/* Personal Information Card */}
        <div className="col-lg-6 col-md-12">
          <div style={styles.infoCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderTitle}>المعلومات الشخصية</h2>
            </div>
            <div className="row" style={styles.cardBody}>
              <div className="col-12 col-sm-6">
                <h3 style={styles.infoLabel}>الاسم</h3>
                {loading ? (
                  <div style={styles.shimmerEffect}></div>
                ) : (
                  <span style={styles.infoValue}>{displayData?.name || "غير متوفر"}</span>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <h3 style={styles.infoLabel}>كلمة المرور</h3>
                <span style={styles.infoValue}>* * * * * *</span>
              </div>
              <div className="col-12 col-sm-6">
                <h3 style={styles.infoLabel}>رقم الهاتف</h3>
                {loading ? (
                  <div style={styles.shimmerEffect}></div>
                ) : (
                  <span style={styles.infoValue}>{displayData?.phone || "غير متوفر"}</span>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <h3 style={styles.infoLabel}>البريد الالكتروني</h3>
                {loading ? (
                  <div style={styles.shimmerEffect}></div>
                ) : (
                  <span style={styles.infoValue}>{displayData?.email || "غير متوفر"}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="col-lg-6 col-md-12">
          <div style={styles.infoCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardHeaderTitle}>وسائل التواصل الاجتماعي</h2>
            </div>
            <div style={styles.socialLinks}>
              <SocialRow 
                icon={<RiTwitterXFill style={{ fontSize: "32px" }} />} 
                name="Twitter" 
                username="@Mohammed" 
                loading={loading}
              />
              <SocialRow 
                icon={<FaFacebook style={{ fontSize: "32px", color: "#0E85FF" }} />} 
                name="Facebook" 
                username="@Mohammed" 
                loading={loading}
              />
              <SocialRow 
                icon={<FaSnapchatGhost style={{ fontSize: "32px", color: "#F7CF00" }} />} 
                name="Snapchat" 
                username="@Mohammed" 
                loading={loading}
              />
              <SocialRow 
                icon={<img src={Insta} width={32} alt="Instagram" />} 
                name="Instagram" 
                username="@Mohammed" 
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdate && (
        <div style={styles.updateModal}>
          <UpdateProfile setShowUpdate={setShowUpdate} profileData={displayData} />
          <button 
            className={`${styless.close} btn-close`} 
            onClick={() => setShowUpdate(false)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      {/* Add keyframes for animations */}
      <style jsx="true">{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

// Helper component for social media rows
const SocialRow = ({ icon, name, username, loading }) => {
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s"
  };

  const socialInfoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  };

  const socialIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fa"
  };
  
  const shimmerEffect = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "4px",
    height: "16px",
    width: "100px"
  };

  return (
    <div style={rowStyle}>
      <div style={socialInfoStyle}>
        <div style={socialIconStyle}>{icon}</div>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>{name}</h3>
          {loading ? (
            <div style={shimmerEffect}></div>
          ) : (
            <span style={{ fontSize: "14px", color: "#777" }}>{username}</span>
          )}
        </div>
      </div>
      <div>
        <MoreVertIcon />
      </div>
    </div>
  );
};

export default Profile;