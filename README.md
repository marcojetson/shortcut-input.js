# shortcut-input.js

A JavaScript widget for configuring keyboard shortcuts

<img src="https://cloud.githubusercontent.com/assets/408194/19322100/077dcba6-90b8-11e6-8a88-80f13852aafa.png">

## Usage

```javascript
var widget = new ShortcutInput(document.getElementById('my-shortcut-input'));
```

### Demo

https://jsfiddle.net/m4b9jnte/

### Events

#### shortcutInput.change

Fired when a valid shortcut is set

```javascript
{
  modifiers: {
   alt: boolean,
   ctrl: boolean,
   meta: boolean,
   shift: boolean
  },
  key: integer
}
```

### Settings

You can specify extra settings in the second parameter or modifying ```ShortcutInput.defaults```. 

#### eventPrefix

Prefix used by events, default ```shortcutInput.```

#### glue

String used for concatening shortcut parts, default ```(empty)```

#### mapping

Allowed keys and their visual representation

#### order

Display order, default ```['ctrl', 'alt', 'shift', 'meta']```
