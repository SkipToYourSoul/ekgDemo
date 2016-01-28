/**
 * 	page2/tab5
 */
function launchContent_tab5(){
	var html = "";
	html += "<div class='row'><div class='span5' style='width:360px'>" +
			"<div class='row'><div class='span2'><h4>用户选择：</h4></div><div class='span2' style='margin-left:5px'><h4>分组选择：</h4></div></div>" +
			"<div class='row'>" +
			"<div class='span2'><select class='form-control' id='select1_tab5' onchange='changeUser(this)'></select></div>" +
			"<div class='span2' style='margin-left:5px'><select class='form-control' id='select2_tab5' onchange='changeGroup(this)'></select></div></div>" +
			"<div class='row' style='margin-top:10px'><div class='span3'><div class='btn-group' role='group'>" +
			"<button type='button' class='btn btn-default' id='btn2_tab5' style='width:130px'>停止布局</button>" +
			"<button type='button' class='btn btn-default' id='btn3_tab5' style='width:130px'>图形居中</button></div></div></div>" +
			"</div><h4>分组标签:</h4><div class='span3' style='margin-left:0px'><div id='socialCotent_tab5' class='social-content'></div></div></div>" +
			"<div class='row'>" +
			"<div id='socialGraph_tab5' class='socialtab'></div>" +
			"</div>";
	$('#tabContent')[0].innerHTML = html;
	
	initChart_tab5();
}

var isDataHandled_tab5 = null;
function initChart_tab5(){
	require(
            [
                'echarts',
            ],
            function (ec) {
            	myChart_tab5 = ec.init(document.getElementById('socialGraph_tab5')).showLoading({effect:'spin'});
            	if(isDataHandled_tab5 == null){
                	//Data
            		search();
            		isDataHandled_tab5 = 1;
            		DATA_READY = true;
            	}      	    	
            });
}

function changeUser(e){
	initChart_tab5();
	curUid = uids[e.value];
	querySocialSubGraphData(uids[e.value]);
}

function changeGroup(e){
	if (isRunning) {
		return;
	}
	var curCluster = groups[e.value];
	if(curCluster == '所有分组'){
		sigInst.iterNodes(function(n) {
			n.hidden = 0;
		}).draw(2, 2, 2);
		$("#socialCotent_tab5").html("");
		return;
	}
	var cIdx = 0;
	for (; cIdx < clusterArr.length; cIdx++) {
		if (clusterArr[cIdx] == curCluster)
			break;
	}
	sigInst.iterNodes(function(n) {
		if (n.attr['cluster'] != cIdx)
			n.hidden = 1;
		else
			n.hidden = 0;
	}).draw(2, 2, 2);
	
	var tagContent = tags[curCluster];
	var html = "<p>";
	for(var idx in tagContent){
		html += tagContent[idx]+", ";
	}
	html = html.substring(0,html.length-2);
	html += "</p>";
	$("#socialCotent_tab5").html(html);
}