import './index.scss'

(function(){
    'use strict';
    //生成随机数
    var random = function(min,max?){
        //获取参数个数
        var len = Array.prototype.slice.call(arguments).length,
            //根据参数个数决定随机数取值范围
            num = (function(len){
                var _num = {
                    '0':[0,1],
                    '1':[0,min],
                    '2':[min,max]
                };
                return _num[len];
            }(len));
        //获取随机数
        return parseInt(Math.random()*(num[1]-num[0]+1)+num[0]);
    };

    //事件
    var eventUtil = {
        addHandler:function(element,type,handler){
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attchEvent){
                element.attachEvent('on'+type,handler);
            }else{
                element['on'+type] = handler;
            }
        },
        removeHandler:function(element,type,handler){
            if(element.romeveEventListener){
                element.romeveEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent('on'+type,handler);
            }else{
                element['on'+type] = null;
            }
        }
    };

    //element
    var element = function(color){
        var div = document.createElement('div');
        if(color){
            div.style.backgroundColor = color;
            return div;
        }else{
            return div;
        }
    };

    //extend
    var extend = function copy(_old){
        var _new = null;
        if(_old.constructor === Object){
            _new = {};
            recursion(_old);
        }else if(_old.constructor === Array){
            _new = [];
            recursion(_old);
        }else{
            _new = _old;
        }
        function recursion(_old){
            for(var val in _old){
                if(_old[val].constructor === Object || _old[val].constructor === Array){
                    _new[val] = copy(_old[val]);
                }else{
                    _new[val] = _old[val];
                }
            }
        }
        return _new;
    };

    function moveOrigin(keyCode){
        switch(keyCode){
            case 37:{
                m.theShape.left();
                break;
            }
            case 38:{
                m.theShape.top();
                break;
            }
            case 39:{
                m.theShape.right();
                break;
            }
            case 40:{
                m.theShape.down();
                break;
            }
        }
    }
    //移动方向
    eventUtil.addHandler(window,'keydown',function(e){
        var event = e || event;
        var keyCode = event.keyCode
        moveOrigin(keyCode)
    });

    var status = 0;
    eventUtil.addHandler(document.getElementsByClassName('start')[0],'click',function(){
        if(status === 0){
            init();
        }
    });

    eventUtil.addHandler(document.getElementsByClassName('pause')[0],'click',function(){
        if(status === 1){
            status = 0;
            this.innerHTML='继续';
            clearTimeout(timer);
        }else{
            status = 1;
            this.innerHTML='暂停';
            timeout();
        }
    });

    //matrix
    var Matrix = function(option={row:24,col:16}){
        //网格规模
        var configure = option;
        this.row = configure.row;
        this.col = configure.col;
        //网格不停变换的临时状态
        this.tempMatrix = null;
        //新形状
        this.theShape = null;
        //网格最终状态
        this.matrix = this.initMatrix();
        this.needNew = false;
    };

    Matrix.prototype.shape = function(){
        this.theShape = new Shape();
        return this;
    };

    Matrix.prototype.render = function(){
        box.innerHTML = '';
        var tempBox = document.createDocumentFragment();
        //根据矩阵在页面输出
        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.col; j++){
                if ( this.tempMatrix[i][j] === 1) {
                    tempBox.appendChild(element('#000'));
                } else {
                    tempBox.appendChild(element(''));
                }
            }
        }
        box.appendChild(tempBox);
        return this;
    };

    //初始化矩阵网格
    Matrix.prototype.initMatrix = function(){
        var temp = [];
        //矩阵
        for(var i = 0; i < this.row; i++){
            temp.push(new Array(this.col));
        }
        return temp;
    };
    
    //将shape的坐标插入matrix
    Matrix.prototype.merge = function(matrix){
        if(!matrix){
            var temp = extend(this.matrix);
            if(this.theShape){
                //将形状插入矩阵
                for(var j = 0; j < 4; j++){
                    //行
                    var y = this.theShape.squre[j][1];
                    //列（形状出现在中间，而不是最左侧）
                    var x = this.theShape.squre[j][0]+7;
                    //行，列
                    temp[y][x] = 1;
                }
            }
            //返回包含矩阵和形状的对象
            this.tempMatrix = temp;
            return this;
        }else{
            for(var n = 0; n < 4; n++){
                var p = this.theShape.squre[n][1];
                var q = this.theShape.squre[n][0]+7;
                m.matrix[p][q] = 1;
            }
            return this;
        }
    };

    //shape
    var Shape = function(){
        this.ele = [ [[0,0],[1,0],[0,1],[1,1]], [[0,0],[0,1],[0,2],[0,3]], [[1,0],[2,0],[0,1],[1,1]], [[0,0],[1,0],[1,1],[2,1]], [[0,0],[1,0],[2,0],[2,1]], [[0,0],[1,0],[1,1],[1,2]], [[1,0],[0,1],[1,1],[1,2]] ];
        this.color = '#000';
        this.squre = this.ele[random(6)];
    };

    Shape.prototype.left = function(){
        if(this.leftBorder()){
            for(var i = 0; i < 4; i++){
                this.squre[i][0] -= 1;
            }
            m.merge().render();
        }
    };

    Shape.prototype.top = function(){
        var cx = Math.round((this.squre[0][0] + this.squre[1][0] + this.squre[2][0] + this.squre[3][0])/4);
        var cy = Math.round((this.squre[0][1] + this.squre[1][1] + this.squre[2][1] + this.squre[3][1])/4);
        for(var i = 0; i < 4; i++){
            var x = this.squre[i][0];
            var y = this.squre[i][1];
            this.squre[i][0] = cx - y + cy;
            this.squre[i][1] = cy + x - cx;
        }
        m.merge().render();
    };

    Shape.prototype.right = function(){
        if(this.rightBorder()){
            for(var i = 0; i < 4; i++){
                this.squre[i][0] += 1;
            }
            m.merge().render();
        }
    };

    Shape.prototype.down = function(value){
        var val = value || 1;
        if(this.bottomBorder()){
            for(var i = 0; i < 4; i++){
                this.squre[i][1] += val;
            }
            m.merge().render();
        }else{
            clearInterval(timer);
            m.merge(m.matrix);
            init();
        }
    };

    Shape.prototype.leftBorder = function(){
        for(var i = 0; i < 4; i++){
            if(this.squre[i][0] <= -7 ){
                return false;
            }else if(m.matrix[this.squre[i][1]][this.squre[i][0]+6] === 1){
                return false;
            }
        }
        return true;
    };

    Shape.prototype.rightBorder = function(){
        for(var i = 0; i < 4; i++){
            if(this.squre[i][0] >= m.col - 8){
                return false;
            }else if(m.matrix[this.squre[i][1]][this.squre[i][0]+8] === 1){
                return false;
            }
        }
        return true;
    };

    Shape.prototype.bottomBorder = function(){
        for(var i = 0; i < 4; i++){
            if(this.squre[i][1] >= m.row - 1){
                return false;
            }else if(m.matrix[this.squre[i][1]+1][this.squre[i][0]+7] === 1){
                return false;
            }
        }
        return true;
    };

    Shape.prototype.allBorder = function(){
    };

    Shape.prototype.position = function(){
    };

    var box = document.getElementById('js-game');
    var m = new Matrix();
    var timer;
    function timeout(){
        timer = setInterval(function(){
            m.merge().render();
            m.theShape.down();
        },1000);
    }

    var init = function(){
        status = 1;
        for(var i = m.matrix.length - 1; i >= 0; i--){
            var  ary = m.matrix[i],n = 0;
            for(var j = 0; j<ary.length; j++){
                if(ary[j] === 1){
                    n += 1;
                }
            }
            if(n === 16){
                m.matrix.splice(i,1);
                m.matrix.unshift(new Array(16));
                i = m.matrix.length;
            }
        }
        m.shape();
        m.merge().render();
        timeout();
    };
}.call(window));

