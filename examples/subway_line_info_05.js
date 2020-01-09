// 부산지역 열차 라인 오브젝트 배열 정보
// 대전 1호선 데이터 정보
/* 대전  각 개별 역사를 내림 차순으로 , 호선별 올림 차순으로 2차원 배열로 배치 시키고 
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
// 광주지역 열차 라인 오브젝트 배열 정보
//광주 1호선 데이터 정보
/* 대전 1호선  각 개별 역사를 내림 차순으로 , 호선별 올림 차순으로 2차원 배열로 배치 시키고 
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
	{stnNo:122,	stnNm:"반석",			distance:0.9,	remainSec1:90,	pathId1:"line1_021",	remainSec2:0,	pathId2:"",				dgree1:0,		dgree2:180},
	{stnNo:121,	stnNm:"지족",			distance:1.1,	remainSec1:90,	pathId1:"line1_020",	remainSec2:90,	pathId2:"line1_021",	dgree1:0,		dgree2:180},
	{stnNo:120,	stnNm:"노은",			distance:0.8,	remainSec1:90,	pathId1:"line1_019",	remainSec2:90,	pathId2:"line1_020",	dgree1:0,		dgree2:180},
	{stnNo:119,	stnNm:"월드컵경기장",		distance:1.0,	remainSec1:90,	pathId1:"line1_018",	remainSec2:90,	pathId2:"line1_019",	dgree1:0,		dgree2:180},
	{stnNo:118,	stnNm:"현충원",		distance:0.8,	remainSec1:90,	pathId1:"line1_017",	remainSec2:90,	pathId2:"line1_018",	dgree1:0,		dgree2:180},
	{stnNo:117,	stnNm:"구암",			distance:1.0,	remainSec1:90,	pathId1:"line1_016",	remainSec2:90,	pathId2:"line1_017",	dgree1:-90,		dgree2:90},
	{stnNo:116,	stnNm:"유성온천",		distance:1.2,	remainSec1:90,	pathId1:"line1_015",	remainSec2:90,	pathId2:"line1_016",	dgree1:-90,		dgree2:90},
	{stnNo:115,	stnNm:"갑천",			distance:1.0,	remainSec1:90,	pathId1:"line1_014",	remainSec2:90,	pathId2:"line1_015",	dgree1:-90,		dgree2:90},
	{stnNo:114,	stnNm:"월평",			distance:0.7,	remainSec1:90,	pathId1:"line1_013",	remainSec2:90,	pathId2:"line1_014",	dgree1:-90,		dgree2:90},
	{stnNo:113,	stnNm:"갈마",			distance:0.7,	remainSec1:90,	pathId1:"line1_012",	remainSec2:90,	pathId2:"line1_013",	dgree1:-90,		dgree2:90},
	{stnNo:112,	stnNm:"정부청사",		distance:0.9,	remainSec1:90,	pathId1:"line1_011",	remainSec2:90,	pathId2:"line1_012",	dgree1:-90,		dgree2:90},
	{stnNo:111,	stnNm:"시청",			distance:0.7,	remainSec1:90,	pathId1:"line1_010",	remainSec2:90,	pathId2:"line1_011",	dgree1:-45,		dgree2:135},
	{stnNo:110,	stnNm:"탄방",			distance:1.2,	remainSec1:90,	pathId1:"line1_009",	remainSec2:90,	pathId2:"line1_010",	dgree1:-45,		dgree2:135},
	{stnNo:109,	stnNm:"용문",			distance:1.5,	remainSec1:90,	pathId1:"line1_008",	remainSec2:90,	pathId2:"line1_009",	dgree1:-45,		dgree2:135},
	{stnNo:108,	stnNm:"오룡",			distance:0.7,	remainSec1:90,	pathId1:"line1_007",	remainSec2:90,	pathId2:"line1_008",	dgree1:-45,		dgree2:135},
	{stnNo:107,	stnNm:"서대전네거리",		distance:0.8,	remainSec1:90,	pathId1:"line1_006",	remainSec2:90,	pathId2:"line1_007",	dgree1:-45,		dgree2:135},
	{stnNo:106,	stnNm:"중구청",		distance:0.7,	remainSec1:90,	pathId1:"line1_005",	remainSec2:90,	pathId2:"line1_006",	dgree1:-90,		dgree2:90},
	{stnNo:105,	stnNm:"중앙로",		distance:0.8,	remainSec1:90,	pathId1:"line1_004",	remainSec2:90,	pathId2:"line1_005",	dgree1:-90,		dgree2:90},
	{stnNo:104,	stnNm:"대전",			distance:1.0,	remainSec1:90,	pathId1:"line1_003",	remainSec2:90,	pathId2:"line1_004",	dgree1:-90,		dgree2:90},
	{stnNo:103,	stnNm:"대동",			distance:1.2,	remainSec1:90,	pathId1:"line1_002",	remainSec2:90,	pathId2:"line1_003",	dgree1:-90,		dgree2:90},
	{stnNo:102,	stnNm:"신흥",			distance:0.9,	remainSec1:90,	pathId1:"line1_001",	remainSec2:90,	pathId2:"line1_002",	dgree1:-90,		dgree2:90},
	{stnNo:101,	stnNm:"판암",			distance:0,		remainSec1:0,	pathId1:"",				remainSec2:90,	pathId2:"line1_001",	dgree1:-90,		dgree2:90},	
]];
