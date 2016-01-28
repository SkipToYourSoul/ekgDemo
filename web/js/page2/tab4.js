/**
 * 
 */
var chart1_tab4,chart2_tab4,chart3_tab4,chart4_tab4;

function launchContent_tab4(){
	var html = "";
	html += "<div class='row'><div class='span7 statusContent_series' style='margin-left:15px;width:740px'><h4>全局时间线</h4><hr><div id='timeseries' class='statusChart'><h2>显示加载中...</h2></div>" +
			"<button class='btn btn-info' onclick='timeseriesStatus()' style='margin-left:80px;margin-top:-10px;width:570px'>根据全局时间线上的日期查看局部统计</button></div></div>" +
			"<div class='row'>" +
			"<div class='span5' style='margin-left:15px;'>" +
			"<div class='statusContent'><div id='location' class='statusChart'><h2>显示加载中...</h2></div></div>" +
			"<div class='statusContent'><div id='cloudword' style='height:350px'><h2>显示加载中...</h2></div>" +
			"<div><form id='form_keyword' keyaction='http://www.google.com.hk/search' method=get target=_blank style='margin-left: 80px'>" +
			"<p id='p_keyword'><label for='keyword'>关键词:</label> <input id='keyword' type='text' name='as_q' value='' /><input id='Go' type='submit' value='搜索' name='btnG' onclick='kwsearch()' />" +
			"</p></form></div>" +
			"</div>" +
			"<div class='statusContent'><div id='mood' class='statusChart'><h2>显示加载中...</h2></div></div></div>" +
			"<div class='span2' style='width:280px;margin-left:5px;'>" +
			"<div class='hottweet'><h5>热门微博</h5><div id='hottweet' class='pre-scrollable hottweetcontent'><h3>显示加载中...</h3></div></div></div></div>";
	$('#tabContent')[0].innerHTML = html;
	
	initChart_tab4();
}

function initChart_tab4(){
	require(
	        [
	            'echarts',
	            'echarts/chart/line',
	            'echarts/chart/bar',
	            'echarts/chart/map',
	            'echarts/chart/radar',
	            'echarts/chart/wordCloud'
	        ],
	        function (ec) {
	        	chart1_tab4 = ec.init(document.getElementById('timeseries')).showLoading({effect:'bubble'});
	        	chart2_tab4 = ec.init(document.getElementById('location')).showLoading({effect:'ring'});
	        	chart3_tab4 = ec.init(document.getElementById('cloudword')).showLoading({effect:'whirling'});
	        	chart4_tab4 = ec.init(document.getElementById('mood')).showLoading({effect:'bar'});
	        	
	        	//调整图的大小
	        	var resizeTicket = null;
	        	window.onload = function () {
	        	    window.onresize = function () {
	        	        clearTimeout(resizeTicket);
	        	        resizeTicket = setTimeout(function (){
	        	        	chart1_tab4.resize();
	        	        	chart2_tab4.resize();
	        	        	chart3_tab4.resize();
	        	        	chart4_tab4.resize();
	        	        },200);
	        	    };
	        	};
	        	
	        	//get data
	        	launchDataOfTimeseries_tab4();
	        	launchData_tab4();
	       });
}

