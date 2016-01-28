/**
 * 	page2/option.js
 */

//全局时间线设置
function option1(timeseries_xData,timeseries_sLine1,timeseries_sLine2,timeseries_sLine3){
	var option = {
        	tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['所有微博','原創微博','轉發微博'],
            },
            toolbox: {
                show : true,
                feature : {
                    magicType : {show: true, type: ['line', 'bar','stack', 'tiled']},
                    restore : {show: true},
                    dataView : {show: true, readOnly: false},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            dataZoom : {
                show : true,
                realtime : true,
                height : 30 ,
                x:80,
                y:290,
                start : 90,
                end : 100,
                handleSize:4,
            },
            grid : {
            	y2 : 100
            },
            xAxis : [
                {
                    type : 'category',
                    name : 'Time',
                    boundaryGap : true,
                    splitLine : {show : false},
                    scale:true,
                    data : function(){
                    	return timeseries_xData;
                    }()
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : 'Tweets',
                    splitArea : {show : true}
                }
            ],
            series : [
                {
                    name:'所有微博',
                    type:'line',
                    data:function(){
                        return timeseries_sLine1;
                    }()
                },
                {
                    name:'轉發微博',
                    type:'line',
                    data:function(){
                        return timeseries_sLine2;
                    }()
                },
                {
                    name:'原創微博',
                    type:'line',
                    data:function(){
                        return timeseries_sLine3;
                    }()
                }
            ]
        };
	
	startTime_tab4 = timeseries_xData[Math.round(90 * timeseries_xData.length /100)];
	endTime_tab4 = timeseries_xData[Math.round(100 * timeseries_xData.length /100)-1];
	var ecConfig = require('echarts/config');
	chart1_tab4.on(ecConfig.EVENT.DATA_ZOOM, function(param){
		startTime_tab4 = timeseries_xData[Math.round(param.zoom.start * timeseries_xData.length /100)].substring(0,7);
		endTime_tab4 = timeseries_xData[Math.round(param.zoom.end * timeseries_xData.length /100)-1].substring(0,7);
	});
	
	return option;
}

//地域分布图设置
function option2(location_mapData,location_maxCount,location_minCount){
	option = {
		    title : {
		        text: '各地区讨论热度分析'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter : "{a}->{b}"
		    },
		    dataRange: {
		        orient: 'horizontal',
		        min: location_minCount,
		        max: location_maxCount,
		        text:['高','低'],           // 文本，默认为数值文本
		        splitNumber:0
		    },
		    toolbox: {
		        show : true,
		        orient: 'vertical',
		        x:'right',
		        y:'center',
		        feature : {
		        	restore : {show: true},
                    dataView : {show: true, readOnly: false},
                    saveAsImage : {show: true}
		        }
		    },
		    series : [
		        {
		            name: '各地参与讨论人数',
		            type: 'map',
		            mapType: 'china',
		            mapLocation: {
		                x: 'left'
		            },
		            selectedMode : 'single',
		            itemStyle:{
		                normal:{label:{show:true}},
		                emphasis:{label:{show:true}}
		            },
		            data:function(){
		            	return location_mapData;
		            }()
		        }
		    ],
		    animation: true
		};
	return option;
}

//云图设置
function option3(eventcloud_clouddata){
	
	option = {
			title: {
		        text: '词云分析'
		    },
		    tooltip: {
		        show: false,
		        formatter : "{a}->{b}"
		    },
		    series: [{
		        name: '词云分析',
		        type: 'wordCloud',
		        size: ['90%', '90%'],
		        textRotation : [0, 90, 270],
		        textPadding: 3,
		        autoSize: {
		            enable: true,
		            minSize: 15
		        },
		        data: function(){
	            	return eventcloud_clouddata;
	            }()
		    }]
	};
	
	var ecConfig = require('echarts/config');
	chart3_tab4.on(ecConfig.EVENT.CLICK, function(param){
		$("#keyword:text").val(param.name);
	});
	
	return option;
}

function kwsearch() {
	window.open("http://news.baidu.com/ns?cl=2&rn=20&tn=news&word="
			+ $("#keyword:text").get(0).value + "&ie=utf-8");
}

//情绪图设置
function option4(eventmood_moodData1,eventmood_moodData2,indicator){
	option = {
			title : {
		        text: '民众情绪分布'
		    },
		    tooltip : {
		        trigger: 'axis',
				show: false
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'right',
		        y : 'bottom',
		        data:['情绪分布','无情绪均匀分布']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		        	restore : {show: true},
                    dataView : {show: true, readOnly: false},
                    saveAsImage : {show: true}
		        }
		    },
		    polar : [
		       {
		           indicator : function(){
		            	return indicator;
		            }()
		        }
		    ],
		    calculable : true,
		    series : [
		        {
		            name: '情绪分布',
		            type: 'radar',
		            itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dotted'
                            },
                            label:{
                            	show:false
                            }
                        }
                    },
		            data : function(){
		            	return eventmood_moodData1;
		            }()
		        },
		        {
		            name: '无情绪均匀分布',
		            type: 'radar',
		            data : function(){
		            	return eventmood_moodData2;
		            }()
		        }
		    ]
		};
	return option;
}

