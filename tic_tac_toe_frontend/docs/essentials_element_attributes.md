# Supported Element attributes [​](#supported-element-attributes){.header-anchor aria-label="Permalink to \"Supported Element attributes\""} {#supported-element-attributes tabindex="-1"}

The core building block of a Blits template is the `<Element>`-tag. The
Element tag corresponds directly to a node in the Lightning 3 Renderer.
You can style and position Elements via *attributes*, much like you
would do in plain HTML.

Blits Elements have a specific set of attributes that can be used. The
available attributes are loosely modeled after the properties of a
Lightning 3 renderer node. In certain cases, Blits provides more
developer friendly names or accepts a wider range of values, and
transparently takes care of the translation into L3 renderer
instructions.

## Positioning and Dimensions [​](#positioning-and-dimensions){.header-anchor aria-label="Permalink to \"Positioning and Dimensions\""} {#positioning-and-dimensions tabindex="-1"}

In order to position and set the dimensions of an Element, the following
attributes can be used.

- `x` - the x position of the Element in pixels, relative to its
  parent - allows negative values and decimals
- `y` - the y position of the Element in pixels, relative to its
  parent - allows negative values and decimals
- `z` - the z index of the element (optionally `zIndex` can be used as
  an alias)
- `w` - the width of the element in pixels (optionally `width` can be
  used as an alias)
- `h` - the height of the element in pixels (optionally `height` can be
  used as an alias)

All positioning and dimension related attributes, when not specified,
will default to `0`.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element x="100" y="100" w="800" h="400">
  <Element x="40" y="80" w="300" h="300" z="10" />
  <Element x="60" y="120" w="200" h="200" z="0" />
</Element>
```
:::

### Using percentages [​](#using-percentages){.header-anchor aria-label="Permalink to \"Using percentages\""} {#using-percentages tabindex="-1"}

Besides using values in pixels (i.e. `w="100" h="300"`), you can also
specify *percentages* for the positioning and dimensions attributes.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="400" h="100" x="800" y="900" color="#0284c7">
  <Element w="42%" h="30%" y="5%" x="1%" color="#075985" />
</Element>
```
:::

The percentage value specified for `w` and `x` will be calculated as the
percentage of the *width* (`w`) of the parent element. And the
percentage specified for `h` and `y` will use the *height* (`h`) of the
parent element as the base of the percentage calculation.

### Predefined placement options [​](#predefined-placement-options){.header-anchor aria-label="Permalink to \"Predefined placement options\""} {#predefined-placement-options tabindex="-1"}

In addition to the absolute positions that Blits and Lightning use,
there are a few predefined placement options available. By adding the
`placement`-attribute to an Element we can easily align it to the
*center*, *left*, *right*, *top*, *bottom*, or even a combination like
`{y: 'middle', x: 'left'}`, without having to calculate the positions
yourself.

On the `x`-axis the following *placement* options can be used: `left`
(default), `center` and `right`. On the `y`-axis the *placement*
attribute accepts `top` (default), `middle` and `bottom`.

The *placement* attribute also accepts an object with an `x` and a `y`
key, to specify a placement for both axes.

The placement of an Element is calculated based on the dimensions of its
direct parent. This means that the containing Element *must* have its
own dimensions (i.e. a `w` and a `h` attribute).

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="300" h="300">
  <!-- x placement -->
  <Element w="40" h="40" placement="left" color="#818cf8" />
  <Element w="40" h="40" placement="center" color="#2563eb" />
  <Element w="40" h="40" placement="right" color="#1e40af" />

  <!-- y placement -->
  <Element w="40" h="40" x="54" placement="top" color="#f472b6" />
  <Element w="40" h="40" x="54" placement="middle" color="#db2777" />
  <Element w="40" h="40" x="54" placement="bottom" color="#be185d" />

  <!-- x/y placement -->
  <Element w="40" h="40" placement="{x: 'center', y: 'bottom'}" color="#a3e635" />
  <Element w="40" h="40" placement="{x: 'right', y: 'middle'}" color="#65a30d" />
  <Element w="40" h="40" placement="{x: 'center', y: 'middle'}" color="#4d7c0f" />
