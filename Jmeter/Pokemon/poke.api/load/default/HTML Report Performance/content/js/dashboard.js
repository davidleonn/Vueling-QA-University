/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 94.59106038991916, "KoPercent": 5.408939610080837};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9375891583452212, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/contest-type/cool/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/impish"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/tough/"], "isController": false}, {"data": [0.7995720399429387, 500, 1500, "/api/v2/super-contest-effect/${superrEffect}/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/bold"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/defense"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/fire"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/evasion"], "isController": false}, {"data": [0.9261363636363636, 500, 1500, "/api/v2/pokedex/national"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.9964539007092199, 500, 1500, "/api/v2/type/poison"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty/"], "isController": false}, {"data": [0.9964285714285714, 500, 1500, "/api/v2/type/fairy"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/speed"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/smart/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/attack"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.9771428571428571, 500, 1500, "/api/v2/pokedex/kanto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.9326241134751773, 500, 1500, "/api/v2/pokemon/crobat"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute/"], "isController": false}, {"data": [0.925, 500, 1500, "/api/v2/pokemon/jolteon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/ghost"], "isController": false}, {"data": [0.9321428571428572, 500, 1500, "/api/v2/pokemon/togekiss"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/1"], "isController": false}, {"data": [0.9892857142857143, 500, 1500, "/api/v2/nature/modest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/hasty"], "isController": false}, {"data": [0.9885714285714285, 500, 1500, "/api/v2/generation/3"], "isController": false}, {"data": [0.9971428571428571, 500, 1500, "/api/v2/generation/2"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/pokedex/digiworld"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/naughty"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/electric"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/hp"], "isController": false}, {"data": [0.9914285714285714, 500, 1500, "/api/v2/generation/4"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.9628571428571429, 500, 1500, "/api/v2/pokedex/hoenn"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/5"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/pokemon/agumon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/4"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/2"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/1"], "isController": false}, {"data": [0.9285714285714286, 500, 1500, "/api/v2/pokemon/arcanine"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 8412, 455, 5.408939610080837, 54.82144555397061, 17, 2023, 25.0, 71.0, 153.34999999999945, 819.5700000000088, 20.027188598882457, 411.8769482471746, 2.7530093160234173], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/contest-type/cool/", 141, 0, 0.0, 28.66666666666666, 19, 116, 22.0, 46.8, 62.70000000000002, 108.44000000000023, 0.33619857175216683, 0.5779810053767928, 0.04596464848174156], "isController": false}, {"data": ["/api/v2/nature/impish", 140, 0, 0.0, 30.45714285714285, 19, 151, 22.0, 57.2000000000001, 98.94999999999999, 140.75000000000009, 0.33619822247196945, 1.0129425434236026, 0.044323007845425665], "isController": false}, {"data": ["/api/v2/contest-type/tough/", 140, 0, 0.0, 29.392857142857128, 19, 102, 23.0, 53.70000000000002, 62.0, 92.98000000000008, 0.33427886497999104, 0.5743879040595781, 0.04602863277556517], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 701, 140, 19.971469329529246, 33.1982881597718, 18, 644, 23.0, 48.0, 99.89999999999998, 179.98000000000002, 1.6715031367508935, 4.357056415317264, 0.310142183576826], "isController": false}, {"data": ["/api/v2/berry/razz", 233, 0, 0.0, 78.27896995708156, 21, 364, 60.0, 225.2, 272.0999999999999, 352.5199999999999, 0.5568860271798622, 1.0566181340792737, 0.07178608944115411], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 233, 0, 0.0, 28.686695278969953, 18, 82, 23.0, 46.599999999999994, 63.29999999999998, 81.66, 0.5571363668970135, 2.2877356023289734, 0.07508283069510534], "isController": false}, {"data": ["/api/v2/nature/bold", 141, 0, 0.0, 32.4822695035461, 18, 170, 22.0, 40.19999999999999, 111.60000000000002, 169.16000000000003, 0.3370705935789247, 1.0090476597798284, 0.04377967670507518], "isController": false}, {"data": ["/api/v2/stat/defense", 140, 0, 0.0, 38.74285714285715, 19, 353, 23.0, 97.80000000000001, 151.95, 281.25000000000057, 0.3347248322789501, 2.2269544754802104, 0.043801882349003236], "isController": false}, {"data": ["/api/v2/type/fire", 140, 0, 0.0, 39.27142857142857, 22, 192, 26.0, 95.50000000000003, 130.84999999999997, 192.0, 0.3358079178709778, 5.6271929643743785, 0.042959801993259855], "isController": false}, {"data": ["/api/v2/stat/evasion", 140, 0, 0.0, 25.571428571428577, 18, 96, 22.0, 30.900000000000006, 63.94999999999999, 91.90000000000003, 0.33655221487416553, 0.8178998225288052, 0.044041012493299], "isController": false}, {"data": ["/api/v2/pokedex/national", 176, 0, 0.0, 170.3068181818182, 34, 1652, 45.0, 669.1000000000006, 1045.9, 1528.0299999999984, 0.41960309361917203, 47.81029460652077, 0.05654807316352123], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 234, 0, 0.0, 31.23931623931624, 19, 93, 23.0, 60.0, 69.0, 90.20000000000005, 0.5586058725232752, 1.5309674519575078, 0.07691741018142756], "isController": false}, {"data": ["/api/v2/type/poison", 141, 0, 0.0, 42.40425531914896, 22, 649, 27.0, 81.0, 139.80000000000007, 464.62000000000546, 0.33717134760931167, 5.238761515537382, 0.04379276292191255], "isController": false}, {"data": ["/api/v2/contest-type/beauty/", 140, 0, 0.0, 28.464285714285708, 19, 126, 22.0, 45.900000000000006, 61.89999999999998, 112.06000000000012, 0.33571289832934875, 0.5765100935679807, 0.04655393707301515], "isController": false}, {"data": ["/api/v2/type/fairy", 140, 0, 0.0, 50.04285714285714, 21, 695, 25.0, 162.90000000000006, 178.89999999999998, 553.1400000000012, 0.3345832407254721, 4.20117149691347, 0.043129870874767884], "isController": false}, {"data": ["/api/v2/stat/speed", 141, 0, 0.0, 30.21985815602836, 19, 145, 23.0, 45.39999999999999, 79.9, 140.80000000000013, 0.33728749093988386, 2.0224961860798345, 0.043478465628969405], "isController": false}, {"data": ["/api/v2/contest-type/smart/", 140, 0, 0.0, 26.335714285714275, 19, 98, 22.0, 38.0, 50.0, 85.2900000000001, 0.3348064818534887, 0.5751824022723795, 0.04610128314584171], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 233, 0, 0.0, 33.81545064377682, 19, 97, 23.0, 66.19999999999999, 75.29999999999998, 91.29999999999998, 0.5571097243143724, 1.427392859491189, 0.07671139758625636], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 234, 0, 0.0, 34.217948717948715, 19, 108, 24.0, 64.0, 70.75, 99.10000000000008, 0.5578880361625886, 1.3071240134143463, 0.07954263015599407], "isController": false}, {"data": ["/api/v2/stat/attack", 140, 0, 0.0, 30.921428571428578, 19, 131, 24.0, 60.0, 76.0, 128.13000000000002, 0.3359876356550079, 2.1929239878972453, 0.0436390190840977], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 234, 0, 0.0, 29.705128205128194, 19, 359, 23.0, 46.5, 63.25, 88.95000000000002, 0.5578614358018305, 2.245084032348811, 0.0762701181760315], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 234, 0, 0.0, 30.11111111111111, 18, 95, 23.0, 59.0, 64.25, 87.60000000000002, 0.5586365448568434, 2.248077523354111, 0.07637609011714656], "isController": false}, {"data": ["/api/v2/pokedex/kanto", 175, 0, 0.0, 85.60000000000002, 21, 1243, 26.0, 187.0, 405.199999999998, 1170.8000000000009, 0.4191074687345828, 7.879856557475201, 0.05525342605387567], "isController": false}, {"data": ["/api/v2/berry/iapapa", 234, 0, 0.0, 77.48290598290599, 20, 331, 61.0, 218.0, 264.5, 301.6500000000001, 0.5576580269391724, 1.0466048843932012, 0.07297478086899326], "isController": false}, {"data": ["/api/v2/pokemon/crobat", 141, 0, 0.0, 197.5177304964538, 44, 1436, 57.0, 984.8, 1132.8000000000002, 1401.140000000001, 0.3362001750148429, 63.98991602521382, 0.044651585744158825], "isController": false}, {"data": ["/api/v2/contest-type/cute/", 140, 0, 0.0, 27.892857142857142, 19, 98, 22.0, 46.70000000000002, 60.94999999999999, 92.26000000000005, 0.3352466337646042, 0.575512957282395, 0.04583450071000448], "isController": false}, {"data": ["/api/v2/pokemon/jolteon", 140, 0, 0.0, 199.17857142857133, 49, 1788, 60.0, 881.3000000000001, 1018.8, 1740.4400000000005, 0.3358369175928169, 72.84570503188651, 0.04493130635763273], "isController": false}, {"data": ["/api/v2/type/ghost", 140, 0, 0.0, 36.52857142857142, 21, 311, 26.0, 67.70000000000002, 103.5499999999999, 244.17000000000056, 0.3363007874242723, 5.18689306340591, 0.0433512733789101], "isController": false}, {"data": ["/api/v2/pokemon/togekiss", 140, 0, 0.0, 161.94285714285715, 39, 1840, 49.0, 628.3000000000001, 857.3499999999995, 1749.8000000000006, 0.3354080718348259, 48.6564155328676, 0.04520147843086521], "isController": false}, {"data": ["/api/v2/generation/1", 176, 0, 0.0, 45.44886363636362, 21, 381, 27.0, 105.90000000000003, 182.20000000000005, 255.48999999999833, 0.4196040940008535, 10.213065489530162, 0.054909129488392945], "isController": false}, {"data": ["/api/v2/nature/modest", 140, 0, 0.0, 58.40714285714285, 19, 1010, 22.0, 164.8, 179.95, 923.9000000000008, 0.33446334162324615, 1.006390302892391, 0.04409428820228343], "isController": false}, {"data": ["/api/v2/nature/hasty", 140, 0, 0.0, 32.17142857142857, 19, 168, 22.0, 55.800000000000125, 113.0, 167.18, 0.33668981008289783, 1.0294309731778468, 0.04405901811631671], "isController": false}, {"data": ["/api/v2/generation/3", 175, 0, 0.0, 64.54285714285717, 22, 1896, 27.0, 129.20000000000005, 182.0, 1443.8000000000054, 0.41850810231686086, 10.512493812058773, 0.054765708701620466], "isController": false}, {"data": ["/api/v2/generation/2", 175, 0, 0.0, 53.53142857142865, 21, 777, 25.0, 174.8, 201.39999999999998, 564.2000000000025, 0.4190873952880208, 6.352955647531934, 0.054841514617768344], "isController": false}, {"data": ["/api/v2/pokedex/digiworld", 175, 175, 100.0, 49.28571428571427, 17, 577, 21.0, 157.8, 192.99999999999994, 506.32000000000085, 0.41778174604121954, 0.40460250379584556, 0.056710608105204605], "isController": false}, {"data": ["/api/v2/nature/naughty", 140, 0, 0.0, 33.95714285714288, 18, 166, 22.0, 91.80000000000001, 108.49999999999989, 166.0, 0.33570404331541315, 1.012685341602843, 0.04458569325282831], "isController": false}, {"data": ["/api/v2/type/electric", 140, 0, 0.0, 38.17857142857142, 23, 191, 26.0, 76.70000000000002, 123.94999999999999, 186.90000000000003, 0.3368032082911327, 5.526744242168724, 0.04440276671806925], "isController": false}, {"data": ["/api/v2/stat/hp", 140, 0, 0.0, 27.607142857142847, 18, 114, 21.0, 34.70000000000002, 78.69999999999993, 113.59, 0.3370042727327436, 0.7778320018655593, 0.042454639826683516], "isController": false}, {"data": ["/api/v2/generation/4", 175, 0, 0.0, 56.09142857142855, 21, 1627, 26.0, 111.00000000000006, 184.39999999999998, 916.4000000000085, 0.4178296257917871, 8.585783257447515, 0.05467692368759714], "isController": false}, {"data": ["/api/v2/berry/pinap", 234, 0, 0.0, 77.52991452991455, 21, 361, 61.0, 207.0, 263.5, 342.35000000000014, 0.5583832656830531, 1.0500679560189659, 0.07252438899984967], "isController": false}, {"data": ["/api/v2/pokedex/hoenn", 175, 0, 0.0, 119.68000000000005, 22, 2023, 26.0, 199.40000000000003, 874.9999999999998, 1623.2400000000048, 0.4185301222107957, 10.141031572118719, 0.055177311033649826], "isController": false}, {"data": ["/api/v2/contest-type/5", 140, 0, 0.0, 28.771428571428586, 18, 195, 22.0, 37.0, 69.64999999999992, 177.37000000000015, 0.33425571995100767, 0.5746792189637595, 0.0443933378059932], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 140, 140, 100.0, 50.549999999999976, 18, 620, 21.0, 142.9, 181.84999999999997, 606.8800000000001, 0.3343275598147825, 0.32375389103548413, 0.04440287903790081], "isController": false}, {"data": ["/api/v2/contest-type/4", 140, 0, 0.0, 28.20714285714285, 19, 167, 22.0, 37.900000000000006, 67.94999999999999, 133.38000000000028, 0.3348136881401817, 0.5751901113972971, 0.04446744295611789], "isController": false}, {"data": ["/api/v2/contest-type/3", 140, 0, 0.0, 30.335714285714285, 18, 199, 22.0, 47.70000000000002, 67.74999999999994, 187.5200000000001, 0.33526108456960857, 0.58145675057174, 0.04452686279440114], "isController": false}, {"data": ["/api/v2/contest-type/2", 140, 0, 0.0, 28.271428571428576, 18, 156, 23.0, 42.70000000000002, 63.0, 151.08000000000004, 0.33572336394810676, 0.5809822081604757, 0.04458825927435793], "isController": false}, {"data": ["/api/v2/contest-type/1", 141, 0, 0.0, 24.957446808510646, 18, 61, 22.0, 33.0, 41.900000000000006, 61.0, 0.3362073898861187, 0.5758096435784388, 0.044652543969250134], "isController": false}, {"data": ["/api/v2/pokemon/arcanine", 140, 0, 0.0, 177.83571428571423, 41, 1547, 56.0, 656.5, 1049.7999999999995, 1533.0600000000002, 0.3349226209130469, 62.82440489184392, 0.045136056333984834], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 455, 100.0, 5.408939610080837], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 8412, 455, "404/Not Found", 455, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 701, 140, "404/Not Found", 140, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/pokedex/digiworld", 175, 175, "404/Not Found", 175, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 140, 140, "404/Not Found", 140, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
