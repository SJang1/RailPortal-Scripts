﻿// var oScript = document.createElement("script");
// oScript.type = "text/javascript";
// oScript.charset = "utf-8";		  
// oScript.src = "http://code.jquery.com/jquery-1.6.2.min.js";	
// document.getElementsByTagName("head")[0].appendChild(oScript);

var InputTrainData;

queue()
.defer(d3.xml, context + "/ext/images/korLines/cont/subway_line" + gbvMreaWideCd + ".svg", "image/svg+xml")
.await(ready);

var svg; 
var moveCnt			= 0;
var trainNo			= 0;
var nowTimeToSec	= 0;
var m_StinDstRto	= 0.8;
var m_mapTrainState = new Map();
var m_mapTmnTrainState= new Array() ;
var m_debugLog      = 0;
var reloadTime		= 0;
var clearReloadingTime = 10; //minute
var isLoop = false;
//kimhg - 임시사용 변수 나중에 삭제할것
var m_Temp = 0;
var isNotFirst = false;


var RttmStatus = 
[[{"1":"N","2":"N","3":"N","4":"N","5":"N","6":"N","7":"N","8":"N","9":"N","K1":"N","K2":"N","K3":"N","K4":"N","K5":"N",
 "A1":"N","D1":"N","U1":"N","E1":"N","M1":"N","UI":"N"}],
[{"1":"N","2":"N","3":"N","4":"N","B1":"N","B1":"N","K6":"N"}],
[{"1":"N","2":"N","3":"N"}],
[{"1":"N"}],
[{"1":"N"}]
];
 

function dailyTimer() {
	
	var week = new Array('일', '월', '화', '수', '목', '금', '토');
    var hours, minutes, seconds;
    var todayDate;
    
	todayDate = new Date();    	
	
    hours	= parseInt(todayDate.getHours(), 10);
    minutes = parseInt(todayDate.getMinutes(), 10);
    seconds = parseInt(todayDate.getSeconds(), 10);

    nowTimeToSec = parseInt(todayDate.getHours() * 3600, 10);
    nowTimeToSec = nowTimeToSec + parseInt(todayDate.getMinutes() * 60, 10);
   	nowTimeToSec = nowTimeToSec + parseInt(todayDate.getSeconds(), 10);
   	
    var interval = setInterval(function(){
    	
    	todayDate = new Date();    	

    	year	= parseInt(todayDate.getFullYear(), 10);
    	month	= parseInt(todayDate.getMonth(), 10)+1;
    	date	= parseInt(todayDate.getDate(), 10);
    	days	= parseInt(todayDate.getDay(), 10);
    	
    	day = week[days];
    	
        hours	= parseInt(todayDate.getHours(), 10);
        minutes = parseInt(todayDate.getMinutes(), 10);
        seconds = parseInt(todayDate.getSeconds(), 10);
        
        ampm	= hours >= 12 ? "pm" : "am"
        hours = hours % 12;
        hours = (ampm == 'pm' && hours == 0)? 12:hours;

        hours 	= hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
         


        $('.day').text(year + '.' + month + '.' + date+ '('+day+')');
        $('.time').text(hours + ':' + minutes + ' ' + ampm);
        
        }, 1000);
}

function BrowserSettime()
{
	d = new Date();
	//var hh = parseInt(parseInt(leadingZeros(d.getHours(), 2))-parseInt(leadingZeros(d.getHours(), 2))+23);
	hh = leadingZeros(d.getHours(), 2);
	mm = leadingZeros(d.getMinutes(), 2);
	ss = leadingZeros(d.getSeconds(), 2);
  	s = hh+mm+ss;
}

function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
	}

function ready(error, xml) {
	
	BrowserSettime();
	timerID = setInterval("BrowserSettime()",1000);
	dailyTimer();
	
	var importedNode = document.importNode(xml.documentElement, true);
	d3.select("#pathAnimation").node().appendChild(importedNode);
	
	svg = d3.select("svg");

	CurrentTrainStatus();
	
	for (var i = 0; i < document.getElementsByTagName("circle").length ; i++)
	{

		if (document.getElementsByTagName("circle")[i].id.indexOf("stn_") >= 0)
		{

			document.getElementsByTagName("circle")[i].onmouseover = fnCircleMouseOver;
			document.getElementsByTagName("circle")[i].onmouseout  = fnCircleMouseOut;

			document.getElementsByTagName("circle")[i].onclick = GetStnIdName;
		}
	}	
}


function fnCircleMouseOver() {

	if ( gbvMreaWideCd == "02"){ 
		if (this.getAttribute("r") == "4.6")
		{
			this.setAttribute("r", "6");
		}
	} else {
		if (this.getAttribute("r") == "2.5")
		{
			this.setAttribute("r", "6");
		}
	}
	
	var arryStinInfo = this.id.split("_");
	
	var vRailOprIsttCd = arryStinInfo[1].toUpperCase();
	var vRoutCd        = arryStinInfo[2].toUpperCase();
	var vStinCd        = arryStinInfo[3];
	
	var arrTrainLine = "";
	if (vRoutCd == "G1")
		TrainLine[4];	
	if (vRoutCd == "B1")
		TrainLine[5];
	else 
		TrainLine[vRoutCd-1];
	
	var vStinYN = false;	
	var vRoutColorCd = "";
	var vRoutTextNm = "";
	
	if ( gbvMreaWideCd == "01"){
		vRoutColorCd = vRoutCd;
		if (vRoutCd == "1")
		{
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd;
		} else if (vRoutCd == "2"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd;
		} else if (vRoutCd == "3"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd;
		} else if (vRoutCd == "4"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd;
		} else if (vRoutCd == "G1"){
			vRoutColorCd = "1";
			vRoutTextNm = "인천1호선";
		} else if (vRoutCd == "G2"){
			vRoutColorCd = "2";
			vRoutTextNm = "인천2호선";
		}
	}
	else if ( gbvMreaWideCd == "02"){
		
		vRoutColorCd = vRoutCd;
		
		if (vRoutCd == "1")
		{
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "2"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "3"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "4"){
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "G1"){
			vRoutColorCd = "1";
			vRoutTextNm = "김해경전";
		} else if (vRoutCd == "B1"){
			vRoutColorCd = "1";
			vRoutTextNm = "동해선";
		}
	} else if ( gbvMreaWideCd == "03"){
		if (vRoutCd == "1")
		{
			vRoutColorCd = "1";
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "2"){
			vRoutColorCd = "2";
			vRoutTextNm = vRoutCd+"호선";
		} else if (vRoutCd == "3"){
			vRoutColorCd = "4";
			vRoutTextNm = vRoutCd+"호선";
		} else {
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		}
	} else if ( gbvMreaWideCd == "04"){
		if (vRoutCd == "1")
		{
			vRoutColorCd = "2";
			vRoutTextNm = vRoutCd+"호선";
		} else {
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		}
	} else if ( gbvMreaWideCd == "05"){
		if (vRoutCd == "1")
		{
			vRoutColorCd = "2";
			vRoutTextNm = vRoutCd+"호선";
		} else {
			vRoutColorCd = vRoutCd;
			vRoutTextNm = vRoutCd+"호선";
		}
	}
	/*
	 * 마우스 오버 시 역명 표시	
	for (var i=0; i<arrTrainLine.length; i++) {
		
		if (arrTrainLine[i].stnNo == vStinCd) {
			
			document.getElementById("station_box").innerHTML = "<p><strong>" + arrTrainLine[i].stnNm + "</strong> <span class=\"ps_line0" + vRoutColorCd + "\" title=\"" + vRoutTextNm + "\" style=\"width:auto; padding:0 3px;\">" + vRoutTextNm + "</p>";
			
			var height = $(document).scrollTop();
			
			vStinYN = true;
			break;
		}
	}

	if (vStinYN == true) {

		document.getElementById("station_box").style.top = (Number(this.getAttribute("cy"))-40) + "px";
		document.getElementById("station_box").style.left = (Number(this.getAttribute("cx"))-30) + "px";
		document.getElementById("station_box").className = "station_box";	
	}*/
}

