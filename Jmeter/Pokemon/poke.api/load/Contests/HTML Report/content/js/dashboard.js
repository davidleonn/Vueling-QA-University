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

    var data = {"OkPercent": 93.37748344370861, "KoPercent": 6.622516556291391};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9337748344370861, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/contest-type/cool/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/tough/"], "isController": false}, {"data": [0.8013245033112583, 500, 1500, "/api/v2/super-contest-effect/${superrEffect}/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/5"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/4"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/smart/"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/2"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/1"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 453, 30, 6.622516556291391, 33.84547461368654, 19, 225, 23.0, 58.000000000000114, 138.89999999999986, 170.01999999999924, 5.046678995566052, 10.169612158402218, 0.7668499406764555], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/contest-type/cool/", 31, 0, 0.0, 47.516129032258064, 20, 149, 27.0, 142.8, 146.6, 149.0, 0.3455425017277125, 0.5939229454154312, 0.04724213890808569], "isController": false}, {"data": ["/api/v2/contest-type/cute/", 30, 0, 0.0, 46.63333333333333, 21, 150, 25.5, 140.70000000000002, 146.7, 150.0, 0.34047189404514655, 0.5846097482777797, 0.046548891763984884], "isController": false}, {"data": ["/api/v2/contest-type/tough/", 30, 0, 0.0, 48.83333333333333, 21, 147, 29.0, 146.8, 147.0, 147.0, 0.335950010638417, 0.5773703372938106, 0.04625874169923515], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 151, 30, 19.867549668874172, 28.847682119205302, 19, 225, 23.0, 29.80000000000001, 33.0, 218.23999999999987, 1.6852678571428572, 4.3894195556640625, 0.3126961844308036], "isController": false}, {"data": ["/api/v2/contest-type/beauty/", 30, 0, 0.0, 48.69999999999999, 22, 149, 26.5, 144.9, 149.0, 149.0, 0.34284538815812027, 0.5886182116613144, 0.04754301281098934], "isController": false}, {"data": ["/api/v2/contest-type/5", 30, 0, 0.0, 26.8, 20, 80, 22.0, 35.0, 55.79999999999997, 80.0, 0.33640961234399, 0.5784887428933468, 0.04467940163943617], "isController": false}, {"data": ["/api/v2/contest-type/4", 30, 0, 0.0, 22.733333333333334, 19, 31, 22.0, 29.60000000000001, 31.0, 31.0, 0.33868837282816083, 0.5817237403614934, 0.04498204951624011], "isController": false}, {"data": ["/api/v2/contest-type/smart/", 30, 0, 0.0, 50.133333333333326, 21, 153, 26.0, 150.5, 152.45, 153.0, 0.33821490174857105, 0.5811086895863632, 0.04657060658842629], "isController": false}, {"data": ["/api/v2/contest-type/3", 30, 0, 0.0, 23.46666666666667, 20, 37, 22.0, 30.700000000000006, 36.45, 37.0, 0.3409129649200559, 0.5911599492607871, 0.04527750315344493], "isController": false}, {"data": ["/api/v2/contest-type/2", 30, 0, 0.0, 23.86666666666667, 20, 45, 21.0, 32.900000000000006, 39.49999999999999, 45.0, 0.3431198746468725, 0.59375822058033, 0.04557060835153774], "isController": false}, {"data": ["/api/v2/contest-type/1", 31, 0, 0.0, 24.774193548387096, 19, 40, 23.0, 35.2, 37.599999999999994, 40.0, 0.34597055902146134, 0.5925879295336094, 0.045949214870037836], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 30, 100.0, 6.622516556291391], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 453, 30, "404/Not Found", 30, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/${superrEffect}/", 151, 30, "404/Not Found", 30, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
