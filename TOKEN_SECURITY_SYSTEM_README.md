# نظام أمان التوكن (Token Security System)

## نظرة عامة

تم إنشاء نظام شامل للتحقق من صلاحية التوكن وحماية التطبيق من الوصول غير المصرح به. هذا النظام يضمن:

- **إخراج تلقائي** عند انتهاء صلاحية التوكن
- **التحقق الدوري** من صلاحية التوكن
- **حماية شاملة** لجميع طلبات API
- **إدارة مركزية** للمصادقة

## الملفات المُضافة

### 1. `src/utils/auth.js`
**الغرض**: مجموعة أدوات للتعامل مع المصادقة والتوكن

**الوظائف الرئيسية**:
```javascript
// الحصول على التوكن
const token = AuthUtils.getToken();

// التحقق من وجود التوكن
const hasToken = AuthUtils.hasToken();

// التحقق من صلاحية التوكن مع الخادم
const isValid = await AuthUtils.validateToken();

// إخراج المستخدم وتنظيف الجلسة
AuthUtils.logout();

// التحقق الشامل من انتهاء صلاحية التوكن
const isExpired = await AuthUtils.checkTokenExpiration();
```

**apiCall Function**:
```javascript
// استخدام apiCall بدلاً من fetch
const response = await apiCall(url, options);
```

### 2. `src/hooks/useAuth.js`
**الغرض**: React Hook لإدارة حالة المصادقة

**الاستخدام**:
```javascript
import useAuth from '../hooks/useAuth';

const { isAuthenticated, isLoading, logout } = useAuth();
```

**المميزات**:
- ✅ التحقق الدوري كل 5 دقائق
- ✅ التحقق عند العودة للتطبيق
- ✅ مراقبة تغييرات التوكن في علامات تبويب أخرى
- ✅ تنظيف تلقائي للحالة

### 3. `src/components/AuthGuard.jsx`
**الغرض**: مكون لحماية الصفحات من الوصول غير المصرح

**الاستخدام**:
```javascript
import AuthGuard from '../components/AuthGuard';

function ProtectedPage() {
  return (
    <AuthGuard>
      <YourPageContent />
    </AuthGuard>
  );
}
```

### 4. `src/contexts/AuthContext.jsx`
**الغرض**: Context للإدارة المركزية للمصادقة

**الاستخدام**:
```javascript
// تطبيق AuthProvider في App.js
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

// استخدام withAuth HOC لحماية المكونات
import { withAuth } from './contexts/AuthContext';

const ProtectedComponent = withAuth(YourComponent);
```

## التطبيق على الملفات الموجودة

### تم تحديث `CourseDetails.jsx`:
- ✅ استبدال `fetch` بـ `apiCall`
- ✅ إزالة التحقق اليدوي من التوكن
- ✅ معالجة تلقائية لانتهاء صلاحية التوكن

### تم تحديث `CustomVideoPlayer/index.jsx`:
- ✅ استبدال `fetch` بـ `apiCall`
- ✅ تحسين معالجة أخطاء التوكن

## كيفية تطبيق النظام على صفحات أخرى

### الطريقة الأولى: استخدام AuthGuard
```javascript
import AuthGuard from '../components/AuthGuard';

function MyProtectedPage() {
  return (
    <AuthGuard>
      <div>محتوى محمي</div>
    </AuthGuard>
  );
}
```

### الطريقة الثانية: استخدام withAuth HOC
```javascript
import { withAuth } from '../contexts/AuthContext';

function MyPage() {
  return <div>محتوى محمي</div>;
}

export default withAuth(MyPage);
```

### الطريقة الثالثة: استخدام useAuth Hook
```javascript
import useAuth from '../hooks/useAuth';

function MyPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>جاري التحميل...</div>;
  if (!isAuthenticated) return <div>غير مصرح</div>;

  return <div>محتوى محمي</div>;
}
```

## تحديث طلبات API