function fnCircleMouseOut() {
	
	if ( gbvMreaWideCd == "02"){
		if (this.getAttribute("r") == "6") {
	
			this.setAttribute("r", "4.6");
		}
	} else {
		if (this.getAttribute("r") == "6") {
			
			this.setAttribute("r", "2.5");
		}
	}
	
	/*document.getElementById("station_box").className = "station_box Hidden";*/
}
function ClearMarker()
{
	$("image").remove();
	m_mapTrainState.clear();
	m_mapTmnTrainState.slice(0,m_mapTmnTrainState.length);
}

function ClearTmnTrnMarker(markerVar)
{
	
	$("image").remove();
	
}

function ClearRoutTrainMarker(routCd) 
{
	
	
}

function CurrentTrainStatus() {

	var sDate = new Date().getTime();
	var cDate1, cDate2, cDate3;
	
	
	var reloadDate = new Date().getTime();
	/* 데이터 클리어 후 리로드 */
	
	if ( isLoop == true) {
		if ( reloadDate - reloadTime >= clearReloadingTime*1000*60) // msec 으로 계산
		{	
			ClearMarker();
			//$('#pathAnimation').oLoader({
			$('body').oLoader({
				  backgroundColor: '#000',
				  fadeInTime: 500,
				  fadeLevel: 0.4,
				  style: "<div style='position:absolute;left:10px;bottom:10px;background:#000;color:#fff;padding:5px;border-radius:4px'>Data Currecting and Reloading...</div>",
				  hideAfter: 1500
				});
			reloadTime = reloadDate;
		}
	} else {
		isLoop = true;
		reloadTime = reloadDate;
	}
	
	$.ajax({
		///// 호출 주소 
		url: context + "/korLines/TrainLocStatus/fnCrntTrnStnLoc.do",
		//data: {paramRailOprIsttCd:'DG' },
		//data: {paramRailOprIsttCd:gbvRailOprIsttCd },		
		data: {paramAreCd:gbvMreaWideCd },
		async:false,
		dataType: 'json',
		success: function(data) {
			cDate1 = new Date().getTime();			
			
			var railStatArr				= data.result;
			var stinApcDvCdUpdHrToSec	= 0;			//상태(접근,도착,출발) 발생 시각 
			var caclUpdHr				= 0;			//상태(접근,도착,출발) 발생 시각(시,분,초) 추출 
			var svrHr					= 0;
		 	var markerNm				= "";
		 	var arrIdx					= 0;
			var line					= "";
			var timeRatio				= 1.0;
			var markerNm				= "";
			var railOprIsttCd			= "";
			var routCd					= "";
			var trnNo					= "";
			
			var stinCd					= "";			
			var psprStinCd				= "";
			
			var stinApcDvCd				= "";
			var upDnDvCd				= "";
			var bLastStin				= false;
			
			var orgStinCd 				= "";
			var tmnStinCd 				= "";
			
			var orgStinCd 				= "";
			var tmnStinCd 				= "";			
			
			var orgPrprStinCd 			= "";
			var tmnPrprStinCd 			= "";
			
			var ex						= "";
			
			var RltmStatArr				= data.resultRltmStt; // 실시간 열차 도착정보
			
			
			cDate2 = new Date().getTime();
			var cDate = new Date();
			//console.log ( cDate+" |DataCounter :"+0+"/"+ railStatArr.length);
			setRltmStatus(RltmStatArr);
					
			for(var i=0; i < railStatArr.length; i++){
				//filter debug
				//if (!( railStatArr[i]['railOprIsttCd'] == 'S1' && railStatArr[i]['routCd'] == '21')) continue;
				
				railOprIsttCd	= railStatArr[i]['railOprIsttCd'];
				routCd		= railStatArr[i]['lnCd'];
				trnNo		= railStatArr[i]['trnNo'];
				prprStinCd		=  railStatArr[i]['prprStinCd'];
				stinCd		= railStatArr[i]['stinCd'];
				stinApcDvCd	= railStatArr[i]['stinApcDvCd'];
				upDnDvCd	= railStatArr[i]['updnDvCd'];
				remainSec	= railStatArr[i]['fllwStinMvHr'];
				timedelay	= railStatArr[i]['timedelay'];
				bLastStin	= false;
				
				orgStinCd 				= railStatArr[i]['orgStinCd'];
				tmnStinCd 				= railStatArr[i]['tmnStinCd'];
				
				orgPrprStinCd 				= railStatArr[i]['orgPrprStinCd'];
				tmnPrprStinCd 				= railStatArr[i]['tmnPrprStinCd'];
				
				ex						= railStatArr[i]['ex'];
				updHr				= railStatArr[i]['updHr']
				
				
				if(timedelay == null) {
					timedelay = 0;
				}
				
				//console.log ( cDate+" |DataCounter :"+i+"/"+ railStatArr.length-1);
				////////////////////////////////////
				// kimhg - 임시 사용 
				//if( trnNo != "1255" ){ 
					//continue;
				//}

				
				
				/*if( routCd != 1 ){
					continue;
				}*/ 
				
				/*if(i == 0 && m_Temp == 1) {
					continue;
				}

				// kimhg - 테스트를 위한 강제 변수 적용 - 임시 사용
				if ( i == 0 ) {
					routCd		= "1";
					trnNo		= "1153";
					stinCd		= "130";
					stinApcDvCd	= "2";
					upDnDvCd	= "1";	
					remainSec	= "100";
					timedelay	= "0.4";
					
					m_Temp = 1;
				} else if ( i == 1 ) {
					routCd		= "1";
					trnNo		= "1153";
					stinCd		= "130";
					stinApcDvCd	= "3";
					upDnDvCd	= "1";	
					remainSec	= "100";
					timedelay	= "0.4";
				} else {
					continue;
				}
				*/
				//////////////////////////////////
				
				/*if(m_mapTrainState.get(routCd+"-"+trnNo) == stinApcDvCd) {					
					continue;
				} else {
					console.log("trn no:"+ routCd+"-"+trnNo +","+m_mapTrainState.get(routCd+"-"+trnNo)+","+ stinApcDvCd);
				}				
				
				m_mapTrainState.set(routCd+"-"+trnNo, stinApcDvCd);*/
				
				var checkStinStt = m_mapTrainState.get(routCd+"-"+trnNo);
				if ( checkStinStt != null ) {
					if(checkStinStt.stinCd == stinCd) {
						if ( checkStinStt.stinApcDvCd == stinApcDvCd )
						{
							continue;
						}	
						else { 
							if (m_debugLog > 0){
								console.log("trn no:"+ routCd+"-"+trnNo +","+checkStinStt.stinCd+","+checkStinStt.stinApcDvCd+","+ stinApcDvCd+"-stinApcDvCd Changed");
							}
						}	
					} else {
						if (m_debugLog > 0){
							console.log("trn no:"+ routCd+"-"+trnNo +","+checkStinStt.stinCd+","+checkStinStt.stinApcDvCd+","+ stinApcDvCd+"-stinCd Changed");
						}
					}
				}
				
				m_mapTrainState.set(routCd+"-"+trnNo, {'stinCd':stinCd,'stinApcDvCd':stinApcDvCd} );
											
				line = GetWideCodeArrayNum(railOprIsttCd, routCd, stinCd);
				// 라인 재입력으로 분기노선 정보 배열 확인
				console.log("question1::"+line);
				line = GetTmnDirection(railOprIsttCd, routCd, upDnDvCd, trnNo,  orgStinCd, tmnStinCd, line);
				console.log("question2::"+line);
				/*if (gbvMreaWideCd == '02') {
					if (railOprIsttCd == 'KR' && routCd == 'B1')
						line = '6';
					else if (railOprIsttCd == 'BG' && routCd == 'B1')
						line = '5';
					else 
						line = routCd;
				} else {
					line = routCd;
				}*/
				
				var StationNo;
				
				//TrainLine 에서 해당 역번이 가진 배열 정보
				/*stationParseNum = parseInt(stinCd.replace(/[^0-9]/g,'') );
				if ( gbvMreaWideCd == '02') 
				{
					if (line == 1){					
						 
						if ( stationParseNum > 100 ) {
							StationNo = (stationParseNum % (line*100)) + 6;
						} else if ( stationParseNum  == 100 ) { 
							StationNo = 100 - 94;
						} else {
							StationNo = stationParseNum % (line*100) - 94;
						}
					} else if (line == 'g1'){
						StationNo = stationParseNum % 100;
					} else if (line == 'b1'){
						StationNo = stationParseNum % (100 - 10);
					} else {
						StationNo = stationParseNum % (line*100);
					}
				} else if (gbvMreaWideCd == '03')
				{
					if (line == 1){
						StationNo = (stationParseNum % (line*100)) - 14;
					} else if (line == 2){
						StationNo = (stationParseNum % (line*100)) - 15;
					} else if (line == 3){
						StationNo = (stationParseNum % (line*100)) - 11;
					}
				} else if (gbvMreaWideCd == '04')
				{
					if (line == 1){
						StationNo = (stationParseNum % (line*100));
					} else if (line == 2){
						StationNo = (stationParseNum % (line*100));
					}
				} else if (gbvMreaWideCd == '05')
				{
				}
				
				/// 역번 배열은 상행 기준으로 되어있으므로 역번 대입할때 역산
				if (gbvMreaWideCd =='02')
				{
					if (line == 'g1')
					{	//김해경전철
						arrIdx = TrainLine[4].length - StationNo;						
					} else if (line == 'b1')
					{	//동해선
						arrIdx = TrainLine[5].length - StationNo;
					} else {
						arrIdx = TrainLine[line-1].length - StationNo;		
					}	
				} else {
					/// 역번 배열은 상행 기준으로 되어있으므로 역번 대입할때 역산
					arrIdx = TrainLine[line-1].length - StationNo;
				}*/			
				// 수도권에서 역번정보 중복 되는지 확인할 것.
				/*for ( ii = 0 ; ii < TrainLine.length ;ii++)
				{
					for ( jj = 0 ; jj < TrainLine[ii].length ;jj++)
					{
						if (TrainLine[ii][jj].stnNo == stinCd.trim())
						{
							arrIdx = jj;
							break;
						}
					}
				}*/
				if (m_debugLog > 0){
					console.log("array :"+(line-1));
				}
				if (line == 1 || line == 3 || line == 4)
				{
					console.log("check stinCD "+stinCd);
				}	
				if (line == 21 | line == 22 || line== 32)
				{
					console.log("question3:"+stinCd);;	
				}
				
				for ( jj = 0 ; jj < TrainLine[line-1].length ;jj++)
				{
					if (TrainLine[line-1][jj].stnNo == stinCd.trim())
					{
						arrIdx = jj;
						console.log("match stinCD"+stinCd.trim);
						break;
					}
				}
				
				markerNm	= "m_" + line + "_" + upDnDvCd + "_" + trnNo;
				textStatusNm	= "ts_" + line + "_" + upDnDvCd + "_" + trnNo;
		       	
				//if(markerNm == 'm_1_2_1292'){
					
				    switch(stinApcDvCd){							
						case '1' :
							var arrIdxTmp = arrIdx;
							if(upDnDvCd == 1 || upDnDvCd == 4) {
								// 상행의 첫번째 역은 접근 신호에 대해 처리하지 말것
								if(arrIdx == 0) {
									break;
								}
								
								arrIdxTmp = arrIdxTmp - 1;
							} else if(upDnDvCd == 2 || upDnDvCd == 3){
								// 하행의 첫번째 역은 접근 신호에 대해 처리하지 말것
								if(arrIdx == TrainLine[line-1].length - 1) {
									break;
								}
								
								arrIdxTmp = arrIdxTmp + 1;
							}
							if(m_debugLog > 0) {
								console.log('접근 -상하행:'+ upDnDvCd + ',호선:' + routCd +',열번:' + trnNo + ',i:' + i + ',arrIdx:' + arrIdx);	
							}							
						
							if ( $("#"+markerNm).length == 0) {
								// 노선도 상에 객체가 없으면 생성해라
								createMarker(markerNm, upDnDvCd, line, trnNo, stinApcDvCd, ex);								
								pathLen = markerSetPos(markerNm, upDnDvCd, line, arrIdxTmp, stinApcDvCd, bLastStin, 0, "none");
								//moveTrain(markerNm, line, arrIdx-1, upDnDvCd, stinApcDvCd, pathLen);
							} else {
								changeTrainImage(markerNm, upDnDvCd, line, trainNo, stinApcDvCd);
								/// 해당 열차에 대한 접근 위치로 이동
								pathLen = markerSetPos(markerNm, upDnDvCd, line, arrIdxTmp, stinApcDvCd, bLastStin, 0, "linear");
							}
							break;		
						case '2' :
							var arrIdxTmp = arrIdx;
							if(upDnDvCd == 1 || upDnDvCd == 4) {
								// 상행의 마지막 역 여부 확인
								if(arrIdx == TrainLine[line-1].length - 1) {
									bLastStin = true;
									arrIdxTmp = arrIdxTmp - 1;
								}									
							} else if(upDnDvCd == 2 || upDnDvCd == 3) {
								// 하행의 마지막 역 여부 확인
								if(arrIdx == 0) {
									bLastStin = true;
									arrIdxTmp = arrIdxTmp + 1;
								}
							}
							changeTrainImage(markerNm, upDnDvCd, line, trainNo, stinApcDvCd);
							
							if(m_debugLog > 0) {
								console.log('도착 -상태:'+ stinApcDvCd + ',호선:' + routCd +', 역코드:' + stinCd + ',열번:' + trnNo + ',상하행:' + upDnDvCd + ',갱신시각:' + railStatArr[i]['updHr']);	
							}
							
							if ( $("#"+markerNm).length == 0) {
								// 노선도 상에 객체가 없으면 생성해라
								createMarker(markerNm, upDnDvCd, line, trnNo, stinApcDvCd, ex);
								pathLen = markerSetPos(markerNm, upDnDvCd, line, arrIdxTmp, stinApcDvCd, bLastStin, 0 , "none");
							} else {
								pathLen = markerSetPos(markerNm, upDnDvCd, line, arrIdxTmp, stinApcDvCd, bLastStin, 0 , "linear");
							}
							
							if ( stinCd == tmnStinCd)
							{
								var tmnObj = {"markerNm":markerNm,"updHr":updHr };
								m_mapTmnTrainState.push(tmnObj);
							}
							
							break;		
						case '3' :
							var arrIdxTmp = arrIdx;
							
							// 다음역까지 이동시간 데이터가 없으면 현재역을 종착역으로 판단하며, 화면에서 열차를 삭제 처리함
							//if(remainSec == null) {
							if(remainSec == null && tmnStinCd == stinCd) 
							{							
								if(m_debugLog > 0) {
									console.log("출발-객체삭제-열번:" + trnNo);	
								}
								d3.select("#" + markerNm).remove();
								m_mapTrainState.delete(markerNm);
								break;
							}
							
							if(m_debugLog > 0) {
								console.log($("#"+markerNm).length);
								console.log('출발 -상태:'+ stinApcDvCd + ',호선:' + routCd +', 역코드:' + stinCd + ',열번:' + trnNo + ',상하행:' + upDnDvCd + ',갱신시각:' + railStatArr[i]['updHr']  + ',지연시각:' + timedelay);	
							}
							changeTrainImage(markerNm, upDnDvCd, line, trainNo, stinApcDvCd);
							//var chDate = new Date();
							if ( $("#"+markerNm).length == 0) {
								// 노선도 상에 객체가 없으면 생성해라
								if(m_debugLog > 0) {
									console.log("출발-열번:" + trnNo);	
								}
								createMarker(markerNm, upDnDvCd, line, trnNo, stinApcDvCd, ex);
								pathLen = markerSetPos(markerNm, upDnDvCd, line, arrIdx, stinApcDvCd, bLastStin, timedelay ,"none");
								
								if(m_debugLog > 0) {
									console.log("==== move train 3 ====:"+markerNm+","+line+","+arrIdxTmp +","+upDnDvCd +","+stinApcDvCd +","+pathLen +","+bLastStin +","+remainSec +","+timedelay);	
								}
								moveTrain(markerNm, line, arrIdxTmp, upDnDvCd, stinApcDvCd, pathLen, bLastStin, remainSec, timedelay);
							} else {
								var pathNode	= getPathNode(line, arrIdxTmp, upDnDvCd);
								if (pathNode == undefined)
								{
									console.log("debug fl1:"+line+","+arrIdxTmp+","+upDnDvCd);
								}
									
								var pathLen		= pathNode.getTotalLength();

								if(m_debugLog > 0) {
									console.log("==== move train 4 ====:"+markerNm+","+line+","+arrIdxTmp +","+upDnDvCd +","+stinApcDvCd +","+pathLen +","+bLastStin +","+remainSec);	
								}
								moveTrain(markerNm, line, arrIdxTmp, upDnDvCd, stinApcDvCd, pathLen, bLastStin, remainSec, 0);
							}
							break;
					}
				    cDate3 = new Date().getTime();
			}
	    },
		error:function(xhr, status, error)
		{
			
		}
	});
	
	for ( kk = 0 ; kk < m_mapTmnTrainState.length ; kk++)
   	{
    	var updHr = m_mapTmnTrainState[kk]["updHr"];
    	updHr = updHr.replace(/:|\s/gi,"-");
    	spUpdHr = updHr.split("-");
    	
    	tmpDate = new Date();
    	
    	chkday1 = (parseInt(spUpdHr[0])*10000)+(parseInt(spUpdHr[1])*100)+(parseInt(spUpdHr[2]));				    	
    	chkSecond1 = (parseInt(spUpdHr[3])*3600)+(parseInt(spUpdHr[4])*60)+(parseInt(spUpdHr[5]));
    	
    	chkday2 = (parseInt(tmpDate.getFullYear(), 10)*10000)+((parseInt(tmpDate.getMonth(), 10)+1)*100)+(parseInt(tmpDate.getDate(), 10));				    	
    	chkSecond2 = (parseInt(tmpDate.getHours(), 10)*3600)+(parseInt(tmpDate.getMinutes(), 10)*60)+(parseInt(tmpDate.getSeconds(), 10));
    	
    	if (chkday1 < chkday2)
   		{
	    		d3.select("#" + m_mapTmnTrainState[kk]["markerNm"]).remove();
		    	m_mapTmnTrainState.slice(kk,1);
   		} else {
   			if (chkSecond1+30 < chkSecond2)
   			{
   				d3.select("#" + m_mapTmnTrainState[kk]["markerNm"]).remove();
			    	m_mapTmnTrainState.slice(kk,1);
   			}
   		}	    	
    	//d3.select("#" + markerNm).remove();
    	//m_mapTmnTrainState.slice(kk,1);
   	}
	
	var logTime =  new Date();
	if (m_debugLog > 0){
		console.log((new Date().toTimeString())+"[ elapsed time check - response time:"+(cDate1- sDate)+"ms, process time :"+(cDate3- cDate2)+"ms]");
	}
	var eDate = new Date().getTime();
	if (m_debugLog > 0){
		console.log((new Date().toTimeString())+" ajax call all time(ms) : "+(eDate - sDate)+"ms");
	}
  
	
	setTimeout("CurrentTrainStatus()", 2000);

}
function moveTrain(markerNm, line, arrIdx, upDnDvCd, stinApcDvCd, pathLen, bLastStin, remainSec, timedelay) {

	var marker = svg.select("#"+markerNm);
	//"objStatus" 로 비동기 동작 방지
	/*if (marker.attr("objStatus") == '3')
		return;
	else
		marker.attr("objStatus",stinApcDvCd);*/
	
	var durTimes = "";
	
	// 실제 열차 출발과 상태 데이터 수신까지의 오차를 보정하기 위해 다음역까지 이동시간에서 13초를 차감함
	remainSec = remainSec - 13;
	
	if (stinApcDvCd == 1){
		
		durTimes =1000*30*(1-m_StinDstRto);
		
	} else if(stinApcDvCd == 3) {
		//durTimes = TrainLine[line - 1][arrIdx]['remainSec' + upDnDvCd] * 1000;
		if(timedelay == 0) {			
			durTimes = remainSec * 1000 * m_StinDstRto;
			if (m_debugLog > 0){
				console.log("time delay durtimes : "+durTimes);
			}
		} else {			
			// ((remainSec * m_StinDstRto) * (1 - timedelay)) => ((다음역까지 이동시간 * 다음역 접근 신호 비율) * (1 - 지나간 시간의 비율))
			durTimes = ( (remainSec * (1 - timedelay)) - (remainSec * (1 - m_StinDstRto))) * 1000;
			if (m_debugLog > 0){
				console.log("else durtimes : "+durTimes);
			}
		}
	}
	
	if(m_debugLog > 0) {
		console.log(durTimes);	
	}
	console.log("durtimes : "+durTimes);
	
	marker.transition().duration(durTimes).ease("linear")
	.attrTween("transform",	translateAlong(markerNm, line, arrIdx, upDnDvCd, stinApcDvCd, pathLen, bLastStin, timedelay ))

	
	.each("end", function(){
		if(m_debugLog > 0) {
			console.log('transition end');	
		}
	});	// infinite loop
}

