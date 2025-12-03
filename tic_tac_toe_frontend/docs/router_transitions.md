# Router Transitions [​](#router-transitions){.header-anchor aria-label="Permalink to \"Router Transitions\""} {#router-transitions tabindex="-1"}

Page transitions add a layer of visual polish to your application by
animating the change between routes.

When the router in Blits navigates to a new page, it automatically
applies a subtle *fade-in / fade-out* transition. Blits also allows to
specify custom transitions on a per-route basis.

## Defining Route Transitions [​](#defining-route-transitions){.header-anchor aria-label="Permalink to \"Defining Route Transitions\""} {#defining-route-transitions tabindex="-1"}

In the Route object, the `transition` key can be used to specify which
transition should be applied when navigating *to* that route.

It accepts a *Transition* object, with 3 optional keys: `before`, `in`,
`out`.

### Before [​](#before){.header-anchor aria-label="Permalink to \"Before\""} {#before tabindex="-1"}

The `before` key is used to set a property to a certain value *before*
the page transition starts. The properties are set on the page that is
being navigated *to*. For example, it can be used to position the page
out of screen by setting the `x` value to a negative value, in order to
create a *slide in from the right* effect. Or the `alpha` property can
be set to `0` if you want to create a *fade-in* effect.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const pageTransition = {
  // position the new page outside the screen on the left side
  before: {
    prop: 'x',
    value: -1920
  }
}
```
:::

In order to set multiple properties to an initial state, an Array of
objects can be assigned to the `before` key.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const pageTransition = {
  // position the new page outside the screen on the left side
  // and set the alpha to 0
  before: [{
    prop: 'x',
    value: -1920
  },{
    prop: 'alpha',
    value: 0
  }]
}
```
:::

### In [​](#in){.header-anchor aria-label="Permalink to \"In\""} {#in tabindex="-1"}

The `in`-key is used to define how the new page should transition *into*
the screen, given the initial defaults, in combination with any
properties set in the optional `before` key.

The transition is defined by a *Transition* object, consisting of:

- `prop` - the property to apply the transition on
- `value` - the value to transition to
- `duration` (optional) - the duration of the transition in milliseconds
  (defaults to `300ms`)
- `easing` (optional) - the easing function applied to the transition
  (defaults to `ease-in`)

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const pageTransition = {
  // position the new page outside the screen on the left side
  before: {
    prop: 'x',
    value: -1920
  },
  // transition the new page from outside, into the screen
  in: {
    prop: 'x',
    value: 0,
    duration: 800,
    easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'
  }
}
```
:::

In order to transition multiple properties, an Array of objects can be
assigned to the `in` key.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const pageTransition = {
  // position the new page outside the screen on the left side
  // and set the alpha to 0
  before: [{
    prop: 'x',
    value: -1920
  },{
    prop: 'alpha',
    value: 0
  }],
  // transition the new page from outside, into the screen
  // and transition the alpha from 0 to 1
  in: [{
    prop: 'x',
    value: 0,
    duration: 800,
    easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'
  },{
    prop: 'alpha',
    value: 1,
    duration: 500,
  }]
}
```
:::

### Out [​](#out){.header-anchor aria-label="Permalink to \"Out\""} {#out tabindex="-1"}

Finally the `out`-key is used to define how the old page should
transition *out of* the screen.

Similar to the `in`-transition, the `out`-transition is defined by a
*Transition object*, consisting of:

- `prop` - the property to apply the transition on
- `value` - the value to transition to
- `duration` (optional) - the duration of the transition in milliseconds
  (defaults to `300ms`)
- `easing` (optional) - the easing function applied to the transition
  (defaults to `ease-in`)

And in order to transition multiple properties at the same time during
the *out* transition, an Array of transition objects can be supplied.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
const pageTransition = {
  // position the new page outside the screen on the left side
  // and set the alpha to 0
  before: [{
    prop: 'x',
    value: -1920
  },{
    prop: 'alpha',
    value: 0
  }],
  // transition the new page from outside, into the screen
  // and transition the alpha from 0 to 1
  in: [{
    prop: 'x',
    value: 0,
    duration: 800,
    easing: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'
  },{
    prop: 'alpha',
    value: 1,
    duration: 500,
  }],
  // slide up the old page
  // while rotating
  out: [{
    prop: 'y',
    value: -1080
  },{
    prop: 'rotate',
    value: 720
  }]
}
```
:::
