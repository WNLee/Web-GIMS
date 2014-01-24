
/** 加载表格模块 **/
seajs.use("./scripts/table.js", function(t){
    t.basehandle();
});

/** 加载表单模块 **/
seajs.use("./scripts/form.js", function(f){
    f.basehandle();
});

/** 加载背景图片全屏自适应模块 **/
seajs.use("./scripts/imgFill",function(m) {
    obj = {
        img: {
            width: 1280,
            height: 798
        },
        iw: screen.width,
        ih: screen.height
    };

    bgImg = new m(".bgi img", obj);
    bgImg.init();

});

/** 引入模板模块，这里可以用作ajax模块的依赖 **/
// seajs.use(["./scripts/view" ,"./scripts/tmpl"], function(v ,t) {
//     var data = [{"number":"03","name":"陈丽诗","dormit":"东区12","dormitory":"542"
//                 ,"phone":"13824490607（620607）"
//                 ,"email":"armchanel@msn.com","electronic":"DSC0304 DSC0305 DSC0306"
//                 ,"wash":"DSC0304","remarks":""}],
//         htm = '';
//     var form = document.forms["infoform"];
//     v.addTmpls("FORMHTML" ,t.FORMHTML);
//     v.addTmpls("INPUTHTML" ,t.INPUTHTML);
//     v.addTmpls("CONTENT" ,t.CONTENT);
//     htm = v.setData("CONTENT" ,data);
//     // form.innerHTML = htm;
// });
