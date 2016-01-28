/**
 * 
 */

require.config({
        paths: {
        	echarts : 'http://echarts.baidu.com/build/dist'
        }
    });
launchContent();

var provinceChart1,provinceChart2,provinceChart3,hangyeChart,cityChart;
var mapChart;

var isContentLaunched;
function launchContent(){
	if (isContentLaunched) {
        return;
    }
	isContentLaunched = 1;
	
	require(
	        [
	            'echarts',
	            'echarts/chart/pie',
	            'echarts/chart/line',
	            'echarts/chart/bar',
	            'echarts/chart/map'
	        ],
	        function (ec) {
	        	mapChart = ec.init(document.getElementById('main'));
	        	provinceChart1 = ec.init(document.getElementById('staticChart1'));
	        	provinceChart2 = ec.init(document.getElementById('staticChart2'));
	        	provinceChart3 = ec.init(document.getElementById('staticChart3'));	        	    	
	        	provinceChart1.setOption(option2("浙江"));
	        	provinceChart2.setOption(option3("浙江"));
	        	provinceChart3.setOption(option4("浙江"));
	        	
	        	mapChart.setOption(mapOption());
	        });
	changeChanye('金华市');
}

function getIntro(name){
	var html = "";
	for(var i=0;i<cityData.length;i++){
		if(cityData[i].name == name){
			html += "<p>"+name+":";
			html += cityData[i].intro+"</p>";
		}
	}
	$('#p2')[0].innerHTML = html;
	
	var html4 = "";
	html4 += "<div class='btn-group btn-group-justified'>";
	var count = 1;
	var product = "";
	for(var i in hangyeData){
		for(var j in hangyeData[i]){
			if(hangyeData[i][j].place==name){
				html4 += "<a class='btn btn-default' onclick=drawHy('"+i+"')>"+i+"</a>";
				if(count == 1){
					product = i;
					count ++;
				}
			}
		}
	}
	html4 += "</div>";
	$('#p4')[0].innerHTML = html4;
	
	drawHy(product);
	drawCity(name);
}

function drawCity(name){
	require(
	        [
	            'echarts',
	            'echarts/chart/pie',
	            'echarts/chart/bar',
	            'echarts/chart/line'
	        ],
	        function (ec) {
	        	cityChart = ec.init(document.getElementById('cityChart'));
	        	cityChart.setOption(option6(name));
	        });
}

function drawHy(name){
	require(
	        [
	            'echarts',
	            'echarts/chart/pie',
	            'echarts/chart/bar',
	            'echarts/chart/line'
	        ],
	        function (ec) {
	        	hangyeChart = ec.init(document.getElementById('productChart1'));
	        	hangyeChart.setOption(option5(name));
	        });
}

function changeLocate(name){
	require(
	        [
	            'echarts',
	            'echarts/chart/pie',
	            'echarts/chart/bar',
	        ],
	        function (ec) {
	        	provinceChart1 = ec.init(document.getElementById('staticChart1'));
	        	provinceChart2 = ec.init(document.getElementById('staticChart2'));
	        	provinceChart3 = ec.init(document.getElementById('staticChart3'));
	        	provinceChart1.setOption(option2(name));
	        	provinceChart2.setOption(option3(name));
	        	provinceChart3.setOption(option4(name));
	        });
}

function changeChanye(name){
	var html = "";
	if(name=='浦东新区')
		html += "<h4>上海产业带</h4><hr>";
	else
		html += "<h4>"+name+"产业带</h4><hr>";
	$('#p1')[0].innerHTML = html;
	var html3 = "";
	var city = [];
	html3 += "<div class='btn-group btn-group-justified'>";
	for(var i=0;i<cityData.length;i++){
		if(cityData[i].city==name){
			html3 += "<a class='btn btn-default' onclick=getIntro('"+cityData[i].name+"')>"+cityData[i].name+"</a>";
			city.push(cityData[i].name);
		}
	}
	html3 += "</div>";
	$('#p3')[0].innerHTML = html3;
	getIntro(city[0]);
}

var resizeTicket;
window.onload = function () {
    window.onresize = function () {
        clearTimeout(resizeTicket);
        resizeTicket = setTimeout(function (){
        	mapChart.resize();
        	provinceChart1.resize();
        	provinceChart2.resize();
        	provinceChart3.resize();
        	cityChart.resize();
        	hangyeChart.resize();
        },200);
    };
};