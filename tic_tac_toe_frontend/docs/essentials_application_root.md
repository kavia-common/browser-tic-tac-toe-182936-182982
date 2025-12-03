# Application root [​](#application-root){.header-anchor aria-label="Permalink to \"Application root\""} {#application-root tabindex="-1"}

Every Blits App starts with a base Application component.

Ultimately this Application is a component like any regular Blits
component. But it is augmented with some extra functionality.
`Blits.Application` is responsible for setting up the listeners for
keyhandling for example.

You can only have 1 Application component per App. By default, this file
is named `App.js` and it is placed in the root of the `src`-folder.

`src/App.js` will look something like this:

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
import Blits from '@lightningjs/blits'

export default Blits.Application({
  template: `
    <Element></Element>
   `,
})
```
:::
