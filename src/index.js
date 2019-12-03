window.addEventListener('load', () => {
  registerSW();
  displayPopUpOnIos();
});

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}

// Adds a custom popup which will indicate that our app can be added to home screen
function displayPopUpOnIos() {
	// Detects if device is on iOS 
	const isIos = () => {
	  const userAgent = window.navigator.userAgent.toLowerCase();
	  return /iphone|ipad|ipod/.test( userAgent );
	}
	// Detects if device is in standalone mode
	const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
	alert(isIos() && !isInStandaloneMode());
	// Checks if should display install popup notification:
	if (isIos() && !isInStandaloneMode()) {
	  this.setState({ showInstallMessage: true });
	}	
}

//code to prompt the user to allow notifications
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
    if (Notification.permission == 'granted') {
    	displayNotification();
    }
});

function displayNotification() {
  	navigator.serviceWorker.getRegistration().then(function(reg) {
	  var options = {
	    body: 'Here is a notification body!',
	    icon: 'img/icons/icon-96x96.png',
	    vibrate: [100, 50, 100],
	    data: {
	      dateOfArrival: Date.now(),
	      primaryKey: 1
	    }
	  };
	  reg.showNotification('Hello world!', options);
	});
}