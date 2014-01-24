define(function(require ,exports ,module) {
    var tmpl = {};
    tmpl.FORMHTML = '<h2 class="info-title">详细信息</h2><hr/><form id="info-form"><div class="info-layout name-layout"><span id="info-num" dataType="number">{{ number }}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="info-name" dataType="name">{{ name }}</span></div>' +
                    '<div class="info-layout"><span id="phone-label" dataType="phone">电话</span>：<span id="info-phone" dataType="phone">{{ phone }}</span></div>' +
                    '<div class="info-layout"><span id="email-label" dataType="email">邮箱</span>：<span id="info-email" dataType="email">{{ email }}</span></div>' +
                    '<div class="info-layout"><h3>相片信息</h3></div>' +
                    '<div class="info-layout"><span id="electronic-label" dataType="electronic">电子版</span>：<span id="info-electronic" dataType="electronic">{{ e_photo_text }}</span></div>' +
                    '<div class="info-layout"><span id="Wash-label" dataType="wash">冲洗版</span>：<span id="info-wash" dataType="wash">{{ w_photo_text }}</span></div>' +
                    '<div class="info-layout remarks-layout"><span id="remarks-label" dataType="remarks">备注</span>：<span id="info-remarks" dataType="remarks">{{ remarks }}</span></div>' +
                    '<div class="fn-btn"><span class="edit"></span><span class="send"></span><span class="delete-info"></span></div><span class="putAlway-btn"></span></form>';

    tmpl.INPUTHTML = '<h2 class="info-title">新建</h2><hr/><form action="/addNew" name="newform" method="post" enctype="multipart/form-data">' +
                     '<div class="form-layout"><label for="name">姓名：</label><input id="name" type="text" placeholder="请输入名字" name="name" /></div>' +
                     '<div class="form-layout"><label for="addr">是否是大学城校区：</label><span class="addr-container radio-selected"><input id="addr1" name="addr" type="radio" value="1" checked="checked"  /><span>是</span></span><span class="addr-container"><input id="addr2" name="addr" value="0" type="radio" /><span>否</span></span></div>' +
                     '<div class="form-layout"><label for="dormitory">宿舍：</label><div class="dropbox"><span class="dcontent">东区12</span><span class="dbtn"><em class="w-arrow"></em></span><ul class="droplist"><li>东区07</li><li>东区08</li><li>东区09</li><li>东区10</li><li>东区11</li></ul><input name="dormit" id="dormit" value="东区12" /></div><span class="linkline">--</span><input id="dormitory" name="dormitory" type="text" placeholder="宿舍号" /></div>' +
                     '<div class="form-layout"><label for="phone">联系电话：</label><input id="phone" name="phone" type="text" placeholder="请输入短号或者长号" /></div>' +
                     '<div class="form-layout"><label for="email">邮箱：</label><input id="email" name="email" type="text" placeholder="xxxx@sample.com" /></div>' +
                     '<hr class="hr-spec"/><div class="form-layout"><label for="photo_text1">相片编码：</label><input id="photo_text1" name="photo_text1" type="text" placeholder="电子版相片编码" /><span class="add"></span><input id="photo1" name="photo1" type="file" multiple/></div>' +
                     '<div class="form-layout"><label for="photo_text2"></label><input id="photo_text2" name="photo_text2" type="text" placeholder="冲洗版相片编码" /><span class="add"></span><input id="photo2" name="photo2" type="file" multiple/></div>' +
                     '<div class="form-layout"><button id="submit" type="submit">确认</button></div></form>';

    tmpl.CONTENT = '<h2 class="info-title">新建</h2><hr/><form action="index.html">' +
                    '<div class="form-layout"><label for="name">姓名：</label><input id="name" type="text" placeholder="请输入名字" value="{{ name }}"/></div>' +
                    '<div class="form-layout"><label for="addr">是否是大学城校区：</label><span class="addr-container radio-selected"><input id="addr1" name="addr" type="radio" checked="checked"  /><span>是</span></span><span class="addr-container"><input id="addr2" name="addr" type="radio" /><span>否</span></span></div>' +
                    '<div class="form-layout"><label for="dormitory">宿舍：</label><div class="dropbox"><span class="dcontent">{{ dormit }}</span><span class="dbtn"><em class="w-arrow"></em></span><ul class="droplist"><li></li></ul></div><span class="linkline">--</span><input id="dormitory" type="text" placeholder="宿舍号" value="{{ dormitory }}/></div>' +
                    '<div class="form-layout"><label for="phone">联系电话：</label><input id="phone" type="text" placeholder="请输入短号或者长号" value="{{ phone }}" /></div>' +
                    '<div class="form-layout"><label for="email">邮箱：</label><input id="email" type="text" placeholder="xxxx@sample.com" value="{{ email }}"/></div><hr class="hr-spec"/>' +
                    '<div class="form-layout"><label for="photo">相片编码：</label><input id="photo" type="text" placeholder="电子版相片编码" value="{{ electronic }}"/><span class="add"></span></div>' +
                    '<div class="form-layout"><label for="photo1"></label><input id="photo1" type="text" placeholder="冲洗版相片编码" value="{{ wash }}"/><span class="add"></span></div>' +
                    '<div class="form-layout"><button id="submit" type="button">确认</button></div></form>';

    tmpl.TRCONTENT = '<tr class="tBody data-tr"><th class="row0"><span></span></th>' +
                     '<th class="row1"><span></span></th>' +
                     '<th class="row2"><span></span></th>' +
                     '<th class="row3"><span>{{ name }}</span></th>' +
                     '<th class="row4"><span>{{ dormit }} {{ dormitory }}</span></th>' +
                     '<th class="row5"><span>{{ phone }}</span></th>' +
                     '<th class="row6"><span>{{ email }}</span></th></tr>';

    tmpl.TRCONTENTSPEC = '<tr class="tBody spec-tr"><th class="row0"></th>' +
                     '<th class="row1"></th><th class="row2">' +
                     '<span></span></th><th class="row3">' +
                     '<span></span></th><th class="row4">' +
                     '<span></span></th><th class="row5">' +
                     '<span></span></th><th class="row6">' +
                     '<span></span></th></tr>';

    tmpl.PHOTO1 =  '<div class="preview"><ul class="pre-nav"><li class="hover">电子版</li><li>冲洗版</li></ul>' +
                    '<div class="img-container"><img id="pic" src="info/{{ randnum }}/e/img-content-01.jpg" ' +
                    'alt=""></div><h4 class="img-title">{{ name }}</h4><ul class="pic-btn">' +
                    '<li class="hover" ></li><li></li><li></li></ul></div>';

    tmpl.PHOTO2 = '<div class="preview"><div class="pre-content"><div class="pre-wrap">' +
                    '<p>Sorry，没有查找到匹配的相片 :(</p>' +
                    '<button class="re-find">重新查找</button>' +
                    '</div></div></div>';

    return tmpl;

});