function trainImgPath(line)
{
	var imgpath = context + "/ext/images/korLines/cont/"
	return trainImgName = imgpath + gbvMreaWideCd+ "_line_" + line + "_train.png";
}

function createMarker(markerNm, upDnDvCd, line, trainNo, stinApcDvCd, ex){
	
	//var markerNm	= "m_" + line + "_" + upDnDvCd + "_" + trainNo;	
	var marker		= "";
	var pathLen		= "";
	var trainImgName = trainImgPath(line);	
	
	var groupIdName = "";
	
	if (gbvMreaWideCd == '01') { // 수도권 열차 설정
		switch (line)
		{
			case "1":
				groupIdName = "line_1_trn_icon";
			break;
			case "2":
				groupIdName = "line_2_trn_icon";
			break;
			case "3":
				groupIdName = "line_3_trn_icon";
			break;
			case "4":
				groupIdName = "line_4_trn_icon";
			break;
			default:
				groupIdName = "line_"+line+"_trn_icon";
			break;
		}
		if (ex == 'Y')
		{
			groupIdName = groupIdName + "_ex";
		}
	} else {
		switch (line)
		{
			case "1":
				groupIdName = "line_1_trn_icon";
			break;
			case "2":
				groupIdName = "line_2_trn_icon";
			break;
			case "3":
				groupIdName = "line_3_trn_icon";
			break;
			case "4":
				groupIdName = "line_4_trn_icon";
			break;
			default:
				groupIdName = "line_"+line+"_trn_icon";
			break;
		}
	}
	
	
	//marker = svg.append("image")
	///방향 상태 원 표시
	  
	marker = svg.select("#"+groupIdName).append("image")
	.attr("id", markerNm)
	.attr("xlink:href", trainImgName)
	.attr("x",-30)
	.attr("y",-10)
	.attr("width","61px")
	.attr("height","20px")

	///방향 없음 상태 표시 없음
	/*marker = svg.select("#"+groupIdName).append("image")
	.attr("id", markerNm)
	.attr("xlink:href", trainImgName)
	.attr("x",-35) 
	.attr("y",-18)  
	.attr("width","71px")
	.attr("height","36px")*/
	
	/*마커 투명도 처리*/
	if (typeof trnIconTransparent != "undefined" && trnIconTransparent == true)
	{
		if (!(selectedLine == line))
			$("#"+markerNm).css("opacity","0");
	}
		
}

