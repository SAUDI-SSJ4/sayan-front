# دليل الخطوط - Fairuz

## خط Fairuz الرسمي للمنصة

تم تكوين المنصة لاستخدام خط **Fairuz** المجاني كخط رسمي. هذا الخط يوفر:

### المميزات:
- ✅ دعم كامل للغة العربية
- ✅ أنماط متعددة (Sans, Serif, Round)
- ✅ أوزان مختلفة (Light, Regular, Medium, Bold)
- ✅ تصميم حديث وأنيق
- ✅ قابلية قراءة ممتازة

### الخطوط المتاحة:
1. **Fairuz** - الخط الأساسي المجاني
2. **Amiri** - خط احتياطي كلاسيكي
3. **Noto Kufi Arabic** - خط احتياطي موثوق

### طريقة التحميل والتثبيت:

#### الطريقة الأولى: تحميل خط Fairuz
1. البحث عن خط Fairuz في مشاريع الخطوط العربية المفتوحة
2. تحميل ملفات الخط (.ttf, .woff, .woff2)
3. وضع ملفات الخط في هذا المجلد (`src/assets/fonts/`)
4. إلغاء التعليق في `font-face.css` وتحديث import في `index.css`

#### الطريقة الثانية: استخدام خط احتياطي
```css
/* إذا لم يكن Fairuz متاحاً، سيستخدم النظام Amiri ثم Noto Kufi Arabic */
font-family: 'Fairuz', 'Amiri', 'Noto Kufi Arabic', sans-serif;
```

### الاستخدام في الكود:

#### مع Tailwind CSS:
```html
<h1 class="font-fairuz">عنوان بخط فيروز</h1>
<p class="font-fairuz-sans">نص عادي</p>
<h2 class="font-shamel">عنوان (نفس font-fairuz)</h2>
<span class="font-fairuz-bold">نص عريض</span>
```

#### مع CSS العادي:
```css
.custom-text {
  font-family: var(--font-primary);
  /* سيطبق: 'Fairuz', 'Amiri', 'Noto Kufi Arabic', sans-serif */
}
```

### الفئات المتاحة:
- `font-fairuz` - خط فيروز الأساسي
- `font-shamel` - مطابق لـ font-fairuz
- `font-primary` - الخط الأساسي للمنصة
- `font-fairuz-light` - الوزن الخفيف (300)
- `font-fairuz-medium` - الوزن المتوسط (500)
- `font-fairuz-bold` - الوزن العريض (700)

### ملاحظات مهمة:
- خط Fairuz مطبق افتراضياً على كامل المنصة
- ترتيب الخطوط الاحتياطية: Fairuz → Amiri → Noto Kufi Arabic
- جميع الخطوط مجانية بالكامل
- يدعم RTL وجميع الأحرف العربية
- يمكن استخدام الفئات المخصصة لتطبيق أنماط محددة

---

**مصادر الخطوط المجانية:**
- **Fairuz**: مشاريع الخطوط العربية المفتوحة المصدر
- **Amiri**: https://fonts.google.com/specimen/Amiri
- **Noto Kufi Arabic**: https://fonts.google.com/noto/specimen/Noto+Kufi+Arabic 