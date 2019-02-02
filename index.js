// 创建标签并写入飞机元素，
var flyEle = document.createElement('div');
flyEle.id = 'fly_me';
flyEle.innerHTML = '<img src = "./image/me.png"/>';
document.body.appendChild(flyEle);

//设置鼠标经过事件函数
document.onmousemove = function (e) {
    var flyEle = document.getElementById('fly_me');
    var view = document.getElementById('view');
    // 使鼠标位于飞机中心
    var flyX = e.clientX - 63;
    var flyY = e.clientY - 82;
    // 判断飞机范围，
    var xCheck = flyX > view.offsetLeft && flyX < view.offsetLeft + view.offsetWidth - 126;
    var yCheck = flyY > view.offsetTop && flyY < view.offsetTop + view.offsetHeight - 164;
    if (xCheck && yCheck) {
        flyEle.style.top = flyY + 'px';
        flyEle.style.left = flyX + 'px';

        flyEle.flag = true;
    }
}
// 创建子弹对象
var objB = {
    name: 'bullet',
    num: 1,
    arr: [],  //['id|top|left']
    width: 11,
    height: 28,
    path: './image/b.png',
};
createButtet(objB);
// 创建子弹函数
function createButtet(obj) {

    setInterval(function () {
        var flyEle = document.getElementById('fly_me');
        if (flyEle.flag) {
            // 创建标签，按时生产子弹
            var ele = document.createElement('div');
            ele.id = obj.name + obj.num;
            var length = obj.arr.length;

            if (length < 50) {
                obj.arr[length] = ele.id + '|';
                obj.num++;
                ele.style.width = obj.width + "px";
                ele.style.height = obj.height + "px";
                ele.style.position = 'absolute';
                ele.style.background = 'url(' + obj.path + ')';

                ele.style.top = parseInt(flyEle.style.top) + 6 + 'px';
                obj.arr[length] = obj.arr[length] + ele.style.top + '|';

                ele.style.left = parseInt(flyEle.style.left) + 60 + 'px';
                obj.arr[length] = obj.arr[length] + ele.style.left;
            }
            document.body.appendChild(ele);
        }
    }, 300)
}
//子弹运动
function moveBullet() {
    var flyEle = document.getElementById('fly_me');
    if (flyEle.flag) {
        for (var i = 0; i < objB.arr.length; i++) {
            var newArr = objB.arr[i].split('|');
            var eleB = document.getElementById(newArr[0]);
            newArr[1] = parseInt(newArr[1]) - 1;
            eleB.style.top = newArr[1] + 'px';
            objB.arr[i] = newArr[0] + '|' + newArr[1] + '|' + newArr[2];
            if (newArr[1] < 0) {
                objB.arr.splice(i, 1);
                var delEle = document.getElementById(newArr[0]);
                delEle.parentNode.removeChild(delEle);
            }
        }
    }
}
// 创建敌机对象
var objF = {
    name: 'foe',
    num: 1,
    arr: [],  //['id|top|left']
    width: 62,
    height: 44,
    path: './image/foe.png',
};
createFoe(objF);
// 创建敌机函数
function createFoe(obj) {
    setInterval(function () {
        var flyEle = document.getElementById('fly_me');
        if (flyEle.flag) {
            // 创建标签，按时生产敌机
            var ele = document.createElement('div');
            ele.id = obj.name + obj.num;
            var length = obj.arr.length;

            if (length < 50) {
                obj.arr[length] = ele.id + '|';
                obj.num++;
                ele.style.width = obj.width + "px";
                ele.style.height = obj.height + "px";
                ele.style.position = 'absolute';
                ele.style.background = 'url(' + obj.path + ')';

                ele.style.top = 0;
                obj.arr[length] = obj.arr[length] + ele.style.top + '|';

                var ran = 426 * Math.random();
                ele.style.left = view.offsetLeft + ran + 'px';
                obj.arr[length] = obj.arr[length] + ele.style.left;
            }
            document.body.appendChild(ele);
        }
    }, 300)
}
//敌机运动
function moveFoe() {
    var flyEle = document.getElementById('fly_me');
    if (flyEle.flag) {
        for (var i = 0; i < objF.arr.length; i++) {
            var newArr = objF.arr[i].split('|');

            var eleF = document.getElementById(newArr[0]);

            newArr[1] = parseInt(newArr[1]) + 1;

            eleF.style.top = newArr[1] + 'px';

            objF.arr[i] = newArr[0] + '|' + newArr[1] + '|' + newArr[2];

            if (newArr[1] > view.offsetHeight - 44) {
                objF.arr.splice(i, 1);
                var delEle = document.getElementById(newArr[0]);
                delEle.parentNode.removeChild(delEle);
            }
        }
    }
}

setInterval(function () {
    moveBullet();
    moveFoe();

    for (var i = 0; i < objF.arr.length; i++) {
        var arrF = objF.arr[i].split('|');
        var eleF = document.getElementById(arrF[0]);

        var xFS = parseInt(arrF[2]);
        var xFE = parseInt(arrF[2]) + 62;

        var yFS = parseInt(arrF[1]);
        var yFE = parseInt(arrF[1]) + 44;

        for (var j = 0; j < objB.arr.length; j++) {
            var arrB = objB.arr[j].split('|');
            var eleB = document.getElementById(arrB[0]);

            var xB = parseInt(arrB[2]);
            var yB = parseInt(arrB[1]);

            var xCheck = xB > xFS && xB < xFE;
            var yCheck = yB > yFS && yB < yFE;

            if (xCheck && yCheck) {
                objF.arr.splice(i, 1);
                eleF.parentNode.removeChild(eleF);
                objB.arr.splice(j, 1);
                eleB.parentNode.removeChild(eleB);

            }
        }
    }
}, 1)
