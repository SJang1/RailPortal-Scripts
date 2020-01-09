# RailPortal-Scripts


## Get Train Stations Info

### Request URL
GET http://visual.railportal.kr/RailContents/ext/js/korLines/subway_line_info_01.js

### cookie
JSESSIONID: JSESSIONID

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
JSESSIONID: JSESSIONID

### Parameter
paramAreCd: 01 (if Seoul)
paramAreCd: 02 (if Busan)
paramAreCd: 03 (if Daegu)
paramAreCd: 04 (if Gwangju)
paramAreCd: 05 (if Daejeon)

### Example Response
[examples/fnCrntTrnStnLoc_do_paramAreCd_01.json]
[examples/fnCrntTrnStnLoc_do_paramAreCd_02.json]


## Backup scripts
Under scripts folder