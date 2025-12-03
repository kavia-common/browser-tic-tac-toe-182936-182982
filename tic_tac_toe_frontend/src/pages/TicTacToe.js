import Blits from '@lightningjs/blits'

/**
 * Ocean Professional theme tokens for easy reuse.
 */
const THEME = {
  primary: '#2563EB',
  secondary: '#F59E0B', // also success
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  shadow: 0.15,
}

/**
 * Compute winning combinations for a 3x3 board.
 */
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
]

/**
 * Return winner result: {winner: 'X'|'O'|null, line: number[]|null, draw: boolean}
 * given the board array of 9 entries with 'X', 'O', or null.
 */
function evaluateBoard(board) {
  for (const line of WIN_LINES) {
    const a = line[0]
    const b = line[1]
    const c = line[2]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: line, draw: false }
    }
  }
  const allFilled = board.every((val) => val)
  return { winner: null, line: null, draw: allFilled }
}

/**
 * Utility to map a cell index to x,y in the centered grid.
 * We center the 3x3 board at (960,540) with responsive sizing.
 */
function cellLayout(index, boardSize) {
  const padding = Math.round(boardSize * 0.02)
  const cellSize = Math.floor((boardSize - padding * 4) / 3) // 4 paddings between/around 3 cells
  const row = Math.floor(index / 3)
  const col = index % 3
  const x = col * (cellSize + padding)
  const y = row * (cellSize + padding)
  return { x, y, cellSize, padding }
}

