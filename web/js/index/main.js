/**
 * 
 */

$("#searchBtn").click(function(){
	location.href = "/ekgDemo/page2.html?k="+$("#searchInput").val();
});