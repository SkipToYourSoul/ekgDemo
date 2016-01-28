/**
 * 
 */
var chart_tab2,data_tab2;

function launchContent_tab2(){
	var html = "";
	html += "<div class='row'><div class='relationChart span7' id='relationChart' style='height:500px'><h1>显示加载中</h1></div></div>";
	
	html += "<table class='table table-hover table-striped'><thead><tr><th>公司关系</th><th>相关内容</th></tr></thead>" +
			"<tbody id='tablebody_tab2'><tr><td>请点击选取...</td>" +
			"<td>请点击选取...</td></tr></tbody></table>";
	$('#tabContent')[0].innerHTML = html;
	
	initChart_tab2();
}

function initChart_tab2(){
	$.ajax({
		type : "get",
		url : "/ekgDemo/companyrelation?company="+currentCompany,
		dataType : "json",
		timeout : 0,
		success : handleCompanyRelation_tab2, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Loading Data Failed!");
		}
	});
}

function handleCompanyRelation_tab2(jsondata){
	var childrenData = [];
	var relationToCompany = {};
	var totalCount = 0;
	data_tab2 = jsondata;
	
	for(var i in jsondata.re){
		var row = jsondata.re[i];
		var otherCompany;
		if(row.company1.indexOf(currentCompany) != -1)
			otherCompany = row.company2;
		else
			otherCompany = row.company1;
		if(!relationToCompany.hasOwnProperty(row.relation)){
			relationToCompany[row.relation] = {};
			relationToCompany[row.relation][otherCompany] = 1;
			totalCount ++;
		}else{
			if(!relationToCompany[row.relation].hasOwnProperty(otherCompany)){
				relationToCompany[row.relation][otherCompany] = 1;
				totalCount ++;
			}
		}
	}
	
	var div = document.getElementById("relationChart");
	div.style.height = (totalCount * 12 + 100) + "px";
	
	require(
	        [
	            'echarts',
	            'echarts/chart/tree'
	        ],
	        function (ec) {
	        	chart_tab2 = ec.init(document.getElementById('relationChart')).showLoading({effect:'bar'});
	        	
	        	for(var i in relationToCompany){
	        		child = [];
	        		for(var j in relationToCompany[i]){
	        			child.push({
	        				"name" : j
	        			});
	        		}
	        		childrenData.push({
	        			"name" : i,
	        			"children" : child
	        		});
	        	}
	        	
	        	var relationData = [{
	        		"name" : currentCompany,
	        		"children" : childrenData,
	        		"symbolSize" : 15
	        	}];
	        	
	        	chart_tab2.hideLoading();
	        	chart_tab2.setOption(relationOption(relationData));
	        	
	        	DATA_READY = true;   	
	       });
	
	
}

function loadingRelationContent(name,data){
	var relationToNews = {};
	if(name == currentCompany)		//跟节点
		return ;
	if(data.children != undefined){
		//关系结点	
		for(var i in data_tab2.re){
			var row = data_tab2.re[i];
			if(row.relation == name){
				var crc = row.company1+"<br>-->"+row.relation+"--><br>"+row.company2;
				if(!relationToNews.hasOwnProperty(crc)){
					relationToNews[crc] = {};
					relationToNews[crc][row.newsTitle] = {'newsTime':row.newsTime,'newsUrl':row.newsUrl};
				}else{
					if(!relationToNews[crc].hasOwnProperty(row.newsTitle))
						relationToNews[crc][row.newsTitle] = {'newsTime':row.newsTime,'newsUrl':row.newsUrl};
				}
			}
		}
	}else{
		//公司节点
		for(var i in data_tab2.re){
			var row = data_tab2.re[i];
			if(row.company1 == name || row.company2 == name){
				var crc = row.company1+"<br>-->"+row.relation+"--><br>"+row.company2;
				if(!relationToNews.hasOwnProperty(crc)){
					relationToNews[crc] = {};
					relationToNews[crc][row.newsTitle] = {'newsTime':row.newsTime,'newsUrl':row.newsUrl};
				}else{
					if(!relationToNews[crc].hasOwnProperty(row.newsTitle))
						relationToNews[crc][row.newsTitle] = {'newsTime':row.newsTime,'newsUrl':row.newsUrl};
				}
			}
		}
	}
	var html = "";
	for(var i in relationToNews){
		var content = "";
		var count = 0;
		for(var j in relationToNews[i]){
			content += "<a href='"+relationToNews[i][j].newsUrl+"'>"+j+"</a><br>"+relationToNews[i][j].newsTime+"<br>";
			count ++;
		}
		if(count == 1)
			html += "<tr><td>"+i+"</td><td><div class='pre-scrollable' style='height:60px'>"+content+"</div></td></tr>";
		else
			html += "<tr><td>"+i+"</td><td><div class='pre-scrollable' style='height:100px'>"+content+"</div></td></tr>";
	}
	$('#tablebody_tab2')[0].innerHTML = html;
}

