# Template syntax [​](#template-syntax){.header-anchor aria-label="Permalink to \"Template syntax\""} {#template-syntax tabindex="-1"}

Blits uses an easy-to-read *XML-style* template syntax. The syntax is
inspired by frameworks like VueJS, so if you are familiar with Vue, you
will probably recognize certain concepts.

The `template` key in the *Component configuration object* is used to
specify a string with this XML-like template structure. Templates can
often span multiple lines. In those cases, it\'s advisable to use
`template literals` (enclosed by backticks).

Similar to HTML, you can use arguments and nested tags. Self-closing
tags and HTML-style comments are also supported in Blits templates.

The default tag that can be used in templates is the `<Element>` tag.
The Element tag corresponds to a node in the Lightning 3 renderer.

For each element, there is a set of predefined render properties, such
as `x`, `y`, `w`, `color` that define how the element looks and where it
is positioned. Detailed information on all the attributes supported by
the `<Element>` tag can be found [here](./element_attributes.html).

Now let\'s consider the following template example:

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element x="20" y="20">
  <Element w="100" h="100" x="360" color="#0891b2" />
  <Element w="$width" h="$height" color="$color" />
  <Element :w="$changingWidth" :h="Math.floor($height / 5)" :color="$highlight" />
</Element>
```
:::

## Hardcoded arguments [​](#hardcoded-arguments){.header-anchor aria-label="Permalink to \"Hardcoded arguments\""} {#hardcoded-arguments tabindex="-1"}

In the template above, you\'ll observe certain arguments with hardcoded
values (i.e. `w="100"` and `color="#0891b2"`). You can use hardcoded
arguments to configure the parts of your template that you know will
never change.

## Dynamic arguments [​](#dynamic-arguments){.header-anchor aria-label="Permalink to \"Dynamic arguments\""} {#dynamic-arguments tabindex="-1"}

Additionally, some arguments contain a value prefixed with a dollar sign
(`$`). These are so called *dynamic* arguments.

The `$`-sign used in a template refers to a (state) variable on the
Component. And when the template renders, it automatically populates
these arguments with dynamic values based on the initial state of your
Component.

It\'s important to realize that dynamic arguments are only set *once*.
Changing a value used in a dynamic argument, won\'t be reflected on
screen. For that you will need to use *reactive* arguments.

## Reactive arguments [​](#reactive-arguments){.header-anchor aria-label="Permalink to \"Reactive arguments\""} {#reactive-arguments tabindex="-1"}

If you look at the template example above you\'ll notice that certain
arguments are prefixed with a colon sign (`:`). Prefixing an argument
with a colon makes it not only dynamic but also *reactive*.

Reactive arguments are set with the initial state value when your
component first renders, exactly as a dynamic argument does.

The difference is that a *re-render* of (a portion of) the template will
be triggered whenever the referenced value in your Component\'s internal
state changes.

This concept of *reactive data binding* eliminates the need for manual
template patching and allows for a declarative way of programming.

Reactive arguments also support *interpolation*. This enables the use of
simple JavaScript instructions, such as ternary conditions or basic
String and Math manipulations, right inside your template arguments.

For more complex logic, it\'s recommended to abstract this into a
[Component method](./../components/methods.html) or a [Computed
property](./../components/computed_properties.html).

# Abstracting template portions to custom components [​](#abstracting-template-portions-to-custom-components){.header-anchor aria-label="Permalink to \"Abstracting template portions to custom components\""} {#abstracting-template-portions-to-custom-components tabindex="-1"}

As your template grows in complexity, you may want to organize your
codebase with custom components, abstracting a complex template into
smaller, reusable pieces.

When you\'ve abstracted a portion of a template into a separate
component, a *Menu* component for example, you\'ll first need to
`import` the file that contains the Menu component.

Next, you have to *register* the imported custom component. The
`components`-key in the *configuration object* is used for this.

The `components` key is an *object literal*, where the value is the
reference to the custom Blits component and the key will correspond with
the *tag* that can be used in the template to insert the component.

Once this is done, the tag (`<Menu>` for example) is available for use
in your component\'s template. You can use the component tag as many
times as you want. For each tag, a new Component instance will be
created.

The example below shows how to use a custom `Menu` and `Button` (aliased
to `MyButton`) component inside a template.

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
import Menu from './components/menu.js'
import Button from './components/button.js'

export default Blits.Component('MyComponent', {
  components: {
    Menu, // makes <Menu /> available for use in the template
    MyButton: Button, // makes Button available as <MyButton /> in the template
  },
  template: `
    <Element>
      <Menu />
      <MyButton />
    </Element>
  `
})
```
:::
