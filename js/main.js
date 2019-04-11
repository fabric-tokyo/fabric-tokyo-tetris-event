// TODO: インデントの整理

const COLUMNS= 12;
const ROWS = 21;
const FALL_TIME = 100;
const BLOCK_SIZE = 4;
const START_X_POSITION = 4;
const START_Y_POSITION = 0;
const MINIMUM_X_POSITION = 1;
const MAXIMUM_X_POSITION = 10;
const MINIMUM_ANGLE = 0;
const MAX_ANGLE = 3;
let cells;
let isFallingFlag = true;

//現在位置のタグを入手
const getTag = ( x, y ) => {
    return cells[x][y];
}


const blocks = {
    i: {
        class: "i",
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
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ]

        ]
    },
    o: {
        class: "o",
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
    t: {
        class: "t",
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
    s: {
        class: "z",
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
    j: {
        class: "j",
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
    l: {
        class: "l",
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
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
        ]
    }

}

const Stage = function() {

    this.makeStage = function() {
        let table = "";
        for (let row = 0; row < ROWS; row++) {
            table = table + '<tr>';
            for (let col=0; col < COLUMNS; col++) {
                table = table + '<td/>';
            }
            table = table + '</tr>';
        }
        return table;
    }

    this.loadStage = function() {
        cells = [];
        let tdArray = document.getElementsByTagName('td');
        let index = 0;
        for (let row = 0; row < ROWS; row++) {
            cells[row] = [];
            for (let col = 0; col < COLUMNS; col++) {
                cells[row][col] = tdArray[index];
                index++;
            }
        }
    }

    this.makeWall = function() {
        for (let col = 0; col < COLUMNS; col++) {
            getTag (ROWS - 1, col) .classList.add('wall', 'inactive');
        }
        for (let row = 0; row < ROWS; row++) {
            getTag (row, COLUMNS - 1) .classList.add('wall', 'inactive');
            getTag (row, 0) .classList.add('wall', 'inactive');
        }
    }
}

const Block = function() {
    this.keys = Object.keys(blocks);
    this.position = {x: START_X_POSITION, y: START_Y_POSITION};
    this.blockType = 0;
    this.blockPatterns = "";
    this.block = [];
    this.class = "";
    this.angle = MINIMUM_ANGLE;

    this.initialize = function() {
      this.position = {x: START_X_POSITION, y: START_Y_POSITION};
      this.blockType = this.keys[Math.floor( Math.random() * (this.keys.length))];
      this.blockPatterns = blocks[this.blockType];
      this.class = this.blockPatterns.class
      this.block = this.blockPatterns.pattern[this.angle];
    }

    //ブロックを生成
    this.generate = function() {
      for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                if (this.block[row][col]) {
                    getTag(row +this.position.y, col+this.position.x).classList.add(this.class);
                }
            }
        }
    }

    //下方向判定
    this.judgeFall = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                  if( this.blockPatterns.pattern[this.angle][row][col] == 1 && getTag(row + this.position.y + 1, col + this.position.x).classList.contains('inactive')) {
                     return false;
                  }
            }
        }
        return true;
    }

    // ゲームオーバー判定
    this.judgeGameOver = function() {
       for(let col = 0; col<BLOCK_SIZE; col++){
         if( this.block[START_Y_POSITION][col] == 1 && getTag(START_Y_POSITION, this.position.x + col).classList.contains('inactive')){
             return true;
         }
      }
      return false;
   }

   // 消去判定
   this.judgeErase = function( globalY ) {
       let count = 0;
        for(let col = 0; col < COLUMNS - 1; col++){
            if( getTag(globalY, col).classList.contains('inactive')){
                count++
            }
            if(count == COLUMNS -1) {
              this.erase(globalY);
            }
        }
    }

    // 消去
    this.erase = function(globalY) {
      for(let col =1; col < COLUMNS - 1; col++) {
        getTag(globalY, col).className = "";
      }
      //一段下げる
      for( let downRow = globalY - 1; downRow > 0 ; downRow--) {
        for( let col = 1; col < COLUMNS - 1; col ++) {
          getTag(downRow + 1, col).className = getTag(downRow, col).className;
          getTag(downRow, col).className = "";
        }
      }
    }

   // 落下処理
    this.fall = function() {
        this.clear();
        this.position.y++;
        this.appear();
    }

    // 移動するために表示されたブロックをクリア
    this.clear = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                if(col + this.position.x + 1 > COLUMNS){
                  continue;
                }
                if(!getTag(row + this.position.y, col + this.position.x).classList.contains('inactive', this.class)){
                    getTag(row + this.position.y, col + this.position.x).classList.remove(this.class);
                }
            }
        }
    }

    // 再表示
    this.appear = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                if (this.blockPatterns.pattern[this.angle][row][col] == 1) {
                    getTag(row +this.position.y, col+this.position.x).classList.add(this.class);
                }
            }
        }
    }

    //固定する
    this.fix = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
               if (this.blockPatterns.pattern[this.angle][row][col]) {
                     getTag(row +this.position.y, col+this.position.x).classList.add(this.class, 'inactive');
                     isFallingFlag = false;
                     this.judgeErase(row + this.position.y);
               }
            }
        }
    }