function createTextStatus(textstatusNm, upDnDvCd, line, trainNo, stinApcDvCd){
	markerNm	= "m_" + line + "_" + upDnDvCd + "_" + trainNo;
	
	var setx = svg.select("#"+markerNm).attr("x");
	var sety = svg.select("#"+markerNm).attr("y");
	
	textstatus = svg.append("text")
	.attr("id", textstatusNm)
	.attr("x",setx)
	.attr("y",sety)
	.attr("width","71px")
	.attr("height","36px")
	
	if (stinApcDvCd == '1')
	{
		textstatus.text("접근");	
	} else if (stinApcDvCd == '2')
	{
		textstatus.text("도착");
	}
}

function changeTrainImage(markerNm, upDnDvCd, line, trainNo, stinApcDvCd)
{
	var marker		= "";
	var trainImgName = trainImgPath(line);
	
	marker = svg.select("#"+markerNm).attr("xlink:href", trainImgName);
}

function markerSetPos(markerNm, upDnDvCd, line, arrIdx, stinApcDvCd, bLastStin, timedelay, islinear){
	
	var marker = svg.select("#"+markerNm);
	var moveDstRatio = "";	
	console.log("marker name:"+markerNm)
	var pathNode	= getPathNode(line, arrIdx, upDnDvCd);
	if (pathNode == undefined)
	{
		console.log("debug fl2:"+line+","+arrIdx+","+upDnDvCd);
		return undefined;
	}
	
	var pathLen		= pathNode.getTotalLength();
	var pathPoint = pathNode.getPointAtLength(pathLen * getRatio(stinApcDvCd, upDnDvCd, bLastStin, timedelay));
	
	if (stinApcDvCd == "1" )
	{
		// 각도처리
		if (upDnDvCd == "1" || upDnDvCd == "4") // 상행,외선
		{ 
			if (islinear == "linear")
			{
				marker.transition().attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx+1]["dgree" + upDnDvCd]+ ")" );
			} else {
				marker.transition();
				marker.attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx+1]["dgree" + upDnDvCd]+ ")" );
			}
		} else if (upDnDvCd == "2" || upDnDvCd == "3") // 하행,내선 
		{
			if (islinear == "linear")
			{
				marker.transition().attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx-1]["dgree" + upDnDvCd]+ ")" );								
			} else {
				marker.transition();
				marker.attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx-1]["dgree" + upDnDvCd]+ ")" );
			}
		}
		
	} else {
		if (islinear == "linear")
		{
			marker.transition().attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx]["dgree" + upDnDvCd]+ ")" );
		} else {
			marker.transition();
			marker.attr( "transform", "translate(" + pathPoint.x + "," + pathPoint.y + ") rotate(" + TrainLine[line-1][arrIdx]["dgree" + upDnDvCd]+ ")" );
		}			
	}
	
	//.attr("objStatus",stinApcDvCd);
	if(m_debugLog > 0) {
		console.log('markerSetPos : ' + pathPoint.x + "," + pathPoint.y + ', pathLen : ' + pathLen);	
	}
	
	return pathLen;

}

