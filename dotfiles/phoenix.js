// This is my configuration for Phoenix <https://github.com/sdegutis/Phoenix>,
// a super-lightweight OS X window manager that can be configured and
// scripted through Javascript.

var mCmd = ['cmd', 'shift', 'ctrl'],
  mShort = ['cmd', 'ctrl'],
  nudgePixels = 10,
  padding = 0,
  previousSizes = {};

// Remembers hotkey bindings.
var keys = [];
function bind(key, mods, callback) {
  keys.push(api.bind(key, mods, callback));
}

// ############################################################################
// Modal activation
// ############################################################################

// Modal activator
// This hotkey enables/disables all other hotkeys.
var active = false;
api.bind('`', mShort, function() {
  if (!active) {
    enableKeys();
  } else {
    disableKeys();
  }
});

// ############################################################################
// Bindings
// ############################################################################

// ### General key configurations
//
// Space toggles the focussed between full screen and its initial size and position.
bind( 'up', mCmd, cycleCalls(
  toGrid,
  [
    [0, 0, 1, 0.5],
    [0.5, 0, 0.5, 0.5],
    [0.5, 0, 0.5, 1],
    [0.5, 0.5, 0.5, 0.5],
    [0, 0.5, 1, 0.5],
    [0, 0.5, 0.5, 0.5],
    [0, 0, 0.5, 1],
    [0, 0, 0.5, 0.5]
  ]
));

bind( 'down', mCmd, function() {
  Window.focusedWindow().toggleFullscreen();
});

// The cursor keys together with cmd make any window occupy any
// half of the screen.
bind( 'right', mCmd, cycleCalls(
  toGrid,
  [
    [0.5, 0, 0.5, 1], 
    [0.25, 0, 1, 1]
  ]
));

bind( 'left', mCmd, cycleCalls(
  toGrid,
  [
    [0, 0, 0.5, 1],
    [0, 0, 0.75, 1]
  ]
));

// Center window.
bind( 'up', mShort, cycleCalls(
  toGrid,
  [
    [0.22, 0.025, 0.56, 0.95],
    [0.1, 0, 0.8, 1]
  ]
));

bind( 'down', mShort, cycleCalls(
  toGrid,
  [
    [0.25, 0.5, 0.5, 0.5],
    [0.30, 0.75, 0.45, 0.25],
  ]
));

bind('left', mShort, leftOneMonitor);

bind('right', mShort, rightOneMonitor);

// ############################################################################
// Bindings for specific apps
// ############################################################################

var t = 'Terminal';
var j = 'IntelliJ IDEA';
var c = 'Google Chrome';
var f = 'Firefox';
var s = 'Sublime Text 2';
var r = 'RStudio';
var m = 'Mail';
var k = 'Skype';
var l = 'Calendar';
var v = 'Evernote';
var o = 'Rdio';
var u = 'Microsoft Outlook';
var g = 'SourceTree';
var x = 'Xcode';
var y = 'PyCharm';
var n = 'Preview';
var a = 'Activity Monitor';
var p = 'Finder';
var e = 'Adium';
var h = 'Messages';
var i = 'iTunes';
var w = 'Wunderlist';
var z = 'Safari'

// App bindings b d q
bind('t', mCmd, function() { App.focusOrStart(t); });
bind('j', mCmd, function() { App.focusOrStart(j); });
bind('c', mCmd, function() { App.focusOrStart(c); });
bind('f', mCmd, function() { App.focusOrStart(f); });
bind('s', mCmd, function() { App.focusOrStart(s); });
bind('r', mCmd, function() { App.focusOrStart(r); });
bind('m', mCmd, function() { App.focusOrStart(m); });
bind('k', mCmd, function() { App.focusOrStart(k); });
bind('l', mCmd, function() { App.focusOrStart(l); });
bind('v', mCmd, function() { App.focusOrStart(v); });
bind('o', mCmd, function() { App.focusOrStart(o); });
bind('u', mCmd, function() { App.focusOrStart(u); });
bind('g', mCmd, function() { App.focusOrStart(g); });
bind('x', mCmd, function() { App.focusOrStart(x); });
bind('y', mCmd, function() { App.focusOrStart(y); });
bind('n', mCmd, function() { App.focusOrStart(n); });
bind('a', mCmd, function() { App.focusOrStart(a); });
bind('p', mCmd, function() { App.focusOrStart(p); });
bind('e', mCmd, function() { App.focusOrStart(e); });
bind('h', mCmd, function() { App.focusOrStart(h); });
bind('i', mCmd, function() { App.focusOrStart(i); });
bind('z', mCmd, function() { App.focusOrStart(z); });
bind('w', mCmd, function() { App.focusOrStart(w); });

