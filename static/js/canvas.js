function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var currentURL = window.location.href;

// URLを解析し、クエリーパラメータを取得
var url = new URL(currentURL);
var face = url.searchParams.get("face");

console.log(face);

let backNumber = 1;


let backPaths = [
    "static/back/zundamon.png",
    "static/back/hanabi.png",
    "static/back/yatai.png",
    "static/back/firework.png",
    "static/back/green.png"
]
let imagePaths = [
    "static/back/zundamon.png",
    "face/game.png",
];

async function loadImages() {
    for (const imagePath of imagePaths) {
        const img = await loadImage(imagePath);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
change();
function change(){
    // 現在のURLを取得
    var currentURL = window.location.href;

    // URLを解析し、クエリーパラメータを取得
    var url = new URL(currentURL);
    var face = url.searchParams.get("face");
    // URLを解析し、クエリーパラメータを取得
    var url = new URL(currentURL);
    console.log(location.protocol+"//"+location.host+"/face/"+face);
    loadImages();
    imagePaths[0]=backPaths[backNumber];
    imagePaths[1]=location.protocol+"//"+location.host+"/face/"+face;
    if(backNumber==4){
        backNumber=0
    }else{
        backNumber++;
    }
}
function stamp(){
    if(imagePaths[2]==""){
        imagePaths[2]="static/stamp/combu.png"
    }else{
        imagePaths[2]=""
    }
    loadImages();
}
const dlBtn = document.getElementById("downloadButton");
dlBtn.addEventListener("click", () => {
    const compositeImage = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = compositeImage;
    downloadLink.download = "composite_image.png";
    downloadLink.click();
});
// Canvas要素を取得
const stampPaths = [
    "static/stamp/combu.png",
    "static/stamp/hoge.png"
]
stampNumber = 0;

// スタンプの画像を読み込む
const stampImage = new Image();
stampImage.src = stampPaths[stampNumber]; // スタンプ画像のファイルパスを指定

// スタンプのサイズを指定
const stampWidth = 100;
const stampHeight = 100;

// スタンプを描画する関数
function drawStamp(x, y) {
    ctx.drawImage(stampImage, x, y, stampWidth, stampHeight);
}

// マウスクリックイベントを監視して、スタンプを押す
canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    drawStamp(mouseX - stampWidth / 2, mouseY - stampHeight / 2);
});
function change_stamp(){
    if(stampNumber==1){
        stampNumber=0
    }else{
        stampNumber++;
    }
    stampImage.src = stampPaths[stampNumber];
}
function clear_stamp(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loadImages();
}