# Transitions [​](#transitions){.header-anchor aria-label="Permalink to \"Transitions\""} {#transitions tabindex="-1"}

So far we have explored how to create components and draw elements on
the screen. But everything has been rather static so far.

We did learn how to *reactively* change values and trigger rerenders
based on that. So if you try the example below, you\'ll see that indeed
our golden element changes position. But it just jumps from one place to
another:

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
export default Blits.Component('Gold', {
  template: `
    <Element color="gold" w="100" h="100" :x="$x" :y="$y" />
  `,
  state() {
    return {
      x: 0,
      y: 0,
    }
  },
  input: {
    enter() {
      this.x = this.x + 100
      this.y = this.y + 50
    }
  },
```
:::

Using *transitions* we really make our App come alive.

## Applying a transition [​](#applying-a-transition){.header-anchor aria-label="Permalink to \"Applying a transition\""} {#applying-a-transition tabindex="-1"}

Blits offers an easy and intuitive way to apply transitions. All you
need to do is add the `.transition` modifier to a reactive attribute,
and now whenever you change the value referenced in the attribute, it
will automatically *smooth* into the new value.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
export default Blits.Component('Gold', {
  template: `
    <Element color="gold" w="100" h="100" :x.transition="$x" :y.transition="$y" />
  `,
  state() {
    return {
      x: 0,
      y: 0,
    }
  },
  input: {
    enter() {
      this.x = this.x + 100
      this.y = this.y + 50
    }
  },
```
:::

If we try out the modified example above, you\'ll notice how much
difference adding a simple transition makes.

When the `.transition`-modifier is added to a reactive attribute, a
default `ease-in` transition with a duration of `300ms` is applied

## Customizing transitions [​](#customizing-transitions){.header-anchor aria-label="Permalink to \"Customizing transitions\""} {#customizing-transitions tabindex="-1"}

While the default transition will look pretty good out of the box and is
great for quickly improving the look of your App, you may want to
customize specific transitions.

Blits gives you full control over your transitions, with a simple to use
format, right inside your template.

Instead of referencing your component\'s state variable directly, you
can also supply an inline
``` object literal`` in the attribute with a  ```.transition\`-modifier.
This will allow you to pass a number of options to change the way the
transition will work.

The transition object must have a `value` key, which references the
state variable (or prop or computed property) that triggers the
transition.

Furthermore, you can specify:

- `duration` - the duration of the transition in `ms`
- `delay` - the time in `ms` after which the transition should initiate
- `easing` - the easing function of the transition. Can be one of the
  default easing options listed below, or a custom `cubic-bezier`
  definition (i.e. `cubic-bezier(0,1.35,.99,-0.07)`).

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element color="gold" w="100" h="100"
  :x.transition="{value: $x, duration: 300, easing: 'ease-in-back', delay: 400}"
  :y.transition="{value: $x, duration: 300, easing: 'cubic-bezier(1,-0.64,0.39,1.44)'}">
</Element>
```
:::

Besides a reference to the `value`, you can also use dynamic values for
the other keys in the transition object. This way you\'ll be able to
dynamically control the delay, duration or easing function.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element color="gold" w="100" h="100"
  :x.transition="{value: $x, duration: $dynamicDuration, delay: $dynamicDelay}">
</Element>
```
:::

### Available easing functions [​](#available-easing-functions){.header-anchor aria-label="Permalink to \"Available easing functions\""} {#available-easing-functions tabindex="-1"}

- `ease-in`
- `ease-out`
- `ease-in-out`
- `ease-in-sine`
- `ease-out-sine`
- `ease-in-out-sine`
- `ease-in-cubic`
- `ease-out-cubic`
- `ease-in-out-cubic`
- `ease-in-circ`
- `ease-out-circ`
- `ease-in-out-circ`
- `ease-in-back`
- `ease-out-back`
- `ease-in-out-back`

## Listening to transition events [​](#listening-to-transition-events){.header-anchor aria-label="Permalink to \"Listening to transition events\""} {#listening-to-transition-events tabindex="-1"}

Sometimes you may want to perform an action when a transition *ends* or
when it *starts*.

You can easily hook into these transition events by adding a `start` and
`end` key to the transition object. Both values should be a function (or
a reference to a `method` on your component).

The `start` function will be called when the transition actually starts
(after a possible specified delay) and the `end` function is called as
soon as the transition is finished.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
export default Blits.Component('Gold', {
  template: `
    <Element color="gold" w="100" h="100"
      :x.transition="{value: $x, start: $transitionBegin, end: $transitionEnd}"
    />
  `,
  ///
  methods: {
    transitionBegin() {
      //
    },
    transitionEnd() {
      //
    },
  }
```
:::

It is also possible to keep track of the entire progress of a
transition. Every frametick during a transition (ideally once every
16ms), the renderer reports the progress of the transition. You can hook
into this event by specifying a `progress` key on the transition
configuration object, with a function to excute.

This function is executed *every* frametick, and receives the current
progress and the previous progress as its arguments. The progress is
indicated as a value between `0` and `1`, where 0 means start and 1
means finished.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
export default Blits.Component('Gold', {
  template: `
    <Element color="gold" w="100" h="100"
      :x.transition="{value: $x, progress: $transitionProgress}"
    />
  `,
  ///
  methods: {
    transitionProgress(progress, previousProgress) {
      if(progress >= 0.5 && previousProgress < 0.5) {
        // halfway through the transition
      }
    },
  }
```
:::