function getRatio(stinApcDvCd, upDnDvCd, bLastStin, timedelay){

	var moveDstRatio = "";
	
	switch(stinApcDvCd){
	
	case '1' : 

		if(upDnDvCd == "1")
			moveDstRatio = 0.2;
		else if(upDnDvCd == "2"){
			moveDstRatio = 0.8;
		} else if(upDnDvCd == "3"){
			moveDstRatio = 0.8;
		} else if(upDnDvCd == "4"){
			moveDstRatio = 0.2;
		}
		
		break;
		
	case '2' :
		if(bLastStin == true) {
			if(upDnDvCd == "1")
				moveDstRatio = 0;
			else if(upDnDvCd == "2")
				moveDstRatio = 1;
			else if(upDnDvCd == "3")
				moveDstRatio = 1;
			else if(upDnDvCd == "4")
				moveDstRatio = 0;
		} else {
			if(upDnDvCd == "1")
				moveDstRatio = 1;
			else if(upDnDvCd == "2")
				moveDstRatio = 0;
			else if(upDnDvCd == "3")
				moveDstRatio = 0;
			else if(upDnDvCd == "4")
				moveDstRatio = 1;
		}
		break;
		
	case '3' :
		if(timedelay == null) {
			if(upDnDvCd == "1")
				moveDstRatio = 1;
			else if(upDnDvCd == "2")
				moveDstRatio = 0;
			else if(upDnDvCd == "3")
				moveDstRatio = 0;				
			else if(upDnDvCd == "4")
				moveDstRatio = 1;					
			
		} else {
			if(upDnDvCd == "1")
				moveDstRatio = 1 - timedelay;
			else if(upDnDvCd == "2")
				moveDstRatio = timedelay;
			else if(upDnDvCd == "3")
				moveDstRatio = timedelay;
			else if(upDnDvCd == "4")			
				moveDstRatio = 1 - timedelay;
		}

		break;
	}

	return moveDstRatio;
}

