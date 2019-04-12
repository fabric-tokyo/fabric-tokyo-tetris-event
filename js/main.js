const COLUMNS = 12;
const ROWS = 21;
const FALL_INTERVAL = 500;
const RESTART_INTERVAL = 500;
const BLOCK_SIZE = 4;
const START_X_POSITION = 4;
const START_Y_POSITION = 0;
const MINIMUM_ANGLE = 0;
const MAX_ANGLE = 3;
let cells;
let isFallingFlag = true;

//現在位置のHTMLタグを入手
const getTargetHtmlTag = (x, y) => {
  return cells[y][x];
}


//テトリミノの種類を定義(回転含む)
const blockParts = {
  tetriminoI: {
    class: "tetrimino-i",
    pattern: [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ]

    ]
  },
  tetriminoO: {
    class: "tetrimino-o",
    pattern: [
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    ]
  },
  tetriminoT: {
    class: "tetrimino-t",
    pattern: [
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ]
    ]
  },
  tetriminoS: {
    class: "tetrimino-z",
    pattern: [
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ]
  },
  tetriminoJ: {
    class: "tetrimino-j",
    pattern: [
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    ]
  },
  tetriminoL: {
    class: "tetrimino-l",
    pattern: [
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    ]
  }

}

// テトリスのステージを作成
const makeStage = () => {
  let table = "";
  for (let row = 0; row < ROWS; row++) {
    table = table + '<tr>';
    for (let col = 0; col < COLUMNS; col++) {
      table = table + '<td/>';
    }
    table = table + '</tr>';
  }
  return table;
}

// テトリスのステージを２次元配列に格納する
const storeStageInTwoDimensionalArray = () => {
  cells = [];
  const tdArray = document.getElementsByTagName('td');
  let index = 0;
  for (let row = 0; row < ROWS; row++) {
    cells[row] = [];
    for (let col = 0; col < COLUMNS; col++) {
      cells[row][col] = tdArray[index];
      index++;
    }
  }
  return cells;
}

// 壁のclassに.wallと.inactiveを付与
const makeWall = (cell) => {
  for (let col = 0; col < COLUMNS; col++) {
    cell[ROWS - 1][col].classList.add('wall', 'inactive');
  }
  for (let row = 0; row < ROWS; row++) {
    cell[row][COLUMNS - 1].classList.add('wall', 'inactive');
    cell[row][0].classList.add('wall', 'inactive');
  }
}

