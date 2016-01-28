/**
 * 
 */
function launchContent_tab1(){
	var html = "";
	html += "<div class='span6 companyInfo' id='title_tab1'><h1>数据加载中</h1></div>" + 
			"<div class='span3 companyInfo' id='sub_title_tab1'><p>数据加载中</p><hr></div>" +
			"<table class='table table-hover table-striped'><thead><tr><th style='width:100px'></th><th style='width:100px'>公司属性</th><th>公司信息</th></tr></thead>" +
			"<tbody id='tablebody_tab1'><tr><td>数据读取中...</td><td>数据读取中...</td><td>数据读取中...</td></tr></tbody></table>";
	$('#tabContent')[0].innerHTML = html;
	getCompanyInfo_tab1();
}

function getCompanyInfo_tab1(){
	$.ajax({
		type : "get",
		url : "/ekgDemo/companyinfo?company="+currentCompany,
		dataType : "json",
		timeout : 0,
		success : handleCompanyInfo_tab1, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function handleCompanyInfo_tab1(jsondata){
	
	currentStatusCompany = jsondata.re[0].statusCompanyName;
	currentShortName = jsondata.re[0].shortName;
	
	var html_title_tab1="",html_tab1="",subtitle_tab1="";
	for(var i in jsondata.re){
		html_title_tab1 += "<h1>"+jsondata.re[i].companyName+"</h1><h4>"+jsondata.re[i].englishName+"</h4>";
		if(jsondata.re[i].organization!=null)
			subtitle_tab1 += "<p>—— "+jsondata.re[i].organization+"</p><hr>";
		
		html_tab1 += "<tr><td>基本信息</td><td>简称</td><td>"+jsondata.re[i].shortName+"</td></tr>";
		html_tab1 += "<tr><td></td><td>员工人数</td><td>"+jsondata.re[i].staff+"</td></tr>";
		html_tab1 += "<tr><td></td><td>注册资金</td><td>"+jsondata.re[i].registered+"</td></tr>";
		html_tab1 += "<tr><td></td><td>成立时间</td><td>"+jsondata.re[i].foundingTime+"</td></tr>";
		html_tab1 += "<tr><td></td><td>涉及产业</td><td>"+jsondata.re[i].range+"</td></tr>";
		
		html_tab1 += "<tr><td>联系方式</td><td>电话</td><td>"+jsondata.re[i].telephone+"</td></tr>";
		html_tab1 += "<tr><td></td><td>邮箱</td><td>"+jsondata.re[i].email+"</td></tr>";
		html_tab1 += "<tr><td></td><td>传真</td><td>"+jsondata.re[i].fax+"</td></tr>";
		
		html_tab1 += "<tr><td>人物信息</td><td>董事长</td><td>"+jsondata.re[i].president+"</td></tr>";
		html_tab1 += "<tr><td></td><td>联系人</td><td>"+jsondata.re[i].contactName+"</td></tr>";
		html_tab1 += "<tr><td></td><td>法人代表</td><td>"+jsondata.re[i].artificialPerson+"</td></tr>";
		html_tab1 += "<tr><td></td><td>秘书</td><td>"+jsondata.re[i].secretary+"</td></tr>";
		html_tab1 += "<tr><td></td><td>秘书邮箱</td><td>"+jsondata.re[i].secretaryEmail+"</td></tr>";
		html_tab1 += "<tr><td></td><td>秘书电话</td><td>"+jsondata.re[i].secretaryPhone+"</td></tr>";
		
		html_tab1 += "<tr><td>位置信息</td><td>所在地区</td><td>"+jsondata.re[i].area+"</td></tr>";
		html_tab1 += "<tr><td></td><td>具体地址</td><td>"+jsondata.re[i].address+"</td></tr>";
		
		html_tab1 += "<tr><td>公司链接</td><td>主页</td><td><a href='"+jsondata.re[i].homePage+"'>"+jsondata.re[i].homePage+"</a></td></tr>";
		html_tab1 += "<tr><td></td><td>信息来源</td><td><a href='"+jsondata.re[i].infoWebsite+"'>"+jsondata.re[i].infoWebsite+"</a></td></tr>";
		html_tab1 += "<tr><td></td><td>百科链接</td><td><a href='"+jsondata.re[i].baikeLink+"'>"+jsondata.re[i].baikeLink+"</a></td></tr>";
	}
	$('#title_tab1')[0].innerHTML = html_title_tab1;
	$('#sub_title_tab1')[0].innerHTML = subtitle_tab1;
	$('#tablebody_tab1')[0].innerHTML = html_tab1;
	
	DATA_READY = true;
}
