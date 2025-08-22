import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics (e.g., Google Analytics)
    const initAnalytics = () => {
      // Add your analytics initialization code here
      // Example for Google Analytics:
      // window.gtag('config', 'YOUR-GA-ID');
    };

    // Track page views
    const trackPageView = () => {
      // Add your page view tracking code here
      // Example for Google Analytics:
      // window.gtag('event', 'page_view', {
      //   page_path: location.pathname + location.search,
      // });
      console.log('Page view:', location.pathname);
    };

    initAnalytics();
    trackPageView();
  }, [location]);

  return null;
};

export default Analytics; 