function ShortcutInput(element, settings) {
  this.element = element;
  this.settings = this.merge(ShortcutInput.defaults, settings);

  this.element.addEventListener('keydown', this.handleInput.bind(this));
}

ShortcutInput.prototype.merge = function (out) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        out[key] = typeof arguments[i][key] == 'object' ? this.merge(out[key], arguments[i][key]) : arguments[i][key];
      }
    }
  }

  return out;
};

ShortcutInput.prototype.handleInput = function (event) {
  event.preventDefault();

  var shortcut = {
    modifiers: {
      alt: event.altKey,
      ctrl: event.ctrlKey,
      meta: event.metaKey,
      shift: event.shiftKey
    },
    key: event.which || event.keyCode
  };

  if (!this.isValid(shortcut)) {
   return;
  }

  this.element.value = this.render(shortcut);
  this.trigger('change', shortcut);
};

ShortcutInput.prototype.isValid = function (shortcut) {
  return this.settings.mapping[shortcut.key] && (
    (shortcut.modifiers.ctrl || shortcut.modifiers.alt || shortcut.modifiers.shift || shortcut.modifiers.meta) ||
    shortcut.key >= 112 && shortcut.key <= 123)
  ;
};

ShortcutInput.prototype.render = function (shortcut) {
  var pressed = [];

  this.settings.order.forEach(function (modifier) {
    if (shortcut.modifiers[modifier]) {
      pressed.push(this.settings.mapping[modifier]);
    }
  }.bind(this));

  if (shortcut.key) {
    pressed.push(this.settings.mapping[shortcut.key]);
  }

  return pressed.join(this.settings.glue);
};

ShortcutInput.prototype.trigger = function (name, data) {
  name = this.settings.eventPrefix + name;
  data = data || {};

  if (window.CustomEvent) {
    var event = new CustomEvent(name, {detail: data});
  } else {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, data);
  }

  this.element.dispatchEvent(event);
};

ShortcutInput.defaults = {
  eventPrefix: 'shortcutInput.',
  glue: '',
  mapping: {
    alt: '⌥',
    ctrl: '⌃',
    meta: '⌘',
    shift: '⇧',
    27: '⎋',
    32: 'Space',
    37: '←',
    38: '↑',
    39: '→',
    40: '↓',
    59: ';',
    61: '=',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    96: '0',
    97: '1',
    98: '2',
    99: '3',
    100: '4',
    101: '5',
    102: '6',
    103: '7',
    104: '8',
    105: '9',
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111: '/',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    173: '-',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
  },
  order: [
    'ctrl',
    'alt',
    'shift',
    'meta'
  ]
};
