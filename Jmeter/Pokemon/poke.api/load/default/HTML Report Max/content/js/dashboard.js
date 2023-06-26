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

    var data = {"OkPercent": 94.57896967128761, "KoPercent": 5.4210303287123915};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9050638658514438, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/contest-type/cool/"], "isController": false}, {"data": [0.9981481481481481, 500, 1500, "/api/v2/nature/impish"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/tough/"], "isController": false}, {"data": [0.7997467438494935, 500, 1500, "/api/v2/super-contest-effect/${superrEffect}/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/bold"], "isController": false}, {"data": [0.9990859232175503, 500, 1500, "/api/v2/stat/defense"], "isController": false}, {"data": [0.9990689013035382, 500, 1500, "/api/v2/type/fire"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/evasion"], "isController": false}, {"data": [0.6297101449275362, 500, 1500, "/api/v2/pokedex/national"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.9990740740740741, 500, 1500, "/api/v2/type/poison"], "isController": false}, {"data": [0.9991007194244604, 500, 1500, "/api/v2/contest-type/beauty/"], "isController": false}, {"data": [0.9963503649635036, 500, 1500, "/api/v2/type/fairy"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/speed"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/smart/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/attack"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.9956458635703919, 500, 1500, "/api/v2/pokedex/kanto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.509090909090909, 500, 1500, "/api/v2/pokemon/crobat"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute/"], "isController": false}, {"data": [0.5, 500, 1500, "/api/v2/pokemon/jolteon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/ghost"], "isController": false}, {"data": [0.5409090909090909, 500, 1500, "/api/v2/pokemon/togekiss"], "isController": false}, {"data": [0.9978292329956585, 500, 1500, "/api/v2/generation/1"], "isController": false}, {"data": [0.9954379562043796, 500, 1500, "/api/v2/nature/modest"], "isController": false}, {"data": [0.9990723562152134, 500, 1500, "/api/v2/nature/hasty"], "isController": false}, {"data": [0.9942112879884226, 500, 1500, "/api/v2/generation/3"], "isController": false}, {"data": [0.9992764109985528, 500, 1500, "/api/v2/generation/2"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/pokedex/digiworld"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/naughty"], "isController": false}, {"data": [0.9990706319702602, 500, 1500, "/api/v2/type/electric"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/hp"], "isController": false}, {"data": [0.9985507246376811, 500, 1500, "/api/v2/generation/4"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.9941944847605225, 500, 1500, "/api/v2/pokedex/hoenn"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/5"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/pokemon/agumon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/4"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/2"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/1"], "isController": false}, {"data": [0.5091074681238615, 500, 1500, "/api/v2/pokemon/arcanine"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 33038, 1791, 5.4210303287123915, 162.46346631151965, 20, 5349, 91.0, 209.0, 764.0, 1122.0, 544.6063563233548, 11175.165087098609, 74.88491295290453], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/contest-type/cool/", 556, 0, 0.0, 76.435251798561, 25, 162, 76.0, 101.30000000000001, 111.0, 145.28999999999985, 9.28740854575218, 15.960156067300304, 1.2697628871145559], "isController": false}, {"data": ["/api/v2/nature/impish", 540, 0, 0.0, 87.80925925925922, 29, 626, 86.0, 112.0, 128.94999999999993, 162.59000000000003, 9.194619444917418, 27.70803624638175, 1.2121812744764175], "isController": false}, {"data": ["/api/v2/contest-type/tough/", 555, 0, 0.0, 76.01261261261266, 22, 198, 76.0, 101.0, 110.0, 152.87999999999988, 9.270859433725883, 15.93119023010106, 1.2765538868704585], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 2764, 553, 20.00723589001447, 82.68523878437051, 23, 593, 81.0, 111.0, 123.0, 152.69999999999982, 46.23078595681336, 120.47683011670597, 8.577977863080603], "isController": false}, {"data": ["/api/v2/berry/razz", 929, 0, 0.0, 81.4327233584499, 25, 420, 78.0, 109.0, 133.0, 192.70000000000005, 15.450372538584352, 29.331745271545703, 1.9916495850518894], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 927, 0, 0.0, 86.81445523193094, 20, 266, 87.0, 112.0, 121.0, 155.48000000000025, 15.475534632143036, 63.544431645548485, 2.085570096909901], "isController": false}, {"data": ["/api/v2/nature/bold", 541, 0, 0.0, 82.60628465804061, 25, 230, 82.0, 111.0, 119.0, 147.9600000000005, 9.188023301234693, 27.498491395781322, 1.1933663076798968], "isController": false}, {"data": ["/api/v2/stat/defense", 547, 0, 0.0, 109.91042047531997, 41, 689, 107.0, 138.0, 152.60000000000002, 188.67999999999984, 9.287242351183401, 61.784465437069166, 1.2153227295493905], "isController": false}, {"data": ["/api/v2/type/fire", 537, 0, 0.0, 138.72253258845433, 59, 542, 137.0, 167.2, 182.09999999999997, 241.48000000000002, 9.171021621067732, 153.72021712863338, 1.1732459300389384], "isController": false}, {"data": ["/api/v2/stat/evasion", 538, 0, 0.0, 85.131970260223, 27, 198, 84.0, 112.0, 125.0, 152.44000000000005, 9.200827732457716, 22.363520075504933, 1.2040145665520838], "isController": false}, {"data": ["/api/v2/pokedex/national", 690, 0, 0.0, 592.6449275362311, 121, 4248, 568.5, 753.0, 807.4499999999999, 1074.8100000000004, 11.490998717671157, 1309.3232241514982, 1.5485916240611521], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 928, 0, 0.0, 80.59806034482766, 24, 238, 80.0, 107.0, 117.09999999999991, 153.42000000000007, 15.50309894919728, 42.487361575744664, 2.1347040545281413], "isController": false}, {"data": ["/api/v2/type/poison", 540, 0, 0.0, 138.55000000000007, 47, 530, 135.0, 162.90000000000003, 180.94999999999993, 276.3600000000001, 9.20166993269149, 142.97182853902189, 1.1951387705546561], "isController": false}, {"data": ["/api/v2/contest-type/beauty/", 556, 0, 0.0, 77.27697841726624, 21, 591, 77.0, 101.0, 109.29999999999995, 138.28999999999985, 9.290046617320256, 15.956889943858712, 1.2882681832612075], "isController": false}, {"data": ["/api/v2/type/fairy", 548, 0, 0.0, 137.99087591240885, 43, 1988, 129.0, 164.10000000000002, 176.54999999999995, 299.7499999999998, 9.286404229719883, 116.60243296800596, 1.1970755452373285], "isController": false}, {"data": ["/api/v2/stat/speed", 538, 0, 0.0, 99.54460966542753, 51, 408, 97.0, 123.0, 133.0999999999999, 181.44000000000005, 9.189512340934325, 55.09677384917585, 1.1845855751985652], "isController": false}, {"data": ["/api/v2/contest-type/smart/", 555, 0, 0.0, 76.36036036036036, 23, 157, 76.0, 101.40000000000003, 109.19999999999993, 132.75999999999976, 9.272718159490752, 15.924088887566203, 1.276809824695504], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 928, 0, 0.0, 79.61745689655176, 21, 198, 80.0, 105.0, 117.0, 150.71000000000004, 15.49636803874092, 39.71725429468982, 2.133777239709443], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 928, 0, 0.0, 79.54310344827576, 21, 171, 80.0, 106.0, 115.0, 148.84000000000015, 15.497144383955112, 36.30631452794663, 2.2095537891186], "isController": false}, {"data": ["/api/v2/stat/attack", 537, 0, 0.0, 101.56424581005591, 41, 194, 100.0, 127.19999999999999, 136.19999999999993, 173.86, 9.169768792049451, 59.85198179386804, 1.1909953606861106], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 928, 0, 0.0, 87.62715517241386, 25, 197, 87.0, 114.0, 125.0, 161.71000000000004, 15.474919957310567, 62.27510792214181, 2.1157117129135536], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 928, 0, 0.0, 86.88469827586198, 23, 186, 86.0, 114.0, 124.0, 158.1300000000001, 15.481632244503018, 62.293436389551566, 2.1166294084281474], "isController": false}, {"data": ["/api/v2/pokedex/kanto", 689, 0, 0.0, 161.09724238026112, 56, 1025, 148.0, 200.0, 225.5, 483.40000000000464, 11.528679472592197, 216.78202165496785, 1.5198942664061976], "isController": false}, {"data": ["/api/v2/berry/iapapa", 929, 0, 0.0, 81.00322927879448, 24, 248, 77.0, 110.0, 135.0, 189.20000000000027, 15.452171454233962, 28.996926510703414, 2.022061498893897], "isController": false}, {"data": ["/api/v2/pokemon/crobat", 550, 0, 0.0, 913.0636363636369, 156, 3273, 898.0, 1189.8000000000004, 1297.8999999999999, 1484.9, 9.145783793671118, 1740.7430280287094, 1.2146744100969453], "isController": false}, {"data": ["/api/v2/contest-type/cute/", 555, 0, 0.0, 77.02342342342351, 23, 160, 78.0, 102.0, 111.39999999999986, 133.43999999999994, 9.271478926178983, 15.913820141661517, 1.2675850094385326], "isController": false}, {"data": ["/api/v2/pokemon/jolteon", 550, 0, 0.0, 996.3436363636363, 346, 2365, 987.0, 1284.8000000000002, 1378.8999999999999, 1636.470000000001, 9.138793346958444, 1982.2732884753584, 1.2226705942708074], "isController": false}, {"data": ["/api/v2/type/ghost", 540, 0, 0.0, 141.07592592592593, 64, 431, 139.0, 171.0, 186.0, 253.2100000000006, 9.213444804640847, 142.10154050609964, 1.187670619348234], "isController": false}, {"data": ["/api/v2/pokemon/togekiss", 550, 0, 0.0, 730.0854545454547, 248, 2541, 712.0, 955.9000000000001, 1038.7999999999997, 1609.1900000000012, 9.160407055178961, 1328.8730890662214, 1.2345079820456022], "isController": false}, {"data": ["/api/v2/generation/1", 691, 0, 0.0, 172.10709117221413, 43, 554, 168.0, 208.0, 229.39999999999998, 337.48000000000025, 11.547845850462917, 281.0702503530365, 1.5111438905879206], "isController": false}, {"data": ["/api/v2/nature/modest", 548, 0, 0.0, 96.16240875912415, 43, 2202, 87.0, 124.0, 145.54999999999995, 245.609999999999, 9.214420231369385, 27.729599906258407, 1.2147917297215496], "isController": false}, {"data": ["/api/v2/nature/hasty", 539, 0, 0.0, 84.15955473098325, 38, 708, 82.0, 112.0, 120.0, 159.60000000000036, 9.193402582339798, 28.10834002264238, 1.203042916048372], "isController": false}, {"data": ["/api/v2/generation/3", 691, 0, 0.0, 176.48335745296677, 32, 803, 169.0, 209.80000000000007, 235.39999999999998, 566.2400000000001, 11.545916321347415, 290.020819670248, 1.5108913936138217], "isController": false}, {"data": ["/api/v2/generation/2", 691, 0, 0.0, 139.39652677279298, 35, 578, 136.0, 168.80000000000007, 184.79999999999995, 308.5600000000003, 11.558663142752, 175.21619240009537, 1.5125594346960625], "isController": false}, {"data": ["/api/v2/pokedex/digiworld", 689, 689, 100.0, 81.68795355587812, 23, 532, 79.0, 110.0, 135.0, 187.10000000000002, 11.535821320340885, 11.171173893297839, 1.56589762063221], "isController": false}, {"data": ["/api/v2/nature/naughty", 538, 0, 0.0, 83.25464684014872, 37, 172, 84.0, 114.10000000000002, 121.0, 162.44000000000005, 9.116944298520615, 27.50175814678619, 1.2108441646472692], "isController": false}, {"data": ["/api/v2/type/electric", 538, 0, 0.0, 136.16542750929375, 69, 535, 134.0, 160.10000000000002, 173.0, 261.4900000000001, 9.195480882629429, 150.89825990372947, 1.2122948429247782], "isController": false}, {"data": ["/api/v2/stat/hp", 537, 0, 0.0, 84.02979515828679, 26, 197, 83.0, 108.19999999999999, 118.0, 156.24, 9.204820103189977, 21.24508462927887, 1.1595915950307685], "isController": false}, {"data": ["/api/v2/generation/4", 690, 0, 0.0, 160.54637681159417, 31, 989, 155.0, 196.0, 213.44999999999993, 340.91000000000315, 11.531326771061384, 236.95198779601247, 1.5089822141818607], "isController": false}, {"data": ["/api/v2/berry/pinap", 929, 0, 0.0, 81.23466092572646, 22, 247, 77.0, 110.0, 136.5, 198.50000000000023, 15.473275704125651, 29.099021833724745, 2.0097125670397573], "isController": false}, {"data": ["/api/v2/pokedex/hoenn", 689, 0, 0.0, 190.67198838896954, 51, 1057, 178.0, 237.0, 272.0, 530.8000000000004, 11.515576948789946, 279.02374696023867, 1.518166882897112], "isController": false}, {"data": ["/api/v2/contest-type/5", 553, 0, 0.0, 75.9439421338156, 24, 285, 76.0, 101.0, 111.0, 134.92000000000007, 9.23883988238439, 15.873774141272387, 1.2270334218791767], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 549, 549, 100.0, 83.47358834244086, 25, 710, 78.0, 114.0, 128.0, 423.0, 9.198136916529839, 8.906162955927687, 1.2216275592266193], "isController": false}, {"data": ["/api/v2/contest-type/4", 554, 0, 0.0, 76.67509025270755, 22, 201, 77.0, 101.0, 111.0, 142.30000000000064, 9.264988711430721, 15.913061031440755, 1.2305063132368927], "isController": false}, {"data": ["/api/v2/contest-type/3", 554, 0, 0.0, 81.31588447653425, 24, 234, 81.0, 107.5, 118.0, 167.9000000000001, 9.258176105884123, 16.064786865589333, 1.229601514062735], "isController": false}, {"data": ["/api/v2/contest-type/2", 554, 0, 0.0, 79.24548736462086, 22, 155, 80.0, 103.0, 111.0, 141.80000000000018, 9.254618956934284, 16.025073815609232, 1.2291290802178343], "isController": false}, {"data": ["/api/v2/contest-type/1", 554, 0, 0.0, 76.25992779783383, 24, 198, 77.0, 100.0, 108.0, 130.0, 9.265763505602942, 15.86627414701455, 1.230609215587891], "isController": false}, {"data": ["/api/v2/pokemon/arcanine", 549, 0, 0.0, 906.4043715846991, 193, 5349, 893.0, 1182.0, 1301.5, 1774.5, 9.112789443107312, 1709.370542290854, 1.228090764793759], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 1791, 100.0, 5.4210303287123915], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 33038, 1791, "404/Not Found", 1791, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 2764, 553, "404/Not Found", 553, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/pokedex/digiworld", 689, 689, "404/Not Found", 689, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 549, 549, "404/Not Found", 549, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
