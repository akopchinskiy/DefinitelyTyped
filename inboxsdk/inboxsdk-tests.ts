/// <reference path="index.d.ts" />
/// <reference path="../es6-promise/es6-promise.d.ts" />
/// <reference path="../kefir/kefir.d.ts" />

// TODO: write tests

// Subscribe to events
InboxSDK.load('1.0', 'YOUR_APP_ID_HERE').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){
    composeView.on('recipientsChanged', function(event) {
      console.log('Recipients have changed to: ' + event);
    });

    composeView.on('destroy', function(event) {
      console.log('compose view going away, time to clean up');
    });
  });
});

// Compose
InboxSDK.load('1.0', 'YOUR_APP_ID_HERE').then(function(sdk){
  sdk.Compose.registerComposeViewHandler(function(composeView){
    console.log("compose view exists!");
  });
});

// ComposeView
InboxSDK.load('1.0', 'YOUR_APP_ID_HERE').then(function(sdk){
    sdk.Compose.registerComposeViewHandler(function(composeView){
        composeView.addButton({
            title: "My Nifty Button!",
            iconUrl: 'https://example.com/foo.png',
            onClick: function(event) {
                event.composeView.insertBodyTextAtCursor('Hello World!');
            },
            hasDropdown: false,
            type: "MODIFIER",
            orderHint: 0
        });
    });
});

// handleListRoute()
InboxSDK.load('1', 'MY_APP_ID').then(function(sdk) {
    sdk.Router.handleListRoute(sdk.Router.NativeListRouteIDs.SEARCH, function(inboxView) {
        console.log(inboxView);
    })
});

// Promises
var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 1000);
});
promise.then(function(value) {
  console.log("received", value);
});
// Prints "received foo" after one second.

// Streams
var stream = Kefir.stream(function(emitter) {
  var timer = setInterval(function() {
    emitter.emit('foo');
  }, 1000);

  // Return a function to be called when the stream is unsubscribed from.
  // Unlike promises, streams can know when they're no longer listened to!
  return function() {
    clearInterval(timer);
  };
});
stream.take(5).onValue(function(value) {
  console.log("received", value);
});
// Prints "received foo" five times each one second apart, and then stops.