// ############################################################################
// Layouts
// ############################################################################

function forApp(name, f) {
  var app = App.findByTitle(name);

  if (app) {
    _.each(app.visibleWindows(), f);
  }
}

function fixedSize() {
  forApp(w, function(win) {
    win.toLocation(10, 0, 380, 800);
  })

  forApp(h, function(win) {
    win.toLocation(300, 0, 460, 950);
  })

  forApp(k, function(win) {
    win.toLocation(30, 0, 580, 850);
  })

  forApp(e, function(win) {
    win.toLocation(150, 0, 750, 900);
  })
}

bind( '1', mCmd, function() {
  fixedSize()

  var readScreens = new Array(a, n);

  _(readScreens).each(function(title) {
    forApp(title, function(win) {
      win.toGrid(0, 0, 0.5, 1);
    });
  });

  var fullScreens = new Array(j, t, r, x, c, f, s, m, l, v, o, u, g, y, p, i);

  _(fullScreens).each(function(title) {
    forApp(title, function(win) {
      win.toFullScreen();
    });
  });
});

bind( '2', mCmd, function() {
  fixedSize()

  var readScreens = new Array(a, n);

  _(readScreens).each(function(title) {
    forApp(title, function(win) {
      win.toGrid(0, 0, 0.5, 1);
    });
  });

 var mainScreens = new Array(c, f, s, m, l, v, o, u, g, y, p, i);

  _(mainScreens).each(function(title) {
    forApp(title, function(win) {
      win.toGrid( 0, 0, 0.75, 1 )
    });
  });

  var fullScreens = new Array(j, t, r, x);

  _(fullScreens).each(function(title) {
    forApp(title, function(win) {
      win.toFullScreen();
    });
  });
});

// ############################################################################
// Helpers
// ############################################################################

// Cycle args for the function, if called repeatedly
// cycleCalls(fn, [ [args1...], [args2...], ... ])
var lastCall = null;
function cycleCalls(fn, argsList) {
  var argIndex = 0, identifier = {};
  return function () {
  if (lastCall !== identifier || ++argIndex >= argsList.length) {
    argIndex = 0;
  }
  lastCall = identifier;
  fn.apply(this, argsList[argIndex]);
  };
}

// Disables all remembered keys.
function disableKeys() {
  active = false;
  _(keys).each(function(key) {
    key.disable();
  });
  api.alert("done", 0.5);
}

// Enables all remembered keys.
function enableKeys() {
  active = true;
  _(keys).each(function(key) {
    key.enable();
  });
  api.alert("Phoenix", 0.5);
}

// ### Helper methods `Window`
//
// #### Window#toGrid()
//
// This method can be used to push a window to a certain position and size on
// the screen by using four floats instead of pixel sizes.  Examples:
//
//     // Window position: top-left; width: 25%, height: 50%
//     someWindow.toGrid( 0, 0, 0.25, 0.5 );
//
//     // Window position: 30% top, 20% left; width: 50%, height: 35%
//     someWindow.toGrid( 0.3, 0.2, 0.5, 0.35 );
//
// The window will be automatically focussed.  Returns the window instance.
function windowToGrid(window, x, y, width, height) {
  var screen = window.screen().frameWithoutDockOrMenu();

  window.setFrame({
    x: Math.round( x * screen.width ) + padding + screen.x,
    y: Math.round( y * screen.height ) + padding + screen.y,
    width: Math.round( width * screen.width ) - ( 2 * padding ),
    height: Math.round( height * screen.height ) - ( 2 * padding )
  });

  window.focusWindow();

  return window;
}

function toGrid(x, y, width, height) {
  windowToGrid(Window.focusedWindow(), x, y, width, height);
}