// TODO: 左右の処理が冗長なので、まとめる
    // 左スライド
    this.moveLeft = function() {
        if(this.judgeLeft()){
            this.clear();
            this.position.x--;
            this.appear();
        }
    }

    // 右スライド
    this.moveRight = function() {
        if(this.judgeRight()){
            this.clear();
            this.position.x++;
            this.appear();
        }
    }

    // 右方向ぶつかり判定
    this.judgeRight = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                  if( this.blockPatterns.pattern[this.angle][row][col] == 1 && getTag(row + this.position.y, col + this.position.x + 1).classList.contains('inactive')) {
                     return false;
                  }
            }
        }
        return true;
    }

     //  左方向ぶつかり判定
    this.judgeLeft = function() {
        for (let row = 0; row < BLOCK_SIZE; row++) {
            for (let col = 0; col < BLOCK_SIZE; col++) {
                  if( this.blockPatterns.pattern[this.angle][row][col] == 1 && getTag(row + this.position.y, col + this.position.x - 1).classList.contains('inactive')) {
                     return false;
                  }
            }
        }
        return true;
    }

    // 回転処理
    this.rotate = function(right) {
        this.clear();
        let currentAngle = this.angle;
        if( right ) {
          this.angle++;
          if( this.angle > MAX_ANGLE) {
            this.angle = MINIMUM_ANGLE;
          }
        }
        if(!right) {
          this.angle--;
          if( this.angle < MINIMUM_ANGLE) {
            this.angle = MAX_ANGLE;
          }
        }
        let avoidCount = 0;
        if(this.avoidFloor) {
          avoidCount++;
        }
        if(avoidCount >= 2){
          this.angle = currentAngle;
        }
        console.log(this.angle);
        console.log(this.avoidCount);
        this.fill;
    }

    this.avoidFloor = function() {
      for (let row = 0; row < BLOCK_SIZE; row++) {
        for (let col = 0; col < BLOCK_SIZE; col++) {
              if(this.blockPatterns.pattern[this.angle][row][col] == 1) {
                if(getTag(row + this.position.y, col + this.position.x).classList.contains('inactive')){
                  if(row == 2){
                    this.position.y -=2;
                  } else if(col == 3) {
                    if(getTag(row + this.position.y, col + this.position.x + 1).classList.contains('inactive')) {
                      this.position.y -=1;
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
}

// let gameOverDisplay = function(){

// }

// TODO: 長いので余裕があったら分割したい。
document.addEventListener('DOMContentLoaded',
    function() {
        let loopId;
        let stage = new Stage();
        document.getElementById('board').innerHTML = stage.makeStage();
        stage.loadStage();
        stage.makeWall();

        let block = new Block();
        let fallProcess = function () {
            block.initialize();
            block.generate();
            let fallLoop = function () {
                    loopId = setTimeout(fallLoop, FALL_TIME);
                    if(block.judgeFall()) {
                        block.fall();
                    }else{
                        block.fix();// TODO: 一番下の行ですぐに固定してしまうので、少しだけ余裕を持たせる。
                        clearTimeout(loopId);
                    }
            }
            fallLoop();
        }
         fallProcess();
         var loop = function() {
            loopId = setTimeout(loop, FALL_TIME);
            if(!isFallingFlag){
               fallProcess();
            }
            isFallingFlag = true;
            if(block.judgeGameOver()){
                clearTimeout(loopId);
               alert('GameOver');// TODO: ゲームオーバー画面を作成したい。
               return;
            }
         }
         loop();

         document.onkeydown = function(e) {
             switch(e.code) {
                 case "ArrowRight":
                     block.moveRight(true);
                     break;
                 case "ArrowLeft":
                     block.moveLeft(false);
                     break;
                 case "ArrowDown":
                     block.down();
                case "KeyF":
                    block.rotate(true);
                case "KeyA":
                    block.rotate(false);
             }
         }
    }
)
