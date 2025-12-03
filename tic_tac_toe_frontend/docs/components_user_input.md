# Handling User Input [​](#handling-user-input){.header-anchor aria-label="Permalink to \"Handling User Input\""} {#handling-user-input tabindex="-1"}

In order to allow users to interact with your app, you will want to
capture and handle *user input*. If you are developing a TV based app
this will often be key input via a remote control.

Blits offers an intuitive and straightforward interface to handle key
input in Components.

## Focus [​](#focus){.header-anchor aria-label="Permalink to \"Focus\""} {#focus tabindex="-1"}

Before diving into the specifics of key handling, it is important to
understand the basic concept of *focus*.

In a Blits app, there is always *one* Component that has the focus. By
default, this will be the root Application component.

The component that has focus, is the one that is responsible for
handling the user input at that moment.

For example, when a user clicks the *right* or *left* button while a
*Poster Component* has focus, it is that instance of the Poster
Component that will *receive* the first key press event.

## Configuring Input Handling [​](#configuring-input-handling){.header-anchor aria-label="Permalink to \"Configuring Input Handling\""} {#configuring-input-handling tabindex="-1"}

Within the Component configuration object, the `input` key is used to
define how the component should react to specific key presses when it
has focus. The `input` key should be an `object literal` of `functions`
for each input event that the component wants to handle.

Each function corresponds to a *key press name*, such as `up`, `down`,
`enter`, `space`, `back`, `1`, `2`, `a` etc and each function defined in
the `input` object, receives the full `InputEvent` object as its first
argument.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
export default Blits.Component('MyComponent', {
  // ...
  input: {
    up(e) {
      // Logic to execute when users press up
    },
    down(e) {
      // Logic to execute when users press down
    },
    enter(e) {
      // Logic to execute when users press enter
    },
  }
}
```
:::

## Catch-All Handling [​](#catch-all-handling){.header-anchor aria-label="Permalink to \"Catch-All Handling\""} {#catch-all-handling tabindex="-1"}

To allow a focused component to respond to any key and act as a
*catch-all*, you can add an `any()` function to the input object. As it
receives the `InputEvent` object as the first argument, you can abstract
the key press in there and handle (or ignore) it as you wish.

::: {.language-javascript .vp-adaptive-theme}
[javascript]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
{
  input: {
    any(e) {
      // Logic to execute for any key press
    },
  }
}
```
:::

## Event Handling Chain [​](#event-handling-chain){.header-anchor aria-label="Permalink to \"Event Handling Chain\""} {#event-handling-chain tabindex="-1"}

If the currently focused component does not handle a key press, Blits
will traverse up the component hierarchy, checking for any *parent*
component that does have a function defined for that key press in the
`input`-key. This input event handling chain continues until it reaches
the root Application component.

When a component handles a key press by having a corresponding function
specified, said component receives focus, and the event handling chain
stops by default. However, if you want the input event to propagate up
the hierarchy further, you can move the focus to the parent element and
pass the `InputEvent` object on in that function call.

::: {.language-javascript .vp-adaptive-theme}
[javascript]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
{
  input: {
    enter() {
      // Give focus to the parent
      this.parent.focus();
    },
    back(e) {
      // Give focus to the parent and let the user input event bubble
      this.parent.focus(e);
    },
  }
}
```
:::

## Intercepting key input [​](#intercepting-key-input){.header-anchor aria-label="Permalink to \"Intercepting key input\""} {#intercepting-key-input tabindex="-1"}

In addition to the Event handling chain explained above. Blits offers
the option to *intercept* key presses at the root level of the
Application, before they reach the currently focused Component. This can
be useful in certain situation where you want to globally disable all
key presses, or when implementing an override key press handler.

The `intercept()` input-method can only be implemented in the
`Blits.Application`-component. When present, the method acts as a
*catch-all* method, and will be executed for *all* key presses. It
receives the `KeyboardEvent` as its argument, allowing you to execute
logic based on the key being pressed.

Only when the `intercept()` input-method returns the `KeyboardEvent`
(possibly modified), the keypress will continue to be handled (by the
currently focused Component).

The `intercept`-method can also be an asynchronous method.

## Key-up handling [​](#key-up-handling){.header-anchor aria-label="Permalink to \"Key-up handling\""} {#key-up-handling tabindex="-1"}

The functions specified in the `input` configuration are invoked when a
key is *pressed down* (i.e. the `keydown` event listener). But sometimes
you may also want to execute some logic when a key is *released* (i.e.
the `keyup` event listener).

Instead of introducing a separate key on the Component configuration
object for key release callbacks, Blits relies on the concept that a
`keyup` event is always preceded by a `keydown` event.

Following this logic, whenever you return a function in an input (key
down) handler, this function will be executed upon release (i.e. the
`keyup` event) of that key .

When an input key is being a hold down, it will execute the key down
handler multiple times. Upon key release, only the last returned key up
callback function will be executed.

::: {.language-javascript .vp-adaptive-theme}
[javascript]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
Blits.Component('MyComponent', {
  //
  input: {
    enter() {
      // execute logic on key down
      this.pressedEnter = true
      return () => {
        // execute logic on key up
        this.pressedEnter = false
      }
    },
    space(e) {
      // not logic on key down
      return () => {
        // only execute logic on key up
        console.log('Space key released')
      }
    },
    left() {
      // some logic on key down here ..
      this.leftHold = true
      // return a reference to a Component method
      // (instead of creating a new function on the fly)
      return this.leftKeyUp
    }
  },
  methods: {
    leftKeyUp() {
      console.log('Left key up')
      this.leftHold = false
    }
  }
}
```
:::

## Custom Keycode mapping [​](#custom-keycode-mapping){.header-anchor aria-label="Permalink to \"Custom Keycode mapping\""} {#custom-keycode-mapping tabindex="-1"}

Blits comes with a default keycode mapping. This mapping is a sensible
default that works in your desktop browser and with most RDK based
devices.

But it\'s possible that the keycodes and mapping of your target device
are slightly or even completely different.

In Blits, you can easily configure the key mapping to match your needs.
In the `src/index.js` file where we instantiate the App via the
`Blits.Launch` function, we can add an extra key, called `keymap`, to
the *settings object*.

The `keymap` should contain an object literal, where you map a `key` or
`keyCode` (from the `KeyboardEvent`) to an event name that you can use
in your Components.

> You can use a site like
> [keyjs.dev](https://keyjs.dev/){target="_blank" rel="noreferrer"} to
> find the appropriate key and keyCode for your device

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
// src/index.js
Blits.Launch(App, 'app', {
  w: 1920,
  h: 1080,
  //...
  keymap: {
    // switch left and right using the key
    ArrowLeft: 'right',
    ArrowRight: 'left',
    // switch up and down using the keyCode
    38: 'down',
    40: 'up',
    // register new handlers
    '.': 'dot', // dot() can now be used in the input object
    // key code for letter 's'
    83: 'search' // search() can now be used in the input object
  }
})
```
:::

The custom keymap object will be merged with the default key mapping,
that looks like this:

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const defaultKeyMap = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  Enter: 'enter',
  ' ': 'space',
  Backspace: 'back',
  Escape: 'escape',
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down',
  13: 'enter',
  32: 'space',
  8: 'back',
  27: 'escape',
}
```
:::