Window.prototype.toGrid = function(x, y, width, height) {
  windowToGrid(this, x, y, width, height);
};

Window.prototype.toLocation = function(x, y, width, height) {
  var screen = this.screen().frameWithoutDockOrMenu();

  this.setFrame({
    x: x + screen.x,
    y: y + screen.y,
    width: width,
    height: height
  });

  this.focusWindow();

  return this;
};

// #### Window#toFullScreen()
//
// Convenience method, doing exactly what it says.  Returns the window
// instance.
Window.prototype.toFullScreen = function() {
  return this.toGrid( 0, 0, 1, 1 );
};


// #### Window#toN()
//
// Convenience method, pushing the window to the top half of the screen.
// Returns the window instance.
Window.prototype.toN = function() {
  return this.toGrid( 0, 0, 1, 0.5 );
};


// #### Window#toNE()
//
// Convenience method, pushing the window to the top-right quarter of the
// screen.  Returns the window instance.
Window.prototype.toNE = function() {
  return this.toGrid( 0.5, 0, 0.5, 0.5 );
};


// #### Window#toE()
//
// Convenience method, pushing the window to the right half of the screen.
// Returns the window instance.
Window.prototype.toE = function() {
  return this.toGrid( 0.5, 0, 0.5, 1 );
};


// #### Window#toSE()
//
// Convenience method, pushing the window to the bottom-right quarter of the
// screen.  Returns the window instance.
Window.prototype.toSE = function() {
  return this.toGrid( 0.5, 0.5, 0.5, 0.5 );
};


// #### Window#toS()
//
// Convenience method, pushing the window to the bottom half of the screen.
// Returns the window instance.
Window.prototype.toS = function() {
  return this.toGrid( 0, 0.5, 1, 0.5 );
};


// #### Window#toSW()
//
// Convenience method, pushing the window to the bottom-left quarter of the
// screen.  Returns the window instance.
Window.prototype.toSW = function() {
  return this.toGrid( 0, 0.5, 0.5, 0.5 );
};


// #### Window#toW()
//
// Convenience method, pushing the window to the left half of the screen.
// Returns the window instance.
Window.prototype.toW = function() {
  return this.toGrid( 0, 0, 0.5, 1 );
};


// #### Window#toNW()
//
// Convenience method, pushing the window to the top-left quarter of the
// screen.  Returns the window instance.
Window.prototype.toNW = function() {
  return this.toGrid( 0, 0, 0.5, 0.5 );
};


// #### Window#toggleFullscreen()
//
// Stores the window position and size, then makes the window full screen.
// Should the window be full screen already, its original position and size
// is restored.  Returns the window instance.
Window.prototype.toggleFullscreen = function() {
  if ( previousSizes[ this ] ) {
    this.setFrame( previousSizes[ this ] );
    delete previousSizes[ this ];
  }
  else {
    previousSizes[ this ] = this.frame();
    this.toFullScreen();
  }

  return this;
};


// #### Window#nudgeLeft()
//
// Move the currently focussed window left by [`nudgePixel`] pixels.
Window.prototype.nudgeLeft = function( factor ) {
  var win = Window.focusedWindow(),
    frame = win.frame(),
    pixels = nudgePixels * ( factor || 1 );

  frame.x -= ( frame.x >= pixels ) ? pixels : 0;
  win.setFrame( frame );
};



// #### Window#nudgeRight()
//
// Move the currently focussed window right by [`nudgePixel`] pixels.
Window.prototype.nudgeRight = function( factor ) {
  var win = Window.focusedWindow(),
    frame = win.frame(),
    maxLeft = win.screen().frameIncludingDockAndMenu().width - frame.width,
    pixels = nudgePixels * ( factor || 1 );

  frame.x += ( frame.x < maxLeft - pixels ) ? pixels : 0;
  win.setFrame( frame );
};


// #### Window#nudgeUp()
//
// Move the currently focussed window left by [`nudgePixel`] pixels.
Window.prototype.nudgeUp = function( factor ) {
  var win = Window.focusedWindow(),
    frame = win.frame(),
    pixels = nudgePixels * ( factor || 1 );

  frame.y -= ( frame.y >= pixels ) ? pixels : 0;
  win.setFrame( frame );
};



