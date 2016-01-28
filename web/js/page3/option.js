/**
 * 
 */

function option2(name){
	//handleData
	var legend1 = [];
	var piedata = [];
	for(var i=0;i<cityData0.length;i++){
		if(cityData0[i].prov==name){
			piedata.push({name:cityData0[i].name,value:cityData0[i].value});
		    legend1.push(cityData0[i].name);
		}
	}
	var option = { 
        	title : {
                text: name+'各地公司数分布',
                y:'bottom',
                x:'center'
            },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
    	        orient : 'vertical',
    	        x : 'left',
    	        data:function(){
    	        	return legend1;
    	        }()
    	      },
          
            calculable : true,
            series : [        
                      {
                          name:'公司数',
                          type:'pie',
                          center : ['60%', '50%'],
                          radius : ['50%', '70%'],
                          itemStyle : {
                              normal : {
                                  label : {
                                      show : false
                                  },
                                  labelLine : {
                                      show : false
                                  }
                              },
                              emphasis : {
                                  label : {
                                      show : true,
                                      position : 'center',
                                      textStyle : {
                                          fontSize : '20',
                                          fontWeight : 'bold'
                                      }
                                  }
                              }
                          },
                          data:function(){return piedata;}()
                      }
            ]};
	return option;
}

function option3(name){
	//handleData
	var legend2 = [];
	var piedata1_0 = [];
	var piedata1_1 = [];
	var piedata1_2 = [];
	var piedata1_3 = [];
	var piedata1_4 = [];
	var piedata1_5 = [];
	for(var i=0;i<cityData0.length;i++){
		if(cityData0[i].prov==name){
			piedata1_0.push(cityData0[i].people0);
		    piedata1_1.push(cityData0[i].people1);
		    piedata1_2.push(cityData0[i].people2);
		    piedata1_3.push(cityData0[i].people3);
		    piedata1_4.push(cityData0[i].people4);
		    piedata1_5.push(cityData0[i].peoWple5);
		    legend2.push(cityData0[i].name);
		}
	}
	var option = {
  		  title : {
              text: name+'企业人数分布',
              y:'bottom',
              x:'center'
          },
          
          legend: {
              data:['10人以下', '10-50人','51-200人','201-500人','501-1000人','1000人以上']
          },
          xAxis : [
   		        {
   		        	type : 'value',
   		            splitArea : {show : true}
   		        }
   		    ],
   		    yAxis : [
   		        {
   		        	type : 'category',
   		        	 data:function(){
             	        	return legend2;
             	        }()
   		        }
   		    ],
   		
  	    series : [
  	            {
  	            	name:'10人以下',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_0
  	            },
  	            {
  	            	name:'10-50人',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_1
  	            },
  	            {
  	            	name:'51-200人',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_2
  	            },
  	            {
  	            	name:'201-500人',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_3
  	            },
  	            {
  	            	name:'501-1000人',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_4
  	            },
  	            {
  	            	name:'1000人以上',
 		            type:'bar',
 		            stack: '广告',
 		            data:piedata1_5
  	            }
  	            ]
	};
	return option;
}

function option4(name){
	var piedata2_0 = [];
	var piedata2_1 = [];
	var piedata2_2 = [];
	var piedata2_3 = [];
	var piedata2_4 = [];
	var legend2 = [];
	for(var i=0;i<cityData0.length;i++){
		if(cityData0[i].prov==name){
			piedata2_0.push(cityData0[i].money0);
		    piedata2_1.push(cityData0[i].money1);
		    piedata2_2.push(cityData0[i].money2);
		    piedata2_3.push(cityData0[i].money3);
		    piedata2_4.push(cityData0[i].money4);
		    legend2.push(cityData0[i].name);
		}
	}
	 var option = {
   		  title : {
                 text: name+'年营业额分布',
                 y:'bottom',
                 x:'center'
             },
   		   
   		    legend: {
   		        data:['10万/年以下','10-300万/年','301-700万/年','701-1000万/年',"1000万/年以上"]
   		    },
   		   
   		    xAxis : [
   		        {
   		        	type : 'value',
   		            splitArea : {show : true}
   		        }
   		    ],
   		    yAxis : [
   		        {
   		        	type : 'category',
   		        	 data:function(){
             	        	return legend2;
             	        }()
   		            
   		        }
   		    ],
   		    tooltip : {
                   trigger: 'item',
                   formatter: "{a} <br/>{b} : {c} ({d})"
               },
   		    series : [
   		        
   		        {
   		            name:'10万/年以下',
   		            type:'bar',
   		            stack: '广告',
   		            data:piedata2_0
   		        },
   		        {
   		            name:'10-300万/年',
   		            type:'bar',
   		            stack: '广告',
   		            data:piedata2_1
   		        },
   		        {
   		            name:'301-700万/年',
   		            type:'bar',
   		            stack: '广告',
   		            data:piedata2_2
   		        },
   		        {
   		            name:'701-1000万/年',
   		            type:'bar',
   		            stack: '广告',
   		            data:piedata2_3
   		        },
   		        {
   		            name:'1000万/年以上',
   		            type:'bar',
   		            stack: '广告',
   		            data:piedata2_4
   		        }
   		    ]};
	 return option;
}

