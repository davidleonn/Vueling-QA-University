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

    var data = {"OkPercent": 95.03311258278146, "KoPercent": 4.966887417218543};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9478476821192053, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/nature/impish"], "isController": false}, {"data": [0.9838709677419355, 500, 1500, "/api/v2/pokemon/crobat"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "/api/v2/pokemon/jolteon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/ghost"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokemon/togekiss"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/modest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/hasty"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/bold"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/defense"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/nature/naughty"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/electric"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/hp"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/fire"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/evasion"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/poison"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/pokemon/agumon"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/type/fairy"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/speed"], "isController": false}, {"data": [0.9833333333333333, 500, 1500, "/api/v2/pokemon/arcanine"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/stat/attack"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 604, 30, 4.966887417218543, 49.397350993377444, 17, 547, 26.0, 80.0, 118.0, 470.0, 6.718127822392277, 288.2065278596534, 0.8800858674615709], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/nature/impish", 30, 0, 0.0, 35.533333333333346, 19, 129, 22.5, 112.00000000000004, 122.94999999999999, 129.0, 0.3420167588211822, 1.0313497548879895, 0.04509010003990195], "isController": false}, {"data": ["/api/v2/pokemon/crobat", 31, 0, 0.0, 119.74193548387095, 44, 540, 66.0, 440.60000000000014, 500.9999999999999, 540.0, 0.3450770857683531, 65.67987490955642, 0.0458305504536094], "isController": false}, {"data": ["/api/v2/pokemon/jolteon", 30, 0, 0.0, 128.63333333333338, 49, 547, 72.5, 459.1000000000001, 504.65, 547.0, 0.34367016828382574, 74.5449569803707, 0.045979309623910274], "isController": false}, {"data": ["/api/v2/type/ghost", 30, 0, 0.0, 31.36666666666667, 23, 99, 28.0, 37.900000000000006, 67.09999999999997, 99.0, 0.34227039361095263, 5.277871862521391, 0.04412079292641186], "isController": false}, {"data": ["/api/v2/pokemon/togekiss", 30, 0, 0.0, 111.6, 46, 429, 60.5, 402.4000000000001, 424.6, 429.0, 0.3407309815323808, 49.42881863599709, 0.045918823683074754], "isController": false}, {"data": ["/api/v2/nature/modest", 30, 0, 0.0, 35.233333333333334, 20, 135, 23.0, 107.20000000000002, 125.64999999999999, 135.0, 0.33651149747616377, 1.0125359296130116, 0.044364308749298934], "isController": false}, {"data": ["/api/v2/nature/hasty", 30, 0, 0.0, 30.033333333333335, 19, 112, 23.0, 69.50000000000007, 97.69999999999999, 112.0, 0.34528399608678134, 1.0561958695401967, 0.04518364792541865], "isController": false}, {"data": ["/api/v2/nature/bold", 31, 0, 0.0, 28.87096774193548, 20, 102, 22.0, 61.00000000000003, 84.59999999999997, 102.0, 0.3462371836397346, 1.0363228808329796, 0.04497025920320772], "isController": false}, {"data": ["/api/v2/stat/defense", 30, 0, 0.0, 28.26666666666667, 20, 118, 23.0, 28.800000000000004, 95.99999999999997, 118.0, 0.3370862266567788, 2.242654856008, 0.04411089294141441], "isController": false}, {"data": ["/api/v2/nature/naughty", 30, 0, 0.0, 28.633333333333333, 20, 83, 23.0, 68.8000000000001, 82.45, 83.0, 0.3400589435502154, 1.0262651255384267, 0.04516407844026298], "isController": false}, {"data": ["/api/v2/type/electric", 30, 0, 0.0, 29.799999999999997, 24, 45, 27.0, 39.60000000000001, 44.45, 45.0, 0.34561415635584436, 5.6705247646943615, 0.04556436631644432], "isController": false}, {"data": ["/api/v2/stat/hp", 30, 0, 0.0, 22.866666666666667, 18, 41, 22.0, 25.900000000000002, 34.94999999999999, 41.0, 0.3456738912509938, 0.7975142266410867, 0.043546808565799025], "isController": false}, {"data": ["/api/v2/type/fire", 30, 0, 0.0, 30.06666666666666, 23, 70, 27.5, 37.7, 53.49999999999998, 70.0, 0.3397893306150187, 5.697079139058783, 0.04346914288141352], "isController": false}, {"data": ["/api/v2/stat/evasion", 30, 0, 0.0, 24.26666666666667, 17, 39, 22.0, 34.0, 36.8, 39.0, 0.3416739746933476, 0.8310062725647188, 0.044711242782137284], "isController": false}, {"data": ["/api/v2/type/poison", 31, 0, 0.0, 31.032258064516128, 23, 120, 27.0, 40.400000000000006, 74.99999999999989, 120.0, 0.34653908066535505, 5.385023433307995, 0.04500947043798068], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 30, 30, 100.0, 68.10000000000001, 20, 419, 26.0, 213.00000000000006, 414.6, 419.0, 0.33622486719117745, 0.324732806300854, 0.04465486517382826], "isController": false}, {"data": ["/api/v2/type/fairy", 30, 0, 0.0, 32.26666666666668, 21, 101, 27.0, 39.0, 98.8, 101.0, 0.33680617927070233, 4.228649821212053, 0.04341642154661397], "isController": false}, {"data": ["/api/v2/stat/speed", 31, 0, 0.0, 24.419354838709673, 20, 41, 23.0, 29.0, 39.199999999999996, 41.0, 0.34690748760645024, 2.0802537425442864, 0.04471854332426897], "isController": false}, {"data": ["/api/v2/pokemon/arcanine", 30, 0, 0.0, 123.03333333333336, 47, 532, 68.0, 456.10000000000014, 499.54999999999995, 532.0, 0.33862338307334583, 63.51952975088607, 0.04563479185949387], "isController": false}, {"data": ["/api/v2/stat/attack", 30, 0, 0.0, 23.96666666666667, 19, 39, 23.0, 29.800000000000004, 34.05, 39.0, 0.33995489931669065, 2.2185487714879826, 0.04415429844640611], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 30, 100.0, 4.966887417218543], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 604, 30, "404/Not Found", 30, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/pokemon/agumon", 30, 30, "404/Not Found", 30, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
