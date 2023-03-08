$.ajaxSetup({
    cache: false
});

colours = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]

performanceConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        title: {
            display: false,
            text: 'Performance'
        },
        responsive: true,
        //responsiveAnimationDuration: 500,
        maintainAspectRatio: false,
        aspectRatio: (window.innerWidth / 2 - 60) / (window.innerHeight / 2 - 130)
    }
}

performance = new Chart(document.getElementById("line-chart"), performanceConfig);


function reload() {
    split.aspectRatio = ((window.innerWidth / 4 - 40) / (window.innerHeight / 2 - 70)).toFixed(2);
    //document.getElementById("doughnut-chart").style.maxWidth = "calc(25vw - 80px)";
    document.getElementById("doughnut-chart").style.height = "calc(50vh - 110px)";
    document.getElementById("doughnut-chart").innerHTML = split;
    performance.aspectRatio = ((window.innerWidth / 2 - 60) / (window.innerHeight / 2 - 130)).toFixed(2);
    document.getElementById("line-chart").style.height = "calc(50vh - 130px)";
    document.getElementById("line-chart").innerHTML = performance;
    profit.aspectRatio = ((window.innerWidth / 2 - 60) / (window.innerHeight / 2 - 130)).toFixed(2);
    document.getElementById("bar-chart").style.height = "calc(50vh - 130px)";
    document.getElementById("bar-chart").innerHTML = performance;
}

splitConfig = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: "Stock Split",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: []
        }]
    },
    options: {
        title: {
            display: false,
            text: 'Split'
        },
        responsive: true,
        //responsiveAnimationDuration: 500,
        maintainAspectRatio: false,
        aspectRatio: (window.innerWidth / 4 - 40) / (window.innerHeight / 2 - 70)
    }
}

split = new Chart(document.getElementById("doughnut-chart"), splitConfig);

profitConfig = {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
                label: "AMD",
                backgroundColor: ["#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd", "#3e95cd"],
                data: [39, 46, 21, 43, 32, 18]
            },
            {
                label: "INTC",
                backgroundColor: ["#8e5ea2", "#8e5ea2", "#8e5ea2", "#8e5ea2", "#8e5ea2", "#8e5ea2"],
                data: [-12, 47, 41, 21, 26, 56]
            },
            {
                label: "AAPL",
                backgroundColor: ["#3cba9f", "#3cba9f", "#3cba9f", "#3cba9f", "#3cba9f", "#3cba9f"],
                data: [35, 15, 41, -21, 53, -42]
            },
            {
                label: "FB",
                backgroundColor: ["#e8c3b9", "#e8c3b9", "#e8c3b9", "#e8c3b9", "#e8c3b9", "#e8c3b9"],
                data: [35, -15, -41, 21, 48, 27]
            },
        ]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        },
        title: {
            display: false,
            text: 'Profit'
        },
        responsive: true,
        //responsiveAnimationDuration: 500,
        maintainAspectRatio: false,
        aspectRatio: (window.innerWidth / 4 - 40) / (window.innerHeight / 2 - 70)
    }
}

profit = new Chart(document.getElementById("bar-chart"), profitConfig);

function duplicate(e) {
    var itm = e.parentElement.parentElement;
    var cln = itm.cloneNode(true);
    document.getElementById("timeline").appendChild(cln);
}

function removeItem(e) {
    e.parentElement.parentElement.remove();
}