function option5(name){
	var legendData = [];
	var xData = [];
	var seriesData = [];
	for (var i in hangyeData){
		if(i == name){
			for(var j in hangyeData[i]){
				xData.push(hangyeData[i][j].place);
			}
		}
	}
	for (var i in placechanye[xData[0]]){
		if(placechanye[xData[0]][i].name == name)
			legendData.push(placechanye[xData[0]][i].product);
	}
	for(var i in legendData){
		var data = [];
		
		for(var a in xData){
			var city = xData[a];
			for(var b in placechanye[city]){
				if(placechanye[city][b].product == legendData[i])
					data.push(placechanye[city][b].value);
			}
		}
		
		seriesData.push({
			name:legendData[i],
			type:'bar',
			data:function(){
	        	return data;
	        }()
		});
	}
	
	option = {
		    title : {
		        text: '('+name+') 行业地区分布图',
		        x: 'center',
		        y: 'bottom'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x: 'left',
		        data:function(){
		        	return legendData;
		        }()
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar','stack', 'tiled']},
		            restore : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : function(){
			        	return xData;
			        }()
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : function(){
	        	return seriesData;
	        }()
		};	                    
	return option;
}

function option6(name){
	var data = [];
	for (var i in diquData){
		if(diquData[i].name == name){
			data.push(diquData[i].people0);
			data.push(diquData[i].people1);
			data.push(diquData[i].people2);
			data.push(diquData[i].people3);
			data.push(diquData[i].people4);
			data.push(diquData[i].people5);
			data.push(diquData[i].money0);
			data.push(diquData[i].money1);
			data.push(diquData[i].money2);
			data.push(diquData[i].money3);
			data.push(diquData[i].money4);
			break;
		}
	}
	var option = {
		    title : {
		    	text: "("+name+') 企业人数/年营业额分布图',
		        x: 'center',
		        y: 'bottom'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['公司数']
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['10人以下','10-50人','51-200人','201-500人','501-1000人','1000人以上','10万/年以下','10-300万/年','301-700万/年','701-1000万/年','1000万/年以上']
		        }
		    ],
		    yAxis : [
		        {
		        	name : '公司数',
		            type : 'value'
		        },
		    ],
		    series : [
		        {
		            name:'公司数',
		            type:'bar',
		            data:function(){
			        	return data;
			        }()
		        }
		    ]
		};
	return option;
}

function mapOption(){
	var ecConfig = require('echarts/config');
	var zrEvent = require('zrender/tool/event');

	var curIndx = 0;
	var mapType = [
	    // 江浙沪
	    '浙江', '江苏','上海'
	];

	document.getElementById('main').onmousewheel = function (e){
	    var event = e || window.event;
	    //滚轮往前滚，则为1，往后滚，则值为-1
	    curIndx += zrEvent.getDelta(event) > 0 ? (-1) : 1;
	    if (curIndx < 0) {
	        curIndx = mapType.length - 1;
	    }
	    var mt = mapType[curIndx % mapType.length];
	    option.series[0].mapType = mt;
	    option.title.subtext = mt + ' （滚轮切换省份，点击查看信息）';
	    if(mt == '浙江'){
	    	option.dataRange.max = 25773;
		    changeChanye('金华市');
	    }
	    if(mt == '江苏'){
	    	option.dataRange.max = 3129;
	    	changeChanye('苏州市');
	    }
	    if(mt == '上海'){
	    	option.dataRange.max = 3053;
	    	changeChanye('浦东新区');
	    }
	    mapChart.setOption(option, true);
	    
	    changeLocate(mt);
	    
	    zrEvent.stop(event);
	};

	mapChart.on(ecConfig.EVENT.CLICK, function (param){
		changeChanye(param.name);
	});

	var option = {
	    title: {
	        text : '长江三角区产业带地图',
	        subtext : '浙江 （滚轮切换省份，点击查看信息）'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: '点击查看信息<br/>公司数<br/>{b}:{c}'
	    },
	    dataRange: {
	        min: 0,
	        max: 25773,
	        color:['orange','yellow'],
	        text:['高','低'],           // 文本，默认为数值文本
	        calculable : true
	    },
	    series : [
	        {
	            name: '企业数',
	            type: 'map',
	            mapType: '浙江',
	            selectedMode : 'single',
	            mapLocation: {
	                height: '100%'
	            },
	            itemStyle:{
	                normal:{label:{show:true}},
	                emphasis:{label:{show:true}}
	            },
	            data:[
	                {name: '金华市',value: 25773},{name: '杭州市',value: 2929},{name: '绍兴市',value: 3153},{name: '嘉兴市',value: 3647},
	                {name: '湖州市',value: 2014},{name: '宁波市',value: 3456},{name: '台州市',value: 2952},{name: '丽水市',value: 1352},
	                {name: '温州市',value: 7704},
	                {name: '徐州市',value: 967},{name: '连云港市',value: 368},{name: '宿迁市',value: 358},{name: '扬州市',value: 967},
	                {name: '南京市',value: 959},{name: '镇江市',value: 1020},{name: '常州市',value: 1792},{name: '无锡市',value: 1224},
	                {name: '苏州市',value: 3129},{name: '南通市',value: 1474},
	                {name: '浦东新区',value: 3053}
	            ]
	        }
	    ]
	};
	
	return option;
}
