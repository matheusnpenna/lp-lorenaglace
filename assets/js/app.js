new Glider(document.querySelector('.carousel'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });
var gtm_ref, analytics_ref, fb_ref = "";

function startGTMWebVitals() {
  if (window.gtmDidInit) {
    return false
  }

  window.gtmDidInit = true

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = false
  script.onload = () => {
    dataLayer.push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime(),
      'gtm.uniqueEventId': 0,
    })
  }

  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtm_ref

  document.head.appendChild(script)

  var noscript = document.createElement('div')

  noscript.innerHTML = `
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=${gtm_ref}"
            height="0"
            width="0"
            style="display: none; visibility: hidden"
          ></iframe>
        </noscript>
      `
  document.body.insertBefore(noscript, document.body.childNodes[0])
}

function startFBWebVitals() {
    if (window.fbDidInit) {
      return false
    }

    window.fbDidInit = true

    !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
    fbq('init', fb_ref);
    fbq('track', 'PageView');

    var noscript = document.createElement('div')

    noscript.innerHTML = `
      <noscript>
        <img 
          height="1" 
          width="1" 
          style="display:none"
          src="https://www.facebook.com/tr?id=${fb_ref}&ev=PageView&noscript=1"
        />
      </noscript>
    `
    document.body.insertBefore(noscript, document.body.childNodes[0])
}

function startAnalyticsWebVitals() {
  if (window.analyticsDidInit) {
    return false
  }

  window.analyticsDidInit = true

  const pure_script = document.createElement('script')
  pure_script.type = 'text/javascript'
  pure_script.async = false
  pure_script.src = "https://www.googletagmanager.com/gtag/js?id="+analytics_ref;
  document.head.appendChild(pure_script)

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = false
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', analytics_ref);
  }

  document.head.appendChild(script)
}

function startAll() {
  if (analytics_ref) startAnalyticsWebVitals();
  if (gtm_ref) startGTMWebVitals();
  if (fb_ref) startFBWebVitals();
}

function startOnEvent(event) {
  startAll();
  event.currentTarget.removeEventListener(event.type, startOnEvent) // remove the event listener that got triggered
}

function startScripts(fb, gtm, analytics_r) {
  gtm_ref = gtm;
  fb_ref = fb;
  analytics_ref = analytics_r;

  setTimeout(startAll, 3500)
  document.addEventListener('scroll', startOnEvent)
  document.addEventListener('mousemove', startOnEvent)
  document.addEventListener('touchstart', startOnEvent)
}

/*
- HOW TO:
  - Add on page the following code below:
    <div class="embed-responsive embed-responsive-16by9 h-100">
      <div id="iframe-video"></div>
    </div>
  - isteand of
    <div class="embed-responsive embed-responsive-16by9 h-100">
      <iframe
        class="embed-responsive-item"
        src="link_to_embed_video"
        frameborder="0"
        allow="fullscreen"
        allowfullscreen
      ></iframe>
    </div>
  - them, call this function passing the link of embed video, on end of 
  file inside of DOMContentLoaded event.
  - for example: startVideoEmbedWebVitals('https://youtube.com/embed/O4a8DJayUh8');

  Obs: if exists two iframes in page for desktop and for mobile, use the following id: iframe-video-mobile
*/
function startVideoEmbedWebVitals(link) {
  setTimeout(() => {
    var video = document.getElementById('iframe-video');
    var videoMobile = document.getElementById('iframe-video-mobile');
    var iframe = `
      <iframe
        class="embed-responsive-item"
        src="${link}"
        frameborder="0"
        allow="autoplay;fullscreen"
        allowfullscreen
      ></iframe>
    `;
    video.innerHTML = iframe;
    if (videoMobile) videoMobile.innerHTML = iframe;
  }, 2500);
}

function startBatchVideoEmbedWebVitals(link_list) {
  if (!Array.isArray(link_list)) {
    console.error("startBatchVideoEmbedWebVitals => Passed param isn't an array")
    return;
  }

  setTimeout(() => {
    for(var i = 0; i < link_list.length; i++) {
      var video = document.getElementById('iframe-video-'+i);
      var videoMobile = document.getElementById('iframe-video-mobile-'+i);
      var iframe = `
        <iframe
          class="embed-responsive-item"
          src="${link_list[i]}"
          frameborder="0"
          allow="autoplay;fullscreen"
          allowfullscreen
        ></iframe>
      `;
      video.innerHTML = iframe;
      if (videoMobile) videoMobile.innerHTML = iframe;
    }
  }, 3500);
}