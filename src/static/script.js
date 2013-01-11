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


var updateCanvas = function () {
    context.clearRect(0, 0, 480, 600);
    context.drawImage(wbqImage, 0, 0);
    for (var i = 0; i < textInputs.length; i++) {
        var text = textInputs[i].value;
        context.fillText(text, positionX - text.length * 20 / 2, positionY[i]);
    }
};

function SaveAs5(imgURL)
{
    var oPop = window.open(imgURL,"","width=480, height=600, top=50, left=50");
    for(; oPop.document.readyState != "complete"; )
    {
        if (oPop.document.readyState == "complete")break;
    }
    oPop.document.execCommand("SaveAs");
//    oPop.close();
}

var saveImage = function () {
    //将图像输出为base64压缩的字符串，默认为image/png
    var data = canvas.toDataURL();
    //删除字符串前的提示信息 "data:image/png;base64,"
    var b64 = data.substring(22);
    $.post("/save" , { data : b64}, function(){
        //OK
    });
//    var domCanvas = document.getElementById("canvas");
//
//    var newWin = window.open(domCanvas.toDataURL("image/png"),
//        "","width=480, height=600, top=50, left=50");
//    for(; newWin.document.readyState != "complete"; )
//    {
//        if (newWin.document.readyState == "complete")
//            break;
//    }
//    var newWin2 = window.open(document.getElementsByTagName("img")[0].src,
//        "","width=480, height=600, top=50, left=50");
//    for(; newWin2.document.readyState != "complete"; )
//    {
//        if (newWin2.document.readyState == "complete")
//            break;
//    }
//
//    newWin2.document.execCommand("SaveAs");
}

var clearText = function () {
    for (var i in textInputs) {
        textInputs[i].value = "";
    }
    updateCanvas();
};

