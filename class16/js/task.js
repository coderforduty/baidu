/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input');
	var city_name = city.value.trim();
	if (city_name == '') {
		alert('city_input不能为空!!!');
		city.focus();
		return;
	}

	var value_input = document.getElementById('aqi-value-input');
	var value_input_name = value_input.value.trim();
	if (value_input_name == '') {
		alert('value_input不能为空!!!');
		value_input.focus();
		return;
	}

	aqiData[city_name] = parseInt(value_input_name);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML = '';

	for (var i in aqiData) {
		var tr = document.createElement('tr');

		var td = document.createElement('td');
		td.innerHTML = i;
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = aqiData[i];
		tr.appendChild(td);

		td = document.createElement('td');
		td.innerHTML = '<a href="#">删除</a>';
		addEvent(td, "click", delBtnHandle);
		tr.appendChild(td);


		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  delete aqiData[event.target.parentNode.previousSibling.previousSibling.innerText];

  renderAqiList();
}

function init() {
	var add_btn = document.getElementById('add-btn');

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addEvent(add_btn, "click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

window.onload = init;


function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}