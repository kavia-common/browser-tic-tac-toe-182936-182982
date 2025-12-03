import Blits from '@lightningjs/blits'

import TicTacToe from './pages/TicTacToe.js'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [{ path: '/', component: TicTacToe }],
})
