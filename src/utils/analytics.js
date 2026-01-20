// Google Analytics helper functions

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track page views (automatic with react-router)
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: url
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, category = 'engagement') => {
  trackEvent('button_click', {
    button_name: buttonName,
    category
  });
};

// Track outbound links
export const trackOutboundLink = (url) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    transport_type: 'beacon'
  });
};

// Track search queries
export const trackSearch = (searchTerm) => {
  trackEvent('search', {
    search_term: searchTerm
  });
};

// Track file downloads
export const trackDownload = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName
  });
};