// #### Window#nudgeDown()
//
// Move the currently focussed window right by [`nudgePixel`] pixels.
Window.prototype.nudgeDown = function( factor ) {
  var win = Window.focusedWindow(),
    frame = win.frame(),
    maxLeft = win.screen().frameIncludingDockAndMenu().height - frame.height,
    pixels = nudgePixels * ( factor || 1 );

  frame.y += ( frame.y < maxLeft - pixels ) ? pixels : 0;
  win.setFrame( frame );
};


// ### Helper methods `App`
//
// #### App.findByTitle()
//
// Finds the window with a certain title.  Expects a string, returns a window
// instance or `undefined`.  If there are several windows with the same title,
// the first found instance is returned.
App.findByTitle = function( title ) {
  return _( this.runningApps() ).find( function( app ) {
    if ( app.title() === title ) {
      app.show();
      return true;
    }
  });
};


// #### App#findWindowMatchingTitle()
//
// Finds the window whose title matches a regex pattern.  Expects a string
// (the pattern), returns a window instance or `undefined`.  If there are
// several matching windows, the first found instance is returned.
App.prototype.findWindowMatchingTitle = function( title ) {
  var regexp = new RegExp( title );

  return _( this.visibleWindows() ).find( function( win ) {
    return regexp.test( win.title() );
  });
};


// #### App#findWindowNotMatchingTitle()
//
// Finds the window whose title doesn't match a regex pattern.  Expects a
// string (the pattern), returns a window instance or `undefined`.  If there
// are several matching windows, the first found instance is returned.
App.prototype.findWindowNotMatchingTitle = function( title ) {
  var regexp = new RegExp( title );

  return _( this.visibleWindows() ).find( function( win ) {
    return !regexp.test( win.title() );
  });
};


// #### App#focusOrStart()
//
// Start/select apps
App.focusOrStart = function ( title ) {
  var app = App.findByTitle( title );

  if (typeof app == 'undefined') {
    api.alert("Starting " + title);
    api.launch(title)
    return;
  }

  var windows = app.allWindows();

  activeWindows = _(windows).reject(function(win) { return win.isWindowMinimized();});
  if (_.isEmpty(activeWindows)) {
    api.alert("All windows minimized for " + title);
    return;
  }

  var visibleWindows = app.visibleWindows()

  if (_.isEmpty(visibleWindows)) {
    api.alert("No visible windows for " + title);
    return;
  }

  visibleWindows[ 0 ].focusWindow();
};


// Move windows between monitors

function moveToScreen(win, screen) {
  if (!screen) {
    return;
  }

  var frame = win.frame();
  var oldScreenRect = win.screen().frameWithoutDockOrMenu();
  var newScreenRect = screen.frameWithoutDockOrMenu();

  var xRatio = newScreenRect.width / oldScreenRect.width;
  var yRatio = newScreenRect.height / oldScreenRect.height;

  win.setFrame({
    x: (Math.round(frame.x - oldScreenRect.x) * xRatio) + newScreenRect.x,
    y: (Math.round(frame.y - oldScreenRect.y) * yRatio) + newScreenRect.y,
    width: Math.round(frame.width * xRatio),
    height: Math.round(frame.height * yRatio)
  });
}

function circularLookup(array, index) {
  if (index < 0)
    return array[array.length + (index % array.length)];
  return array[index % array.length];
}

function rotateMonitors(offset) {
  var win = Window.focusedWindow();
  var currentScreen = win.screen();
  var screens = [currentScreen];
  for (var x = currentScreen.previousScreen(); x != win.screen(); x = x.previousScreen()) {
    screens.push(x);
  }

  screens = _(screens).sortBy(function(s) { return s.frameWithoutDockOrMenu().x; });
  var currentIndex = _(screens).indexOf(currentScreen);
  moveToScreen(win, circularLookup(screens, currentIndex + offset));
}

function leftOneMonitor() {
  rotateMonitors(-1);
}

function rightOneMonitor() {
  rotateMonitors(1);
}

// ############################################################################
// Init
// ############################################################################

// Initially disable all hotkeys
disableKeys();
