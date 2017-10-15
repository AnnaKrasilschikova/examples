/*		function startGame(sz) {
			for(var i=0; i < sz; i++){
				var td = document.createElement("td");
				var card = document.createElement("div");
				card.
			}
		
		}*/
		var images = ["url('img/A.png')", 
						"url('img/B.png')",
						"url('img/C.png')",
						"url('img/D.png')",
						"url('img/E.png')",
						"url('img/F.png')",
						"url('img/G.png')",
						"url('img/H.png')",];
		function randomizingStart(){
			var cards = document.getElementsByClassName("card_front");
			var ind=0;
			var i;
			var arrImg = Array(cards.length);
			console.log(arrImg[0]);
			function f(item){
				while(true){
					i = Math.floor((Math.random()* cards.length));
					if(arrImg[i] === undefined){
						arrImg[i] = item;
						break;
					}
				}
			}
			images.forEach(function(item, index){
					f(item);
					f(item);
				});
			console.log(arrImg);
			$(".card_front").each(function(index, element){
					$(element).css("background-image", arrImg[index]);
				})
		}
		
		var saved_img = "";
		var saved_card = "";
		var this_card = "";
				
		function onRotate(clicked_id) {
			var idCurr = "#" + clicked_id;
			console.log("click: " + idCurr);
		//	saved_card = idCurr
			 onCheck(clicked_id);
	//		$(idCurr).toggleClass("flipped");
	//		setTimeout(removeFlip, 800);
		}
		
		function removeFlip(){ 
			$(this_card).removeClass("flipped");
			$(saved_card).removeClass("flipped");
			saved_img = "";
			saved_card = "";

		}

		function CheckOver() {
			var isOver = true;
			$(".card").each(function(index, element){
				if(!$(element).hasClass("over")){
					isOver = false;
					return false;
				}
			})
			if(isOver){
				alert("Вы победили!");
				$(".card").each(function(index, element){
					$(element).removeClass("flipped");
				})
				randomizingStart();
			}
		}
		
		var arrFlipped = new Array();
		function onCheck(clicked_id) {
			var counter=0;
			var strCurr = "#" + clicked_id;
			
			var curr_front = $(strCurr).children(".card_front");
			//проверили счетчик
			$(".card").each(function(index, element){
					if($(element).hasClass("flipped") && !$(element).hasClass("over")){
					counter++;
					arrFlipped.push(element);
				}
			})
			//если это первый клик, запомнили картинку
			if(counter === 0) {
	//			console.log(counter);
				saved_img = $(strCurr).children(".card_front").first().css("background-image");
				saved_card = strCurr;
				$(saved_card).toggleClass("flipped");
	//			console.log(saved_img);
			}
			//если это второй клик, сверили картинки и, если они совпали, отключили клики.
			else if(counter === 1){
	//		console.log(counter);
				if($(curr_front).css("background-image") === saved_img && saved_card !== strCurr) {
	//				console.log("===");
					$(strCurr).toggleClass("flipped");
					$(strCurr).unbind("click");
					$(saved_card).unbind("click");
					$(strCurr).addClass("over");
					$(saved_card).addClass("over");
				}
				else if(saved_card === strCurr){
					$(saved_card).toggleClass("flipped");
				}else{
					this_card = strCurr;
					$(this_card).addClass("flipped");
					setTimeout(removeFlip, 600);
				}
			}
			 setTimeout(CheckOver, 600);
		}
