import React from 'react';

const Updates = () => {
  const monthlyUpdates = [
    {
      month: "أبريل 2025",
      version: "الإصدار 1.0",
      updates: [
        "إطلاق النسخة الأولى من منصة سيان التعليمية",
        "تصميم واجهة المستخدم الأساسية",
        "إضافة نظام التسجيل والدخول للمستخدمين",
        "إنشاء هيكل المنصة الأساسي",
        "إطلاق لوحة تحكم الأكاديميات"
      ],
      color: "orange"
    },
    {
      month: "مايو 2025",
      version: "الإصدار 1.1.1",
      updates: [
        "إصلاح مشاكل تشغيل الفيديوهات",
        "تحسين آليات رفع المواد التعليمية",
        "تحسين واجهات الأكاديميات التعليمية",
        "إضافة أدوات الذكاء الاصطناعي الأساسية",
        "تحسين تجربة المستخدم في التنقل"
      ],
      color: "blue"
    },
    {
      month: "يونيو 2025",
      version: "الإصدار 1.1.2",
      updates: [
        "تحسين الخطوط لزيادة قابلية القراءة",
        "تحسين سرعة تحميل الصفحات بنسبة 30%",
        "إصلاح مشكلة سلة المشتريات",
        "إمكانية إضافة مواد تعليمية مجانية للطالب",
        "تحسين تجربة المستخدم في نسخة الجوال"
      ],
      color: "green"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "border-blue-500 bg-blue-50 text-blue-700",
      green: "border-green-500 bg-green-50 text-green-700", 
      purple: "border-purple-500 bg-purple-50 text-purple-700",
      indigo: "border-indigo-500 bg-indigo-50 text-indigo-700",
      teal: "border-teal-500 bg-teal-50 text-teal-700",
      orange: "border-orange-500 bg-orange-50 text-orange-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            تحديثات المنصة
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تابع آخر التطويرات والتحسينات التي نقوم بها على منصة سيان لتوفير أفضل تجربة تعليمية
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600 font-medium">تحديث جديد</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">6</div>
            <div className="text-gray-600 font-medium">إصدار رئيسي</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">تحسين الأداء</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">دعم مستمر</div>
          </div>
        </div>

        {/* Monthly Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monthlyUpdates.map((monthData, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl border-l-4 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ borderLeftColor: getColorClasses(monthData.color).includes('blue') ? '#3B82F6' : 
                       getColorClasses(monthData.color).includes('green') ? '#10B981' :
                       getColorClasses(monthData.color).includes('purple') ? '#8B5CF6' :
                       getColorClasses(monthData.color).includes('indigo') ? '#6366F1' :
                       getColorClasses(monthData.color).includes('teal') ? '#14B8A6' : '#F59E0B' }}
            >
              {/* Header */}
              <div className={`p-6 ${getColorClasses(monthData.color)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{monthData.month}</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-30">
                    {monthData.version}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{monthData.updates.length} تحديث</span>
                </div>
              </div>

              {/* Updates List */}
              <div className="p-6">
                <ul className="space-y-3">
                  {monthData.updates.map((update, updateIndex) => (
                    <li key={updateIndex} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-400 mt-2 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                        {update}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>تم التطبيق</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-600 font-medium">مكتمل</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">لديك اقتراح أو فكرة؟</h2>
              <p className="text-lg opacity-90">
                نحن نقدر ملاحظاتكم ونسعى دائماً لتحسين المنصة بناءً على احتياجاتكم
              </p>
            </div>
            
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Email */}
              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">البريد الإلكتروني</h3>
                <a href="mailto:support@sayan.pro" className="text-white opacity-90 hover:opacity-100 transition-opacity">
                support@sayan.pro
                </a>
              </div>

              {/* Phone */}
              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">هاتف الدعم</h3>
                <a href="tel:0590406718" className="text-white opacity-90 hover:opacity-100 transition-opacity">
                0590406718
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">واتساب</h3>
                <a href="https://wa.me/0590406718" target="_blank" rel="noopener noreferrer" className="text-white opacity-90 hover:opacity-100 transition-opacity">
                0590406718
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>آخر تحديث: {new Date().toLocaleDateString('ar-SA')} | منصة سيان التعليمية</p>
        </div>
      </div>
    </div>
  );
};

export default Updates; 