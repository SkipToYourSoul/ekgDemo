/**
 * 
 */
var chart5_tab4;

function getRetweet(id,text){
	require(
	        [
	            'echarts',
	            'echarts/chart/force',
                'echarts/chart/chord'
	        ],
	        function (ec) {
	        		$('#retweetChart')[0].innerHTML = "";
	        		chart5_tab4 = ec.init(document.getElementById('retweetChart')).showLoading({effect:'bubble'});
	        		
	        		$.ajax({
	        			type : "get",
	        			url : "/ekgDemo/retweet?mid=" + id,
	        			dataType : "json",
	        			timeout : 0,
	        			success : drawRetweet,
	        			error : function(XMLHttpRequest, textStatus, errorThrown) {
	        				alert("Loading Data Failed!");
	        			}
	        		});
	        });
	$('#retweetContent')[0].innerHTML = "<p>"+text+"</p>";
}

function drawRetweet(jsondata){
	
	if(jsondata.re.length == 0)
		return ;
	
	
	var existNode = new Object();
	var idCount = 0;
	var rootNode = jsondata.re[0].root;
	var nodeCount = new Object();
	
	var nodes = [];
	var links = [];
	
	for	(var i in jsondata.re){
		if(jsondata.re[i].retweetFrom == jsondata.re[i].retweetTo)
			continue;
		if(!existNode.hasOwnProperty(jsondata.re[i].retweetFrom)){
			existNode[jsondata.re[i].retweetFrom] = idCount;
			idCount ++;
		}
		if(!existNode.hasOwnProperty(jsondata.re[i].retweetTo)){
			existNode[jsondata.re[i].retweetTo] = idCount;
			idCount ++;
		}
		
		//计算每个点出现的个数
		if(!nodeCount.hasOwnProperty(jsondata.re[i].retweetFrom))
			nodeCount[jsondata.re[i].retweetFrom] = 1;
		else
			nodeCount[jsondata.re[i].retweetFrom] = nodeCount[jsondata.re[i].retweetFrom] + 1;
		if(!nodeCount.hasOwnProperty(jsondata.re[i].retweetTo))
			nodeCount[jsondata.re[i].retweetTo] = 1;
		else
			nodeCount[jsondata.re[i].retweetTo] = nodeCount[jsondata.re[i].retweetTo] + 1;
	}
	
	for	(var i in existNode){
		if(i == rootNode){
			nodes.push({
				name : i,
				value : 5,
				id : existNode[i],
				category : 0,
				itemStyle: {
                    normal: { color: 'blue' }
                },
                draggable: true
			});
		}else if(nodeCount[i] >= Math.sqrt(idCount+1)){
			nodes.push({
				name : i,
			    value : 4,
			    id : existNode[i],
			    category : 1,
			    itemStyle: {
                    normal: { color: 'red' }
                },
                draggable: true
		    });
		}else{
			nodes.push({
				name : i,
			    value : 1,
			    id : existNode[i],
			    category : 2,
			    itemStyle: {
                    normal: { color: 'yellow' }
                }
		    });
		}
	}
	
	for	(var i in jsondata.re){
		if(jsondata.re[i].retweetFrom == rootNode){
			links.push({
				source : existNode[jsondata.re[i].retweetFrom],
				target : existNode[jsondata.re[i].retweetTo],
				weight : 2,
				itemStyle: {
                    normal: { color: 'black' }
                }
			});
		}else{
			links.push({
				source : existNode[jsondata.re[i].retweetFrom],
				target : existNode[jsondata.re[i].retweetTo],
				weight : 1
			});
		}
	}
	
	chart5_tab4.hideLoading();
	chart5_tab4.setOption(option5(nodes,links));
}

function drawcloud(eventcloud_clouddata,eventcloud_min,eventcloud_max){
	var fill = d3.scale.category20();
	var fontSize = d3.scale.log().range([50, 80]);
	var angle = [ 0, 90 ];
	var range = (eventcloud_max - eventcloud_min)*3;
	if(range==0)
		range = eventcloud_min;

	d3.layout.cloud().size([460, 330])
	      .words(eventcloud_clouddata.map(function(d) {
	                return {
	                	text: d[0], 
	                	size: cloudScale(d[1], eventcloud_min, range)
	                	};
	            }))
	      .padding(5)
	      .rotate(function() { var idx = Math.floor(Math.random() + 0.3);
			return ~~(angle[idx]); })
	      .font("Impact")
	      .fontSize(function(d) { return d.size; })
	      .on("end", draw)
	      .start();

	  function draw(words) {
	    d3.select("#cloudword").append("svg")
	        .attr("width", 460)
	        .attr("height", 330)
	      .append("g")
	        .attr("transform", "translate(230,165)")
	      .selectAll("text")
	        .data(words)
	      .enter().append("text")
	        .style("font-size", function(d) { return d.size + "px"; })
	        .style("font-family", "Microsoft YaHei !important")
	        .style("fill", function(d, i) { return fill(i); })
	        .attr("text-anchor", "middle")
	        .attr("transform", function(d) {
	          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.text; })
	        .on("click", function(d) {
	    		$("#keyword:text").val(function(n, c) {
	    			return d.text;
	    		});
	    	});
	  }
}

function cloudScale(freq, min, range) {
    return (100 / range) * (freq - min) + 15;
}

