import React, { useMemo } from "react"; // isLoading and isFetched are part of useQuery result
import { useQuery } from "@tanstack/react-query";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // أيقونة العنوان
import SchoolIcon from '@mui/icons-material/School'; // أيقونة لمستوى الدورة
import StarRateIcon from '@mui/icons-material/StarRate'; // أيقونة للتقييم
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // أيقونة للسعر
import PersonIcon from '@mui/icons-material/Person'; // أيقونة للمدرب
import BookIcon from '@mui/icons-material/Book'; // أيقونة لاسم الدورة
import InfoIcon from '@mui/icons-material/Info'; // أيقونة للتفاصيل
import FavoriteIcon from '@mui/icons-material/Favorite'; // أيقونة للمفضلة (إذا كانت status تعبر عن ذلك)
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CircularProgress, Typography, Grid, Paper, Chip, Avatar, Box, Alert } from '@mui/material'; // مكونات Material UI لتصميم أفضل

import { getPayments } from "../../../utils/apis/client"; // تأكد من صحة المسار
import { isNotEmpty } from "../../../utils/helpers"; // تأكد من صحة المسار

// دالة مساعدة لتنسيق المستوى
const formatLevel = (levelValue) => {
  const levels = {
    intermediate: "متوسط",
    advanced: "متقدم",
    beginner: "مبتدئ",
  };
  return levels[levelValue] || levelValue || "غير محدد";
};

const formatStatus = (status) => {
  switch (status) {
    case 'completed':
      return { text: 'مكتمل', color: '#4caf50', bgColor: '#e8f5e9' };
    case 'pending':
      return { text: 'قيد المعالجة', color: '#ff9800', bgColor: '#fff3e0' };
    case 'failed':
      return { text: 'فشل', color: '#f44336', bgColor: '#ffebee' };
    default:
      return { text: 'غير معروف', color: '#757575', bgColor: '#f5f5f5' };
  }
};
// مكون بطاقة المشتريات الفردية
const PurchaseCard = ({ payment }) => {
  const course = payment?.course || {}; // التعامل مع حالة عدم وجود course
  const trainerName = course?.trainer?.name || course?.trainer_id || "غير محدد";
  const status = formatStatus(payment?.status); // افتراض أن المدرب قد يكون كائنًا أو مجرد ID


  const isFavorite = payment?.status === 1 || payment?.status === true; // مثال

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '25px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', // لجعل جميع البطاقات بنفس الارتفاع في Grid
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          gap: 2 
        }}>
          <Avatar
            src={course?.image || "/placeholder-course.png"} // صورة احتياطية
            alt={course?.title || "صورة الدورة"}
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
            variant="rounded"
          />
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: '700',
              color: '#1a237e',
              fontSize: '1.2rem',
              lineHeight: 1.4
            }}
          >
            {course?.title || "اسم الدورة غير متوفر"}
          </Typography>
        </Box>

        <Chip
          label={status.text}
          size="small"
          sx={{ 
            mb: 2,
            borderRadius: '8px',
            
              color: status.color,
              background: status.bgColor,
            
            fontWeight: '500'
          }}
        />

        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3,
            color: '#546e7a',
            lineHeight: 1.6,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1
          }}
        >
          <InfoIcon sx={{ color: '#0288d1', mt: 0.5 }} />
          {course?.short_content || "لا يوجد وصف مختصر متاح."}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Chip
              icon={<SchoolIcon />}
              label={`المستوى: ${formatLevel(course?.level)}`}
              sx={{
                width: '100%',
                background: '#e3f2fd',
                color: '#1565c0',
                '& .MuiChip-icon': { color: '#1565c0' }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              icon={<StarRateIcon />}
              label={`التقييم: ${course?.stars || 0} ⭐`}
              sx={{
                width: '100%',
                background: '#fff3e0',
                color: '#e65100',
                '& .MuiChip-icon': { color: '#e65100' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: '#e8eaf6' }}><PersonIcon /></Avatar>}
              label={`المدرب: ${trainerName}`}
              sx={{
                width: '100%',
                background: '#f5f5f5',
                color: '#37474f',
                fontWeight: '500',
                '& .MuiChip-avatar': { bgcolor: '#e8eaf6' }
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 3,
        pt: 2,
        borderTop: '2px solid #f5f5f5'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: '700',
            display: 'flex',
            color: '#0062ff',
            alignItems: 'center',
            gap: 1
          }}
        >
          <AccountBalanceWalletIcon />
          {payment?.price ? `${payment.price.toLocaleString()} ر.س` : "السعر غير محدد"}
        </Typography>
      </Box>
    </Paper>
  );
};

const Purchases = () => {
  const { data: paymentsData, isLoading, isError, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    retry: 1, // محاولة واحدة عند الخطأ
    refetchOnWindowFocus: false,
    // refetchOnMount: false, // عادةً ما يكون true هو الافتراضي وهو جيد
    // cacheTime: 1000 * 60 * 5, // 5 دقائق cache time
    select: (data) => { // تحويل البيانات هنا إذا لزم الأمر
        if (data && Array.isArray(data.data)) { // افترض أن البيانات الفعلية داخل data.data
            return data.data;
        }
        if (Array.isArray(data)) { // إذا كانت البيانات هي المصفوفة مباشرة
            return data;
        }
        return []; // قيمة افتراضية آمنة
    }
  });
  
  const payments = paymentsData || []; // ضمان أن payments دائمًا مصفوفة

  // Header Styles
  const headerStyles = {
    container: {
      backgroundColor: '#fff',
      padding: '20px 25px',
      marginBottom: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    iconWrapper: {
      backgroundColor: 'rgba(163, 174, 208, 0.1)', // لون خلفية خفيف للأيقونة
      padding: '10px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: '1.5rem', // أكبر قليلاً
      fontWeight: '600', // أثقل
      color: '#2B3674', // لون داكن
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>جاري تحميل المشتريات...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Alert severity="error" sx={{width: '100%', maxWidth: '600px'}}>
          حدث خطأ أثناء تحميل المشتريات: {error?.message || "خطأ غير معروف"}
        </Alert>
      </Box>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7fe', minHeight: '100vh' }}> {/* خلفية للصفحة */}
      {/* Header */}
      <div style={headerStyles.container}>
        <div style={headerStyles.titleContainer}>
          <div style={headerStyles.iconWrapper}>
            <PeopleAltIcon sx={{ color: "#7E8799", fontSize: '1.8rem' }} />
          </div>
          <Typography variant="h1" style={headerStyles.titleText}>المشتريات</Typography>
        </div>
        {/* يمكنك إضافة أزرار أو فلاتر هنا إذا أردت */}
      </div>

      {/* Purchases Grid */}
      {isNotEmpty(payments) ? (
        <Grid container spacing={3}>
          {payments.map((payment, index) => (
            // استخدام payment.id أو index كمفتاح فريد
            <Grid item xs={12} sm={6} md={4} key={payment.id || `payment-${index}`}>
              <PurchaseCard payment={payment} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 5, p:3, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <BookIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>لا توجد مشتريات لعرضها حاليًا.</Typography>
          <Typography variant="body1" sx={{ color: 'text.disabled', mt:1 }}>ابدأ بتصفح الدورات وإضافتها إلى مشترياتك!</Typography>
        </Box>
      )}
    </div>
  );
};

export default Purchases;