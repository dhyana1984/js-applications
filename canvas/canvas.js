window.onload = function () { 

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");  //画布上下文
    //context.fillRect(10,10,100,100)   //在画布上画方块四个参数分别是x坐标，y坐标,方块长度,方块宽度

    //在画布上画三角，必须用beginPath和moveTo还有lineTo
    //context.beginPath();
    //context.moveTo(50, 150);    //开始点
    //context.lineTo(100, 150);   //画第一条线，参数是x坐标和y坐标
    //context.lineTo(50, 30);     //画第二条线
    //context.closePath();        //自动封闭当前点和第一个开始点
    //context.lineWidth = 5;      //设置外边框线宽度
 //   context.stroke();         //画外边框线
    //context.fillStyle = "red";  //设置颜色
    //context.fill();             //画图
    //  console.log(1)

    //在画布上画圆，需要用arc函数
    //context.beginPath();
    //context.arc(300, 150, 100, 0,degreeToRadians(180), true)       //画圆，参数分别是圆心x坐标，圆心y坐标，半径长度，起始弧度，结束弧度，方向（true逆时针,false顺时针）
    //context.fillStyle = "red";
    //context.fill(); //填充圆
    //context.stoke() //画外边线

    ////在画布上写字
    //context.fillStyle = "white";    //设置字颜色
    //context.font = "20px bold lem sans-serif"; //设置字体样式
    //context.textAlign = "left";                //设置对齐
    //context.fillText("I saw this tweet", 20, 40); //写字，第一个参数是内容，第二个参数是文字x坐标，第三个参数是文字y坐标
    ////context.strokeText("text",20,40,200)//可以用fill写实心字也可以用stoke写空心字，最后一个参数是可选的maxwidth，如果文本宽度大于maxwidth，则自动文本缩放


    ////在画布上显示一个图片

    //var img = new Image();
    //img.src = "img.png";                        //指定一个图片
    //context.drawImage(img, 20, 120, 70, 70);    //绘制图片，第一个参数是图片对象，第二个是图片x坐标，第三个是图片y坐标，第四个参数是图片宽度，第五个参数是图片高度


    //画一个笑脸
    context.beginPath();
    context.arc(300, 300, 200, 0, degreeToRadians(360), true);
    context.fillStyle = "#ffffcc";
    context.fill();
    context.stroke();


    context.beginPath();
    context.arc(200, 250, 25, 0, degreeToRadians(360), true);
    context.stroke();

    context.beginPath();
    context.arc(400, 250, 25, 0, degreeToRadians(360), true);
    context.stroke();

    context.beginPath();
    context.moveTo(300, 300);
    context.lineTo(300, 350);
    context.stroke();


    context.beginPath();
    context.arc(300, 350, 75, degreeToRadians(20), degreeToRadians(160), false);
    context.stroke();

}


//角度转弧度函数
function degreeToRadians(degree) {
    return (degree * Math.PI) / 180;
}