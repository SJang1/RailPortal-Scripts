# RailPortal-Scripts
Scripts used in http://visual.railportal.kr/RailContents/korLines/basic/index.do?gbvMreaWideCd=01 (Not made by me)

## Get Train Stations Info

### Request URL
GET http://visual.railportal.kr/RailContents/ext/js/korLines/subway_line_info_01.js

### cookie
JSESSIONID: JSESSIONID (not required)

### info_(code)
01 (if Seoul)
02 (if Busan)
03 (if Daegu)
04 (if Gwangju)
05 (if Daejeon)

### Example Response
[examples/subway_line_info_01.js]
[examples/subway_line_info_02.js]
[examples/subway_line_info_03.js]
[examples/subway_line_info_04.js]
[examples/subway_line_info_05.js]


## Get Train Status

### Request URL
GET http://visual.railportal.kr/RailContents/korLines/TrainLocStatus/fnCrntTrnStnLoc.do?paramAreCd=01

### cookie
JSESSIONID: JSESSIONID (not required)

### Parameter
paramAreCd: 01 (if Seoul)
paramAreCd: 02 (if Busan)
paramAreCd: 03 (if Daegu)
paramAreCd: 04 (if Gwangju)
paramAreCd: 05 (if Daejeon)

### Example Response
[examples/fnCrntTrnStnLoc_do_paramAreCd_01.json]
[examples/fnCrntTrnStnLoc_do_paramAreCd_02.json]


## Get Line info

### Request URL
POST http://visual.railportal.kr/RailContents/altmInfoSys/getLnList.do

### cookie
JSESSIONID: JSESSIONID (not required)

### Parameter
areCd: 01 (if Seoul)
areCd: 02 (if Busan)
areCd: 03 (if Daegu)
areCd: 04 (if Gwangju)
areCd: 05 (if Daejeon)

### Example Response
(Not Ready)



## Get Station Status

### Request URL
POST http://visual.railportal.kr/RailContents/altmInfoSys/getRunTimeInfo.do

### cookie
JSESSIONID: JSESSIONID (not required)

### Parameter
areCd: 01 (if Seoul)
areCd: 02 (if Busan)
areCd: 03 (if Daegu)
areCd: 04 (if Gwangju)
areCd: 05 (if Daejeon)
railOprIsttCd: Railway-Company-Code
lnCd: Line-Number-Code
prprStinCd: Station-Number-Code
Example Request: areCd=01&railOprIsttCd=KR&lnCd=1&prprStinCd=0324

### Example Response
(Not Ready))


## Get Timetable of the Station

### Request URL
POST http://visual.railportal.kr/RailContents/altmInfoSys/getStinTimetable.do

### cookie
JSESSIONID: JSESSIONID (not required)

### Parameter
dayCd: 8 (Week)
dayCd: 7 (Saturday)
dayCd: 9 (Sunday/Holiday)
areCd: 01 (if Seoul)
areCd: 02 (if Busan)
areCd: 03 (if Daegu)
areCd: 04 (if Gwangju)
areCd: 05 (if Daejeon)
railOprIsttCd: Railway-Company-Code
lnCd: Line-Number-Code
prprStinCd: Station-Number-Code
Example Request: dayCd=8&areCd=03&railOprIsttCd=DG&lnCd=1&prprStinCd=0790

## Backup scripts
Under scripts folder
