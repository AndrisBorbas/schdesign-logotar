var hamburger;
var hiddenMenu;
var hamburgerButton;
var dataBase;
var cardGrid;
var menuItems;
var isHiddenMenuActive = false;

window.onload = initMenu;

function initMenu() {
	hamburger = document.getElementsByClassName("hamburger-button")[0];
	hiddenMenu = document.getElementsByClassName("hidden-menu")[0];
	hamburgerButton = hamburger.getElementsByClassName("fa-bars")[0];

	hamburger.onclick = toggleHamburger;

	buildGrid("simonyi");
	menuItems = document.getElementsByClassName("menu-items")[0];
	menuItems.addEventListener("click", function(){
		let targetElement = event.target
		if (targetElement.tagName == "A"){
			let tempMenuActive = document.getElementsByClassName("menu-active")[0];
			tempMenuActive.classList.toggle("menu-active");
			targetElement.classList.toggle("menu-active");
			buildGrid(event.target.dataset.group);
		}
	});

	hiddenMenu.addEventListener("click", function(){
		let targetElement = event.target
		if (targetElement.tagName == "A"){
			toggleHamburger();
			buildGrid(targetElement.dataset.group);
		}
	});
}

function toggleHamburger(){
	if (!isHiddenMenuActive){
		isHiddenMenuActive = true;
		hiddenMenu.style.visibility = "visible";
		hiddenMenu.style.zIndex = "2";
		hamburgerButton.classList.toggle("fa-times");
	}
	else if(isHiddenMenuActive){
		isHiddenMenuActive = false;
		hiddenMenu.style.visibility = "hidden";
		hiddenMenu.style.zIndex = "-1";
		hamburgerButton.classList.toggle("fa-times");
	}
	else{
		console.log("Error #1: isHiddenMenuActive has invalid data");
	}
}

function buildGrid(groupNameFromCaller) {

	cardGrid = document.getElementsByClassName("logo-library")[0];
	document.body.removeChild(cardGrid);
	cardGrid = document.createElement("div");
	cardGrid.classList.add("logo-library");
	document.body.appendChild(cardGrid);

	let request = new XMLHttpRequest();
	request.open('GET', 'assets/js/database.json', true);

	request.onload = function () {
  		dataBase = JSON.parse(this.response);
  		for (i = 0; i < dataBase.length; i++){
  			if(groupNameFromCaller == dataBase[i].parentGroup){
  				let tempASvg = document.createElement("a");
  				tempASvg.innerHTML = "SVG";
  				tempASvg.href= "assets/database/" + dataBase[i].parentGroup + "/" + dataBase[i].groupName + "/" + dataBase[i].groupName + ".svg";
	  			tempASvg.download = dataBase[i].groupName + ".svg"
	
	  			let tempAPng = document.createElement("a");
	  			tempAPng.innerHTML = "PNG";
	  			tempAPng.href= "assets/database/" + dataBase[i].parentGroup + "/" + dataBase[i].groupName + "/" + dataBase[i].groupName + ".png";
	 			tempAPng.download = dataBase[i].groupName + ".png"
	
	  			let tempAAi = document.createElement("a");
	  			tempAAi.innerHTML = "AI";
	  			tempAAi.href= "assets/database/" + dataBase[i].parentGroup + "/" + dataBase[i].groupName + "/" + dataBase[i].groupName + ".ai";
	  			tempAAi.download = dataBase[i].groupName + ".ai"
	
	  			let tempBotSpan = document.createElement("span");
	  			tempBotSpan.appendChild(tempASvg);
	  			tempBotSpan.appendChild(tempAPng);
	  			tempBotSpan.appendChild(tempAAi);
	
	  			let groupFullName = document.createElement("p");
	  			groupFullName.innerHTML = dataBase[i].groupFullName;
	
	  			let tempSecondLayerSpan = document.createElement("span");
	  			tempSecondLayerSpan.appendChild(groupFullName); 
	  			tempSecondLayerSpan.appendChild(tempBotSpan);
	
	  			let groupLogoImage = document.createElement("img");
	  			groupLogoImage.src = "assets/database/" + dataBase[i].parentGroup + "/" + dataBase[i].groupName + "/display-image.png";
	  			groupLogoImage.alt = dataBase[i].groupFullName;
	
	  			let tempCard = document.createElement("span");
	  			tempCard.appendChild(groupLogoImage);
	  			tempCard.appendChild(tempSecondLayerSpan);
	
	  			cardGrid.appendChild(tempCard);
  			}
  		}
	}

	request.send();
}

