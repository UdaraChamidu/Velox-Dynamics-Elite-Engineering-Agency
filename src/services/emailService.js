// EmailJS Service Integration
// Documentation: https://www.emailjs.com/docs/

// NOTE: Install EmailJS if needed: npm install @emailjs/browser

// Initialize EmailJS (import this in your main.jsx or App.jsx)
// import emailjs from '@emailjs/browser';
// emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Send contact form email
 * @param {Object} formData - Form data object
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.service - Selected service
 * @param {string} formData.message - Message content
 * @returns {Promise} EmailJS response
 */
export const sendContactForm = async (formData) => {
  try {
    // Uncomment when you have EmailJS credentials
    /*
    const emailjs = (await import('@emailjs/browser')).default;
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      service_interest: formData.service,
      message: formData.message,
      to_email: 'contact@veloxdynamics.com' // Your receiving email
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      templateParams
    );

    return response;
    */

    // Temporary simulation for development
    console.log('Contact form submitted (simulated):', formData);
    return new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 1000));
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};

/**
 * Subscribe email to newsletter
 * @param {string} email - Subscriber's email
 * @returns {Promise} EmailJS response
 */
export const subscribeNewsletter = async (email) => {
  try {
    // Uncomment when you have EmailJS credentials
    /*
    const emailjs = (await import('@emailjs/browser')).default;
    
    const templateParams = {
      subscriber_email: email,
      to_email: 'contact@veloxdynamics.com' // Your receiving email
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID,
      templateParams
    );

    return response;
    */

    // Temporary simulation for development
    console.log('Newsletter subscription (simulated):', email);
    return new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 1000));
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

/**
 * EmailJS Template Examples:
 * 
 * Contact Form Template (VITE_EMAILJS_CONTACT_TEMPLATE_ID):
 * ---
 * Subject: New Contact Form Submission from {{from_name}}
 * 
 * Name: {{from_name}}
 * Email: {{from_email}}
 * Service Interest: {{service_interest}}
 * 
 * Message:
 * {{message}}
 * ---
 * 
 * Newsletter Template (VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID):
 * ---
 * Subject: New Newsletter Subscription
 * 
 * New subscriber email: {{subscriber_email}}
 * Subscribed at: {{current_time}}
 * ---
 */
