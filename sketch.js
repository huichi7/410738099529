let points  = [[2,2],[3,3],[2,3],[4,4],[3,5],[2,4],[3,6],[6,5],[8,6],[9,6],[7,4],[8,4],[8,3],[9.54,3.34],[9,2],[7,1],[6,-6],[3,-6],[4,-3],[-3,-3],[-4,-6],[-7,-6],[-6,1],[-7,5],[-6,7],[-4,7],[-5,5],[-4,2],[2,2]];

var fill_colors = "F5BEBE-a4161a-ba181b-e5383b".split("-").map(a=>"#"+a)
var line_colors = "edede9-d6ccc2-595F72-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)

class Obj{ //宣告一個類別，針對一個畫的圖案
  constructor(args){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
    this.p = args.p || { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置，||(or)，當產生一個物件時，有傳位置參數的話使用該參數，若沒有傳參數就以||後面的設定產出
    this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
    this.size = random(5,10) //描述為該物件的放大倍率
    this.color = random(fill_colors) //充滿顏色
    this.stroke = random(line_colors) //外框線條顏色
  }

  draw(){ //畫出單一個物件形狀
    push() //執行後，依照以下設定
      translate(this.p.x,this.p.y) //以讓物件位置為原點
      scale(this.v.x<0?-1:1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(4)
      beginShape()
        for(var k=0;k<points.length;k=k+1){
          // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
          // vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endShape()，會把所有點連在一起，要把上面迴圈points.length-1的-1留著
          curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
        }
      endShape()
    pop() //執行後，回到原始的設定
  }

  update(){ //圖形的移動
    this.p.x = this.p.x + this.v.x //現在的位置(x)加上現在的速度(x)
    this.p.y = this.p.y + this.v.y //現在的位置(y)加上現在的速度(y)
    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
      this.v.x = -this.v.x //把x軸的速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
      this.v.y = -this.v.y //把y軸的速度方向改變
    }
  }
  isBallInRanger(){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
    let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
    if(d<13*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
      return true //傳回true的值
    }else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
      return false //傳回false值
    }
  }
}

var ball //把目前要處理的物件，暫存到ball變數內
var balls =[] //把產生的"所有"物件
var score = 0 //設定一個值初始為0

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(var i=0;i<60;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
}

function draw() {
  background(255);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  for(let ball of balls){ //只要是陣列的方式，都可以利用此方式處理
    ball.draw()
    ball.update()
  }
  push()
    fill(0)
    textSize(50)
    text(score,50,50) //在座標為(50,50)，顯示score內容
  pop()
}

// function mousePressed(){ //按下產生
//   ball = new Obj({
//     p:{x:mouseX,y:mouseY}
//   }) //在滑鼠按下的地方產生一個Obj class元件
//   balls.push(ball) //把ball的物件放入到balls陣列內
// }



function mousePressed(){ //按下消失
  for(let ball of balls){ //檢查每一個物件
    if(ball.isBallInRanger()){
      balls.splice(balls.indexOf(ball),1) //從倉庫balls裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
      score = score + 1 //每按到一個，加一分
      // score = score - 1 //每按到一個，扣一分
    }
  }
}
