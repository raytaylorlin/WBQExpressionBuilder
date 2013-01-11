var textInputs = [];
var context;
var wbqImage;
var positionX = 240;
var positionY = [192, 393, 589];

document.ready = function () {
    wbqImage = new Image();
    wbqImage.src = "/static/wbq.jpg";
    wbqImage.addEventListener("load", function () {
        context.drawImage(wbqImage, 0, 0);
    }, false);

    context = document.getElementById("canvas").getContext("2d");
    context.font = "20px 微软雅黑";
    context.fillStyle = "#FFFFFF";
    textInputs = document.getElementsByClassName("textInput");

    for (var i = 0; i < textInputs.length; i++) {
        var newTextInput = textInputs[i];
        newTextInput.index = i;
        newTextInput.onkeyup = function (e) {
            updateCanvas();
        };
    }
}

//更新画布
var updateCanvas = function () {
    context.clearRect(0, 0, 480, 600);
    context.drawImage(wbqImage, 0, 0);
    for (var i = 0; i < textInputs.length; i++) {
        var text = textInputs[i].value;
        context.fillText(text, positionX - text.length * 20 / 2, positionY[i]);
    }
};

//将图像输出为base64压缩的字符串，默认为image/png
var saveImage = function () {

    var data = canvas.toDataURL();
    $.post("/upload" , {imgData : data}, function(imageLocation){
        console.log(imageLocation);
        window.location = imageLocation;
    });
}

//重置文本框
var clearText = function () {
    for (var i in textInputs) {
        textInputs[i].value = "";
    }
    updateCanvas();
};

