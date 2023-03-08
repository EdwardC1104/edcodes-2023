<!DOCTYPE html>
<html lang="en-GB">

<head>
	<title>Stocks</title>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="author" content="Ed Clark">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/png" href="">
	<link rel="icon" type="image/png" href="">
	<link href="css/main.css" rel="stylesheet" type="text/css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI=" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
</head>

<body onresize="reload()">
	<div class="grid-container">
		<div class="left">
			<div class="value">
				<div class="content">
					<h2>£1,495</h2>
					<h3>Current Value</h3>
				</div>
			</div>
			<div class="menu">
				<div class="dashboard">
					<img src="img/dashboard.svg" width=24>
					<span>Dashboard</span>
				</div>
				<div class="notifications">
					<img src="img/notifications.svg" width=24>
					<span>Notifications</span>
				</div>
				<div class="settings">
					<img src="img/settings.svg" width=24>
					<span>Settings</span>
				</div>
			</div>
			<div class="cash-container">
				<div class="cash">
					<div class="content">
						<h2>£124</h2>
						<h3>Cash Reserve</h3>
					</div>
				</div>
			</div>
		</div>
		<div >
			<div class="main" id="main">
				<div class="performance">
					<h3>Stock Performance</h3>
					<div class="performance-container">
						<canvas id="line-chart" width="100%"></canvas>
					</div>
				</div>
				<div class="split" id="split">
					<h3>Split</h3>
					<div id="doughnut-container">
						<canvas id="doughnut-chart" width="100%"></canvas>
					</div>
				</div>
				<div class="profit" id="profit">
					<h3>Profit</h3>
					<div id="bar-container">
						<canvas id="bar-chart" width="100%"></canvas>
					</div>
				</div>
			</div>
		</div>
		<div class="right">
			<h3>Timeline</h3>
			<div id="timeline">
				<div class="item-container">
					<input type="date" name="date" class="item-date"><br><br>
					<select name="plus" class="item-plus">
						<option value="plus">+</option>
						<option value="minus">-</option>
					</select>
					<input type="number" name="amount" class="item-amount" maxlength="4" size="1">
					<span>x</span>
					<input type="text" name="stock" class="item-stock" maxlength="8" size="5"><br><br>
					<div class="buttons">
						<button class="green" onclick="duplicate(this)">+</button>
						<button class="red" onclick="removeItem(this)">-</button>
					</div>
				</div>
			</div>
			<div class="center">
				<button class="save" onclick="save()">Save</button>
				<button class="save" onclick="getData(false)">Undo</button>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	//var stocksData = JSON.parse('<?php /*file_get_contents("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMD&apikey=8VKBW5RDC648EXE3");*/ ?>');

	</script>
	<!--<script src="js/chart.js"></script>-->
	<?php /*echo file_get_contents('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMD&apikey=8VKBW5RDC648EXE3'); */?>
	<script src="js/app.js"></script>
</body>
</html>
