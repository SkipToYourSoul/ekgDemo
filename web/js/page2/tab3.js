/**
 * 
 */

function launchContent_tab3(){
	var html = "";
	html += "<div class='row'><div class='eventChart span7' id='timelineChart'></div></div>";
	html += "<table class='table table-hover table-striped'><thead><tr><th>公司大事件</th><th>新闻标题</th><th>新闻来源</th><th>新闻摘要</th></tr></thead>" +
			"<tbody id='tablebody_tab3'><tr><td>数据读取中...</td><td>数据读取中...</td>" +
			"<td>数据读取中...</td><td>数据读取中...</td></tr></tbody></table>";
	$('#tabContent')[0].innerHTML = html;
	initChart_tab3();
}

var chart_tab3;
function initChart_tab3(){
	require(
	        [
	            'echarts',
	            'echarts/chart/eventRiver'
	        ],
	        function (ec) {
	        	chart_tab3 = ec.init(document.getElementById('timelineChart')).showLoading({effect:'spin'});
	        	
	        	//调整图的大小
	        	var resizeTicket = null;
	        	window.onload = function () {
	        	    window.onresize = function () {
	        	        clearTimeout(resizeTicket);
	        	        resizeTicket = setTimeout(function (){
	        	        	chart_tab3.resize();
	        	        },200);
	        	    };
	        	};
	        	
	        	//get data
	        	getCompanyTimeline_tab3();
	       });
}

function getCompanyTimeline_tab3(){
	$.ajax({
		type : "get",
		url : "/ekgDemo/bigevent?company="+currentShortName,
		dataType : "json",
		timeout : 0,
		success : handleBigEvent_tab3, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function handleBigEvent_tab3(jsondata){
	var html_tab3 = "";
	var data_tab3 = [];
	var subdata_tab3 = [];
	var legendData = [];
	var eventCount = 1;	
	if(jsondata.re.length==0 && jsondata.re2.length==0){
		$('#tablebody_tab3')[0].innerHTML = "<tr><td>暂无数据</td><td>暂无数据</td>" +
		"<td>暂无数据</td><td>暂无数据</td></tr>";
	}else{
		for(var i in jsondata.re){		
			count = 1;
			subdata_tab3 = [];
			for(var j in jsondata.re2){
				if(jsondata.re2[j].bigEventId == jsondata.re[i].id){
					if(count == 1){
						time = jsondata.re[i].startTime;
						uptime = time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8)+" "+time.substring(8,10)+":"+time.substring(10,12);
						html_tab3 += "<tr><td>" + jsondata.re[i].eventKeyWord + "<p>"+ uptime +"</p></td>";
					}
					else
						html_tab3 += "<tr><td></td>";
					count ++;
					html_tab3 += "<td>" + jsondata.re2[j].newsTitle + "<p><a href="+jsondata.re2[j].newsUrl+"> >>Link>></a></p>" +"</td>";
					html_tab3 += "<td>" + jsondata.re2[j].newsMedia + "</td>";
					if(jsondata.re2[j].newsSummary!=null && jsondata.re2[j].newsSummary.length > 40)
						html_tab3 += "<td>" + jsondata.re2[j].newsSummary.substring(0,40) + "...</td></tr>";
					else
						html_tab3 += "<td>" + jsondata.re2[j].newsSummary + "...</td></tr>";
					
					var time = jsondata.re2[j].newsTime;
					subdata_tab3.push({
						"time" : time.substring(0,4)+"-"+time.substring(4,6)+"-"+time.substring(6,8),
						"value" : 10,
						"detail" : {
							"link" : jsondata.re2[j].newsUrl,
							"text" : jsondata.re2[j].newsTitle
						}
					});
				}
			}
			if(count > 2){
				data_tab3.push({
					"name" : "事件" + eventCount,
					"type": "eventRiver", 
		            "weight": 1,
		            itemStyle: {
                        normal: {
                            label:{
                            	show:false
                            }
                        }
                    },
					"data" : [{
						"name" : jsondata.re[i].eventKeyWord,
						"weight" : 1,
						"evolution" : subdata_tab3
					}]
				});
				legendData.push("事件" + eventCount);
				eventCount ++;
			}
			$('#tablebody_tab3')[0].innerHTML = html_tab3;	
		}
		
		//drawChart
		chart_tab3.hideLoading();
		chart_tab3.setOption(timelineOption(data_tab3,legendData));
	}
	
	DATA_READY = true;
}