function launchDataOfTimeseries_tab4(){
	$.ajax({
		type : "get",
		url : "/ekgDemo/timeseries?company=" + currentStatusCompany,
		dataType : "json",
		timeout : 0,
		success : drawTimeseries_tab4,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function launchData_tab4(){
	$.ajax({
		type : "get",
		url : "/ekgDemo/status?company=" + currentStatusCompany + "&oname=" + currentCompany,
		dataType : "json",
		timeout : 0,
		success : drawChart_tab4,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function drawTimeseries_tab4(jsondata){
	//timeline
	var timeseries_xData = [];
	var timeseries_sLine1 = [];
	var timeseries_sLine2 = [];
	var timeseries_sLine3 = [];
	for(var idx in jsondata.re){
		var row = jsondata.re[idx];
		timeseries_xData.push(row.time);
		timeseries_sLine1.push(row.allTweet);
		timeseries_sLine2.push(row.RTTweet);
		timeseries_sLine3.push(row.oriTweet);
	}
	chart1_tab4.hideLoading();
	chart1_tab4.setOption(option1(timeseries_xData,timeseries_sLine1,timeseries_sLine2,timeseries_sLine3));
}

function drawChart_tab4(jsondata){
	
	//location
	var location_mapData = [];
	var location_maxCount = 0;
	var location_minCount = 0;
	for(var idx in jsondata.re2){
		var row = jsondata.re2[idx];
		if(row.userCount>location_maxCount)
			location_maxCount = row.userCount;
		if(row.userCount<location_minCount)
			location_minCount = row.userCount;
		location_mapData.push({name:row.location,value:row.userCount});
	}
	chart2_tab4.hideLoading();
	chart2_tab4.setOption(option2(location_mapData,location_maxCount,location_minCount));
	
	//hottweet
	var html = "";
	for(var idx in jsondata.re3){
		var row = jsondata.re3[idx];
		html += "<div data-toggle='modal' data-target='#myModal' onclick='getRetweet(this.id,this.innerHTML)' id='"+row.mid+"'><h5>"+row.text+"</h5>";
		html += "<h5><small>"+row.uname+"("+row.time+")"+" <cite>RepostCount:"+row.response+"</cite></small></h5>";
		html += "</div><hr>";
		if(idx>10)
			break;
	}
	$('#hottweet')[0].innerHTML = html;
	
	//mood
	var eventmood_moodData1 = [];
	var eventmood_moodData2 = [];
	var eventmood_max = 0;
	var temp = [];
	var eventmood_indicator = [];
	var indicator = [];
	var total=0;
	for(var idx in jsondata.re5){
		var row = jsondata.re5[idx];
		eventmood_indicator.push(row.mood);
		temp.push(row.count);
		total+=row.count;
		if(row.count>eventmood_max)
			eventmood_max = row.count;
	}
	var pingjun = total/6;
	var untemp = [pingjun,pingjun,pingjun,pingjun,pingjun,pingjun,pingjun];
	for(var i=0;i<eventmood_indicator.length;i++)
		indicator.push({text:eventmood_indicator[i],max:eventmood_max});
	eventmood_moodData1.push({value:temp,name :'事件情绪分布'});
	eventmood_moodData2.push({value:untemp,name :'无情绪均匀分布'});
	chart4_tab4.hideLoading();
	chart4_tab4.setOption(option4(eventmood_moodData1,eventmood_moodData2,indicator));
	
	//cloud
	var eventcloud_clouddata = [];
	for(var idx in jsondata.re4){
		var row = jsondata.re4[idx];	
		eventcloud_clouddata.push({
			name: row.trem,
            value: row.count,
            itemStyle: createRandomItemStyle()}
		);
	}
	
	chart3_tab4.hideLoading();
	chart3_tab4.setOption(option3(eventcloud_clouddata));
	
	//$('#cloudword')[0].innerHTML = "";
	//drawcloud(eventcloud_clouddata,eventcloud_min,eventcloud_max);
	
	DATA_READY = true;
}

function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}

//按照局部时间段进行查询
var startTime_tab4,endTime_tab4;
function timeseriesStatus(){
	
	chart2_tab4.showLoading({effect:'ring'});
	chart3_tab4.showLoading({effect:'whirling'});
	chart4_tab4.showLoading({effect:'bar'});
	
	$.ajax({
		type : "get",
		url : "/ekgDemo/statusContent?company=" + currentStatusCompany + "&oname=" + currentCompany + "&startTime=" + startTime_tab4 + "&endTime=" + endTime_tab4,
		dataType : "json",
		timeout : 0,
		success : drawChart_timeseriesStatus,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function drawChart_timeseriesStatus(jsondata){
	//tfidf
	var eventcloud_clouddata = [];
	var tfidfObject = {};
	for(var idx in jsondata.re2){
		var row = jsondata.re2[idx];	
		for(var id in row.tfidf.split("_")){
			var term = row.tfidf.split("_")[id].split(":")[0];
			var count = parseFloat(row.tfidf.split("_")[id].split(":")[1]);
			if(term.length<=3){
				if(!tfidfObject.hasOwnProperty(term))
					tfidfObject[term] = count;
				else
					tfidfObject[term]  = tfidfObject[term]+count;
			}
		}
	}
	
	var count = 0;
	for(var idx in tfidfObject){
		if(count<40)
		eventcloud_clouddata.push({
			name: idx,
            value: tfidfObject[idx]/jsondata.re2.length+15,
            itemStyle: createRandomItemStyle()}
		);
		else
			break;
		count++;
	}	
	
	chart3_tab4.hideLoading();
	chart3_tab4.setOption(option3(eventcloud_clouddata));
	
	//location
	var location_mapData = [];
	var location_z = {};
	var location_maxCount = -100;
	var location_minCount = 100;
	for(var idx in jsondata.re1){
		var row = jsondata.re1[idx];	
		for(var id in row.zcore.split("_")){
			if(row.zcore.split("_")[id].split(":")[1] != 'NaN'){
				var locate = row.zcore.split("_")[id].split(":")[0];
				var count = parseFloat(row.zcore.split("_")[id].split(":")[1]);
				if(!location_z.hasOwnProperty(locate))
					location_z[locate] = count;
				else
					location_z[locate]  = location_z[locate]+count;
			}
		}
	}
	for(var idx in location_z){
		location_z[idx] = location_z[idx]/jsondata.re1.length;
		if(location_z[idx] > location_maxCount)
			location_maxCount = location_z[idx];
		if(location_z[idx] < location_minCount)
			location_minCount = location_z[idx];
		location_mapData.push({name:idx,value:location_z[idx]});
	}
	chart2_tab4.hideLoading();
	chart2_tab4.setOption(option2(location_mapData,location_maxCount,location_minCount));
	
	//mood
	var eventmood_moodData1 = [];
	var eventmood_moodData2 = [];
	var eventmood_max = -100;
	var eventmood_min = 100;
	var temp = [];
	var eventmood_indicator = [];
	var indicator = [];
	var mood_z = {};
	for(var idx in jsondata.re3){
		var row = jsondata.re3[idx];	
		for(var id in row.zcore.split("_")){
			if(row.zcore.split("_")[id].split(":")[1] != 'NaN'){
				var mood = row.zcore.split("_")[id].split(":")[0];
				var count = parseFloat(row.zcore.split("_")[id].split(":")[1]);
				if(!mood_z.hasOwnProperty(mood))
					mood_z[mood] = count;
				else
					mood_z[mood]  = mood_z[mood]+count;
			}
		}
	}
	for(var idx in mood_z){
		mood_z[idx] = mood_z[idx]/jsondata.re3.length;
		eventmood_indicator.push(idx);
		temp.push(mood_z[idx]);
		if(mood_z[idx]>eventmood_max)
			eventmood_max = mood_z[idx];
		if(mood_z[idx]<eventmood_min)
			eventmood_min = mood_z[idx];
	}
	var untemp = [eventmood_min,eventmood_min,eventmood_min,eventmood_min,eventmood_min,eventmood_min,eventmood_min];
	for(var i=0;i<eventmood_indicator.length;i++)
		indicator.push({text:eventmood_indicator[i],max:eventmood_max,min:eventmood_min});
	eventmood_moodData1.push({value:temp,name :'事件情绪分布'});
	eventmood_moodData2.push({value:untemp,name :'无情绪均匀分布'});
	chart4_tab4.hideLoading();
	chart4_tab4.setOption(option4(eventmood_moodData1,eventmood_moodData2,indicator));
	
	//hottweet
	var html = "";
	for(var idx in jsondata.re){
		var row = jsondata.re[idx];
		html += "<div data-toggle='modal' data-target='#myModal' onclick='getRetweet(this.id,this.innerHTML)' id='"+row.mid+"'><h5>"+row.text+"</h5>";
		html += "<h5><small>"+row.uname+"("+row.time+")"+" <cite>RepostCount:"+row.response+"</cite></small></h5>";
		html += "</div><hr>";
		if(idx>10)
			break;
	}
	$('#hottweet')[0].innerHTML = html;
}