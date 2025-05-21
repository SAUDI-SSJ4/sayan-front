import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GoArrowUpRight } from "react-icons/go";
import { MdFavorite } from "react-icons/md";
import { useToggleMutation } from "../../../../services/mutation";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CardMedia,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import StarRateIcon from "@mui/icons-material/StarRate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";

// مساعد
const handleLevels = (levelValue) => {
  if (!levelValue) return "غير محدد";
  const levels = { intermediate: "متوسط", advanced: "متقدم", beginner: "مبتدئ" };
  return levels[String(levelValue).toLowerCase()] || levelValue;
};
const handleRateStare = (stars) => {
  if (typeof stars !== "number" || stars < 0) return "غير مقيم";
  return "⭐".repeat(Math.floor(stars)) + (stars % 1 >= 0.5 ? "✨" : "");
};

// ====== بطاقة احترافية جدًا ======
const FavoriteCard = ({ course, onRemove }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(130deg,#ffffff 85%,#f1f7fe 100%)",
        borderRadius: "18px",
        minHeight: 230,
        boxShadow: "0 4px 22px 0 rgba(100,120,180,0.12), 0 1px 1.5px 0 rgba(80,120,180,0.04) inset",
        p: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-start",
        transition: "box-shadow .17s, transform .17s",
        overflow: "hidden",
        ':hover': {
          boxShadow: "0 8px 34px 0 rgba(32,56,110,0.18), 0 1.6px 1.7px 0 rgba(60,120,180,0.050) inset",
          transform: "translateY(-3px) scale(1.012)",
        },
      }}
    >
      <Box sx={{
        width: "100%",
        position: "relative",
      }}>
        <CardMedia
          component="img"
          image={course.image || "/images/placeholder-course.png"}
          alt={course.title}
          sx={{
            width: "100%", height: 250, objectFit: "cover",
            borderTopLeftRadius: "18px", borderTopRightRadius: "18px",
            borderBottom: "1px solid #e6eaff",
            background: "#f2f7fd"
          }}
        />
        {/* أيقونة تخصص (أفاتار دائري شفاف) */}
        <Avatar
          sx={{
            position: "absolute", top: 11, right: 13, zIndex: 5,
            bgcolor: "primary.main", color: "#fff",
            width: 31, height: 31, fontSize: 17,
            opacity: 0.81, boxShadow: 2,
            border: "2px solid #fff"
          }}
        >
          <SchoolIcon fontSize="inherit" />
        </Avatar>
      </Box>
      <CardContent
        sx={{
          flex: "1 0 auto", p: "13px 12px 11px 12px",
          display: "flex", flexDirection: "column", gap: 0.7,
        }}>
        {/* العنوان */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="primary.main"
          sx={{
            fontSize: "1.05rem",
            mb: "2px",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: 27,
            letterSpacing: 0.1,
            display: "block"
          }}
          title={course.title}
        >
          {course.title || "اسم الدورة غير متوفر"}
        </Typography>
        {/* الشيبس (الفروقات صغيرة) */}
        <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap" sx={{
          mb: 1, mt: 0,
          "& .MuiChip-root": { fontSize: "0.76rem", height: 24, borderRadius: 1.6, px: 1, fontWeight: 500 }
        }}>
          <Chip
            icon={<SchoolIcon sx={{ fontSize: 16 }} />}
            label={handleLevels(course.level)}
            size="small"
            sx={{ bgcolor: "#e8f1ff", color: "primary.main" }}
          />
          <Chip
            icon={<StarRateIcon sx={{ fontSize: 16, color: "#FFC107" }} />}
            label={handleRateStare(course.stars)}
            size="small"
            sx={{ bgcolor: "#fff8e1", color: "#edbc31" }}
          />
        </Stack>
        <Divider sx={{ borderColor: "#f3f6fa", mb: 1, mt: "-3px" }} />
        {/* السعر والأزرار */}
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          pt: 0.2
        }}>
          <Typography
            variant="subtitle2"
            sx={{
              display: "flex", alignItems: "center", fontWeight: 700, fontSize: 15,
              color: "primary.main", letterSpacing: ".3px"
            }}
          >
            <AttachMoneyIcon sx={{ fontSize: 19, color: "primary.main", ml: 0.3 }} />
            {course.price ? `${course.price.toLocaleString()} ر.س` : "مجاني"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <Tooltip title="عرض تفاصيل الدورة" arrow>
              <IconButton component={Link} to={`/SingleCourse/${course.id}`}
                size="small"
                sx={{
                  bgcolor: "#eaf2ff", color: "primary.main", mx: 0, p: "4.5px",
                  transition: "0.16s", '&:hover': { bgcolor: "#d0e5fd" }
                }}>
                <GoArrowUpRight size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="إزالة من المفضلة" arrow>
              <IconButton onClick={onRemove}
                size="small"
                sx={{
                  bgcolor: "#fbeeef", color: "error.main", p: "4.5px",
                  transition: "0.18s", '&:hover': { bgcolor: "#fee1e8" }
                }}>
                <MdFavorite size={17} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// ===== القائمة كشبكة احترافية =====
const FavoritesGrid = ({ setData = [], isLoading }) => {
  const { mutate: toggleFavorite } = useToggleMutation();

  const handleRemove = async (courseId) => {
    // إضافة رسالة تأكيد قبل الحذف
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد حذف هذه الدورة من المفضلة؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذفها',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        toggleFavorite({ course_id: courseId });
        // إظهار رسالة نجاح بعد الحذف
        Swal.fire(
          'تم الحذف!',
          'تم حذف الدورة من المفضلة بنجاح.',
          'success'
        );
      }
    });
  };

  if (isLoading)
    return (
      <Box sx={{ width: "100%", minHeight: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="primary" fontWeight={600}>جاري تحميل المفضلة...</Typography>
      </Box>
    );
  if (!setData.length)
    return (
      <Box sx={{ width: "100%", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary" fontWeight={500}>قائمة المفضلة فارغة حاليًا.</Typography>
      </Box>
    );

  return (
    <Box sx={{
      width: "100%",
      background: "linear-gradient(110deg, #f8fafd 80%, #f1f7fe 100%)",
      borderRadius: "20px",
      boxShadow: "0 2px 24px 0 rgba(25,56,123,0.07)",
      px: { xs: 1, md: 2 }, py: { xs: 2.5, md: 4 },
      mt: 2,
    }}>
      <Grid container spacing={{ xs: 2, sm: 2.7 }} >
        {setData.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <FavoriteCard course={course} onRemove={() => handleRemove(course.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesGrid;