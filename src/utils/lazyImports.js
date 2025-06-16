// Lazy imports للمكتبات الثقيلة
import { lazy } from 'react';

// Chart Libraries - تحميل كسول للمخططات
export const LazyChartJS = lazy(() => 
  import('chart.js').then(module => ({ default: module.Chart }))
);

export const LazyApexCharts = lazy(() => 
  import('react-apexcharts').then(module => ({ default: module.default }))
);

// Motion Libraries - تحميل كسول للحركة
export const LazyFramerMotion = lazy(() => 
  import('framer-motion').then(module => ({ default: module.motion }))
);

// Video Processing - تحميل كسول لمعالجة الفيديو
export const LazyFFmpeg = lazy(() => 
  import('@ffmpeg/ffmpeg').then(module => ({ default: module.FFmpeg }))
);

// Heavy UI Components - تحميل كسول للمكونات الثقيلة
export const LazyQuillEditor = lazy(() => 
  import('react-quill').then(module => ({ default: module.default }))
);

export const LazyAgGrid = lazy(() => 
  import('ag-grid-react').then(module => ({ default: module.AgGridReact }))
);

// Utility Functions
export const loadLibraryOnDemand = async (libraryName) => {
  const libraries = {
    'chart.js': () => import('chart.js'),
    'apexcharts': () => import('apexcharts'),
    'framer-motion': () => import('framer-motion'),
    'crypto-js': () => import('crypto-js'),
    'moment': () => import('moment'),
    'sweetalert2': () => import('sweetalert2'),
    'chroma-js': () => import('chroma-js')
  };

  if (libraries[libraryName]) {
    try {
      return await libraries[libraryName]();
    } catch (error) {
      console.error(`Failed to load ${libraryName}:`, error);
      return null;
    }
  }
  
  console.warn(`Library ${libraryName} not found in lazy imports`);
  return null;
};

// Preload critical libraries
export const preloadCriticalLibraries = () => {
  // تحميل مسبق للمكتبات الحيوية فقط
  const criticalLibraries = [
    () => import('react-router-dom'),
    () => import('@tanstack/react-query'),
    () => import('axios')
  ];

  criticalLibraries.forEach(loadLibrary => {
    loadLibrary().catch(error => 
      console.warn('Failed to preload critical library:', error)
    );
  });
}; 