///////////////////////		
		var year;
		var day;
		var wday;
		var month;

		function outputTime() {
			var d = new Date();
			var hour = d.getHours();
			var min = d.getMinutes();
			if(min < 10)
				min = "0" + min;
			
			var sec = d.getSeconds();
			if(sec < 10)
				sec = "0" + sec;
			document.getElementById("clock").innerHTML = hour + ":" + min + ":" + sec;
		}
		
		function outputDate(isToday) {
			clearCalend();
			var d = new Date();
			if(isToday === "today"){
				year = d.getFullYear();
				month = d.getMonth();
				day = d.getDate();
				wday = d.getDay();
			}
			else
				day = 0;
			document.getElementById("year").innerHTML = year;
			var arrMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
			document.getElementById("month").innerHTML = arrMonth[month];
			var wday_b = calcBeginMonth(1, month+1, year);
			fillDays(wday_b);
			changeBackForMonth();
		}
		
		function calcBeginMonth(dy, mon, year) {
			dy = parseInt(dy);
			mon = parseInt(mon);
			var a = parseInt((14-mon)/12, 10);
			var y = year - a;
			var m = mon + 12*a - 2;
			var ret = (7000+parseInt(dy+y+parseInt(y/4, 10)-parseInt(y/100, 10)+parseInt(y/400, 10)+(31*m)/12, 10))%7;
			return ret;
		}
		
		function fillDays(wday_b) {
			var d = 1;
			var count;
			switch(month)
			{
			case 0: case 2: case 4: case 6: case 7: case 9: case 11:
				count = 31;
				break;
			case 1:
				if(year%4==0)
					count = 29;
				else
					count = 28;
				break;
			default:
				count = 30;
				break;
			}
			var id = "d";
			var i = wday_b;
			if(i === 0)
				i = 7;
			while(d <= count){
				id = id + i;
				document.getElementById(id).innerHTML = d;
				if(Number(day) != 0 && day === d)
					document.getElementById(id).style.color = "red";
				d++;
				i++;
				id = "d";
			}
		}
		
		function clearCalend(){
			var arr = document.getElementsByClassName("dat");
			for(var i=0; i < arr.length; i++){
				arr[i].innerHTML = "";
				arr[i].style.color = "blue";
			}
		}
		
		function changeYear(num) {
			year += num;
			outputDate();
		}
		
		function changeMonth(num) {
			month += num;
			if(month == 12)
				month = 0;
			if(month == -1)
				month = 11;
			outputDate();
			changeBackForMonth();
		}
		
		function changeBackForMonth() {
			switch(month){
				case 0:
					document.body.style.backgroundImage = "url('img/winter2.jpg')";
					break;
				case 1:
					document.body.style.backgroundImage = "url('img/winter3.jpg')";
					break;
				case 2:
					document.body.style.backgroundImage = "url('img/spring1.jpg')";
					break;
				case 3:
					document.body.style.backgroundImage = "url('img/spring2.jpg')";
					break;
				case 4:
					document.body.style.backgroundImage = "url('img/spring3.jpg')";
					break;
				case 5:
					document.body.style.backgroundImage = "url('img/summer1.jpg')";
					break;
				case 6:
					document.body.style.backgroundImage = "url('img/summer2.jpg')";
					break;
				case 7:
					document.body.style.backgroundImage = "url('img/summer3.jpg')";
					break;
				case 8:
					document.body.style.backgroundImage = "url('img/autumn1.jpg')";
					break;
				case 9:
					document.body.style.backgroundImage = "url('img/autumn2.jpg')";
					break;
				case 10:
					document.body.style.backgroundImage = "url('img/autumn3.jpg')";				
					break;
				case 11:
					document.body.style.backgroundImage = "url('img/winter1.jpg')";	
					break;
			}
		}
		
		var arrCurrencies;// = new Array();
        var uri = 'http://www.nbrb.by/API/';
	    function ratestoday(p) {
            $.getJSON(uri + 'ExRates/Rates', {'Periodicity': p })
            .done(function (data) {
				arrCurrencies = data;
				for(var i=0; i < data.length; i++){
					if(data[i].Cur_Abbreviation === "EUR" || data[i].Cur_Abbreviation === "USD" || data[i].Cur_Abbreviation === "RUB" || data[i].Cur_Abbreviation === "JPY") {
						var row = document.createElement("tr");
						var col1 = document.createElement("td");
						var img = document.createElement("img");
						var col2 = document.createElement("td");
						col2.innerHTML = data[i].Cur_Scale + " " + data[i].Cur_Name;
						var col3 = document.createElement("td");
						col3.id = data[i].Cur_Abbreviation;
						col3.innerHTML = data[i].Cur_OfficialRate;	
						
						$(".res").append(row);
						var cls = data[i].Cur_Abbreviation;
						$(".res tr:last-of-type").append(col1);
						$(".res tr:last-of-type td:last-child").append(img);					
						$(".res td:last-child img").addClass("flag");
						$(".res td:last-child img").addClass(cls);
						$(".res tr:last-of-type").append(col2);
						$(".res tr:last-of-type").append(col3);
					}
					else
						continue;
				}
				
		    }).error(function (err) {alert('ошибка');});
        };
		
		function funcChange() {
			var idCurr = document.getElementById("listCurr").value;
			for(var i=0; i < arrCurrencies.length; i++)
			{
				if(arrCurrencies[i].Cur_Abbreviation !== idCurr)
					continue;
				
				document.getElementById("valCurr").innerHTML = arrCurrencies[i].Cur_OfficialRate;
				break;
			}
			if(document.getElementById("quantity").value !== "")
				funcCalc();
		}

		var strQuan = "";
		function funcCalc() {
			var quan = document.getElementById("quantity").value;
			if(!/^[1-9][0-9]*$/.test(quan)){
				document.getElementById("quantity").value = strQuan;
				return;
			}
			strQuan = quan;
			var res = 0;
			var currAbbr = document.getElementById("listCurr").value;
			console.log(currAbbr);
			for(var i=0; i < arrCurrencies.length; i++)
			{
				if(arrCurrencies[i].Cur_Abbreviation !== currAbbr)
					continue;
				res = arrCurrencies[i].Cur_OfficialRate * quan / arrCurrencies[i].Cur_Scale;
				break;
			}
			document.getElementById("result").innerHTML = res.toFixed(2);
		}
		
		function myMap() {
			var mapOptions = {
				center: new google.maps.LatLng(53.90, 27.41),
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.HYBRID
			}
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		}
///////weather//////////////	
//		localStorage.setItem("place", "Minsk");
		var placeArray = new Array();
		function getWeather(plc) {
			if(plc.length == 0)
			{
				plc = "Minsk";
				fillStorage("Minsk");
			}
			var str = "http://api.openweathermap.org/data/2.5/weather?q=" + plc + "&units=metric&APPID=d6d80fd647a85398205dd2295e192f7c";
			$.getJSON(str)
			.done(function (data) {
				document.getElementById("grad").innerHTML = "&nbsp" + "&nbsp" + "&nbsp" + data.main.temp + '&deg' + "C";
				document.getElementById("humid").innerHTML = "&nbsp" + "&nbsp" + "&nbsp" + data.main.humidity + "%";
				document.getElementById("pres").innerHTML = "&nbsp" + "&nbsp" + "&nbsp" + data.main.pressure + "гПа";
				//Clear = ясно
				if(data.weather[0].main === "Clear")
					document.getElementById("pic").style.backgroundImage = "url(img/sun.png)";
				else if(data.weather[0].main === "Rain")
					document.getElementById("pic").style.backgroundImage = "url(img/rain.png)";
				else if(data.weather[0].main === "Snow")
					document.getElementById("pic").style.backgroundImage = "url(img/snow.png)";
				else if(data.weather[0].main === "Clouds")
					document.getElementById("pic").style.backgroundImage = "url(img/cloud.png)";
				else if(data.weather[0].main === "Mist" || data.weather[0].main === "Haze")
					document.getElementById("pic").style.backgroundImage = "url(img/mist.png)";				
			}).error(function (err) {alert('ошибка');});
		}
		
		function fillStorage(str) {
			var strStorage = placeArray.join(",");
			strStorage += ",";
			strStorage += str;
			localStorage.place = strStorage;
		}

		function getStorage() {
			var strStorage = new String();
			strStorage = localStorage.getItem("place");
			console.log(strStorage);
			if(strStorage === null)
				return;
			if(strStorage.length != 0)
				placeArray = strStorage.split(",");
		}
		
		function addPlace() {
			var val = document.getElementById("newPlace").value;
			fillStorage(val);
			getStorage();
			document.getElementById("newPlace").value = "";
			appendPlace(placeArray[placeArray.length-1],placeArray.length-1);
			document.getElementById("place").lastChild.setAttribute("selected", "selected");
			choosePlace();
		}
		
		function clearPlaceSelect() {
			var listPlaces = document.getElementById("place").getElementsByTagName("option");
			for(var i=listPlaces.length; i > 0 ; i--)
				document.getElementById("place").removeChild(listPlaces[i-1]);
		}

		function appendPlace(item, index){
			var tmp = document.createElement("option");
			tmp.innerHTML = item;
			document.getElementById("place").appendChild(tmp);
		}

		function fillPlacesList() {
			getStorage();
			placeArray.forEach(appendPlace);
		}
		
		function choosePlace(){
			plc = document.getElementById("place").value;
			getWeather(plc);
		}
////////////////////////////////////////////////////////////////////////////////	
		function output(){
			var i=0;
			var str;
			for(i=0; i < 100; i++)
			{
				if( (i%3) == 0 && (i%5) !=0)
					str+="Fuzz,";
				else if( (i%3) != 0 && (i%5) == 0)
					str+="Buzz,";
				else if((i%3) == 0 && (i%5) == 0)
					str += "FuzzBuzz,";
				else
					str += i + ",";
			}
			console.log(str);
		}
	
/*		
		function makeCounter(){
			var currentCount = 1;
		//	console.log("Scope: " + currentCount);
			return function(){
				currentCount++;
			//	console.log("inside: " + currentCount);
				return currentCount;
			}
		}
		
		var counter = makeCounter();
		
		console.log(counter());
*/		
