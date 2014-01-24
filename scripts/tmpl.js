define(function(require ,exports ,module) {
    var tmpl = {};
    tmpl.FORMHTML = '<div class="info-layout name-layout"><span id="info-num" dataType="number">{{ number }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="info-name" dataType="name">{{ name }}</span></div>' +
                    '<div class="info-layout"><span id="phone-label" dataType="phone">电话</span>：<span id="info-phone" dataType="phone">{{ phone }}</span></div>' +
                    '<div class="info-layout"><span id="email-label" dataType="email">邮箱</span>：<span id="info-email" dataType="email">{{ email }}</span></div>' +
                    '<div class="info-layout"><h3>相片信息</h3></div>' +
                    '<div class="info-layout"><span id="electronic-label" dataType="electronic">电子版</span>：<span id="info-electronic" dataType="electronic">{{ electronic }}</span></div>' +
                    '<div class="info-layout"><span id="Wash-label" dataType="wash">冲洗版</span>：<span id="info-wash" dataType="wash">{{ wash }}</span></div>' +
                    '<div class="info-layout remarks-layout"><span id="remarks-label" dataType="remarks">备注</span>：<span id="info-remarks" dataType="remarks">{{ remarks }}</span></div>' +
                    '<div class="fn-btn"><span class="edit"></span><span class="send"></span><span class="delete-info"></span></div><span class="putAlway-btn"></span>';

    tmpl.INPUTHTML = '<div class="form-layout"><label for="name">姓名：</label><input id="name" type="text" placeholder="请输入名字" value="{{ name }}"/></div>' +
                     '<div class="form-layout"><label for="addr">是否是大学城校区：</label><span class="addr-container"><input id="addr1" name="addr" type="radio" checked="checked" /><span>是</span></span><span class="addr-container"><input id="addr2" name="addr" type="radio" /><span>否</span></span></div>' +
                     '<div class="form-layout"><label for="dormitory">宿舍：</label><div class="dropbox"><span class="dcontent">{{ dormit }}</span><span class="dbtn"><em class="w-arrow"></em></span><ul class="droplist"><li></li></ul></div><span class="linkline">--</span><input id="dormitory" type="text" placeholder="宿舍号" value="{{ dormitory }}"/></div>' +
                     '<div class="form-layout"><label for="phone">联系电话：</label><input id="phone" type="text" placeholder="请输入短号或者长号" value="{{ phone }}" /></div>' +
                     '<div class="form-layout"><label for="email">邮箱：</label><input id="email" type="text" placeholder="xxxx@sample.com" value="{{ email }}"/></div>' +
                     '<hr class="hr-spec"/>' +
                     '<div class="form-layout"><label for="photo">相片编码：</label><input id="photo" type="text" placeholder="电子版相片编码" value="{{ electronic }}"/><span class="add"></span></div>' +
                     '<div class="form-layout"><label for="photo1"></label><input id="photo1" type="text" placeholder="冲洗版相片编码" value="{{ wash }}" /><span class="add"></span></div>' +
                     '<div class="form-layout"><button id="submit" type="button">确认</button></div>';

    tmpl.CONTENT = '<h2 class="info-title">新建</h2><hr/><form action="index.html">' +
                    '<div class="form-layout"><label for="name">姓名：</label><input id="name" type="text" placeholder="请输入名字" value="{{ name }}"/></div>' +
                    '<div class="form-layout"><label for="addr">是否是大学城校区：</label><span class="addr-container radio-selected"><input id="addr1" name="addr" type="radio" checked="checked"  /><span>是</span></span><span class="addr-container"><input id="addr2" name="addr" type="radio" /><span>否</span></span></div>' +
                    '<div class="form-layout"><label for="dormitory">宿舍：</label><div class="dropbox"><span class="dcontent">{{ dormit }}</span><span class="dbtn"><em class="w-arrow"></em></span><ul class="droplist"><li></li></ul></div><span class="linkline">--</span><input id="dormitory" type="text" placeholder="宿舍号" value="{{ dormitory }}/></div>' +
                    '<div class="form-layout"><label for="phone">联系电话：</label><input id="phone" type="text" placeholder="请输入短号或者长号" value="{{ phone }}" /></div>' +
                    '<div class="form-layout"><label for="email">邮箱：</label><input id="email" type="text" placeholder="xxxx@sample.com" value="{{ email }}"/></div><hr class="hr-spec"/>' +
                    '<div class="form-layout"><label for="photo">相片编码：</label><input id="photo" type="text" placeholder="电子版相片编码" value="{{ electronic }}"/><span class="add"></span></div>' +
                    '<div class="form-layout"><label for="photo1"></label><input id="photo1" type="text" placeholder="冲洗版相片编码" value="{{ wash }}"/><span class="add"></span></div>' +
                    '<div class="form-layout"><button id="submit" type="button">确认</button></div></form>';

    tmpl.TRCONTENTSPEC = '<tr class="tBody spec-tr"><th class="row0"></th>' +
                     '<th class="row1"></th><th class="row2">' +
                     '<span></span></th><th class="row3">' +
                     '<span></span></th><th class="row4">' +
                     '<span></span></th><th class="row5">' +
                     '<span></span></th><th class="row6">' +
                     '<span></span></th></tr>';

    tmpl.PHOTO1 =  '<div class="preview"><ul class="pre-nav"><li class="hover">电子版</li><li>冲洗版</li></ul>' +
                    '<div class="img-container"><img id="pic" src="images/img-content-01.jpg" ' +
                    'alt=""></div><h4 class="img-title">{{ name }}</h4><ul class="pic-btn">' +
                    '<li class="hover" ></li><li></li><li></li></ul></div>';

    tmpl.PHOTO2 = '<div class="pre-content"><div class="pre-wrap">' +
                    '<p>Sorry，没有查找到匹配的相片 :(</p>' +
                    '<button class="re-find">重新查找</button>' +
                    '</div></div>';

    return tmpl;

});