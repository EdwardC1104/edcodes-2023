$.ajaxSetup({
    cache: false //Turns of caching so it actuallu updates at the interval
});

const arrayColumn = (arr, n) => arr.map(x => x[n]);

function sortByThirdItem(a, b) {
    if (a[2] === b[2]) {
        return 0;
    } else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function sortByFirstItem(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function orderDetailsBy(which) {
    if (which == "Highest Revenue") {
        globalData.breakdown['Customer Interaction'].sort(sortByFirstItem).reverse();
        globalData.breakdown['Pricing'].sort(sortByFirstItem).reverse();
        globalData.breakdown['Product Quality'].sort(sortByFirstItem).reverse();
        detailsOrder = "Highest Revenue";
    } else if (which == "Lowest Revenue") {
        globalData.breakdown['Customer Interaction'].sort(sortByFirstItem);
        globalData.breakdown['Pricing'].sort(sortByFirstItem);
        globalData.breakdown['Product Quality'].sort(sortByFirstItem);
        detailsOrder = "Lowest Revenue";
    } else if (which == "Highest Ratings") {
        globalData.breakdown['Customer Interaction'].sort(sortByThirdItem).reverse();
        globalData.breakdown['Pricing'].sort(sortByThirdItem).reverse();
        globalData.breakdown['Product Quality'].sort(sortByThirdItem).reverse();
        detailsOrder = "Highest Ratings";
    } else if (which == "Lowest Ratings") {
        globalData.breakdown['Customer Interaction'].sort(sortByThirdItem);
        globalData.breakdown['Pricing'].sort(sortByThirdItem);
        globalData.breakdown['Product Quality'].sort(sortByThirdItem);
        detailsOrder = "Lowest Ratings";
    }
    var i = 0;
    for (i = 0; i < 3; i++) {
        $(".customer-interaction-specific:eq(" + i + ")")[0].innerHTML = "A <b>$" + addCommas(globalData.breakdown['Customer Interaction'][i][0]) + "</b> per year customer gave <b>" + addCommas(globalData.breakdown['Customer Interaction'][i][
            2
        ]) + "/10</b>.";
        $(".pricing-specific:eq(" + i + ")")[0].innerHTML = "A <b>$" + addCommas(globalData.breakdown['Pricing'][i][0]) + "</b> per year customer gave <b>" + addCommas(globalData.breakdown['Pricing'][i][2]) + "/10</b>.";
        $(".product-quality-specific:eq(" + i + ")")[0].innerHTML = "A <b>$" + addCommas(globalData.breakdown['Product Quality'][i][0]) + "</b> per year customer gave <b>" + addCommas(globalData.breakdown['Product Quality'][i][2]) +
            "/10</b>.";
        $(".highlight:eq(" + i + ")")[0].innerHTML = which + ":";
    }
}

function sortSpecificsBy(which) {
    if (which == "Customer Interaction") {
        specificsSort = "Customer Interaction";
    } else if (which == "Pricing") {
        specificsSort = "Pricing";
    } else if (which == "Product Quality") {
        specificsSort = "Product Quality";
    }
    document.getElementById("specifics-best-subtitle").innerHTML = specificsSort;
    document.getElementById("specifics-worst-subtitle").innerHTML = specificsSort;
    globalData.breakdown['Customer Interaction'].sort(sortByThirdItem).reverse();
    globalData.breakdown['Pricing'].sort(sortByThirdItem).reverse();
    globalData.breakdown['Product Quality'].sort(sortByThirdItem).reverse();
    var i;
    for (i = 0; i < 5; i++) {
        $(".specifics-best:eq(" + i + ")")[0].innerHTML = globalData.breakdown[specificsSort][i][1] + " - " + addCommas(globalData.breakdown[specificsSort][i][0]) + " - " + globalData.breakdown[specificsSort][i][2] + "/10";
    }
    globalData.breakdown['Customer Interaction'].sort(sortByThirdItem);
    globalData.breakdown['Pricing'].sort(sortByThirdItem);
    globalData.breakdown['Product Quality'].sort(sortByThirdItem);
    var i;
    for (i = 0; i < 5; i++) {
        $(".specifics-worst:eq(" + i + ")")[0].innerHTML = globalData.breakdown[specificsSort][i][1] + " - " + addCommas(globalData.breakdown[specificsSort][i][0]) + " - " + globalData.breakdown[specificsSort][i][2] + "/10";
    }
}

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
            orderDetailsBy(this.innerHTML);
            sortSpecificsBy(this.innerHTML);
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

function switchWeighted(first = false) {
    isWeighted = 0;
    document.getElementById("switchWeighted").removeAttribute("class");
    document.getElementById("switchWeighted").classList.add("button");
    document.getElementById("switchWeighted").classList.add("current");
    document.getElementById("switchStandard").removeAttribute("class");
    document.getElementById("switchStandard").classList.add("button");
    for (i = 0; i < 3; i++) {
        $('.nps:eq(' + i + ')')[0].innerHTML = "Weighted NPS:"
    }
    if (!first) {
        getData();
    }
}

function switchStandard(first = false) {
    isWeighted = 1;
    document.getElementById("switchStandard").removeAttribute("class");
    document.getElementById("switchStandard").classList.add("button");
    document.getElementById("switchStandard").classList.add("current");
    document.getElementById("switchWeighted").removeAttribute("class");
    document.getElementById("switchWeighted").classList.add("button");
    for (i = 0; i < 3; i++) {
        $('.nps:eq(' + i + ')')[0].innerHTML = "Standard NPS:"
    }
    if (!first) {
        getData();
    }
}

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //This adds commas to the numbers and it doesn't break on mobile
}

function calcScore(promoters, detractors, total) { //WEIGHTED NPS SCORE
    return Math.round(promoters / total * 100) - Math.round(detractors / total * 100); //promoters[isWeighted] percentage - detractors[isWeighted] percentage rounded to the nearest whole number
}

function sortColors(name, id, data) { //Colors each area based on which range the NPS score falls into
    document.getElementById(id).parentElement.parentElement.parentElement.removeAttribute("class");
    document.getElementById(id).parentElement.parentElement.parentElement.classList.add("percentage");
    if (calcScore(data.combined[name].promoters[isWeighted], data.combined[name].detractors[isWeighted], data.combined[name].total[isWeighted]) < 1) { //Less than 1 is red
        document.getElementById(id).parentElement.parentElement.parentElement.classList.add("red");
    } else if (calcScore(data.combined[name].promoters[isWeighted], data.combined[name].detractors[isWeighted], data.combined[name].total[isWeighted]) < 30) { //Less than 30 is orange
        document.getElementById(id).parentElement.parentElement.parentElement.classList.add("orange");
    } else { //Larger than 30 is green
        document.getElementById(id).parentElement.parentElement.parentElement.classList.add("green");
    }
}

function sortGraphColors(name, chartConfig, data) { //Colors each area based on which range the NPS score falls into
    if (calcScore(data.combined[name].promoters[isWeighted], data.combined[name].detractors[isWeighted], data.combined[name].total[isWeighted]) < 1) { //Less than 1 is red
        chartConfig.data.datasets[0].borderColor = "red";
        chartConfig.data.datasets[0].backgroundColor = "rgba(255,0,0,0.3)";
    } else if (calcScore(data.combined[name].promoters[isWeighted], data.combined[name].detractors[isWeighted], data.combined[name].total[isWeighted]) < 30) { //Less than 30 is orange
        chartConfig.data.datasets[0].borderColor = "rgba(255,100,0,1)";
        chartConfig.data.datasets[0].backgroundColor = "rgba(255,80,0,0.3)";
    } else { //Larger than 30 is green
        chartConfig.data.datasets[0].borderColor = "green";
        chartConfig.data.datasets[0].backgroundColor = "rgba(0,200,0,0.3)";
    }
}

function getData(first = false) { //Main ajax function to get data
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'data.json',
        cache: false,
        success: function(data) { //Run if ajax request succeeded
            globalData = data;
            //Display each NPS
            document.getElementById("customer-interaction-percentage").innerHTML = calcScore(data.combined['Customer Interaction'].promoters[isWeighted], data.combined['Customer Interaction'].detractors[isWeighted], data.combined['Customer Interaction'].total[isWeighted]);
            document.getElementById("pricing-percentage").innerHTML = calcScore(data.combined['Pricing'].promoters[isWeighted], data.combined['Pricing'].detractors[isWeighted], data.combined['Pricing'].total[isWeighted]);
            document.getElementById("product-quality-percentage").innerHTML = calcScore(data.combined['Product Quality'].promoters[isWeighted], data.combined['Product Quality'].detractors[isWeighted], data.combined['Product Quality'].total[isWeighted]);
            //Display last updated time
            var date = new Date();
            var options = {
                hour: "2-digit",
                minute: "2-digit"
            };
            document.getElementById("customer-interaction-update-time").innerHTML = "Last updated at " + date.toLocaleTimeString("default", options) + ".";
            document.getElementById("pricing-update-time").innerHTML = "Last updated at " + date.toLocaleTimeString("default", options) + ".";
            document.getElementById("product-quality-update-time").innerHTML = "Last updated at " + date.toLocaleTimeString("default", options) + ".";
            document.getElementById("specifics-update-time").innerHTML = "Last updated at " + date.toLocaleTimeString("default", options) + ".";
            //Display the scores from the 5 highest revenue clients
            orderDetailsBy(detailsOrder);
            sortSpecificsBy(specificsSort);
            //Transition the order of flex items WITH animation
            if (!first) { //Only perform animation if it isn't the first load of the ajax data
                //Setup GSAP animation (I didn't write this code)
                var group = document.querySelector(".flex-container");
                var nodes = document.querySelectorAll(".flex-item");
                var total = nodes.length;
                var ease = Power1.easeInOut;
                var boxes = [];
                for (var i = 0; i < total; i++) {
                    var node = nodes[i];
                    TweenLite.set(node, {
                        x: 0
                    });
                    boxes[i] = {
                        transform: node._gsTransform,
                        x: node.offsetLeft,
                        y: node.offsetTop,
                        node
                    };
                };
                //Set the flex order of each item to the NPS
                document.getElementById("customer-interaction-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Customer Interaction'].promoters[isWeighted], data.combined['Customer Interaction']
                    .detractors[isWeighted], data.combined['Customer Interaction'].total[isWeighted]);
                document.getElementById("pricing-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Pricing'].promoters[isWeighted], data.combined['Pricing'].detractors[isWeighted], data.combined['Pricing']
                    .total[isWeighted]);
                document.getElementById("product-quality-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Product Quality'].promoters[isWeighted], data.combined['Product Quality'].detractors[isWeighted],
                    data.combined['Product Quality'].total[isWeighted]);
                //Perform animation
                for (var i = 0; i < total; i++) {
                    var box = boxes[i];
                    var lastX = box.x;
                    var lastY = box.y;
                    box.x = box.node.offsetLeft;
                    box.y = box.node.offsetTop;
                    if (lastX === box.x && lastY === box.y) continue;
                    var x = box.transform.x + lastX - box.x;
                    var y = box.transform.y + lastY - box.y;
                    TweenLite.fromTo(box.node, 0.5, {
                        x,
                        y
                    }, {
                        x: 0,
                        y: 0,
                        ease
                    });
                };
            } else { //Do not animate if it is the first load of the page
                document.getElementById("customer-interaction-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Customer Interaction'].promoters[isWeighted], data.combined['Customer Interaction']
                    .detractors[isWeighted], data.combined['Customer Interaction'].total[isWeighted]);
                document.getElementById("pricing-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Pricing'].promoters[isWeighted], data.combined['Pricing'].detractors[isWeighted], data.combined['Pricing']
                    .total[isWeighted]);
                document.getElementById("product-quality-percentage").parentElement.parentElement.parentElement.parentElement.style.order = calcScore(data.combined['Product Quality'].promoters[isWeighted], data.combined['Product Quality'].detractors[isWeighted],
                    data.combined['Product Quality'].total[isWeighted]);
            }
            //Calls the procedure to change the colors based on NPS
            sortColors('Customer Interaction', "customer-interaction-percentage", data);
            sortColors('Pricing', "pricing-percentage", data);
            sortColors('Product Quality', "product-quality-percentage", data);
            //Add data to chart configurations
            interactionConfig.data.labels = Object.keys(data.history['Customer Interaction']);
            interactionConfig.data.datasets[0].data = arrayColumn(Object.values(data.history['Customer Interaction']), isWeighted);
            pricingConfig.data.labels = Object.keys(data.history['Pricing']);
            pricingConfig.data.datasets[0].data = arrayColumn(Object.values(data.history['Pricing']), isWeighted);
            qualityConfig.data.labels = Object.keys(data.history['Product Quality']);
            qualityConfig.data.datasets[0].data = arrayColumn(Object.values(data.history['Product Quality']), isWeighted);
            //Changes the colors of the charts based on NPS
            sortGraphColors('Customer Interaction', interactionConfig, data);
            sortGraphColors('Pricing', pricingConfig, data);
            sortGraphColors('Product Quality', qualityConfig, data);
            //Updates the charts will the new configurations
            window.interaction.update();
            window.pricing.update();
            window.quality.update();
        }
    });
}

