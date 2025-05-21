import React, { Fragment, useEffect, useState, useMemo, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// Offcanvas (إذا كنت ستستخدم react-bootstrap أو بديل MUI)
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { Drawer } from "@mui/material"; // مثال لبديل MUI
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "rsuite"; // أو استخدم Avatar من MUI إذا كنت تفضل توحيد المكتبات
import classes from "./NavBar.module.scss"; // افترض أن هذا الملف يحتوي على الأنماط الزجاجية الثابتة
import logoImage from "../../../assets/images/SayanLogo.png"; // اسم أوضح
import defaultAvatar from "../../../assets/images/default-user.jpg";
import { getMenuTitle, NAVBAR_LINK } from "../../../utils/constant";
import Cookies from 'js-cookie';
import CartButton from './CartButton';
import NewOffCanvas from "./NewOffCanvas"; // هذا مكونك المخصص

// Hook مخصص لقراءة الكوكي مرة واحدة
const useLoginTypeCookie = () => {
  const [loginType, setLoginType] = useState('');
  useEffect(() => {
    const cookie = Cookies.get('login_type');
    setLoginType(cookie || ''); // قيمة افتراضية آمنة
  }, []); // يُنفذ مرة واحدة فقط عند تحميل المكون
  return loginType;
};

// مكون فرعي لعرض أزرار المستخدم (لتحسين القراءة)
const UserAuthButtons = ({ user, loginType, onNavigate }) => {
  if (user) {
    const dashboardPath = loginType === 'academy' ? '/academy' : '/student/dashboard';
    const userDisplayImage = loginType === 'academy' ? user.academy?.image || defaultAvatar : user.image || defaultAvatar;
    
    return (
      <Fragment>
        <div onClick={() => onNavigate(dashboardPath)} className={classes.Secondry}>
          لوحة التحكم
        </div>
        <Avatar
          circle
          src={userDisplayImage}
          alt={user.name || "User Avatar"}
          size="sm" // أو أي حجم مناسب
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate(loginType === 'academy' ? '/academy/Profile' : '/student/Profile')} // مثال للانتقال لصفحة البروفايل
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div onClick={() => onNavigate("/login")} className={classes.Secondry}>
        دخول
      </div>
      <div onClick={() => onNavigate("/student/signin")} className={classes.Primary}>
        انضم الان
      </div>
    </Fragment>
  );
};

// مكون فرعي لأزرار المستخدم في نسخة الموبايل
const UserAuthButtonsMobile = ({ user, loginType, onNavigate }) => {
    // يمكنك إعادة استخدام UserAuthButtons هنا وتعديل الأنماط، أو إنشاء منطق مشابه
    // للتبسيط، سأعيد استخدام المنطق مع افتراض أن الأنماط يتم تطبيقها بواسطة classes.NavBarBtns
    if (user) {
      const dashboardPath = loginType === 'academy' ? '/academy' : '/student/dashboard';
      const userDisplayImage = loginType === 'academy' ? user.academy?.image || defaultAvatar : user.image || defaultAvatar;
      return (
        <Fragment>
          <div onClick={() => onNavigate(dashboardPath)} className={classes.SecondryMobile}> {/* افترض وجود كلاس مختلف */}
            لوحة التحكم
          </div>
          <Avatar 
            circle 
            src={userDisplayImage} 
            alt={user.name || "User Avatar"} 
            size="md" 
            style={{margin: '10px auto'}}
            onClick={() => onNavigate(loginType === 'academy' ? '/academy/Profile' : '/student/Profile')}
          />
        </Fragment>
      );
    }
    return (
      <div className="flex flex-col gap-3 mt-4"> {/* استخدام Tailwind classes كما في الأصل */}
        <div onClick={() => onNavigate("/login")} className="bg-blue-200 w-full px-4 py-2 rounded-md text-center hover:bg-blue-400 border-2 border-blue-400 cursor-pointer">
          دخول
        </div>
        <div onClick={() => onNavigate("/student/signin")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 border-2 hover:border-blue-300 cursor-pointer hover:text-gray-900">
          انضم الان
        </div>
      </div>
    );
};


const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const loginType = useLoginTypeCookie(); // استخدام الـ Hook المخصص

  // لم تعد هناك حاجة لـ path و isMenuFixed
  // const [path, setPath] = useState("");
  // const [isMenuFixed, setMenuFixed] = useState(false);


  // إزالة useEffect الخاص بـ isMenuFixed (لأن الهيدر سيكون ثابت الشكل)
  /*
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 100 || window.innerWidth < 1320;
      setMenuFixed(shouldBeFixed);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  */
  
  // إزالة useEffect الخاص بتتبع path إذا لم يعد ضروريًا لمنطق آخر
  /*
  useEffect(() => {
    let tempPath =
      location.pathname.split("/").length === 3
        ? location.pathname
        : location.pathname.replace(/\/[^/]+\/?$/, "");
    setPath(tempPath);
  }, [location.pathname]);
  */

  const handleCloseOffcanvas = useCallback(() => setShowOffcanvas(false), []);
  const handleShowOffcanvas = useCallback(() => setShowOffcanvas(true), []);

  const handleNavLinkClick = useCallback((e, toPath) => {
    // e.preventDefault(); // لا حاجة لـ preventDefault إذا كنت تستخدم NavLink بشكل صحيح
    navigate(toPath);
    handleCloseOffcanvas();
  }, [navigate, handleCloseOffcanvas]);


  // استخدام useMemo لتجنب إعادة إنشاء مصفوفة الروابط في كل مرة عرض
  const navLinksForOffcanvas = useMemo(() => (
    NAVBAR_LINK.map((linkPath) => ({
      path: linkPath,
      title: getMenuTitle(linkPath),
      onClick: (e) => handleNavLinkClick(e, linkPath), // تمرير المسار الصحيح
    }))
  ), [handleNavLinkClick]); // الاعتمادية هي handleNavLinkClick

  const memoizedUserButtons = useMemo(() => (
    <UserAuthButtons user={user} loginType={loginType} onNavigate={navigate} />
  ), [user, loginType, navigate]);

  const memoizedUserButtonsMobile = useMemo(() => (
    <div className="px-4"> {/* الحاوية الأصلية لأزرار الموبايل */}
        <div className={classes.NavBarBtnss}> {/* افترض أن هذا الكلاس ينسق الأزرار في الموبايل */}
            <CartButton />
            <UserAuthButtonsMobile user={user} loginType={loginType} onNavigate={(path) => { navigate(path); handleCloseOffcanvas();}} />
        </div>
    </div>
  ), [user, loginType, navigate, handleCloseOffcanvas]);


  return (
    // إزالة data-aos إذا لم تعد تستخدم Animate On Scroll أو إذا كانت تسبب مشاكل
    <div data-aos="fade-down"> 
      {/* إزالة isMenuFixed ? "menu-fixed" : "" من الكلاسات */}
      <div className={`navbar--1 ${classes.NavBarContainer}`}>
        <div className={classes.NavBarRoutes}>
          <div className={`${classes.logo} cursor-pointer`} onClick={() => navigate("/")}>
            <img src={logoImage} alt="Sayan Academy Logo" />
          </div>
          <nav className={classes.Routes}> {/* استخدام <nav> للعناصر الدلالية */}
            <ul>
              {NAVBAR_LINK.map((linkPath) => (
                <li key={linkPath}>
                  {/* 
                    استخدام NavLink من react-router-dom لتحديد الرابط النشط تلقائيًا.
                    HeaderNavigate قد يكون مكونًا مخصصًا، تأكد من أنه يتعامل مع NavLink أو يوفر وظيفة مشابهة.
                    إذا كان HeaderNavigate مجرد Link، استبدله بـ NavLink.
                  */}
                  <NavLink
                    to={linkPath}
                    className={({ isActive }) => isActive ? `${classes.NavActive} ${classes.NavLinkItem}` : classes.NavLinkItem} // افترض وجود كلاس NavLinkItem للأنماط العامة للرابط
                    onClick={(e) => handleNavLinkClick(e, linkPath)} // لا يزال onClick هنا لإغلاق الـ Offcanvas إذا تم النقر من داخله
                  >
                    {getMenuTitle(linkPath)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* عرض الأزرار للمستخدمين على الشاشات الكبيرة */}
        <div className={classes.NavBarBtns}>
            <CartButton />
            {memoizedUserButtons}
        </div>

        <div className={classes.MobileMenu} onClick={handleShowOffcanvas} role="button" tabIndex={0} aria-label="فتح القائمة">
          <MenuIcon />
        </div>
      </div>

      <NewOffCanvas
        show={showOffcanvas}
        onClose={handleCloseOffcanvas}
        logo={logoImage}
        links={navLinksForOffcanvas}
        // تمرير render props إذا كان NewOffCanvas يتوقعها لعرض الأزرار
        // أو يمكنك تمرير البيانات مباشرة إذا كان NewOffCanvas يتعامل معها
        renderUserButtons={() => ( // تمرير دالة تُرجع JSX
            <div className={classes.NavBarBtnss}> {/* تأكد من أن هذا الكلاس مناسب لـ Offcanvas */}
                <CartButton />
                {memoizedUserButtons} {/* إعادة استخدام نفس الأزرار أو إنشاء نسخة خاصة لـ Offcanvas */}
            </div>
        )}
        renderUserButtonsMobile={() => memoizedUserButtonsMobile} // تمرير دالة تُرجع JSX
      />
    </div>
  );
};

export default NavBar;