</Element>
```
:::

> note: the `x` or `y` attributes on the Element are ignored for those
> axes defined in the `placement`-attribute

## Colors [​](#colors){.header-anchor aria-label="Permalink to \"Colors\""} {#colors tabindex="-1"}

By default, Elements have a transparent background color. The `color`
attribute can be used to give an Element a color.

If you are familiar with Lightning 2: colors have gotten a lot easier
with Blits. Under the hood, the Lightning 3 renderer still uses the
somewhat unfamiliar (but efficient) `0xffc0ffee` syntax. In Blits, you
can specify colors as you are used to in HTML and CSS.

Blits accepts the following color formats and makes sure that they are
converted in a way the Lightning 3 renderer can understand.

- hexadecimal (i.e. `#ff4433`)
- hexadecimal with an alpha channel (i.e `#55553380`)
- hexadecimal shorthands (i.e. `#333`)
- rgb (i.e. `rgb(180, 30, 50)`)
- rgba (i.e `rgba(40, 30, 180, 0.5)`)
- html color names (i.e. `red`, `blue`, `skyblue`, `tomato`)

*HSL and HSLA formats are planned to be added in the future.*

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" color="#ff4433" />
<Element w="200" h="200" color="#55553380" />
<Element w="200" h="200" color="#333" />
<Element w="200" h="200" color="rgb(180, 30, 50)" />
<Element w="200" h="200" color="rgba(40, 30, 180, 0.5)" />
<Element w="200" h="200" color="black" />
<Element w="200" h="200" color="red" />
<Element w="200" h="200" color="skyblue" />
```
:::

### Basic linear gradients [​](#basic-linear-gradients){.header-anchor aria-label="Permalink to \"Basic linear gradients\""} {#basic-linear-gradients tabindex="-1"}

The color attribute can also be used to specify basic linear gradients.

A linear gradient can be defined by specifying an *object literal* as
the `color` attribute instead of a single color. The object can consist
of a mix of `top`, `bottom`, `left`, `right` keys, with the color to use
for that side as a value. If a specific side isn\'t specified, it
defaults to `transparent`.

Again, you can use \"normal\" notation for the colors (like hexadecimal
or rgba) and you are free to mix and match formats.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" color="{top: 'red', bottom: 'blue'}" />
<Element w="200" h="200" color="{left: 'rgba(255,255,255,.5)', right: '#000'}" />
<Element w="200" h="200" color="{left: '#aaa333', top: 'aqua', 'bottom: rgb(255,100,20)'}" />
<Element w="200" h="200" color="{bottom: 'black'}" />
```
:::

## Alpha and visibility [​](#alpha-and-visibility){.header-anchor aria-label="Permalink to \"Alpha and visibility\""} {#alpha-and-visibility tabindex="-1"}

The opacity of an Element can be controlled by setting the `alpha`
attribute. This attribute accepts a value between `0` (fully
transparent) and `1` (completely visible).

The value of alpha is also applied recursively to the children of the
Element that has its alpha set. If you just want the background color of
an Element to be semi-transparent, you should set the alpha channel in
the `color` instead of applying the `alpha` attribute.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
  <Element w="200" h="200" color="blue" alpha="0.8">
    <Element w="100" h="100" color="red" alpha="0.3" />
  </Element>
```
:::

## Rotation and scaling [​](#rotation-and-scaling){.header-anchor aria-label="Permalink to \"Rotation and scaling\""} {#rotation-and-scaling tabindex="-1"}

If you want to rotate an Element, you can use the `rotation` attribute.
The rotation attribute in Blits accepts values in *degrees*.

The rotation of an Element is also automatically applied to any children
down the tree.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" color="blue" rotation="90">
  <Element w="100" h="100" color="red" rotation="240" />
</Element>
```
:::

For scaling an Element the `scale` attribute is used.