function getPathNode(line, arrIdx, upDnDvCd){
	var postFix = "";
	
	try {
		if ( TrainLine[line-1][arrIdx]["pathId" + upDnDvCd] == undefined ) console.log("TrainLineArr undefined");
	} catch (exception)
	{
		console.log("cannot access pathobject - "+ (line-1)+","+arrIdx+",pathId"+ upDnDvCd);
		return undefined;
	}
    postFix = TrainLine[line-1][arrIdx]["pathId" + upDnDvCd];
	
	
	if( postFix == ""){
		/*if ( upDnDvCd == "1" )
		{
			postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
		}
		else {
			postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd];
		}*/
		if ( upDnDvCd == "1" )
		{
			if (arrIdx >= TrainLine[line-1].length-1 )
			{
				postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd]; 
			} else {
				postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
			}
		}
		else if ( upDnDvCd == "2" ) {
			if (arrIdx <= 0)
			{		
				postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
			} else {
				postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd];
			}
		}
		else if ( upDnDvCd == "3" )
		{
			// 내선
			if (arrIdx <= 0) 
			{		
				postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
			} else {
				postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd];
			}
		}
		else if ( upDnDvCd == "4" ) {
			 //외선
			if (arrIdx >= TrainLine[line-1].length-1 )
			{
				postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd]; 
			} else {
				postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
			}
		}
		else {
			if (arrIdx <= 0)
			{		
				postFix = TrainLine[line-1][arrIdx+1]["pathId" + upDnDvCd];
			} else {
				postFix = TrainLine[line-1][arrIdx-1]["pathId" + upDnDvCd];
			}
		}
	}
	
	var path = svg.select("path#" + postFix);
	
	return path.node();
}

