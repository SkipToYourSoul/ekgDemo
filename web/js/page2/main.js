/**
 *  page2/main.js
 */
// ������echarts
require.config({
	paths : {
		echarts : 'http://echarts.baidu.com/build/dist'
	}
});
searchCompany();

var DATA_READY = false;
var currentCompany,currentShortName,currentStatusCompany;

var isSearch;
function searchCompany(){
	if (isSearch) {
		return;
	} else {
		// search
		$.ajax({
			type : "get",
			url : "/ekgDemo/search?keyword=" + params['k'],
			dataType : "json",
			timeout : 0,
			success : launchContent,
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("Loading Data Failed!");
			}
		});
	}
	isSearch = 1;
}

function launchContent(jsondata){
	
	if(jsondata.re.length == 0){
		alert("No Data!");
		location.href = "index.html";
	}
	
	currentCompany = jsondata.re[0].companyName;
	var clist = [];
	for(var i in jsondata.re){
		clist.push(jsondata.re[i].companyName);
	}
	
	//������������������
	var html = "";
	for(var i in clist){
		company = clist[i];
		if(clist[i].length > 18)
			company = clist[i].substring(0,15)+"...";
		html += "<a class='btn list-group-item' onclick='loadTab(\""+clist[i]+"\")'>"+company+"</a>";
	}
	$('#companyList')[0].innerHTML = html;
	loadTab(currentCompany);
}

function loadTab(c){
	currentCompany = c;
	var html = "";
	html += "当前公司信息:"+currentCompany/*+" | ���������������������<span>2015-06-** --:--:--</span>"*/;
	$('#currentCheck')[0].innerHTML = html;
	tabChange();
	
	// ���������������������
	launchContent_tab1();
	EC_READY = true;
	DATA_READY = true;
}

//������tab���������
function tabChange(){
	$('#tabul')[0].innerHTML = html_li;
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	    // e.target // activated tab
	    // e.relatedTarget // previous tab
		if (!DATA_READY) {
	        return;
	    }
		if (e.target.id.match('a_')) {
			showTabContent(e.target.id.substring(e.target.id.length-1));
		}
	});
}

function showTabContent(idx) {
	DATA_READY = false;
    if(idx == 1)
    	launchContent_tab1();
    if(idx == 2)
    	launchContent_tab2();
    if(idx == 3)
    	launchContent_tab3();
    if(idx == 4)
    	launchContent_tab4();
    if(idx == 5){
    	isDataHandled_tab5 = null;
    	launchContent_tab5();
    }
}