//The configurations for the charts
interactionConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            label: [],
            backgroundColor: "rgba(255,0,0,0.3)",
            borderColor: "#ff0000",
            fill: !0
        }]
    },
    options: {
        title: {
            display: !1,
            text: "Customer Interaction"
        },
        layout: {
            padding: {
                right: 10
            }
        },
        legend: {
            display: !1
        },
        responsive: !0,
        maintainAspectRatio: !0,
        aspectRatio: 2,
        scales: {
            yAxes: [{
                ticks: {
                    display: !0,
                    autoSkip: !0,
                    maxTicksLimit: 5
                }
            }],
            xAxes: [{
                ticks: {
                    display: !1,
                    autoSkip: !0,
                    maxTicksLimit: 1
                }
            }]
        }
    }
};
interaction = new Chart(document.getElementById("interaction-line-chart"), interactionConfig);

pricingConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            label: [],
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            borderColor: "#ff0000",
            fill: !0
        }]
    },
    options: {
        title: {
            display: !1,
            text: "Pricing"
        },
        layout: {
            padding: {
                right: 10
            }
        },
        legend: {
            display: !1
        },
        responsive: !0,
        maintainAspectRatio: !0,
        aspectRatio: 2,
        scales: {
            yAxes: [{
                ticks: {
                    display: !0,
                    autoSkip: !0,
                    maxTicksLimit: 5
                }
            }],
            xAxes: [{
                ticks: {
                    display: !1,
                    autoSkip: !0,
                    maxTicksLimit: 1
                }
            }]
        }
    }
};
pricing = new Chart(document.getElementById("pricing-line-chart"), pricingConfig);

qualityConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            label: [],
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            borderColor: "#ff0000",
            fill: !0
        }]
    },
    options: {
        title: {
            display: !1,
            text: "Product Quality"
        },
        layout: {
            padding: {
                right: 10
            }
        },
        legend: {
            display: !1
        },
        responsive: !0,
        maintainAspectRatio: !0,
        aspectRatio: 2,
        scales: {
            yAxes: [{
                ticks: {
                    display: !0,
                    autoSkip: !0,
                    maxTicksLimit: 5
                }
            }],
            xAxes: [{
                ticks: {
                    display: !1,
                    autoSkip: !0,
                    maxTicksLimit: 1
                }
            }]
        }
    }
};
quality = new Chart(document.getElementById("quality-line-chart"), qualityConfig);

$(document).ready(function() {
    /*isWeighted = 0; //Default to weighted*/
    detailsOrder = "Highest Revenue"; //Default details to Highest Revenue
    specificsSort = "Customer Interaction"; //Default specifics section to Customer Interaction
    /*for (i = 0; i < 3; i++) {
        $('.nps:eq(' + i + ')')[0].innerHTML = "Weighted NPS:"
    }*/
    switchWeighted(false);
    getData(true); //Get data immediately after DOM has loaded - No animation
    setInterval(getData, 20 * 1000); //Get data every 20 seconds - With animation
});
