// تحسين استيرادات MUI لتقليل حجم الحزمة
// استخدم هذا الملف لاستيراد أيقونات MUI بشكل محسن

// الأيقونات الأكثر استخداماً
export { default as ExpandMoreIcon } from '@mui/icons-material/ExpandMore';
export { default as CloseIcon } from '@mui/icons-material/Close';
export { default as MenuIcon } from '@mui/icons-material/Menu';
export { default as SearchIcon } from '@mui/icons-material/Search';
export { default as FilterListIcon } from '@mui/icons-material/FilterList';
export { default as VisibilityIcon } from '@mui/icons-material/Visibility';
export { default as VisibilityOffIcon } from '@mui/icons-material/VisibilityOff';
export { default as ArrowBackIcon } from '@mui/icons-material/ArrowBack';
export { default as ArrowBackIosIcon } from '@mui/icons-material/ArrowBackIos';
export { default as ArrowForwardIcon } from '@mui/icons-material/ArrowForward';
export { default as AddCircleIcon } from '@mui/icons-material/AddCircle';
export { default as PersonIcon } from '@mui/icons-material/Person';
export { default as PeopleAltIcon } from '@mui/icons-material/PeopleAlt';

// مكونات MUI الأساسية
export { 
  Skeleton,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  Typography
} from '@mui/material';

// Material-UI Tree Shaking Optimization
// استخدم دائماً الاستيرادات المحددة بدلاً من الاستيرادات العامة:
// ❌ import { Button } from '@mui/material'
// ✅ import Button from '@mui/material/Button' 