function translateAlong(markerNm, line, arrIdx, upDnDvCd, stinApcDvCd, pathLen, bLastStin, timedelay ) {
	
	var pathNode	= getPathNode(line, arrIdx, upDnDvCd);
	if (pathNode == undefined)
	{
		console.log("debug fl3:"+line+","+arrIdx+","+upDnDvCd);
		return undefined;
	}
	
	var moveDstRatio = getRatio(stinApcDvCd, upDnDvCd, bLastStin, timedelay);
	// 다음 역 정보 각도 확인
	var nextStinDegree;
	var degDiff;
	if(upDnDvCd == 1) {
		if (TrainLine[line-1].length - 1 > arrIdx )
		{
			nextStinDegree = TrainLine[line-1][arrIdx+1]["dgree" + upDnDvCd];
		} else {
			nextStinDegree = TrainLine[line-1][arrIdx]["dgree" + upDnDvCd];
		}	
	} else if(upDnDvCd == 2){
		if (0 < arrIdx )
		{
			nextStinDegree = TrainLine[line-1][arrIdx-1]["dgree" + upDnDvCd];
		} else {
			nextStinDegree = TrainLine[line-1][arrIdx]["dgree" + upDnDvCd];
		}		
	} else if(upDnDvCd == 3) {
		// 내선 역번 증가
		if (0 < arrIdx )
		{
			nextStinDegree = TrainLine[line-1][arrIdx-1]["dgree" + upDnDvCd];
		} else {
			nextStinDegree = TrainLine[line-1][arrIdx]["dgree" + upDnDvCd];
		}			
	} else if(upDnDvCd == 4){
		// 외선 역번 감소
		if (TrainLine[line-1].length - 1 > arrIdx )
		{
			nextStinDegree = TrainLine[line-1][arrIdx+1]["dgree" + upDnDvCd];
		} else {
			nextStinDegree = TrainLine[line-1][arrIdx]["dgree" + upDnDvCd];
		}	
	} else {
		if (0 < arrIdx )
		{
			nextStinDegree = TrainLine[line-1][arrIdx-1]["dgree" + upDnDvCd];7
		} else {
			nextStinDegree = TrainLine[line-1][arrIdx]["dgree" + upDnDvCd];
		}		
	}
	
	degDiff = parseInt(nextStinDegree) - parseInt(TrainLine[line-1][arrIdx]["dgree" + upDnDvCd]);
	
	return function(i) {
		  return function(t) {
			var p		= "";
			if(upDnDvCd == 1 || upDnDvCd == 4) {
				//p	= pathNode.getPointAtLength( (1 - t) * pathLen * moveDstRatio);
				p	= pathNode.getPointAtLength( (pathLen * (1 - m_StinDstRto) * t) + ((1 - t) * pathLen * moveDstRatio));
			} else if(upDnDvCd == 2 || upDnDvCd == 3 ){
				//p	= pathNode.getPointAtLength( (moveDstRatio * pathLen) + ((1 - moveDstRatio) * t) * pathLen );
				p	= pathNode.getPointAtLength( (moveDstRatio * (pathLen * m_StinDstRto)) + ((1 - moveDstRatio) * t) * (pathLen * m_StinDstRto) );
			}
			//console.log("["+chDate+"] "+"loc(" + p.x + "," + p.y + ")"+"T:"+t);
	        return "translate(" + p.x + "," + p.y + ")" + "rotate(" + (parseInt( TrainLine[line-1][arrIdx]["dgree" + upDnDvCd] ) + (degDiff*t)) + ")";
		  }
	}
}

function pathStartPoint(line, upDnDvCd, arrIdx) {
	var path = svg.select("path#" + TrainLine[line-1][arrIdx]["pathId" + upDnDvCd]);	
	
	var d = path.attr("d"),
	dsplitted = d.split(" ");
	return dsplitted[1].split(",");
}

function GetStnIdName()
{
	splittedId = this.id.split("_");		
 	//window.open(context + "/altmInfoSys/index.do?parmTrnClsfCd=1&parmMreaWideCd="+gbvMreaWideCd+"&parmRoutCd="+splittedId[2].toUpperCase()+"&parmRailOprIsttCd="+splittedId[1].toUpperCase()+"&parmStinCd="+splittedId[3].toUpperCase()+"&paramInfoDv=car&parmIsKorLines=Y", "_blank");
	//고유역코드 변경 이후 아래 적용
	window.open(context + "/altmInfoSys/index.do?areCd="+gbvMreaWideCd+"&lnCd="+splittedId[2].toUpperCase()+"&railOprIsttCd="+splittedId[1].toUpperCase()+"&prprStinCd="+splittedId[3].toUpperCase()+"&screen=car&isKorLines=Y", "_blank");
}

function GetWideCodeArrayNum(railOprIsttCd, routCd, stinCd)
{
	var arrayNum;
	
	if (gbvMreaWideCd == '01') {
		if (railOprIsttCd == 'S9' && routCd == '9')
			arrayNum = '9';
		else if (railOprIsttCd == 'AR' && routCd == 'A1')		
			arrayNum = '10';
		else if (railOprIsttCd == 'KR' && routCd == 'K1')
			arrayNum = '11';
		else if (railOprIsttCd == 'DX' && routCd == 'D1')
			arrayNum = '12';
		else if (railOprIsttCd == 'KR' && routCd == 'K4')
			arrayNum = '13';   // 경의중앙
		else if (railOprIsttCd == 'KR' && routCd == 'K2')
			arrayNum = '14';   // 경춘
		else if (railOprIsttCd == 'KR' && routCd == 'K3')
			arrayNum = '15';   // 수인
		else if (railOprIsttCd == 'UL' && routCd == 'U1')
			arrayNum = '16';   // 의정부
		else if (railOprIsttCd == 'EV' && routCd == 'E1')
			arrayNum = '17';   // 용인
		else if (railOprIsttCd == 'KR' && routCd == 'K5')
			arrayNum = '18';   // 경강
		else if (railOprIsttCd == 'IC' && routCd == 'I1')
			arrayNum = '19';
		else if (railOprIsttCd == 'IC' && routCd == 'I2')
			arrayNum = '20';
		
		else if (railOprIsttCd == 'S1' && routCd == '2')
		{
			if ( stinCd.match("-") == null )
			{
				arrayNum = '2';
			} else {
				if (stinCd.match("211") == "211"  )
					arrayNum = '21';
				else if (stinCd.match("234") == "234" )
					arrayNum = '22';
				else
					arrayNum = '2';
			}
		}
		else if (railOprIsttCd == 'S1' && routCd == '21')
			arrayNum = '21';
		else if (railOprIsttCd == 'S1' && routCd == '22')
			arrayNum = '22';
		else if (railOprIsttCd == 'AR' && routCd == 'M1')
			arrayNum = '31';
		else if (railOprIsttCd == 'UI' && routCd == 'UI')
			arrayNum = '32';
		else
			arrayNum = routCd;
	} else if (gbvMreaWideCd == '02') {
		if (railOprIsttCd == 'KR' && routCd == 'K6')
			arrayNum = '6';
		else if (railOprIsttCd == 'BG' && routCd == 'B1')
			arrayNum = '5';
		else 
			arrayNum = routCd;
	} else {
		arrayNum = routCd;
	}
	return arrayNum;
}

