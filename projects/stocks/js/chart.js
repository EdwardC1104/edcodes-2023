performance = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: ["01-01-20","15-01-20","01-02-20","15-02-20","01-03-20","15-03-20","01-04-20","15-04-20","01-05-20","15-05-20","01-06-20","15-06-20"],
    datasets: [{
        data: [38, 43, 45, 46, 47, 47, 49, 54, 61, 66, 67, 75],
        label: "AMD",
        borderColor: "#3e95cd",
        fill: false
      }, {
        data: [29, 29, 34, 39, 40, 41, 43, 44, 49, 52, 52, 41],
        label: "INTC",
        borderColor: "#8e5ea2",
        fill: false
      }, {
        data: [77, 77, 76, 75, 69, 68, 49, 48, 42, 42, 55, 50],
        label: "AAPL",
        borderColor: "#3cba9f",
        fill: false
      }, {
        data: [65, 72, 70, 69, 71, 71, 68, 63, 62, 43, 36, 28],
        label: "FB",
        borderColor: "#e8c3b9",
        fill: false
      }
    ]
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
});


function reload(){
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

split = new Chart(document.getElementById("doughnut-chart"), {
    type: 'pie',
    data: {
      labels: ["AMD", "INTC", "AAPL", "FB"],
      datasets: [
        {
          label: "Stock Split",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,4167,734,784]
        }
      ]
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
});

profit = new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
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
      legend: { display: false },
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
});
