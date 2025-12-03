# Watchers [​](#watchers){.header-anchor aria-label="Permalink to \"Watchers\""} {#watchers tabindex="-1"}

In some cases, you may want to execute specific actions whenever the
value of a state variable, a prop, or a computed property changes. These
actions could involve dispatching an event or updating another state
variable.

You might be tempted to handle this functionality inside a computed
property, but this is not recommended. Computed properties should not
have side effects, to prevent the risk of falling into an endless loop.

Instead, Blits allows you to specify **watchers** to trigger
functionality when certain variables change.

## Using Watchers [​](#using-watchers){.header-anchor aria-label="Permalink to \"Using Watchers\""} {#using-watchers tabindex="-1"}

Within the `watch` key of the *Component configuration object*, you can
define an object of *watcher functions*.

The name of each function should correspond with the name of the state
variable, the prop, or the computed property that you want to observe.
Whenever the value of the observed target changes, the respective
watcher function will be invoked.

The watcher function receives two arguments: the *new value* and the
*old value* of the observed property. This allows you to perform
specific actions based on the changes.

::: {.language-javascript .vp-adaptive-theme}
[javascript]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
{
  state() {
    return {
      alpha: 0.2
    }
  },
  watch: {
    alpha(value, oldValue) {
      if(value > oldValue) {
        // Execute some logic when the 'alpha' value increases
      }
    },
  }
}
```
:::

In this example, whenever the value of state variable `alpha` changes,
the `alpha` watcher function will be invoked. The function checks if the
new value is greater than the old value and executes custom logic
accordingly.