function GetTmnDirection(railOprIsttCd, routCd, updnDvCd, trnNo, orgStinCd, tmnStinCd, inputLineCd )
{
	var retRoute = inputLineCd;
	if ((railOprIsttCd == 'S1' || railOprIsttCd == 'KR') && routCd == '1')
	{	
		var trnNoTrim = "";
		
		//if ( trnNo.includes("S") == true || trnNo.includes("K") == true)
		if ( trnNo.indexOf("S") >= 0  || trnNo.indexOf("K") >= 0)
		{
			trnNoTrim = parseInt(trnNo.substring(1,8)).toString();	
		} else {
			trnNoTrim = parseInt(trnNo.substring(0,8)).toString();
		}
		if ( Math.floor(parseInt(trnNoTrim) / 100) == 4 ||  Math.floor(parseInt(trnNoTrim) / 100) == 5 || 
			Math.floor(parseInt(trnNoTrim) / 100) == 6 || Math.floor(parseInt(trnNoTrim) / 100 ) == 7)
		{
			retRoute = 25; // 천안
			return retRoute;
		}

		if ( orgStinCd == null || tmnStinCd == null) return retRoute;
		var strOrgStinCd = orgStinCd.toString();
		var strTmnStinCd = tmnStinCd.toString();
		
		if (trnNoTrim.length < 4) {
			//
			if (strOrgStinCd.substring(0,1) == 'P' || strTmnStinCd.substring(0,1) == 'P')
			{	
				retRoute = 25; // 천안
			} else {
				retRoute = 1; // 천안
			}
		} else {
			//급행열차
			if (strOrgStinCd.substring(0,1) == 'P' || strTmnStinCd.substring(0,1) == 'P')
			{
				if (strOrgStinCd == 'P1571' || strTmnStinCd == 'P1571'
					|| strOrgStinCd == 'P157-1' || strTmnStinCd == 'P157-1'
				)					
				{	//서동탄
					retRoute = 26;
				}
				else if (trnNoTrim.substring(0,2) == '19' && trnNoTrim.length == 4)
				{
					retRoute = 30;
				} else {
					retRoute = 25;
				}	
			} else {
				if (trnNoTrim.substring(0,2) == '13' && trnNoTrim.length == 4)
				{
					retRoute = 29; //동인천 특
				} else if ((trnNoTrim.substring(0,2) == '10' || trnNoTrim.substring(0,2) == '11' || trnNoTrim.substring(0,2) == '12' ||
						trnNoTrim.substring(0,2) == '14') && trnNoTrim.length == 4)
				{
					retRoute = 1;
				}
			}
		}
	}else if (railOprIsttCd == 'S5' && routCd == '5')
	{
		if ( orgStinCd == null || tmnStinCd == null) return retRoute;
		var strOrgStinCd = orgStinCd.toString();
		var strTmnStinCd = tmnStinCd.toString();
		if (strOrgStinCd.substring(0,1) == 'P' || strTmnStinCd.substring(0,1) == 'P')
		{
			retRoute = 24;
		}
	}else if (railOprIsttCd == 'KR' && routCd == 'K4')
	{
		if ( orgStinCd == null || tmnStinCd == null) return retRoute;
		var strOrgStinCd = orgStinCd.toString();
		var strTmnStinCd = tmnStinCd.toString();
		if (strOrgStinCd=='P314' || strOrgStinCd=='P313' || strTmnStinCd == 'P314' || strTmnStinCd == 'P313')
		{
			retRoute = 28;
		}
	}	
	return retRoute;
}

function setRltmStatus(RltmStatArr)
{
	for ( ii = 0 ; ii < RltmStatArr.length; ii++)
	{
		if (RltmStatArr[ii].rltmStt == 'Y')
		{
			$("#ch_"+RltmStatArr[ii].areCd+"_"+RltmStatArr[ii].railOprIsttCd+"_"+RltmStatArr[ii].lnCd).text("R");
		} else if (RltmStatArr[ii].rltmStt == 'N' || RltmStatArr[ii].rltmStt == null){
			$("#ch_"+RltmStatArr[ii].areCd+"_"+RltmStatArr[ii].railOprIsttCd+"_"+RltmStatArr[ii].lnCd).text("T");
		}
		
		var iAreCd = parseInt(gbvMreaWideCd) - 1;
		
		if ( RltmStatArr[ii].rltmStt != RttmStatus[iAreCd][0][RltmStatArr[ii].lnCd] )
		{
			if (isNotFirst == true ) 
			{
				var trainId = "line_"+RltmStatArr[ii].lnCd+"_trn_icon";
				{
					$("#"+trainId).empty();
					if (iAreCd == 0)
					{
						$("#"+trainId+"_ex").empty();
						if (RltmStatArr[ii].lnCd == "1")
						{
							$("#line_25_trn_icon").empty();
							$("#line_25_trn_icon_ex").empty();
							$("#line_26_trn_icon").empty();
							$("#line_26_trn_icon_ex").empty();
							$("#line_30_trn_icon").empty();
							$("#line_30_trn_icon_ex").empty();
						} else if (RltmStatArr[ii].lnCd == "2")
						{
							$("#line_21_trn_icon").empty();
							$("#line_22_trn_icon").empty();
						} else if (RltmStatArr[ii].lnCd == "5")
						{
							$("#line_24_trn_icon").empty();
							$("#line_24_trn_icon_ex").empty();
						}else if (RltmStatArr[ii].lnCd == "K4")
						{
							$("#line_28_trn_icon").empty();
							$("#line_28_trn_icon_ex").empty();
						}
					}
				}				
			}
			RttmStatus[iAreCd][0][RltmStatArr[ii].lnCd] = RltmStatArr[ii].rltmStt;
			isNotFirst = true;
		}
	}
}