//转发图设置
function option5(nodes,links){
	var option = {
            title : {
                subtext: '数据来源于：新浪微博',
                x:'right',
                y:'bottom'
            },
            tooltip : {
                trigger: 'item',
                formatter: '{a} : {b}'
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true},
                    magicType: {show: true, type: ['force', 'chord']},
                    saveAsImage : {show: true}
                }
            },
            legend: {
                x: 'left',
                data:['微博来源','意见领袖','普通用户'],
                textStyle : {
                	color : 'auto'
                }
            },
            series : [
                {
                    type:'force',
                    name : "微博用户",
                    ribbonType: false,
                    categories : [
                        {
                            name: '微博来源'
                        },
                        {
                        	name: '意见领袖'
                        },
                        {
                        	name: '普通用户'
                        }
                    ],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            nodeStyle : {
                                brushType : 'both',
                                borderColor : '#D4D4D4',
                                borderWidth : 1
                            },
                            linkStyle : {
                            	color : 'grey'
                            }
                        }
                    },
                    minRadius : 4,
                    maxRadius : 8,
                    coolDown: 0.995,
                    scaling : 1,
                    draggable: false,
                    large: true,
                    gravity : 0.5,
                    //linkSymbol : 'arrow',
                    //linkSymbolSize : [1,5],
                    //step:1,
                    roam : 'scale',
                    nodes : nodes,
                    links : links,
                }
            ]
        };
	return option;
}

function timelineOption(data_tab3,legendData){
	var option = {
		    tooltip : {
		        trigger: 'item',
		        enterable: true
		    },
		    legend: {
		        data:function(){
	            	return legendData;
	            }()
		    },
		    xAxis : [
		        {
		            type : 'time',
		            boundaryGap: [0.05,0.1]
		        }
		    ],
		    series : data_tab3
		};
	return option;
}

function relationOption(relationData){
	var option = {
		    title : {
		        text: '公司关系视图'
		    },
		    series : [
		        {
		            name:'树图',
		            type:'tree',
		            orient: 'horizontal',  // vertical horizontal
		            rootLocation: {x: 'left',y: 'center'}, // 根节点位置  {x: 100, y: 'center'}
		            nodePadding: 8,
		            layerPadding: 250,
		            hoverable: false,
		            roam: true,
		            symbolSize: 6,
		            //direction:'inverse',
		            itemStyle: {
		                normal: {
		                    color: '#4883b4',
		                    label: {
		                        show: true,
		                        position: 'right',
		                        formatter: "{b}",
		                        textStyle: {
		                            color: '#000',
		                            fontSize: 5
		                        }
		                    },
		                    lineStyle: {
		                        color: '#ccc',
		                        type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

		                    }
		                },
		                emphasis: {
		                    color: 'black',
		                    label: {
		                        show: false
		                    },
		                    borderWidth: 0
		                }
		            },
		            
		            data: function(){
		            	return relationData;
		            }()
		        }
		    ]
		};
	
	var ecConfig = require('echarts/config');
	chart_tab2.on(ecConfig.EVENT.CLICK, function(param){
		loadingRelationContent(param.name,param.data);
	});
	
	return option;
}