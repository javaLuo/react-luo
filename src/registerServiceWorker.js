/** 这个文件用于注册service-worker **/

// 注册service-worker
export default function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // 如果网站的origin不同则SW无法工作，比如使用了CDN的情况
      // https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      registerValidSW(`${process.env.PUBLIC_URL}/service-worker.js`);
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log("新的内容已下载，请刷新");
            } else {
              console.log("内容已缓存，可供离线时使用");
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("service-worker注册失败:", error);
    });
}

// 注销service-worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
