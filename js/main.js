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
  }
}

// テトリスのステージを作成
const makeStage = () => {
  //①
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

function Block() {
  //現在位置のHTMLタグを入手
  const getTargetHtmlTag = (x, y) => {
    return cells[y][x];
  }

  // ステージ全体の中でテトリミノがある位置の座標を取得
  const getTargetHtmlTagFromGlobalPosition = (x, y) => {
    return cells[y + this.position.y][x + this.position.x];
  }

  // 初期化処理
  const initialize = () => {
    this.keys = Object.keys(blockParts);
    this.angle = MINIMUM_ANGLE;
    this.position = { x: START_X_POSITION, y: START_Y_POSITION };
    this.tetriminoType = this.keys[Math.floor(Math.random() * (this.keys.length))];
    this.tetriminoPatterns = blockParts[this.tetriminoType];
    this.class = this.tetriminoPatterns.class
    this.tetrimino = this.tetriminoPatterns.pattern[this.angle];
  }

  //テトリミノを生成
  this.generate = () => {
    initialize();
    //②
  }

  // テトリミノが今の位置より下に落ちられるかどうかを判定
  this.judgeFall = () => {
    //③
  }

  // 移動するために表示されたブロックをクリア
  const clear = () => {
    //③
  }

  // 移動のために消えたテトリミノを再表示
  const appear = () => {
    //③
  }

  // 落下処理
  this.fall = () => {
    //③
  }

  // テトリミノの位置を固定する
  this.fix = () => {
    // ④
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
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1 && getTargetHtmlTagFromGlobalPosition(col, row + 1).classList.contains('inactive')) {
          return false;
        }
      }
    }
    return true;
  }

  // 右キーを押したときにスライド
  this.moveRight = () => {
    // ⑤
  }

  // 右方向のに移動しても良いか判定
  const judgeRight = () => {
    // ⑤
  }

  //  左方向に移動しても良いか判定
  const judgeLeft = () => {
    //⑤
  }

  // 左キーボードが押されたら方向にスライドする
  this.moveLeft = () => {
    if (judgeLeft()) {
      clear();
      this.position.x--;
      appear();
    }
  }

  // ゲームオーバーであるかどうかを判定
  this.judgeGameOver = () => {
    for (let col = 0; col < BLOCK_SIZE; col++) {
      if (this.tetrimino[START_Y_POSITION][col] == 1 && getTargetHtmlTagFromGlobalPosition(col, START_Y_POSITION).classList.contains('inactive')) {
        return true;
      }
    }
    return false;
  }

  // テトリミノが一列揃ったときに列を消去する判定
  const judgeErase = (globalY) => {
    //⑥
  }

  // テトリミノを一列消去して一段下げる
  this.eraseAndShift = (globalY) => {
    //⑥
  }

  // FとAのキーボードを押すとそれぞれ左右に回転する
  this.rotateLeft = () => {
    clear();
    const currentAngle = this.angle;
    this.angle++;
    if (this.angle > MAX_ANGLE) {
      this.angle = MINIMUM_ANGLE;
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

  // FとAのキーボードを押すとそれぞれ左右に回転する
  this.rotateRight = () => {
    clear();
    const currentAngle = this.angle;
    this.angle--;
    if (this.angle < MINIMUM_ANGLE) {
      this.angle = MAX_ANGLE;
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

  // 回転したときに床にぶつかる場合は上にあげる
  const avoidFloor = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1) {
          if (getTargetHtmlTagFromGlobalPosition(col, row).classList.contains('inactive')) {
            if (row == 2) {
              this.position.y -= 2;
            } else if (col == 3) {
              if (getTargetHtmlTagFromGlobalPosition(col + 1, row).classList.contains('inactive')) {
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

  // 回転したときに壁にぶつかる場合はずらして回転させる判定
  const avoidWall = () => {
    for (let row = 0; row < BLOCK_SIZE; row++) {
      for (let col = 0; col < BLOCK_SIZE; col++) {
        if (this.tetriminoPatterns.pattern[this.angle][row][col] == 1) {
          if (getTargetHtmlTagFromGlobalPosition(col, row).classList.contains('inactive')) {
            if (col == 1) {
              this.position.x += 2;
            } else if (col == 0) {
              if (getTargetHtmlTagFromGlobalPosition(col + 1, row).classList.contains('inactive')) {
                this.position.x += 2;
              } else {
                this.position.x++;
              }
            } else if (col == 2) {
              this.position.x -= 2;
            } else if (col == 3) {
              if (getTargetHtmlTagFromGlobalPosition(col - 1, row).classList.contains('inactive')) {
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

    // const stageArray = storeStageInTwoDimensionalArray();
    // makeWall(stageArray);

    const tetrimino = new Block();
    const fallProcess = function () {
      // ③
    }
    fallProcess();
    // const loop = function () {
    //   if (!isFallingFlag) {
    //     fallProcess();
    //   }
    //   isFallingFlag = true;
    //   if (tetrimino.judgeGameOver()) {
    //     clearInterval(restart);
    //     alert('GameOver');
    //     return;
    //   }
    // }
    // const restart = setInterval(loop, RESTART_INTERVAL);

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
            tetrimino.rotateRight();
            break;
          case "KeyA":
            tetrimino.rotateLeft();
            break;
        }
      }
    }
  }
)
