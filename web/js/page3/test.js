/**
 * 
 */
require.config({
    paths: {
    	echarts : 'http://echarts.baidu.com/build/dist'
    }
});

require(
    [
        'echarts',
        'echarts/chart/map'
    ],
    function (ec) {
    	var myChart = ec.init(document.getElementById('main'));
    	
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
    	    if(mt == '浙江')
    	    	option.dataRange.max = 25773;
    	    if(mt == '江苏')
    	    	option.dataRange.max = 3129;
    	    if(mt == '上海')
    	    	option.dataRange.max = 3053;
    	    myChart.setOption(option, true);
    	    
    	    zrEvent.stop(event);
    	};

    	myChart.on(ecConfig.EVENT.CLICK, function (param){
    	    alert(param.name);
    	});

    	var option = {
    	    title: {
    	        text : '长江三角区产业带地图',
    	        subtext : '浙江 （滚轮切换省份，点击查看信息）'
    	    },
    	    tooltip : {
    	        trigger: 'item',
    	        formatter: '滚轮切换省份<br/>公司数<br/>{b}:{c}'
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
    	
    	
    	myChart.setOption(option);
    });