function getData(first) {
    $.getJSON("data/timeline.json", function(timeline) {
        if (first) {
            var i;
            for (i = 0; i < (timeline.length - 1); i++) {
                duplicate($("button.green:eq(0)")[0]);
            }
        }
        stocksUsed = [];
        stockAmounts = {};
        for (i = 0; i < (timeline.length); i++) {
            if (timeline[i].plus == "minus") {
                var amount = timeline[i].amount * -1;
            } else {
                var amount = timeline[i].amount;
            }
            $("input.item-date:eq(" + i + ")")[0].value = timeline[i].date;
            $("input.item-amount:eq(" + i + ")")[0].value = String(amount);
            $("input.item-stock:eq(" + i + ")")[0].value = timeline[i].stock;
            $("select.item-plus:eq(" + i + ")")[0].value = timeline[i].plus;
            $("div.item-container:eq(" + i + ")")[0].style.order = parseInt(Date.parse(timeline[i].date)) / 1000;
            if (!stocksUsed.includes(timeline[i].stock)) {
                stocksUsed.push(timeline[i].stock);
            }
            if (!(timeline[i].stock in stockAmounts)) {
                thisStock = timeline[i].stock;
                thisAmount = timeline[i].amount;
                stockAmounts[thisStock] = thisAmount;
            } else {
                thisStock = timeline[i].stock;
                thisAmount = timeline[i].amount;
                stockAmounts[thisStock] += thisAmount;
            }
        }

        stocksUsed.sort();
        stockAmountsArray = [];
        stocksUsed.forEach(function(item, index) {
            stockAmountsArray.push(stockAmounts[item]);
        });
        //console.log(stocksUsed);
        //console.log(stockAmountsArray);
        //console.log(stockAmounts);
        splitConfig.data.labels = stocksUsed;
        splitConfig.data.datasets[0].data = stockAmountsArray;
        window.split.update();
        getStockData(stocksUsed);
    });
}

function getStockData(stocksUsed) {
performanceConfig.data.datasets = []
    stocksUsed.forEach(function(item, index) {
        keys = ['F7FT6S3385FPM51J', '8VKBW5RDC648EXE3']
        //keys = ['F7FT6S3385FPM51J', 'F7FT6S3385FPM51J']
        if (index%2 == 0) {
            key = keys[0];
            console.log('F7FT6S3385FPM51J')
        }
        else {
            key = keys[1];
            console.log('8VKBW5RDC648EXE3')
        }
        $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + item + "&apikey=" + key, function(stocksData) {
            //console.log(stocksData)
            if (typeof stocksData.Note != "undefined") {
                alert("Please wait 1 minute. Sorry for the inconvenience.")
            }
            /*console.log(Object.values(stocksData['Time Series (Daily)']));
            console.log(stocksData['Time Series (Daily)']);
            console.log(Object.keys(stocksData['Time Series (Daily)']));*/
            var stocksDataValues = []
            Object.values(stocksData['Time Series (Daily)']).forEach(function(item, index) {
                stocksDataValues.push(item['4. close']);
            });
            //console.log(stocksDataValues)
            performanceConfig.data.datasets.push({
                data: stocksDataValues,
                label: item,
                borderColor: colours[index],
                fill: false
            });
            performanceConfig.data.labels = Object.keys(stocksData['Time Series (Daily)']).reverse();
            /*performanceConfig.data.datasets[index].data = stocksDataValues;
            performanceConfig.data.datasets[index].label = item;*/
            window.performance.update();
        });
    });

}

function save() {
    var toPost = [];
    var i;
    for (i = 0; i < (document.getElementById("timeline").childElementCount); i++) {
        if ($("select.item-plus:eq(" + i + ")")[0].value == "minus") {
            var amount = parseInt($("input.item-amount:eq(" + i + ")")[0].value) * -1;
        } else {
            var amount = parseInt($("input.item-amount:eq(" + i + ")")[0].value);
        }
        toPost.push({
            "date": $("input.item-date:eq(" + i + ")")[0].value,
            "plus": $("select.item-plus:eq(" + i + ")")[0].value,
            "amount": amount,
            "stock": $("input.item-stock:eq(" + i + ")")[0].value,
            "value": 36.31
        });
    }
    console.log(toPost);
    $.ajax({
        type: 'POST',
        url: 'save.php',
        data: JSON.stringify(toPost),
        dataType: 'json',
        success: function(data) {
            //alert(data);
        }
    });
    getData(false);
}

$(document).ready(function() {
    getData(true);
});