//TODO: [SHOULD]プロトタイプをやめたい。
function Block() {
  this.keys = Object.keys(blockParts);
  this.position = { x: START_X_POSITION, y: START_Y_POSITION };
  this.angle = MINIMUM_ANGLE;

  const initialize = () => {
    this.position = { x: START_X_POSITION, y: START_Y_POSITION };
    this.tetriminoType = this.keys[Math.floor(Math.random() * (this.keys.length))];
    this.tetriminoPatterns = blockParts[this.tetriminoType];
    this.class = this.tetriminoPatterns.class
    this.tetrimino = this.tetriminoPatterns.pattern[this.angle];
  }

  // ステージ全体の中でテトリミノがある位置の座標を取得
  this.getTargetHtmlTagFromGlobalPosition = (x, y) => {
    return cells[y + this.position.y][x + this.position.x];
  }

  //テトリミノを生成
  this.generate = () => {
    initialize();
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetrimino[row][col]) {
          this.getTargetHtmlTagFromGlobalPosition(col, row).classList.add(this.class);
        }
      }
    }
  }

  // テトリミノが今の位置より下に落ちられるかどうかを判定
  this.judgeFall = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1 && this.getTargetHtmlTagFromGlobalPosition(col, row + 1).classList.contains('inactive')) {
          return false;
        }
      }
    }
    return true;
  }

  // ゲームオーバーであるかどうかを判定
  this.judgeGameOver = () => {
    for (let col = 0; col < BLOCK_SIZE; col++) {
      if (this.tetrimino[START_Y_POSITION][col] == 1 && this.getTargetHtmlTagFromGlobalPosition(col, START_Y_POSITION).classList.contains('inactive')) {
        return true;
      }
    }
    return false;
  }

  // テトリミノが一列揃ったときに列を消去する判定
  this.judgeErase = (globalY) => {
    let count = 0;
    for (let col = 0; col < COLUMNS - 1; col++) {
      if (getTargetHtmlTag(col, globalY).classList.contains('inactive')) {
        count++
      }
      if (count == COLUMNS - 1) {
        this.eraseAndShift(globalY);
      }
    }
  }

  // テトリミノを一列消去して一段下げる
  this.eraseAndShift = (globalY) => {
    for (let col = 1; col < COLUMNS - 1; col++) {
      getTargetHtmlTag(col, globalY).className = "";
    }
    //一段下げる
    for (let downRow = globalY - 1; downRow > 0; downRow--) {
      for (let col = 1; col < COLUMNS - 1; col++) {
        getTargetHtmlTag(col, downRow + 1).className = getTargetHtmlTag(col, downRow).className;
        getTargetHtmlTag(col, downRow).className = "";
      }
    }
  }

  // 落下処理
  this.fall = () => {
    clear();
    this.position.y++;
    appear();
  }

  // 移動するために表示されたブロックをクリア
  const clear = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (col + this.position.x + 1 > COLUMNS || col + this.position.x - 1 < 0 || this.position.y < 0) {
          continue;
        }
        if (!this.getTargetHtmlTagFromGlobalPosition(col, row).classList.contains('inactive', this.class)) {
          console.log(row + this.position.y, col + this.position.x);
          this.getTargetHtmlTagFromGlobalPosition(col, row).classList.remove(this.class);
        }
      }
    }
  }

  // 移動のために消えたテトリミノを再表示
  const appear = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1) {
          this.getTargetHtmlTagFromGlobalPosition(col, row).classList.add(this.class);
        }
      }
    }
  }

  // テトリミノの位置を固定する
  this.fix = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col]) {
          this.getTargetHtmlTagFromGlobalPosition(col, row).classList.add(this.class, 'inactive');
          isFallingFlag = false;
          this.judgeErase(row + this.position.y);
        }
      }
    }
  }

  // 矢印の下を押したときに下がるスピードが上がる
  this.down = () => {
    if (judgeDown()) {
      clear();
      this.position.y++;
      appear();
    }
  }

  // テトリミノを下げても良いか判定
  const judgeDown = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1 && this.getTargetHtmlTagFromGlobalPosition(col, row + 1).classList.contains('inactive')) {
          return false;
        }
      }
    }
    return true;
  }

  // 右キーを押したときにスライド
  this.moveRight = () => {
    if (judgeRight()) {
      clear();
      this.position.x++;
      appear();
    }
  }

  // 右方向のに移動しても良いか判定
  const judgeRight = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1 && this.getTargetHtmlTagFromGlobalPosition(col + 1, row).classList.contains('inactive')) {
          return false;
        }
      }
    }
    return true;
  }

  //  左方向に移動しても良いか判定
  const judgeLeft = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1 && this.getTargetHtmlTagFromGlobalPosition(col - 1, row).classList.contains('inactive')) {
          return false;
        }
      }
    }
    return true;
  }

  // 左キーボードが押されたら方向にスライドする
  this.moveLeft = () => {
    if (judgeLeft()) {
      clear();
      this.position.x--;
      appear();
    }
  }

  // FとAのキーボードを押すとそれぞれ左右に回転する
  this.rotate = (direction) => {
    clear();
    const currentAngle = this.angle;
    if (direction == 'left') {
      this.angle++;
      if (this.angle > MAX_ANGLE) {
        this.angle = MINIMUM_ANGLE;
      }
    }
    if (direction == 'right') {
      this.angle--;
      if (this.angle < MINIMUM_ANGLE) {
        this.angle = MAX_ANGLE;
      }
    }
    let avoidCount = 0;
    if (avoidWall()) {
      avoidCount++;
      if (avoidWall()) {
        avoidCount++;
      }
    }
    if (avoidFloor()) {
      avoidCount++;
    }
    if (avoidCount >= 2) {
      this.angle = currentAngle;
    }
  }

  // TODO: [WANT]マジックナンバーを消す
  // 回転したときに床にぶつかる場合は上にあげる
  const avoidFloor = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1) {
          if (this.getTargetHtmlTagFromGlobalPosition(col, row).classList.contains('inactive')) {
            if (row == 2) {
              this.position.y -= 2;
            } else if (col == 3) {
              if (this.getTargetHtmlTagFromGlobalPosition(col + 1, row).classList.contains('inactive')) {
                this.position.y -= 1;
              } else {
                this.position.y--;
              }
              return true;
            }
          }

        }
      }
    }
    return false;
  }

  // TODO: [WANT]ifのネストが深い。やっていることがわかりにくい。リファクタ必須。
  // 回転したときに壁にぶつかる場合はずらして回転させる判定
  const avoidWall = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        console.log(col, row, row + this.position.y, col + this.position.x);
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1) {
          if (this.getTargetHtmlTagFromGlobalPosition(col, row).classList.contains('inactive')) {
            if (col == 1) {
              this.position.x += 2;
            } else if (col == 0) {
              if (this.getTargetHtmlTagFromGlobalPosition(col + 1, row).classList.contains('inactive')) {
                this.position.x += 2;
              } else {
                this.position.x++;
              }
            } else if (col == 2) {
              this.position.x -= 2;
            } else if (col == 3) {
              if (this.getTargetHtmlTagFromGlobalPosition(col - 1, row).classList.contains('inactive')) {
                this.position.x -= 2;
              } else {
                this.position.x--;
              }
            }
            return true;
          }
        }
      }
    }
    return false;
  }
}

// DOMが呼び込まれたらテトリススタート
document.addEventListener('DOMContentLoaded',
  function () {

    document.getElementById('board').innerHTML = makeStage();

    const stageArray = storeStageInTwoDimensionalArray();
    makeWall(stageArray);

    const tetrimino = new Block();
    const fallProcess = function () {
      tetrimino.generate();
      const fallLoop = function () {
        if (tetrimino.judgeFall()) {
          tetrimino.fall();
        } else {
          tetrimino.fix();
          clearInterval(fallId);
        }
      }
      const fallId = setInterval(fallLoop, FALL_INTERVAL);;
    }
    fallProcess();
    const loop = function () {
      if (!isFallingFlag) {
        fallProcess();
      }
      isFallingFlag = true;
      if (tetrimino.judgeGameOver()) {
        clearInterval(restart);
        alert('GameOver');//TODO: [WANT]ゲームオーバー画面を作成したい。
        return;
      }
    }
    const restart = setInterval(loop, RESTART_INTERVAL);

    document.onkeydown = function (downedKey) {
      if (isFallingFlag == true) {
        switch (downedKey.code) {
          case "ArrowRight":
            tetrimino.moveRight();
            break;
          case "ArrowLeft":
            tetrimino.moveLeft();
            break;
          case "ArrowDown":
            tetrimino.down();
            break
          case "KeyF":
            tetrimino.rotate('right');
            break;
          case "KeyA":
            tetrimino.rotate('left');
            break;
        }
      }
    }
  }
)