/*function handleCompanyRelation_tab2(jsondata){
	data_tab2 = jsondata;
	var relationCompany = new Object();
	var relationWord = new Object();
	for(var i in jsondata.re){
		var row = jsondata.re[i];
		
		//找到有关系的公司
		for(var j in row.company.split("_")){
			if(row.company.split("_")[j] != currentCompany && row.company.split("_")[j] != currentShortName){
				if(!relationCompany.hasOwnProperty(row.company.split("_")[j]))
					relationCompany[row.company.split("_")[j]] = 1;
				else
					relationCompany[row.company.split("_")[j]] ++;
			}
		}
		
		//找到关系词
		for(var j in row.relation.split("_")){
			if(!relationWord.hasOwnProperty(row.relation.split("_")[j]))
				relationWord[row.relation.split("_")[j]] = 1;
			else
				relationWord[row.relation.split("_")[j]] ++;
		}
	}
	
	//排序
	var sortArr1 = [],sortArr2 = [];
	for(var j in relationCompany){
		sortArr1.push({company:j,count:relationCompany[j]});
	}
	sortArr1.sort(function(a,b){
		return b.count-a.count;
	});
	for(var j in relationWord){
		sortArr2.push({word:j,count:relationWord[j]});
	}
	sortArr2.sort(function(a,b){
		return b.count-a.count;
	});
	
	var html1 = "";
	for(var i in sortArr1){
		html1 += "<a class='btn list-group-item' onclick='loadRelationContent(\""+sortArr1[i].company+"\",\"c\")'>"+sortArr1[i].company+"</a>";
	}
	$('#relatedcompanyList')[0].innerHTML = html1;
	var html2 = "";
	for(var i in sortArr2){
		html2 += "<a class='btn list-group-item' onclick='loadRelationContent(\""+sortArr2[i].word+"\",\"w\")'>"+sortArr2[i].word+"</a>";
	}
	$('#relatedwordList')[0].innerHTML = html2;
	
	//drawChart
	chart_tab2.hideLoading();
	chart_tab2.setOption(relationOption());
	
	DATA_READY = true;
}

function loadRelationContent(word,type){
	if(type == 'c'){
		var wordMap = new Object();
		for(var i in data_tab2.re){
			var row = data_tab2.re[i];
			if(row.company.indexOf(word) != -1){
				for(var j in row.relation.split("_")){
					if(!wordMap.hasOwnProperty(row.relation.split("_")[j]))
						wordMap[row.relation.split("_")[j]] = [{
							'newsTitle':row.newsTitle,
							'newsText':row.newsText,
							'newsTime':row.newsTime,
							'newsUrl':row.newsUrl
						}];
					else
						wordMap[row.relation.split("_")[j]].push({
							'newsTitle':row.newsTitle,
							'newsText':row.newsText,
							'newsTime':row.newsTime,
							'newsUrl':row.newsUrl
						});
				}
			}
		}
		
		var html = "";
		for(var i in wordMap){
			var title = new Object();
			var count = 1;
			for(var j in wordMap[i]){
				if(!title.hasOwnProperty(wordMap[i][j].newsTitle)){
					if(count == 1)
						html += "<tr><td>"+word+"</td><td>"+i+"</td><td>"+wordMap[i][j].newsTitle+"</td></tr>";
					else
						html += "<tr><td></td><td></td><td>"+wordMap[i][j].newsTitle+"</td></tr>";
					count ++;
					title[wordMap[i][j].newsTitle] = 1;
				}
			}
		}
		$('#tablebody_tab2')[0].innerHTML = html;
	}
	
	if(type == 'w'){
		var wordMap = new Object();
		for(var i in data_tab2.re){
			var row = data_tab2.re[i];
			if(row.relation.indexOf(word) != -1){
				for(var j in row.company.split("_")){
					if(!wordMap.hasOwnProperty(row.company.split("_")[j]))
						wordMap[row.company.split("_")[j]] = [{
							'newsTitle':row.newsTitle,
							'newsText':row.newsText,
							'newsTime':row.newsTime,
							'newsUrl':row.newsUrl
						}];
					else
						wordMap[row.company.split("_")[j]].push({
							'newsTitle':row.newsTitle,
							'newsText':row.newsText,
							'newsTime':row.newsTime,
							'newsUrl':row.newsUrl
						});
				}
			}
		}
		
		var html = "";
		var count = 1;
		for(var i in wordMap){
			var title = wordMap[i][0].newsTitle+"<br><a href='"+wordMap[i][0].newsUrl+"'>更多请点击...</a>";
			if(count == 1)
				html += "<tr><td>"+i+"</td><td>"+word+"</td><td>"+title+"</td></tr>";
			else
				html += "<tr><td>"+i+"</td><td></td><td>"+title+"</td></tr>";
			count ++;
		}
		$('#tablebody_tab2')[0].innerHTML = html;
	}
}*/
