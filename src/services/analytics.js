/**
 * Analytics service for GA4 and Meta Pixel integration
 * Provides a centralized event tracking layer
 */

const isDev = import.meta.env.DEV

// GA4 → Meta Pixel event name mapping
const META_EVENT_MAP = {
  view_item: 'ViewContent',
  add_to_cart: 'AddToCart',
  remove_from_cart: null,
  begin_checkout: 'InitiateCheckout',
  purchase: 'Purchase',
}

export const analytics = {
  init: (ga4MeasurementId, metaPixelId) => {
    if (isDev) {
      console.log('[Analytics] Initializing with GA4:', ga4MeasurementId, 'Meta:', metaPixelId)
    }

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

  trackEvent: (eventName, parameters = {}) => {
    if (isDev) {
      console.log('[GA4 Event]', eventName, parameters)
    }
    if (window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  },

  trackFBEvent: (ga4EventName, metaParams = {}) => {
    const metaEventName = META_EVENT_MAP[ga4EventName]
    if (!metaEventName) return
    if (!window.fbq) return

    if (isDev) {
      console.log('[Meta Pixel Event]', metaEventName, metaParams)
    }

    window.fbq('track', metaEventName, metaParams)
  },

  trackViewItem: (item) => {
    const gaParams = {
      value: item.price,
      currency: 'USD',
      items: [{ item_id: item.id, item_name: item.name, price: item.price, item_category: item.category }]
    }
    analytics.trackEvent('view_item', gaParams)

    analytics.trackFBEvent('view_item', {
      content_name: item.name,
      content_type: 'product',
      value: item.price,
      currency: 'USD',
    })
  },

  trackAddToCart: (item, quantity = 1) => {
    const gaParams = {
      value: item.price * quantity,
      currency: 'USD',
      items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity, item_category: item.category }]
    }
    analytics.trackEvent('add_to_cart', gaParams)

    analytics.trackFBEvent('add_to_cart', {
      content_ids: [item.id],
      content_name: item.name,
      content_type: 'product',
      value: item.price * quantity,
      currency: 'USD',
      num_items: quantity,
    })
  },

  trackRemoveFromCart: (item) => {
    const gaParams = {
      value: item.price,
      currency: 'USD',
      items: [{ item_id: item.id, item_name: item.name, price: item.price, item_category: item.category }]
    }
    analytics.trackEvent('remove_from_cart', gaParams)
  },

  trackBeginCheckout: (items) => {
    const totalValue = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
    const gaParams = {
      value: totalValue,
      currency: 'USD',
      items: items.map(item => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity || 1, item_category: item.category }))
    }
    analytics.trackEvent('begin_checkout', gaParams)

    analytics.trackFBEvent('begin_checkout', {
      contents: items.map(i => ({ id: i.id, quantity: i.quantity || 1 })),
      content_type: 'product',
      num_items: totalItems,
      value: totalValue,
      currency: 'USD',
    })
  },

  trackPurchase: (items, transactionId) => {
    const totalValue = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0)
    const gaParams = {
      transaction_id: transactionId,
      value: totalValue,
      currency: 'USD',
      items: items.map(item => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity || 1, item_category: item.category }))
    }
    analytics.trackEvent('purchase', gaParams)

    analytics.trackFBEvent('purchase', {
      contents: items.map(i => ({ id: i.id, quantity: i.quantity || 1 })),
      content_type: 'product',
      num_items: totalItems,
      value: totalValue,
      currency: 'USD',
      event_id: transactionId,
    })
  },
}