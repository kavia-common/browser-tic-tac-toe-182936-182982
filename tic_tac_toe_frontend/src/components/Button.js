import Blits from '@lightningjs/blits'

export default Blits.Component('Button', {
  template: `
      <Element>
          <Text :content="$isFavorited ? $unfavoriteText : $favoriteText"></Text>
      </Element>
    `,
  state() {
    return {
      isFavorited: false,
      favoriteText: 'Press Enter',
      unfavoriteText: 'Press Enter Again',
    }
  },
  input: {
    enter() {
      this.isFavorited = !this.isFavorited
    },
  },
})
