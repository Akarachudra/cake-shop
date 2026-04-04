/**
 * Analytics service for GA4 and Meta Pixel integration
 * Provides a centralized event tracking layer
 */

const isDev = import.meta.env.DEV

export const analytics = {
  /**
   * Initialize GA4 and Meta Pixel
   * @param {string} ga4MeasurementId - Google Analytics 4 Measurement ID
   * @param {string} metaPixelId - Meta Pixel ID
   */
  init: (ga4MeasurementId, metaPixelId) => {
    if (isDev) {
      console.log('[Analytics] Initializing with GA4:', ga4MeasurementId, 'Meta:', metaPixelId)
    }

    // Initialize GA4
    if (ga4MeasurementId) {
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`
      document.head.appendChild(script1)

      window.dataLayer = window.dataLayer || []
      function gtag() { window.dataLayer.push(arguments) }
      gtag('js', new Date())
      gtag('config', ga4MeasurementId)
      window.gtag = gtag
    }

    // Initialize Meta Pixel
    if (metaPixelId) {
      const script2 = document.createElement('script')
      script2.innerHTML = `
        !function(f,b,e,v,n,t,s){
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script2)
    }
  },

  /**
   * Track a custom event in GA4
   */
  trackEvent: (eventName, parameters = {}) => {
    if (isDev) {
      console.log('[GA4 Event]', eventName, parameters)
    }
    if (window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  },

  /**
   * Track a view_item event
   */
  trackViewItem: (item) => {
    const event = {
      event_name: 'view_item',
      value: item.price,
      currency: 'USD',
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          item_category: item.category,
        }
      ]
    }

    if (isDev) {
      console.log('[View Item]', event)
    }

    analytics.trackEvent('view_item', event)
  },

  /**
   * Track add_to_cart event
   */
  trackAddToCart: (item, quantity = 1) => {
    const event = {
      value: item.price * quantity,
      currency: 'USD',
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: quantity,
          item_category: item.category,
        }
      ]
    }

    if (isDev) {
      console.log('[Add To Cart]', event)
    }

    analytics.trackEvent('add_to_cart', event)
  },

  /**
   * Track remove_from_cart event
   */
  trackRemoveFromCart: (item) => {
    const event = {
      value: item.price,
      currency: 'USD',
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          item_category: item.category,
        }
      ]
    }

    if (isDev) {
      console.log('[Remove From Cart]', event)
    }

    analytics.trackEvent('remove_from_cart', event)
  },

  /**
   * Track begin_checkout event
   */
  trackBeginCheckout: (items) => {
    const totalValue = items.reduce((sum, item) => sum + item.price, 0)
    const event = {
      value: totalValue,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
      }))
    }

    if (isDev) {
      console.log('[Begin Checkout]', event)
    }

    analytics.trackEvent('begin_checkout', event)
  },

  /**
   * Track purchase event
   */
  trackPurchase: (items, transactionId) => {
    const totalValue = items.reduce((sum, item) => sum + item.price, 0)
    const event = {
      transaction_id: transactionId,
      value: totalValue,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category,
      }))
    }

    if (isDev) {
      console.log('[Purchase]', event)
    }

    analytics.trackEvent('purchase', event)
  }
}
