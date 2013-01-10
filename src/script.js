var textInputs = [];
var context;
var wbqImage;
var positionX = 240;
var positionY = [192, 393, 589];

document.ready = function () {
    wbqImage = new Image();
    wbqImage.src = "wbq.jpg";
    wbqImage.addEventListener("load", function () {
        context.drawImage(wbqImage, 0, 0);
    }, false);

    context = document.getElementById("canvas").getContext("2d");
    context.font = "20px 微软雅黑";
    context.fillStyle = "#FFFFFF";
//    context.fillStyle = "20px";
    textInputs = document.getElementsByClassName("textInput");

    for (var i = 0; i < textInputs.length; i++) {
        var newTextInput = textInputs[i];
        newTextInput.index = i;
        newTextInput.onkeyup = function (e) {
            updateCanvas();
            //            $("#test").get(0).innerHTML = e.srcElement.value;
        };
    }
}


var updateCanvas = function () {
    context.clearRect(0, 0, 480, 600);
    context.drawImage(wbqImage, 0, 0);
    for (var i = 0; i < textInputs.length; i++) {
        var text = textInputs[i].value;
        context.fillText(text, positionX - text.length * 20 / 2, positionY[i]);
    }
};

var saveImage = function () {
    //将图像输出为base64压缩的字符串，默认为image/png
    var data = canvas.toDataURL();
    //删除字符串前的提示信息 "data:image/png;base64,"
    var b64 = data.substring(22);
    $.post( "202.114.20.91:8033/save.aspx" , { data : b64, name : "test.png" }, function(){
        //OK
    });
}

var clearText = function () {
    for (var i in textInputs) {
        textInputs[i].value = "";
    }
    updateCanvas();
};

