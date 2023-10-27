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
    "static/back/yatai.png"
]
let imagePaths = [
    "static/back/zundamon.png",
    "face/logo.png"
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

    if(backNumber==2){
        backNumber=0
    }else{
        backNumber++;
    }
}

const dlBtn = document.getElementById("downloadButton");
dlBtn.addEventListener("click", () => {
    const compositeImage = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = compositeImage;
    downloadLink.download = "composite_image.png";

    downloadLink.click();
});