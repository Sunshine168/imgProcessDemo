
(function () {
    var Main = {
        img: null,
        actionStack: [],
        openPicCallBack:null,
        picLoadTime:'',
        eventAtt: function () {
            var _this = this;

            /*
			this.addEvent(".pic","dragstart",function(e){
			    var dx = e.offsetX ? e.offsetX : e.layerX;
			    var dy = e.offsetY ? e.offsetY : e.layerY;
			    e.dataTransfer.setData("dx", dx);
			    e.dataTransfer.setData("dy", dy);
			});

			this.addEvent(".pic","drag",function(e){
			    e.preventDefault();
			});
			this.addEvent(".picWrapper", "dragover", function(e){
			    e.preventDefault();
			});
			this.addEvent(".picWrapper", "drop", function(e){
			    var dx = e.dataTransfer.getData("dx");
			    var dy = e.dataTransfer.getData("dy");
			    var x = e.offsetX ? e.offsetX : e.layerX;
			    var y = e.offsetY ? e.offsetY : e.layerY;

			    var pic = document.getElementById("pic");

			    pic.style.left = (x - dx) + "px";
			    pic.style.top = (y - dy) + "px";


			});
			*/

            var clickFlag = 0,
                dx,
                dy,
                left,
                top;
            $(".pic").bind("mousedown", function (e) {
                /*
				    dx = e.offsetX ? e.offsetX : e.layerX;
				    dy = e.offsetY ? e.offsetY : e.layerY;
				    */

                dx = e.clientX;
                dy = e.clientY;

                left = parseInt(pic.style.left);
                top = parseInt(pic.style.top);

                clickFlag = 1;
            });
            $(".pic").bind(".picWrapper", "mouseup", function (e) {
                clickFlag = 0;
            });

            // document     .getElementById("picWrapper")     .onmousemove = function (e) {
            // /*     var x = e.offsetX ? e.offsetX : e.layerX;     var y = e.offsetY ?
            // e.offsetY : e.layerY;     */     var x = e.clientX;     var y = e.clientY; if
            // (clickFlag) {         var pic = document.getElementById("pic"); /* 	var x =
            // e.offsetX ? e.offsetX : e.layerX; 	var y = e.offsetY ? e.offsetY : e.layerY;
            // 	*/         var x = e.clientX;         var y = e.clientY; var rLeft = left +
            // (x - dx);         var rTop = top + (y - dy);         if (rLeft < 0)  rLeft =
            // 0;         if (rTop < 0)             rTop = 0; pic.style.left = rLeft + "px";
            //         pic.style.top = rTop + "px";     } };

            $(".d_item").click(function (e) {
                var img = this.getElementsByTagName("img")[0];
                var pic = document.getElementById("pic");
                pic.src = img.src;
                pic.onload = function () {
                    _this.initView();
                    _this.img = AlloyImage(this);
                };
            })

            $("#button").click(function (e) {
                document
                    .getElementById("open")
                    .click();
            });

            $(".open").change(function (e) {
                _this.openFile(e.target.files[0]);
                //回调通知
            });

            $(".imgWrapper").click(function (e) {
                var text = this
                    .childNodes[1]
                    .nodeValue
                    .replace("效果", "");
                    var time = new Date()
                    _this.actionStack.push({
                        time:time,
                        action:text,
                    })    
                var img = document.getElementById('pic')
                var AP = _this
                    .img
                    .clone();
                if (text == "原图") 
                    AP.replace(img);
                else {
                    msgEle.style.display = "block";

                    setTimeout(function () {
                        var t = +new Date();
                        AP
                            .ps(text)
                            .replace(img)
                            .complete(function () {
                                console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                                msgEle.style.display = "none";
                            });
                    }, 2);
                }
            });

            document
                .body
                .addEventListener("drop", function (e) {
                    e.preventDefault();
                    var fileList = e.dataTransfer.files;
                    _this.openFile(fileList[0]);
                }, false);

            window.onresize = function () {
                _this.initView();
            };

        },

        init: function () {
            this.initView();
            this.showModel();
            this.eventAtt();

            var _this = this;
            var pic = document.getElementById("pic");
   
            if (pic.complete) {
                this.img = AlloyImage(pic);
                this.initView();
                this.picLoadTime = new Date()
            } else {
                pic.onload = function () {
                    _this.img = AlloyImage(this);
                    _this.initView();
                    console.log('init finished')
                    _this.picLoadTime = new Date()
                };
            }

        },

        initView: function () {
            var func = function () {
                /*
				var computedStyle = getComputedStyle(document.getElementById("picWrapper"));
				*/
                var w_width = parseInt(document.body.clientWidth) - 250;
                var w_height = document.body.clientHeight;
                var p_width = this.width;
                var p_height = this.height;

                var left = (parseInt(w_width) - parseInt(p_width)) / 2;
                var top = (parseInt(w_height) - parseInt(p_height)) / 2;
                top = top < 0
                    ? 0
                    : top;
                left = left < 0
                    ? 0
                    : left;
                this.style.left = left + "px";
                this.style.top = top + "px";
                msgEle.style.left = (parseInt(w_width) - 100) / 2 + "px";
                msgEle.style.top = (parseInt(w_height) - 100) / 2 + "px";
            };
            func.call(document.getElementById("pic"));

            var height = document.body.clientHeight;
            var left = document.querySelector(".left");
            var leftHeight = height - 143;
            left.style.height = leftHeight + "px";
        },

        openFile: function (fileUrl) { //打开文件

            var reader = new FileReader();
            var _this = this;
            reader.readAsDataURL(fileUrl);
            reader.onload = function () {
                var pic = document.getElementById("pic");
                pic.src = this.result;
                pic.onload = function () {
                    _this.initView();
                    _this.img = AlloyImage(this);
                    _this.picLoadTime = new Date()
                    _this.openPicCallBack&&_this.openPicCallBack(_this);
                };
            };

        },

        updateImage:function(text){
            var img = document.getElementById('pic')
            var AP = this
                .img
                .clone();
            if (text == "原图") 
                AP.replace(img);
            else {
                msgEle.style.display = "block";
                setTimeout(function () {
                    var t = +new Date();
                    AP
                        .ps(text)
                        .replace(img)
                        .complete(function () {
                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                        });
                }, 2);
            }
        },

        showModel: function () {
            var EasyReflection = [
                {
                    title: "美肤",
                    key: "e1"
                }, {
                    title: "素描",
                    key: "e2"
                }, {
                    title: "自然增强",
                    key: "e3"
                }, {
                    title: "紫调",
                    key: "e4"
                }, {
                    title: "柔焦",
                    key: "e5"
                }, {
                    title: "复古",
                    key: "e6"
                }, {
                    title: "黑白",
                    key: "e7"
                }, {
                    title: "仿lomo",
                    key: "e8"
                }, {
                    title: "亮白增强",
                    key: "e9"
                }, {
                    title: "灰白",
                    key: "e10"
                }, {
                    title: "灰色",
                    key: "e11"
                }, {
                    title: "暖秋",
                    key: "e12"
                }, {
                    title: "木雕",
                    key: "e13"
                }, {
                    title: "粗糙",
                    key: "e14"
                }
            ];
            var effectModel = '<li class="e_item"><div class="imgWrapper"><img src="static/style/image/demo/{pi' +
                    'c}.png" alt="" />{effect}</div></li>';
            var html = '<li class="e_item"><div class="imgWrapper"><img src="static/style/image/demo/e1.' +
                    'jpg" alt="" />原图</div></li>';
            for (var i = 0; i < EasyReflection.length; i++) {
                html += effectModel
                    .replace("{effect}", i.length < 3
                    ? EasyReflection[i].title + "效果"
                    : EasyReflection[i].title)
                    .replace("{pic}", EasyReflection[i].key);
            }

            document
                .getElementById("effects")
                .innerHTML = html;
        }
    };
    if (!window.alloyImagePlug) {
        //挂载到全局对象里去
        window.alloyImagePlug = Main
    }
})();