**قبل التحديث**:
```javascript
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

**بعد التحديث**:
```javascript
import { apiCall } from '../utils/auth';

const response = await apiCall(url, {
  method: 'GET'
});
```

## المميزات الأمنية

### 1. **التحقق التلقائي**
- يتم التحقق من التوكن كل 5 دقائق
- التحقق عند العودة للتطبيق (focus events)
- التحقق مع كل طلب API

### 2. **الإخراج التلقائي**
- إخراج فوري عند انتهاء صلاحية التوكن
- تنظيف شامل للبيانات المحفوظة
- إعادة توجيه لصفحة تسجيل الدخول

### 3. **المزامنة بين التبويبات**
- إذا تم تسجيل الخروج في تبويب، يتم الخروج من جميع التبويبات
- مراقبة تغييرات localStorage

### 4. **معالجة الأخطاء**
- معالجة تلقائية لأخطاء 401 و 403
- رسائل خطأ واضحة باللغة العربية
- إعادة محاولة ذكية للطلبات الفاشلة

## التكوين والتخصيص

### تغيير مدة التحقق الدوري
```javascript
// في useAuth.js - السطر 43
const interval = setInterval(async () => {
  // ...
}, 3 * 60 * 1000); // تغيير من 5 دقائق إلى 3 دقائق
```

### تخصيص رسائل الخطأ
```javascript
// في auth.js - دالة logout
logout: (redirectPath = '/login', customMessage = null) => {
  AuthUtils.clearSession();
  const message = customMessage || 'انتهت صلاحية جلسة العمل. الرجاء تسجيل الدخول مرة أخرى.';
  toast.error(message);
  window.location.href = redirectPath;
}
```

### إضافة endpoint مخصص للتحقق من التوكن
```javascript
// في auth.js - دالة validateToken
validateToken: async () => {
  // يمكن تغيير endpoint التحقق هنا
  const response = await fetch(`${BASE_URL}/website/auth/validate-token`, {
    // ...
  });
}
```

## الاختبار والتحقق

### للتأكد من عمل النظام:

1. **اختبار انتهاء التوكن**:
   - احذف التوكن من cookies يدوياً
   - انتظر 5 دقائق للتحقق الدوري
   - يجب أن يتم الخروج تلقائياً

2. **اختبار طلبات API**:
   - استخدم أدوات المطور لمراقبة الطلبات
   - تأكد من إضافة Authorization header تلقائياً

3. **اختبار المزامنة بين التبويبات**:
   - افتح التطبيق في تبويبين
   - سجل الخروج من تبويب واحد
   - يجب أن يتم الخروج من التبويب الآخر تلقائياً

## الأخطاء الشائعة وحلولها

### 1. خطأ "useAuthContext must be used within an AuthProvider"
**الحل**: تأكد من تطبيق AuthProvider في أعلى مستوى في التطبيق

### 2. التوكن لا يتم التحقق منه
**الحل**: تأكد من أن endpoint `/website/auth/validate-token` موجود في الباك إند

### 3. الصفحة تظهر رسالة تحميل مستمرة
**الحل**: تحقق من وجود أخطاء في console وتأكد من صحة بيانات الاستجابة

## الصيانة والتطوير المستقبلي

### إضافة مميزات جديدة:
- **تجديد التوكن التلقائي**: يمكن إضافة آلية لتجديد التوكن قبل انتهاء صلاحيته
- **إشعارات التحذير**: إشعار المستخدم قبل انتهاء صلاحية التوكن
- **حفظ حالة الصفحة**: حفظ موقع المستخدم الحالي للعودة إليه بعد تسجيل الدخول

### المراقبة والتتبع:
- إضافة تتبع لأحداث انتهاء صلاحية التوكن
- مراقبة أداء طلبات API
- إحصائيات استخدام النظام

---

هذا النظام يوفر **حماية شاملة وموثوقة** ضد الوصول غير المصرح به ويضمن **تجربة مستخدم سلسة** مع **أمان عالي**. 