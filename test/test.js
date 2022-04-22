var canvas = null
var context  = null
var saveImage = null
var figure = null
function draw(){
    canvas = this.document.createElement("canvas");
    canvas.setAttribute("id", "canvas")
    document.body.appendChild( canvas );
    context  = canvas.getContext('2d');

    context.lineWidth = 1; // 선 두께
    context.strokeStyle = "rgba(255, 0, 0)"; // 선 색상 + 투명도

    var sX,sY,eX,eY;
    var draw = false;

    canvas.addEventListener ( "mousedown" , function (me) {
    mDown (me)}, false );
    
    canvas.addEventListener ( "mousemove" , function (me) {
    mMove (me)}, false );
    
    canvas.addEventListener ( "mouseup" , function (me) {
    mUp (me)}, false );

    canvas.addEventListener ( "mouseout" , function (me) {
    mOut (me)}, false );
    

    // 마우스 클릭 시 클릭 좌표와 draw true
    function mDown(me){
        sX=me.offsetX;
        sY=me.offsetY;
        draw = true;
    }


    function mMove(me){
        if(draw){
        eX=me.offsetX;
        eY=me.offsetY;
        context.clearRect(0,0,canvas.width,canvas.height); //clear canvas
        if(saveImage)
            context.putImageData(saveImage, 0, 0);
        if(figure == 'rectangle')
            context.strokeRect(sX,sY,eX-sX,eY-sY);
        else if (figure == 'circle'){
            // t, e, i, n
        //    this.lastMouseDownLoc.x,
        //   this.lastMouseDownLoc.y,
        //   i.x - this.lastMouseDownLoc.x,
        //   i.y - this.lastMouseDownLoc.y
        // i 는 시작 or 종료
            var s = ((eX-sX) / 2) * 0.5522848,
            o = ((eY-sY) / 2) * 0.5522848,
            a = sX + eX-sX,
            r = sY + eY-sY,
            h = sX + (eX-sX) / 2,
            c = sY + (eY-sY) / 2;
            context.beginPath() // 새로운 경로 시작함을 알림 약간 기존 저장된 시작점 그런거 초기화느낌?
            context.moveTo(sX, c) // 시작점(x,y)
            context.bezierCurveTo(sX, c - o, h - s, sY, h, sY) //곡선 그리는 부분 첫번째 제어점 (x,y), 두번째 제어점(x,y), 끝점x,y
            context.bezierCurveTo(h + s, sY, a, c - o, a, c)
            context.bezierCurveTo(a, c + o, h + s, r, h, r)
            context.bezierCurveTo(h - s, r, sX, c + o, sX, c)
            context.stroke() // 이걸 해줌으로써 위에서 작성한 것들 화면에 뿌려줌?
        }
        }
            
    }
    // 마우스 놓으면 rectangle 완성 및 popup 생성
    function mUp(me){
        saveImage = context.getImageData(0,0,canvas.width,canvas.height);
        draw = false;
    }

    function mOut(me) {
        saveImage = context.getImageData(0,0,canvas.width,canvas.height);
        draw = false ; //마우스가 캔버스 밖으로 벗어났을 때 그리기 중지
    }
}

function del(){
    canvas = this.document.getElementById("canvas");
    context  = canvas.getContext('2d');
    saveImage = null
    context.clearRect(0,0,canvas.width,canvas.height); //clear canvas
}

function rectangle(){
    figure = 'rectangle'
}

function circle(){
    figure = 'circle'
}