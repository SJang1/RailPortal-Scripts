// 광주지역 열차 라인 오브젝트 배열 정보
//광주 1호선 데이터 정보
/* 광주 1호선  각 개별 역사를 내림 차순으로 , 호선별 올림 차순으로 2차원 배열로 배치 시키고 
 * 각 개별 위치에 대한 정보 기입
 * stnNo: 역번
 * stnNm: 역명
 * distance: 이전역번에서의 거리
 * remainSec1: 상행시 stnNo-1 다음역에 걸리는 시간
 * remainSec2: 하행시  stnNo+1 다음역에 걸리는 시간
 * pathId1: 상행시  기차 이동처리하는 svg path id
 * pathId2: 하행시  기차 이동처리하는 svg path id
 * dgree1: 상행시 기차 이동처리시 표시회전 각도
 * dgree2: 하행시 기차 이동처리시 표시회전 각도
 * svg 이동 경로 패스의 벡터 경로는 하행 방향으로 그릴 것 
 */ 
var TrainLine = [
[
	{stnNo:119,	stnNm:"평동",			distance:1.9,	remainSec1:90,	pathId1:"line1_019",	remainSec2:0,	pathId2:"",				dgree1:-135,	dgree2:45},
	{stnNo:118,	stnNm:"도산",			distance:0.7,	remainSec1:90,	pathId1:"line1_018",	remainSec2:90,	pathId2:"line1_019",	dgree1:-135,	dgree2:45},
	{stnNo:117,	stnNm:"광주송정",		distance:1,		remainSec1:90,	pathId1:"line1_017",	remainSec2:90,	pathId2:"line1_018",	dgree1:-135,	dgree2:45},
	{stnNo:116,	stnNm:"송정공원",		distance:1,		remainSec1:90,	pathId1:"line1_016",	remainSec2:90,	pathId2:"line1_017",	dgree1:-90,		dgree2:90},
	{stnNo:115,	stnNm:"공항",			distance:1.1,	remainSec1:90,	pathId1:"line1_015",	remainSec2:90,	pathId2:"line1_016",	dgree1:-90,		dgree2:90},
	{stnNo:114,	stnNm:"김대중컨벤션센터",	distance:1,		remainSec1:90,	pathId1:"line1_014",	remainSec2:90,	pathId2:"line1_015",	dgree1:-90,		dgree2:90},
	{stnNo:113,	stnNm:"상무",			distance:1.1,	remainSec1:90,	pathId1:"line1_013",	remainSec2:90,	pathId2:"line1_014",	dgree1:-90,		dgree2:90},
	{stnNo:112,	stnNm:"운천",			distance:1,		remainSec1:90,	pathId1:"line1_012",	remainSec2:90,	pathId2:"line1_013",	dgree1:-90,		dgree2:90},
	{stnNo:111,	stnNm:"쌍촌",			distance:0.8,	remainSec1:90,	pathId1:"line1_011",	remainSec2:90,	pathId2:"line1_012",	dgree1:-90,		dgree2:90},
	{stnNo:110,	stnNm:"화정",			distance:1.2,	remainSec1:90,	pathId1:"line1_010",	remainSec2:90,	pathId2:"line1_011",	dgree1:-90,		dgree2:90},
	{stnNo:109,	stnNm:"농성",			distance:1,		remainSec1:90,	pathId1:"line1_009",	remainSec2:90,	pathId2:"line1_010",	dgree1:-90,		dgree2:90},
	{stnNo:108,	stnNm:"돌고개",		distance:0.9,	remainSec1:90,	pathId1:"line1_008",	remainSec2:90,	pathId2:"line1_009",	dgree1:-90,		dgree2:90},
	{stnNo:107,	stnNm:"양동시장",		distance:0.8,	remainSec1:90,	pathId1:"line1_007",	remainSec2:90,	pathId2:"line1_008",	dgree1:-90,		dgree2:90},
	{stnNo:106,	stnNm:"금남로5가",		distance:1.4,	remainSec1:90,	pathId1:"line1_006",	remainSec2:90,	pathId2:"line1_007",	dgree1:-45,		dgree2:135},
	{stnNo:105,	stnNm:"금남로4가",		distance:0.6,	remainSec1:90,	pathId1:"line1_005",	remainSec2:90,	pathId2:"line1_006",	dgree1:-45,		dgree2:135},
	{stnNo:104,	stnNm:"문화전당",		distance:1.2,	remainSec1:90,	pathId1:"line1_004",	remainSec2:90,	pathId2:"line1_005",	dgree1:-45,		dgree2:135},
	{stnNo:103,	stnNm:"남광주",		distance:0.8,	remainSec1:90,	pathId1:"line1_003",	remainSec2:90,	pathId2:"line1_004",	dgree1:-45,		dgree2:135},
	{stnNo:102,	stnNm:"학동중심사입구",	distance:0.9,	remainSec1:90,	pathId1:"line1_002",	remainSec2:90,	pathId2:"line1_003",	dgree1:-45,		dgree2:135},
	{stnNo:101,	stnNm:"소태",			distance:1,		remainSec1:90,	pathId1:"line1_001",	remainSec2:90,	pathId2:"line1_002",	dgree1:-45,		dgree2:135},
	{stnNo:100,	stnNm:"녹동",			distance:0.8,	remainSec1:0,	pathId1:"",				remainSec2:90,	pathId2:"line1_001",	dgree1:-45,		dgree2:135}
]];
