# Displaying Images [​](#displaying-images){.header-anchor aria-label="Permalink to \"Displaying Images\""} {#displaying-images tabindex="-1"}

Now that we\'ve covered the basics of creating Elements, as well as
styling and positioning them, it\'s time to move away from these boring
rectangles and explore how you can incorporate *images* into your App.

In Blits, it is very easy to display an image. Simply add the `src`
attribute to an Element, specifying the image\'s location.

For local images, make sure to place them in the `public` folder of your
App (e.g., `public/assets/background.jpg` or `public/images/logo.png`)
and refer to them with a *relative* path (but omitting the `public`
folder as root).

Remote images are also supported and can be linked directly (e.g.,
`http://mycdn.com/artists/jimi_hendrix/woodstock.jpg`).

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element src="images/logo.png" w="100" h="80" />
<Element src="http://mycdn.com/artists/jimi_hendrix/woodstock.jpg" w="1920" h="1080" />
```
:::

## Sizing and Scaling [​](#sizing-and-scaling){.header-anchor aria-label="Permalink to \"Sizing and Scaling\""} {#sizing-and-scaling tabindex="-1"}

Make sure to give your Element a width (`w` ) and a height (`h`)
attribute. Images will *not* be rendered if they don\'t have both
attributes present. The Lightning renderer will scale the image to fit
these exact dimensions.

For the best performance, it\'s important to keep your source images as
small as possible. If you\'re displaying an image at `200px x 200px`,
make sure the image is exactly that size or *smaller*. The latter option
may lead to some quality loss, but can positively impact the overall
performance of your App.

## Colorization [​](#colorization){.header-anchor aria-label="Permalink to \"Colorization\""} {#colorization tabindex="-1"}

You also have the option to *colorize* an image on the fly. Just add a
`color` attribute to the Element with a `src` attribute. You can use a
single color, or apply a gradient.

By default, all Elements with a `src` attribute get a solid white
background, with the result that the actual colors of the image will be
shown.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element
  w="200"
  h="300"
  :src="$src"
  color="{top: '#fff', bottom: '#000'}"
/>
```
:::

## Asynchronous Loading [​](#asynchronous-loading){.header-anchor aria-label="Permalink to \"Asynchronous Loading\""} {#asynchronous-loading tabindex="-1"}

All images are loaded asynchronously (and can possibly fail to load),
even those local to your App. Blits allows you to easily hook into the
`loaded` and `error` events of image Elements.

You can use this, for example, to only make something visible once an
image is fully loaded. Or to display a fallback image when a remote
image can\'t be retrieved.

::: {.language-xml .vp-adaptive-theme}
[xml]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
<Element src="http://mycdn.com/lightning.jpg" @loaded="$revealPage" @error="$showFallback" />
```
:::

> Note how events are prefixed with a `@` sign.

Considering the template above you would do something like the following
in the `methods` key of your Component configuration object:

::: {.language-js .vp-adaptive-theme}
[js]{.lang}

``` {.shiki .shiki-themes .github-light .github-dark .vp-code tabindex="0"}
{
  //...
  methods: {
    revealPage(dimensions) {
      this.$log.info('Image dimensions', dimensions.w, dimensions.h)
      this.show = true
    },
    showFallback(error) {
      this.$log.error('Image failed to load', error)
      this.showBackupImage()
    }
  }
}
```
:::

The `loaded` event receives image dimensions as its argument and the
`error` event receives an error message explaining the failure.