export default Blits.Component('TicTacToe', {
  template: `
    <Element w="1920" h="1080" :color="$bgColor">
      <!-- Center Container -->
      <Element :x="1920/2" :y="1080/2" mount="{x:0.5, y:0.5}">
        <!-- Status -->
        <Element :y="-($boardSizeComputed/2) - 140" :x="0" mount="{x:0.5}">
          <Element :w="$boardSizeComputed" h="100" :x="0" mount="{x:0.5}"
            :color="$surfaceColor"
            :effects="$statusEffects">
            <Text :x="$boardSizeComputed/2" y="50" mount="{x:0.5, y:0.5}" :color="$textColor" size="48" :content="$statusText" />
          </Element>
        </Element>

        <!-- Board Surface -->
        <Element :w="$boardSizeComputed" :h="$boardSizeComputed" :x="0" :y="0" mount="{x:0.5, y:0.5}"
          :color="$surfaceColor"
          :effects="$boardEffects">

          <!-- 9 Cells -->
          <Element
            :for="(cell, idx) in $boardRender"
            :key="$cell.id"
            :x="$cell.x"
            :y="$cell.y"
            :w="$cell.size"
            :h="$cell.size"
            :color="$cell.bg"
            :effects="$cellEffects"
            @enter="$onCellEnter"
            @focus="$onCellFocus"
            @unfocus="$onCellUnfocus"
            >
            <!-- Hover/Focus Overlay -->
            <Element :alpha="$cell.focusAlpha" :w="$cell.size" :h="$cell.size" :color="$cell.focusColor"
              :effects="$cellEffects" />

            <!-- Cell Border (subtle divider lines) -->
            <Element :w="$cell.size" :h="$cell.size" color="#000000"
              :alpha="0.06" :effects="$cellEffects" />

            <!-- Knight / Queen SVG icon -->
            <Element
              :x="$cell.size/2"
              :y="$cell.size/2"
              mount="{x:0.5, y:0.5}"
              :alpha="$cell.symbolAlpha"
              :scale.transition="$cell.scaleTransition"
            >
              <!-- Invisible accessible text for screen readers via off-canvas Text (Lightning does not expose aria, so we provide descriptive text node) -->
              <Text :content="$cell.alt" alpha="0" x="-10000" y="-10000" size="1" />
              <!-- Use a vector path to draw icons. We ensure fill matches theme color and paths are centered. -->
              <!-- Knight (for X) -->
              <Element
                :alpha="$cell.isKnight ? 1 : 0"
                :w="$cell.iconSize"
                :h="$cell.iconSize"
                mount="{x:0.5,y:0.5}"
              >
                <!-- Simple stylized knight silhouette -->
                <Path
                  :commands="$knightPath"
                  :fill="$cell.symbolColor"
                  :stroke="$cell.stroke"
                  :strokeWidth="$cell.strokeW"
                />
              </Element>
              <!-- Queen (for O) -->
              <Element
                :alpha="$cell.isQueen ? 1 : 0"
                :w="$cell.iconSize"
                :h="$cell.iconSize"
                mount="{x:0.5,y:0.5}"
              >
                <!-- Minimal queen with crown points -->
                <Path
                  :commands="$queenPath"
                  :fill="$cell.symbolColor"
                  :stroke="$cell.stroke"
                  :strokeWidth="$cell.strokeW"
                />
              </Element>
            </Element>

            <!-- Win highlight -->
            <Element :w="$cell.size" :h="$cell.size" :alpha="$cell.winAlpha"
              :color="$cell.winColor" :effects="$cellEffects" />
          </Element>
        </Element>

        <!-- Restart Button -->
        <Element :y="($boardSizeComputed/2) + 80" :x="0" mount="{x:0.5}"
          :w="$boardSizeComputed" h="110" alpha="1">
          <Element :x="$boardSizeComputed/2" y="0" mount="{x:0.5, y:0}"
            :w="$btnWidth" h="90"
            :color="$btnColor"
            :effects="$buttonEffects"
            @enter="$restart"
            @focus="$onBtnFocus"
            @unfocus="$onBtnUnfocus"
          >
            <Text :x="$btnWidth/2" :y="45" mount="{x:0.5, y:0.5}" size="40" :color="$btnTextColor" content="Restart" />
            <Element :x="0" :y="0" :w="$btnWidth" h="90" :alpha="$btnHoverAlpha"
              :color="$btnHoverColor" :effects="$buttonOnlyRadiusEffects" />
          </Element>
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      // Theme bindings
      bgColor: THEME.background,
      surfaceColor: THEME.surface,
      textColor: THEME.text,

      // Board/game state
      board: [null, null, null, null, null, null, null, null, null],
      xIsNext: true,
      winner: null,
      winLine: null,
      draw: false,

      // Focus tracking
      focusedIndex: 0,
      buttonFocused: false,

      // Layout
      boardSize: 720, // base size; will adapt on focus and transitions
      btnWidth: 260,

      // Hover/Focus alphas
      btnHoverAlpha: 0,
    }
  },
  computed: {
    /**
     * Reactive board sizing, can be made responsive later if needed.
     */
    boardSizeComputed() {
      return this.boardSize
    },
    statusText() {
      if (this.winner) {
        const piece = this.winner === 'X' ? 'Knight' : 'Queen'
        return 'Winner: ' + piece
      }
      if (this.draw) {
        return 'Draw!'
      }
      return 'Turn: ' + (this.xIsNext ? 'Knight' : 'Queen')
    },
    btnColor() {
      // Primary surface for button
      return THEME.primary
    },
    btnTextColor() {
      return '#ffffff'
    },
    btnHoverColor() {
      return '#ffffff'
    },
    // Precomputed effects to avoid inline object literals in template
    statusEffects() {
      return [this.$shader('radius', { radius: 16 }), this.$shader('shadow', { color: '#000000', alpha: THEME.shadow, blur: 24, spread: 2 })]
    },
    boardEffects() {
      return [this.$shader('radius', { radius: 24 }), this.$shader('shadow', { color: '#000000', alpha: THEME.shadow, blur: 32, spread: 3 })]
    },
    cellEffects() {
      return [this.$shader('radius', { radius: 16 })]
    },
    buttonEffects() {
      return [this.$shader('radius', { radius: 20 }), this.$shader('shadow', { color: '#000000', alpha: THEME.shadow, blur: 24, spread: 2 })]
    },
    buttonOnlyRadiusEffects() {
      return [this.$shader('radius', { radius: 20 })]
    },
    // Vector icon paths (normalized to a 100x100 box) for lightweight inline SVG-like rendering
    knightPath() {
      // Stylized knight silhouette path commands (M/L/C). Kept simple for low poly look and balance.
      return 'M20 85 L30 60 C20 55 20 45 28 40 L22 35 L28 30 L24 24 L36 20 L46 30 L58 28 C64 35 66 42 62 48 L70 54 L78 64 L76 72 L66 70 L62 78 L52 84 Z'
    },
    queenPath() {
      // Minimal queen with base and three spikes/crown points.
      return 'M20 80 L80 80 L74 70 L26 70 Z M26 70 L35 48 L50 62 L65 48 L74 70 Z M35 48 C32 42 36 36 42 36 C46 36 48 38 50 40 C52 38 54 36 58 36 C64 36 68 42 65 48'
    },
    stroke() {
      // Slight contrast stroke for visibility on white surface
      return '#0b1220'
    },
    strokeW() {
      return 2
    },
    scaleEase() {
      return this.$ease('quadratic-out')
    },
    /**
     * Prepare rendering data for each cell: positions, colors and symbols.
     */
    boardRender() {
      const res = []
      const result = evaluateBoard(this.board)
      const winSet = new Set(result.line || [])
      const bs = this.boardSizeComputed
      for (let i = 0; i < 9; i++) {
        const lay = cellLayout(i, bs)
        const isFocused = this.focusedIndex === i && !this.buttonFocused
        const value = this.board[i]
        const isOccupied = !!value
        const isWin = winSet.has(i)

        // Colors and overlays
        const baseCellColor = THEME.surface
        const focusOverlay = (this.winner || this.draw) ? 0 : (isFocused ? 0.15 : 0)
        const focusOverlayColor = this.xIsNext ? THEME.primary : THEME.secondary

        const symbolColor = isWin
          ? (this.winner === 'X' ? THEME.primary : THEME.secondary)
          : (value === 'X' ? THEME.primary : value === 'O' ? THEME.secondary : THEME.text)

        const winColor = this.winner ? (this.winner === 'X' ? THEME.primary : THEME.secondary) : THEME.primary
        const iconSize = Math.floor(lay.cellSize * 0.68)

        // Scale-in transition on placement (from 0.8 -> 1)
        const scaleTransition = isOccupied
          ? { value: 1, duration: 220, delay: 0, easing: this.scaleEase, start: 0.8 }
          : { value: isFocused ? 0.98 : 1, duration: 120, delay: 0, easing: this.scaleEase }

        // Accessibility text
        const alt = value === 'X' ? 'Knight' : value === 'O' ? 'Queen' : 'Empty'

        res.push({
          id: 'cell-' + i,
          x: lay.x,
          y: lay.y,
          size: lay.cellSize,
          bg: baseCellColor,
          focusAlpha: focusOverlay,
          focusColor: focusOverlayColor,

          // icon fields
          isKnight: value === 'X',
          isQueen: value === 'O',
          iconSize: iconSize,
          symbolAlpha: isOccupied ? 1 : 0,
          symbolColor: symbolColor,
          stroke: '#0b1220',
          strokeW: 2,
          scaleTransition,

          // win highlight
          isWin: isWin,
          winColor: winColor,
          winAlpha: isWin ? 0.2 : 0,

          // assistive text
          alt,
        })
      }
      return res
    },
  },
  hooks: {
    ready() {
      // Initial evaluation
      const res = evaluateBoard(this.board)
      this.winner = res.winner
      this.winLine = res.line
      this.draw = res.draw
      // Set initial focus to the grid's first cell
      this.focusedIndex = 0
    },
    focus() {
      // Default focus is first cell in the board
      this.buttonFocused = false
    },
  },
  methods: {
    /**
     * Handle selecting a cell via "Enter": place X/O if valid and update game result.
     */
    onCellEnter() {
      if (this.winner || this.draw || this.buttonFocused) return
      const idx = this.focusedIndex
      if (this.board[idx]) return // prevent overwriting

      const next = this.board.slice()
      next[idx] = this.xIsNext ? 'X' : 'O'
      this.board = next

      const res = evaluateBoard(this.board)
      this.winner = res.winner
      this.winLine = res.line
      this.draw = res.draw
      if (!this.winner && !this.draw) {
        this.xIsNext = !this.xIsNext
      }
    },
    /**
     * Restart the game to initial conditions.
     */
    restart() {
      this.board = [null, null, null, null, null, null, null, null, null]
      this.xIsNext = true
      this.winner = null
      this.winLine = null
      this.draw = false
      this.focusedIndex = 0
      this.buttonFocused = false
      this.btnHoverAlpha = 0
    },
    onBtnFocus() {
      this.buttonFocused = true
      this.btnHoverAlpha = 0.15
    },
    onBtnUnfocus() {
      this.buttonFocused = false
      this.btnHoverAlpha = 0
    },
    onCellFocus() {
      // noop; handled by boardRender focusAlpha
    },
    onCellUnfocus() {
      // noop
    },
  },
  input: {
    left() {
      if (this.buttonFocused) return
      if (this.winner || this.draw) return
      const c = this.focusedIndex % 3
      if (c > 0) this.focusedIndex = this.focusedIndex - 1
    },
    right() {
      if (this.buttonFocused) return
      if (this.winner || this.draw) return
      const c = this.focusedIndex % 3
      if (c < 2) this.focusedIndex = this.focusedIndex + 1
    },
    up() {
      if (this.buttonFocused) {
        // Move back to last focused cell when moving up from restart button
        this.buttonFocused = false
        return
      }
      if (this.winner || this.draw) return
      const r = Math.floor(this.focusedIndex / 3)
      if (r > 0) this.focusedIndex = this.focusedIndex - 3
    },
    down() {
      // Allow moving focus to Restart button when on bottom row
      if (this.buttonFocused) return
      const r = Math.floor(this.focusedIndex / 3)
      if (r === 2) {
        this.buttonFocused = true
      } else if (!this.winner && !this.draw) {
        this.focusedIndex = this.focusedIndex + 3
      }
    },
    enter() {
      if (this.buttonFocused) {
        this.restart()
      } else {
        this.onCellEnter()
      }
    },
    back() {
      // Optional: no-op
    },
  },
})
