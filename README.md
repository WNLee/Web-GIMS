Web-GIMS
========

> 用 Express & mongodb 结合开发的一个图片展示动态页面。

## 目录

- 前言
- 安装说明
- 详细说明
- 总结

## 前言

一直在学习 NodeJs，苦于没有练手的机会。就找了某声拿了这个 PSD 然后就开始了这个系统的制作。现在功能还不完善，只能新建和删除，以后有空再慢慢增加功能吧。这个系统个人觉得比较有亮点的应该就是 用到 SeaJs 实模块化，还有就是后台用到了 Express & Mongodb。各位感兴趣可以看下源码。

## 安装说明

1. 安装 NodeJs & Mongodb
	
	这个不用是最基本的吧，网上安装的教程很多所以就不赘述了。

2. 安装依赖模块

	`npm install` 这个也是必不可少的吧！

3. 产生随机数

	这个系统为每个添加的用户分配一个 日期 + 0~1000的随机数数字串来作为存储相片的文件夹，比如今天添加的用户就会是 `20140125****` 这样子的，后4位是随机数。随机数的参数是由存储在数据库中的一个数组，每次随机取一个数，取到之后就把该项置空，取的时候如果遇到空项就再取直到取到非空项。详细请看 `rand.js` 文件。

	- 数据库名字为 gims
	- 用户信息为 info
	- 随机数为 rand
		
			// 数据库 setting.js 文件如下
			module.exports = {
    			cookieSecret: 'mygims',
    			db: 'gims',
    			host: 'localhost'
			};

4. 依赖模块

		{
			"name": "GIMS",
  			"version": "0.0.1",
  			"private": true,
  			"scripts": {
    			"start": "node app.js"
  			},
  			"dependencies": {
    			"express": "3.4.0",
    			"connect-mongo": "*",
    			"connect-flash": "*",
    			"mongodb": "*",
    			"ejs": "*"
  			}
		}

## 详细说明

1. 静态页面
	>该页面兼容到 IE8
	- `file.js` 模块用于自定义上传文件框的样式，和多文件上传兼容
	- `formvalidator.js` 模块用于表单验证
	- `imgFill.js`模块用于图片全屏效果
	- `scrollbar.js`模块用于页面自定义滚动条
	- `select.js`模块用于自定义选择框样式
	- `view.js`模块用于页面模板操作
	- `tmpl.js`模块存放页面有HTML模板
	- `form.js`模块用于实现页面表单效果
	- `table.js`模块用于实现页面表格效果
	- `main.js`模块是SeaJs对各模块的调用

2. 后台说明
	- `db.js` 文件用于数据库连接
	- `file.js`文件用于服务器文件操作
	- `info.js`文件用于数据库中 info 文档的增删查改
	- `rand.js`文件用于获取用户文件夹
	- `routes`中的`index.js`文件用于服务器与客户端的交互

3. 设计说明
	>解释权一切归于设计师（大平面）

## 总结

>小小练手作品，大牛勿喷！希望可以 fork 一下，一起完善她，一起进步