/**
 * 
 */

var profiles = new Object();
var curUid=0;

function jsonpQ(url, func){
	xhr = $.ajax({
		"url" : url,
		"async" : false,
		"dataType" : "jsonp",
		callbackParameter: "callback",
		"success" : function(json) {
			func(json);
		}
	});
}

/*
 * 	查找入口，根据当前公司名获取相关用户的列表
 * */
function search(){
    jsonpQ(url = serverAddress+"/userinfo/searchuser?keywords="+currentCompany, handleSearchResult);
}

/*
 * 将用户列表添加至下拉菜单中，并默认查询第一个用户的信息
 * */
function handleSearchResult(json){
	var html = "";
	var count = 0;
    if (json.state="ok"){
    	uids = json.result.uids;
    	for(var idx in json.result.uids){
    		var uid = json.result.uids[idx];
    		if(count == 0){
    			curUid = uid;
    			querySocialSubGraphData(uid);
    		}
    		html += "<option value='"+count+"'>"+json.result.profiles[uid]+"</option>";
    		count ++;
    	}
    }
    $("#select1_tab5").html(html);
    handlebutton();
}

/*
 * 查询接口，获取指定用户的社交关系
 * */
function querySocialSubGraphData(uid) {
    jsonpQ(url = serverAddress+"/userinfo/getgroupdata?sync=true&uid="+uid, handleSocialSubGraphData);
}

/*
 * 	处理分类数据
 * 	返回的data格式：
 * 		data.result.group : (用户名，用户id)
 * 		data.result.profiles :	(用户id，用户信息)
 * 		data.result.rows :	(用户名1，用户名2)
 * 		data.result.tags :	(用户id，用户tag)
 * */
function handleSocialSubGraphData(data) {
    G = Graph.createNew();
    var count = 1;
    profiles = data.result.profiles;
    for ( var idx in data.result.rows) {
    	row = data.result.rows[idx];
    	G.addEdge(count, row[0], row[1], 1);
    	count++;
    }
    
    var html = "<option value=0>所有分组</option>";
    groups = ['所有分组'];
    group_count = 1;
    tags = data.result.tags;
    for(var idx in tags){
    	var group = "";
    	if(profiles.hasOwnProperty(idx))
    		group = profiles[idx].name;
    	else
    		group = idx;
    	html += "<option value='"+group_count+"'>"+group+"</option>";
    	groups.push(idx);
    	group_count ++;
    }
    $("#select2_tab5").html(html);
    
    drawComm_intern(G,data.result.group,data.result.tags);
}

/**
 * 根据graph数据进行聚类，然后调用可视化工具展示
 */
var G = null;
var sigInst = null;
var colorArray = ['rgb(0,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,0,0)',
					'rgb(160,32,140)','rgb(0,139,139)','rgb(255,52,179)','rgb(255,69,0)','rgb(139,105,105)','rgb(100,105,105)'];
var isRunning = false;

function drawComm_intern(data,nodeToComm,commToTags) {
	//min_cut_num= parseInt($("input#min_cut_num").val());
	isRunning = false;
	
	//到此数据正式处理完毕，将loading图关闭，并用sigmal画图
	myChart_tab5.hideLoading();
	$('#socialGraph_tab5')[0].innerHTML = "";
	init();

	//handle data to draw
	// start drawing
	var N = data.nodeSize();
	var C = 0;
	for(prop in commToTags){
		C++;
	}
	clusters = [];
	
	for ( var i = 0; i < C; i++) {
		if(i < 10){
			clusters.push({
				'id' : i,
				'nodes' : [],
				'color' : colorArray[i]
			});
		}
		else{
			clusters.push({
				'id' : i,
				'nodes' : [],
				'color' : 'rgb(' + Math.round(Math.random() * 256) + ','
						+ Math.round(Math.random() * 256) + ','
						+ Math.round(Math.random() * 256) + ')'
			});
		}
	}
	
	// hanle the cluster
	var nodeToCluster = {};
	clusterArr = [];
	var temp = 0;
	var cc;
	for ( var key in nodeToComm) {
		for ( var i = 0; i < clusterArr.length; i++) {
			if (clusterArr[i] == nodeToComm[key])
				temp = 1;
			if (nodeToComm[key] == clusterArr[i])
				cc = i;
		}

		if (temp == 0) {
			clusterArr.push(nodeToComm[key]);
			nodeToCluster[key] = clusterArr.length - 1;
		} else {
			nodeToCluster[key] = cc;
			temp = 0;
		}
	}

	// add node and edge
	var nodeArr = data.nodeArr();
	for ( var i = 0; i < N; i++) {
		var nodeCluster = nodeToCluster[nodeArr[i]];
		var cluster = clusters[nodeCluster];
		sigInst.addNode(nodeArr[i], {
			'x' : Math.random(),
			'y' : Math.random(),
			'size' : changeNodeSize(nodeArr[i]),
			'color' : cluster['color'],
			'cluster' : cluster['id']
		});
		cluster.nodes.push('node' + nodeArr[i]);
	}
	for ( var id in data.edges) {
		sigInst.addEdge(data.edges[id][0], G.edges[id][1], G.edges[id][2]);
	}
	if (isRunning == false)
		startLayout();
	
	
	/*
	 * 调整点的大小
	 * */
	function changeNodeSize(node) {
		var countOfFans = G.nodeWeight[node];
		var size = (countOfFans-2)/100 +0.1;
		if (size > 1)
			size = 1;
		return size;
	}
}

/*
 * 初始化sigmal
 * */
function init() {
	sigInst = null;
	sigInst = sigma.init(document.getElementById('socialGraph_tab5'))
			.drawingProperties({
				defaultLabelColor : 'black',
				defaultLabelSize : 14,
				defaultLabelBGColor : '#FFFAF0',
				defaultLabelHoverColor : 'red',
				labelThreshold : 6,
				defaultEdgeType : 'line'
			}).graphProperties({
				minNodeSize : 5,
				maxNodeSize : 10,
				minEdgeSize : 1,
				maxEdgeSize : 1,
				sideMargin : 10
			}).mouseProperties({
				maxRatio : 32
			});
}


/*
 * 按钮功能实现
 * */
function handlebutton() {
	/*document.getElementById('btn1_tab5').addEventListener('click',
			function() {
		drawComm();
	},true);*/
	document.getElementById('btn2_tab5').addEventListener('click',
			function() {
				if (isRunning) {
					stopLayout();
				} else {
					startLayout();
				}
			}, true);
	document.getElementById('btn3_tab5').addEventListener('click',
			function() {
				sigInst.position(0, 0, 1).draw();
			}, true);
}

/*
 * 开始布局
 * */
function startLayout() {
	isRunning = true;
	sigInst.startForceAtlas2();
	document.getElementById('btn2_tab5').innerHTML = "停止布局";
}

/*
 * 停止布局
 * */
function stopLayout() {
	isRunning = false;
	sigInst.stopForceAtlas2();
	document.getElementById('btn2_tab5').innerHTML = "开始布局";
	sigInst.position(0, 0, 1).draw();
}

/**
 * 聚类按钮触发的动作
 */
function drawComm() {
	if(document.getElementById('btn2_tab5').innerHTML == "开始布局"){
		$('#socialGraph_tab5')[0].innerHTML = "";
		jsonpQ(url = serverAddress+"/userinfo/detecttask?uid="+curUid, function() {});
		initChart_tab5();
		querySocialSubGraphData(curUid);
	}
}
