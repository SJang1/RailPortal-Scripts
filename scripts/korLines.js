// 경로검색 클릭 시 발생
function fnCourseSearch(){

	$.ajax({
		url: context + "/korLines/basic/fnCourseSearch.do",
		data: {paramMreaWideCd    : gbvMreaWideCd
			 , paramStStinNm      : $("#stStinNm").val()
			 , paramEdStinNm      : $("#edStinNm").val()},
		dataType: 'json',
		success: function(data) {

			fnCourseHtmlCreate(data.result);
		}
	});
}

function fnPathAreaClose (obj) {

	if (obj.className == "path_close01") {
		
		obj.className = "path_open01";
		
		document.getElementById("asideDiv").style.width = "0px";
		document.getElementById("pathListDiv").style.display = "none";
	} else {
		
		obj.className = "path_close01";
		
		document.getElementById("asideDiv").style.width = "350px";
		document.getElementById("pathListDiv").style.display = "block";
	}
	
	
	
}

// 경로검색 ajax 통신 완료 후 html 생성
function fnCourseHtmlCreate (data) {

	document.getElementById("btnPathOpen").className = "path_close01";
	
	document.getElementById("asideDiv").style.width = "350px";
	document.getElementById("pathListDiv").style.display = "block";

	var dataList = data.split("/");
	
	var vHtml    = "";
	var iStopStin= 0;
	
	for (var i = 0; i < dataList.length; i++) {
		
		var dataSubList = dataList[i].split("-");
		
		vHtml += "<div class=\"path\">";
		vHtml += 	"<div class=\"psway_tit_area\">";
		vHtml += 		"<h4>";
		
		for (var j = 0; j < dataSubList.length; j++) {
		
			var dataMap = dataSubList[j].split(":");
		
			if (dataMap[0] == "cnt") {
				
				iStopStin = dataMap[1];
			} else {
				
				if (dataMap[0] != 'st') {
					
					vHtml += "<span class=\"path_arr\">→</span>&nbsp;";
				}
				vHtml += "<span class=\"ps_line" + dataMap[2] + "\" title=\"" + dataMap[3] + "\">" + dataMap[3] + "</span> <strong title=\"" + dataMap[5] + "\">" + dataMap[5] + "</strong>&nbsp;"
			}
		}
		
		vHtml += 			"<span><a href=\"#\" class=\"path_open\" title=\"상세경로보기\" onclick=\"fnPswayDtlOnClick(this, '" + i + "', '" + dataList[i] + "'); return false;\"></a></span>";
		vHtml += 		"</h4>";
		vHtml += 	"</div>";
		vHtml += 	"<div class=\"psway_info\">";
		vHtml += 		"<dl class=\"info1\">";
		vHtml += 			"<dt>소요시간</dt><dd><em>-</em>분</dd>";
		vHtml += 			"<dt>정차역</dt><dd><em>" + iStopStin + "</em>개</dd>";
		vHtml += 			"<dt>환승</dt><dd><em>" + (dataSubList.length - 3) + "</em>회</dd>";
		vHtml += 		"</dl>";
		vHtml += 		"<dl class=\"info2\">";
		vHtml += 			"<dt>카드요금</dt><dd><em>-</em>원</dd>";
		vHtml += 			"<dt>현금</dt><dd><em>-</em>원</dd>";
		vHtml += 		"</dl>";
		vHtml += 	"</div>";
		vHtml += 	"<div id=\"pswayDtlDiv" + i + "\" class=\"psway_lst\" style=\"display:none;\">&nbsp;</div>";
		vHtml += "</div>";
	}
	
	
	document.getElementById("pathListDiv").innerHTML = vHtml;
}

// 경로 상세검색 클릭 시 발생
function fnPswayDtlOnClick(obj, i, vPath) {

	if (obj.className == "path_close") {
		
		obj.className = "path_open";
		document.getElementById("pswayDtlDiv" + i).innerHTML = "";
		document.getElementById("pswayDtlDiv" + i).style.padding = "0";
	} else {

		$.ajax({
			url: context + "/korLines/basic/fnCourseDtlSearch.do",
			data: {paramMreaWideCd    : gbvMreaWideCd
				 , paramRailOprIsttCd : gbvRailOprIsttCd
				 , paramPath          : vPath},
			dataType: 'json',
			success: function(data) {
	
				fnPswayDtlHtmlCreate(obj, i, data.result);
			}
		});
	}
}

function fnPswayDtlHtmlCreate(obj, courseIx, orgData) {
	
	bolPswayDtlOpen = true;
	
	obj.className = "path_close";
	
	document.getElementById("pswayDtlDiv" + courseIx).style.display = "block";
	document.getElementById("pswayDtlDiv" + courseIx).style.padding = "padding:20px 0 10px;";
	
	var vHtml    = "";
	var iStinCnt = 0;
	
	for (var j = 0; j < orgData.length; j++) {
		
		var data = orgData[j]; 
		
		for (var i = 0; i < data.length; i++) {
	
			if (iStinCnt == 0) {
	
				vHtml += "<ul>";
				
				vHtml += 	"<li class=\"default\" style=\"display: list-item;\">";
				vHtml += 		"<span class=\"poly_line ps_color" + data[i].cvrLnCd + "\"></span>";
				vHtml += 		"<span class=\"station station_num\">";
				vHtml += 			"<span class=\"ps_color" + data[i].routCd + "\">" + data[i].routNm + "</span>";
				vHtml += 		"</span>";
				vHtml += 	"</li>";
			}
			
			vHtml += 	"<li class=\"default\" style=\"display: list-item;\">";
			vHtml += 		"<span class=\"poly_line ps_color" + data[i].routCd + "\">" + data[i].routNm + "</span>";
			vHtml += 		"<span class=\"station ps_color" + data[i].routCd + "\"></span>";
			vHtml += 		"<dl>";
			//vHtml += 			"<dt class=\"psway_time\">" + data[i].arvTm + "</dt>";
			vHtml += 			"<dt class=\"psway_time\">&nbsp;</dt>";
			vHtml += 			"<dd class=\"psway_station\"><a href=\"#\" data-id=\"333\" class=\"nclicks(dir.sstname)\">" + data[i].stinNm + "</a></dd>";
			vHtml += 		"</dl>";
			vHtml += 	"</li>";
			
			iStinCnt++;
			
			if (iStinCnt == data[i].cnt) {
	
				vHtml += 	"<li class=\"default\" style=\"display:list-item;\"><span class=\"station station_num\"><span class=\"ps_color" + data[i].cvrLnCd + "\">" + data[i].cvrLnCd + "호선</span></span></li>";
				vHtml += "</ul>";
				iStinCnt = 0;
			}
		}
		
		if (j != orgData.length -1) {
			
			vHtml += "<ul>";
			vHtml += 	"<li class=\"walk\">";
			vHtml += 		"<span class=\"poly_line subway_color00\"></span>";
			vHtml += 		"<span class=\"spms_i_wrap\"><span class=\"spms_i spms_i0\">도보</span></span>";
			vHtml += 		"<dl>";
			vHtml += 			"<dd class=\"psway_transfer\"><span class=\"spms spms_transfer\">환승</span> 도보 -분</dd>";
			vHtml += 		"</dl>";
			vHtml += 	"</li>";
			vHtml += "</ul>";
		}
	}
	
	document.getElementById("pswayDtlDiv" + courseIx).innerHTML = vHtml;
}

function fnSubMenuOnClick (obj) {

	gbvMreaWideCd = obj.id.substring(4, 6);
	
	location.href = "?gbvMreaWideCd=" + gbvMreaWideCd;
}