This attribute either accepts a single numeric value for scaling evenly
across width and height. Or an *object literal*, if you want to apply a
different scaling for the `x` and the `y` axis.

The value should be higher than `0` and the default value is `1`, which
means no scaling.

Any value below `1` will scale *down* the element and values greater
than `1` will scale the element *up*.

Similar to rotation, scale is also applied recursively to children down
the tree of the Element that has its `scale` attribute set.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" color="blue" scale="0.5" />
<Element w="200" h="200" color="#000" scale="2.3" />
<Element w="200" h="200" color="#000" scale="{x: 1, y: 3.14}" />
```
:::

## Mounting point [​](#mounting-point){.header-anchor aria-label="Permalink to \"Mounting point\""} {#mounting-point tabindex="-1"}

For advanced positioning, the `mount` attribute can come in handy. By
default when you set the `x` and `y` position of an Element, the
*top-left* corner will be set to that position. But in some cases, you
may want to align the position starting at a different corner, or even
any arbitrary point in between.

The `mount` attribute accepts an *object literal* that allows you to
precisely control the mount position on the *x-axis* and the mount
position on the *y-axis*. The default value is `{x: 0, y: 0}`, which
refers to the *top-left* corner.

In order to align the position starting at the *bottom-right* corner, we
would set `mount` to `{x: 1, y: 1}` and `{x: 0.5, y: 0.5}` would align
the position at the *center* of the Element.

If you omit either the `x` or the `y` key from the *object literal*, its
value will default to `0`.

In the case where the `x` and `y` values are the same (i.e. centering
with `{x: 0.5, y: 0.5}`), you can also just supply a single value
(`mount="0.5"`) instead of the object literal notation.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" x="20" y="100" color="#333" mount="{x: 0.5, y: 0.8}" />
<Element w="200" h="200" x="800" y="400" color="#333" mount="{y: 1}" />
<Element w="200" h="200" x="800" y="700" color="#333" mount="0.5" />
```
:::

## Pivot point [​](#pivot-point){.header-anchor aria-label="Permalink to \"Pivot point\""} {#pivot-point tabindex="-1"}

The pivot point of an Element comes into play when it\'s rotated or
scaled. The pivot point defaults to the *center* of the Element, which
means that when setting `rotation` it rotates around the middle. And
when the Element is scaled it scales from the center out.

But sometimes you may want to rotate around the left corner, or scale
from the right side out. This can be controlled by adding the `pivot`
attribute to the Element and, similar to the `mount` attribute, specify
an *object literal* with an `x` and a `y` key.

Both `y` and `x` values should be anything between `0` and `1`, where
`{x: 0, y: 0}` sets the pivot point to the *top-left* corner and
`{x: 1, y: 1}` refers to the *bottom-right* corner. The default pivot
value is `{x: 0.5, y: 0.5}` (i.e. the center) and if you omit `x` or `y`
in your pivot object, it will default to `0.5`.

In the case where the `x` and `y` values are the same, you can also just
supply a single value (`pivot="0.9"`) instead of the object literal
notation.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element w="200" h="200" x="20" y="100" pivot="{x: 0.5, y: 0.8}" rotation="69" />
<Element w="200" h="200" x="800" y="400" pivot="{y: 1}" scale="3" />
<Element w="200" h="200" x="800" y="700" pivot="0.9" rotation="42" />
```
:::

## Clipping / overflow [​](#clipping-overflow){.header-anchor aria-label="Permalink to \"Clipping / overflow\""} {#clipping-overflow tabindex="-1"}

By default contents inside an Element (i.e. child Elements) will
overflow the boundaries of the parent, even when you give the parent
Element fixed dimensions.

In order to contain / cut off the content inside an Element\'s `w` and
`h`, you can add the `clipping="true"`-attribute. Setting `clipping` to
`false` restores the default behaviour of content overflowing.

Alternatively you can also use the `overflow`-attribute (and pass it
`true` or `false`), which works similar to clipping just mapped inversly
(i.e. `overflow="false"` ensures content that surpasses the parent
dimensions is clipped-off).
