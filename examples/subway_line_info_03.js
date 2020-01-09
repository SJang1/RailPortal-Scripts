// 대구지역 열차 라인 오브젝트 배열 정보
//대구 1,2,3호선 데이터 정보
/* 대구1~3호선  각 개별 역사를 내림 차순으로 , 호선별 올림 차순으로 2차원 배열로 배치 시키고 
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
	{stnNo:146,	stnNm:"안심",			distance:0.9,	remainSec1:85,	pathId1:"line1_031",	remainSec2:0,	pathId2:"",				dgree1:90,	dgree2:-90},
	{stnNo:145,	stnNm:"각산",			distance:1,		remainSec1:80,	pathId1:"line1_030",	remainSec2:110,	pathId2:"line1_031",	dgree1:90,	dgree2:-90},
	{stnNo:144,	stnNm:"반야월",		distance:1,		remainSec1:85,	pathId1:"line1_029",	remainSec2:110,	pathId2:"line1_030",	dgree1:90,	dgree2:-90},
	{stnNo:143,	stnNm:"신기",			distance:1.1,	remainSec1:85,	pathId1:"line1_028",	remainSec2:110,	pathId2:"line1_029",	dgree1:90,	dgree2:-90},
	{stnNo:142,	stnNm:"율하",			distance:1.2,	remainSec1:100,	pathId1:"line1_027",	remainSec2:110,	pathId2:"line1_028",	dgree1:90,	dgree2:-90},
	{stnNo:141,	stnNm:"용계",			distance:1.1,	remainSec1:85,	pathId1:"line1_026",	remainSec2:110,	pathId2:"line1_027",	dgree1:90,	dgree2:-90},
	{stnNo:140,	stnNm:"방촌",			distance:1,		remainSec1:90,	pathId1:"line1_025",	remainSec2:110,	pathId2:"line1_026",	dgree1:90,	dgree2:-90},
	{stnNo:139,	stnNm:"혜안",			distance:1,		remainSec1:80,	pathId1:"line1_024",	remainSec2:110,	pathId2:"line1_025",	dgree1:90,	dgree2:-90},
	{stnNo:138,	stnNm:"동촌",			distance:1,		remainSec1:100,	pathId1:"line1_023",	remainSec2:110,	pathId2:"line1_024",	dgree1:90,	dgree2:-90},
	{stnNo:137,	stnNm:"아양교",		distance:0.8,	remainSec1:75,	pathId1:"line1_022",	remainSec2:110,	pathId2:"line1_023",	dgree1:90,	dgree2:-90},
	{stnNo:136,	stnNm:"큰고개",		distance:0.9,	remainSec1:70,	pathId1:"line1_021",	remainSec2:110,	pathId2:"line1_022",	dgree1:90,	dgree2:-90},
	{stnNo:135,	stnNm:"동대구역",		distance:0.9,	remainSec1:80,	pathId1:"line1_020",	remainSec2:110,	pathId2:"line1_021",	dgree1:90,	dgree2:-90},
	{stnNo:134,	stnNm:"신천",			distance:1.2,	remainSec1:95,	pathId1:"line1_019",	remainSec2:110,	pathId2:"line1_020",	dgree1:0,	dgree2:-180},
	{stnNo:133,	stnNm:"칠성시장",		distance:0.8,	remainSec1:75,	pathId1:"line1_018",	remainSec2:110,	pathId2:"line1_019",	dgree1:0,	dgree2:-180},
	{stnNo:132,	stnNm:"대구역",		distance:0.7,	remainSec1:80,	pathId1:"line1_017",	remainSec2:110,	pathId2:"line1_018",	dgree1:0,	dgree2:-180},
	{stnNo:131,	stnNm:"중앙로",		distance:0.7,	remainSec1:70,	pathId1:"line1_016",	remainSec2:110,	pathId2:"line1_017",	dgree1:0,	dgree2:-180},
	{stnNo:130,	stnNm:"반월당",		distance:0.8,	remainSec1:70,	pathId1:"line1_015",	remainSec2:110,	pathId2:"line1_016",	dgree1:0,	dgree2:-180},
	{stnNo:129,	stnNm:"명덕",			distance:0.7,	remainSec1:70,	pathId1:"line1_014",	remainSec2:70,	pathId2:"line1_015",	dgree1:0,	dgree2:-180},
	{stnNo:128,	stnNm:"교대",			distance:0.9,	remainSec1:85,	pathId1:"line1_013",	remainSec2:70,	pathId2:"line1_014",	dgree1:0,	dgree2:-180},
	{stnNo:127,	stnNm:"영대병원",		distance:0.7,	remainSec1:70,	pathId1:"line1_012",	remainSec2:85,	pathId2:"line1_013",	dgree1:45,	dgree2:-135},
	{stnNo:126,	stnNm:"현충로",		distance:0.7,	remainSec1:80,	pathId1:"line1_011",	remainSec2:70,	pathId2:"line1_012",	dgree1:45,	dgree2:-135},
	{stnNo:125,	stnNm:"안지랑",		distance:0.8,	remainSec1:70,	pathId1:"line1_010",	remainSec2:80,	pathId2:"line1_011",	dgree1:45,	dgree2:-135},
	{stnNo:124,	stnNm:"대명",			distance:0.8,	remainSec1:75,	pathId1:"line1_009",	remainSec2:70,	pathId2:"line1_010",	dgree1:45,	dgree2:-135},
	{stnNo:123,	stnNm:"성당못",		distance:0.8,	remainSec1:75,	pathId1:"line1_008",	remainSec2:75,	pathId2:"line1_009",	dgree1:90,	dgree2:-90},
	{stnNo:122,	stnNm:"송현",			distance:1,		remainSec1:80,	pathId1:"line1_007",	remainSec2:75,	pathId2:"line1_008",	dgree1:90,	dgree2:-90},
	{stnNo:121,	stnNm:"월촌",			distance:0.9,	remainSec1:80,	pathId1:"line1_006",	remainSec2:80,	pathId2:"line1_007",	dgree1:90,	dgree2:-90},
	{stnNo:120,	stnNm:"상인",			distance:0.7,	remainSec1:70,	pathId1:"line1_005",	remainSec2:80,	pathId2:"line1_006",	dgree1:90,	dgree2:-90},
	{stnNo:119,	stnNm:"월배",			distance:0.8,	remainSec1:70,	pathId1:"line1_004",	remainSec2:70,	pathId2:"line1_005",	dgree1:90,	dgree2:-90},
	{stnNo:118,	stnNm:"진천",			distance:1,		remainSec1:100,	pathId1:"line1_003",	remainSec2:70,	pathId2:"line1_004",	dgree1:90,	dgree2:-90},
	{stnNo:117,	stnNm:"대곡",			distance:1,		remainSec1:110,	pathId1:"line1_002",	remainSec2:100,	pathId2:"line1_003",	dgree1:90,	dgree2:-90},
	{stnNo:116,	stnNm:"화원",			distance:1.3,	remainSec1:110,	pathId1:"line1_001",	remainSec2:110,	pathId2:"line1_002",	dgree1:90,	dgree2:-90},
	{stnNo:115,	stnNm:"설화명곡",		distance:0,		remainSec1:0,	pathId1:"",				remainSec2:110,	pathId2:"line1_001",	dgree1:90,	dgree2:-90},
],
[
	{stnNo:244,	stnNm:"영남대",		distance:1.1,	remainSec1:100,	pathId1:"line2_028",	remainSec2:0,	pathId2:"",				dgree1:-270,	dgree2:-90},
	{stnNo:243,	stnNm:"임당",			distance:1.1,	remainSec1:90 ,	pathId1:"line2_027",	remainSec2:100,	pathId2:"line2_028",	dgree1:-270,	dgree2:-90},
	{stnNo:242,	stnNm:"정평",			distance:1.2,	remainSec1:95 ,	pathId1:"line2_026",	remainSec2:90,	pathId2:"line2_027",	dgree1:-270,	dgree2:-90},
	{stnNo:241,	stnNm:"사월",			distance:1.1,	remainSec1:90 ,	pathId1:"line2_025",	remainSec2:95,	pathId2:"line2_026",	dgree1:-270,	dgree2:-90},
	{stnNo:240,	stnNm:"신매",			distance:1.1,	remainSec1:90 ,	pathId1:"line2_024",	remainSec2:90,	pathId2:"line2_025",	dgree1:-270,	dgree2:-90},
	{stnNo:239,	stnNm:"고산",			distance:1.2,	remainSec1:100,	pathId1:"line2_023",	remainSec2:90,	pathId2:"line2_024",	dgree1:-235,	dgree2:-45},
	{stnNo:238,	stnNm:"대공원",		distance:1  ,	remainSec1:80 ,	pathId1:"line2_022",	remainSec2:100,	pathId2:"line2_023",	dgree1:-235,	dgree2:-45},
	{stnNo:237,	stnNm:"연호",			distance:1.8,	remainSec1:125,	pathId1:"line2_021",	remainSec2:80,	pathId2:"line2_022",	dgree1:-235,	dgree2:-45},
	{stnNo:236,	stnNm:"담티",			distance:0.9,	remainSec1:85 ,	pathId1:"line2_020",	remainSec2:125,	pathId2:"line2_021",	dgree1:-235,	dgree2:-45},
	{stnNo:235,	stnNm:"만촌",			distance:0.9,	remainSec1:80 ,	pathId1:"line2_019",	remainSec2:85,	pathId2:"line2_020",	dgree1:-235,	dgree2:-45},
	{stnNo:234,	stnNm:"수성구청",		distance:0.9,	remainSec1:80 ,	pathId1:"line2_018",	remainSec2:80,	pathId2:"line2_019",	dgree1:-270,	dgree2:-90},
	{stnNo:233,	stnNm:"범어",			distance:1  ,	remainSec1:85 ,	pathId1:"line2_017",	remainSec2:80,	pathId2:"line2_018",	dgree1:-270,	dgree2:-90},
	{stnNo:232,	stnNm:"대구은행",		distance:1.1,	remainSec1:100,	pathId1:"line2_016",	remainSec2:85,	pathId2:"line2_017",	dgree1:-270,	dgree2:-90},
	{stnNo:231,	stnNm:"경대병원",		distance:0.9,	remainSec1:85 ,	pathId1:"line2_015",	remainSec2:100,	pathId2:"line2_016",	dgree1:-270,	dgree2:-90},
	{stnNo:230,	stnNm:"반월당",		distance:1  ,	remainSec1:90 ,	pathId1:"line2_014",	remainSec2:85,	pathId2:"line2_015",	dgree1:-270,	dgree2:-90},
	{stnNo:229,	stnNm:"신남",			distance:0.9,	remainSec1:80 ,	pathId1:"line2_013",	remainSec2:90,	pathId2:"line2_014",	dgree1:-270,	dgree2:-90},
	{stnNo:228,	stnNm:"반고개",		distance:0.8,	remainSec1:75 ,	pathId1:"line2_012",	remainSec2:80,	pathId2:"line2_013",	dgree1:-270,	dgree2:-90},
	{stnNo:227,	stnNm:"내당",			distance:0.9,	remainSec1:75 ,	pathId1:"line2_011",	remainSec2:75,	pathId2:"line2_012",	dgree1:-270,	dgree2:-90},
	{stnNo:226,	stnNm:"두류",			distance:0.8,	remainSec1:80 ,	pathId1:"line2_010",	remainSec2:75,	pathId2:"line2_011",	dgree1:-270,	dgree2:-90},
	{stnNo:225,	stnNm:"감삼",			distance:0.9,	remainSec1:80 ,	pathId1:"line2_009",	remainSec2:80,	pathId2:"line2_010",	dgree1:-270,	dgree2:-90},
	{stnNo:224,	stnNm:"두류",			distance:0.9,	remainSec1:80 ,	pathId1:"line2_008",	remainSec2:80,	pathId2:"line2_009",	dgree1:-270,	dgree2:-90},
	{stnNo:223,	stnNm:"용산",			distance:1.3,	remainSec1:110,	pathId1:"line2_007",	remainSec2:80,	pathId2:"line2_008",	dgree1:-270,	dgree2:-90},
	{stnNo:222,	stnNm:"이곡",			distance:0.8,	remainSec1:75 ,	pathId1:"line2_006",	remainSec2:110,	pathId2:"line2_007",	dgree1:-270,	dgree2:-90},
	{stnNo:221,	stnNm:"성서산업단지",		distance:1.3,	remainSec1:100,	pathId1:"line2_005",	remainSec2:75,	pathId2:"line2_006",	dgree1:-270,	dgree2:-90},
	{stnNo:220,	stnNm:"계명대",		distance:1.2,	remainSec1:95 ,	pathId1:"line2_004",	remainSec2:100,	pathId2:"line2_005",	dgree1:-270,	dgree2:-90},
	{stnNo:219,	stnNm:"강창",			distance:1.4,	remainSec1:100,	pathId1:"line2_003",	remainSec2:95,	pathId2:"line2_004",	dgree1:-235,	dgree2:-45},
	{stnNo:218,	stnNm:"대실",			distance:1  ,	remainSec1:95 ,	pathId1:"line2_002",	remainSec2:100,	pathId2:"line2_003",	dgree1:-235,	dgree2:-45},
	{stnNo:217,	stnNm:"다사",			distance:2.9,	remainSec1:205,	pathId1:"line2_001",	remainSec2:95 ,	pathId2:"line2_002",	dgree1:-235,	dgree2:-45},
	{stnNo:216,	stnNm:"문양",			distance:0,		remainSec1:0  ,	pathId1:"",				remainSec2:205,	pathId2:"line2_001",	dgree1:-235,	dgree2:-45}
],
[
{stnNo:341,	stnNm:"용지",			distance:0.7,	remainSec1:85,	pathId1:"line3_029",	remainSec2:0,	pathId2:"",				dgree1:-180,	dgree2:0},
{stnNo:340,	stnNm:"범물",			distance:0.8,	remainSec1:75,	pathId1:"line3_028",	remainSec2:85,	pathId2:"line3_029",	dgree1:-180,	dgree2:0},
{stnNo:339,	stnNm:"지산",			distance:1.2,	remainSec1:105,	pathId1:"line3_027",	remainSec2:75,	pathId2:"line3_028",	dgree1:-180,	dgree2:0},
{stnNo:338,	stnNm:"수성못",		distance:0.8,	remainSec1:75,	pathId1:"line3_026",	remainSec2:105,	pathId2:"line3_027",	dgree1:-180,	dgree2:0},
{stnNo:337,	stnNm:"황금",			distance:0.7,	remainSec1:60,	pathId1:"line3_025",	remainSec2:75,	pathId2:"line3_026",	dgree1:-180,	dgree2:0},
{stnNo:336,	stnNm:"어린이회관",		distance:0.8,		remainSec1:70,	pathId1:"line3_024",	remainSec2:60,	pathId2:"line3_025",	dgree1:-180,	dgree2:0},
{stnNo:335,	stnNm:"수성구민운동장",	distance:1.0,	remainSec1:95,	pathId1:"line3_023",	remainSec2:70,	pathId2:"line3_024",	dgree1:-180,	dgree2:0},
{stnNo:334,	stnNm:"수성시장",		distance:0.8,	remainSec1:75,	pathId1:"line3_022",	remainSec2:95,	pathId2:"line3_023",	dgree1:-270,	dgree2:-90},
{stnNo:333,	stnNm:"대봉교",		distance:0.7,	remainSec1:60,	pathId1:"line3_021",	remainSec2:75,	pathId2:"line3_022",	dgree1:-270,	dgree2:-90},
{stnNo:332,	stnNm:"건들바위",		distance:1.0,	remainSec1:95,	pathId1:"line3_020",	remainSec2:60,	pathId2:"line3_021",	dgree1:-270,	dgree2:-90},
{stnNo:331,	stnNm:"명덕",			distance:0.6,	remainSec1:80,	pathId1:"line3_019",	remainSec2:95,	pathId2:"line3_020",	dgree1:-270,	dgree2:-90},
{stnNo:330,	stnNm:"남산",			distance:0.8,	remainSec1:95,	pathId1:"line3_018",	remainSec2:80,	pathId2:"line3_019",	dgree1:-180,	dgree2:0},
{stnNo:329,	stnNm:"신남",			distance:0.7,	remainSec1:60,	pathId1:"line3_017",	remainSec2:95,	pathId2:"line3_018",	dgree1:-180,	dgree2:0},
{stnNo:328,	stnNm:"서문시장",		distance:0.7,	remainSec1:60,	pathId1:"line3_016",	remainSec2:60,	pathId2:"line3_017",	dgree1:-180,	dgree2:0},
{stnNo:327,	stnNm:"달성공원",		distance:1.0,	remainSec1:95,	pathId1:"line3_015",	remainSec2:60,	pathId2:"line3_016",	dgree1:-180,	dgree2:0},
{stnNo:326,	stnNm:"북구청",		distance:0.8,		remainSec1:85,	pathId1:"line3_014",	remainSec2:95,	pathId2:"line3_015",	dgree1:-270,	dgree2:-90},
{stnNo:325,	stnNm:"원대",			distance:0.6,		remainSec1:60,	pathId1:"line3_013",	remainSec2:85,	pathId2:"line3_014",	dgree1:-270,	dgree2:-90},
{stnNo:324,	stnNm:"팔달시장",		distance:0.6,		remainSec1:60,	pathId1:"line3_012",	remainSec2:60,	pathId2:"line3_013",	dgree1:-270,	dgree2:-90},
{stnNo:323,	stnNm:"만평",			distance:0.8,		remainSec1:75,	pathId1:"line3_011", 	remainSec2:60,	pathId2:"line3_012",	dgree1:-180,	dgree2:0},
{stnNo:322,	stnNm:"공단",			distance:0.9,		remainSec1:80,	pathId1:"line3_010",	remainSec2:75,	pathId2:"line3_011",	dgree1:-180,	dgree2:0},
{stnNo:321,	stnNm:"팔달",			distance:0.8,		remainSec1:70,	pathId1:"line3_009", 	remainSec2:80,	pathId2:"line3_010",	dgree1:-180,	dgree2:0},
{stnNo:320,	stnNm:"매천시장",		distance:1.1,		remainSec1:100,	pathId1:"line3_008", 	remainSec2:70,	pathId2:"line3_009",	dgree1:-180,	dgree2:0},
{stnNo:319,	stnNm:"매천",			distance:0.9,		remainSec1:85,	pathId1:"line3_007", 	remainSec2:100,	pathId2:"line3_008",	dgree1:-180,	dgree2:0},
{stnNo:318,	stnNm:"태전",			distance:0.7,		remainSec1:65,	pathId1:"line3_006", 	remainSec2:85,	pathId2:"line3_007",	dgree1:-180,	dgree2:0},
{stnNo:317,	stnNm:"구암",			distance:0.7,		remainSec1:65,	pathId1:"line3_005", 	remainSec2:65,	pathId2:"line3_006",	dgree1:-180,	dgree2:0},
{stnNo:316,	stnNm:"칠곡운암",		distance:0.8,		remainSec1:65,	pathId1:"line3_004", 	remainSec2:65,	pathId2:"line3_005",	dgree1:-180,	dgree2:0},
{stnNo:315,	stnNm:"동천",			distance:0.7,		remainSec1:65,	pathId1:"line3_003", 	remainSec2:65,	pathId2:"line3_004",	dgree1:-180,	dgree2:0},
{stnNo:314,	stnNm:"팔거",			distance:0.8,		remainSec1:70,	pathId1:"line3_002", 	remainSec2:65,	pathId2:"line3_003",	dgree1:-180,	dgree2:0},
{stnNo:313,	stnNm:"학정",			distance:0.8,		remainSec1:70,	pathId1:"line3_001", 	remainSec2:70,	pathId2:"line3_002",	dgree1:-180,	dgree2:0},
{stnNo:312,	stnNm:"칠곡경대병원",		distance:0,		remainSec1:0,	pathId1:"",				remainSec2:70,	pathId2:"line3_001",	dgree1:-180,	dgree2:0}
]]; 