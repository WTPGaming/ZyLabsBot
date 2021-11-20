function clickElement(ele){
	var click= new Event('click');
	ele.dispatchEvent(click);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

clickSubmitMode();

async function clickSubmitMode(){
    await sleep(100);
	if (typeof(document.querySelector("button.zb-button.secondary.last")) != 'undefined' && document.querySelector("button.zb-button.secondary.last") != null){
		clickElement(document.querySelector("button.zb-button.secondary.last"));
		clickSubmit();
	}else{
		clickSubmitMode();
	}
};

async function clickSubmit(){
    await sleep(100);
	if (typeof(document.getElementsByClassName("submit-button")) != 'undefined' && document.getElementsByClassName("submit-button") != null){
		if (typeof(document.getElementsByClassName("test-result")) != 'undefined' && document.getElementsByClassName("test-result") != null){
			getSolutions();
		}else{
			clickElement(document.getElementsByClassName("submit-button")[0]);
		}
	}else{
		clickSubmit();
	}
};

async function getSolutions(){
    await sleep(500);
	if (typeof(document.getElementsByClassName("test-result")) != 'undefined' && document.getElementsByClassName("test-result") != null){
		var inputs = new Array();
		var outputs = new Array();
		//input
		for(i=0;i<document.querySelectorAll('div[data-test-selector="test-input"]').length;i++){
			for(a=0;a<document.querySelectorAll('div[data-test-selector="test-input"]')[i].parentElement.getElementsByClassName("programming-code-output").length;a++){
				inputs.push(document.querySelectorAll('div[data-test-selector="test-input"]')[i].parentElement.getElementsByClassName("programming-code-output")[a].innerHTML.replace(/'/g, "\\'").replace(/"/g, '\\"'));
			}
		}

		//output
		for(i=0;i<document.querySelectorAll('div[data-test-selector="expected-output"]').length;i++){
			for(a=0;a<document.querySelectorAll('div[data-test-selector="expected-output"]')[i].parentElement.getElementsByClassName("programming-code-output").length;a++){
				outputs.push(document.querySelectorAll('div[data-test-selector="expected-output"]')[i].parentElement.getElementsByClassName("programming-code-output")[a].innerHTML.replace(/\n/g,'\\n').replace(/'/g, "\\'").replace(/"/g, '\\"'));
			}
		}
		formatSolution(inputs, outputs);
	}else{
		getSolutions();
	}
};

function formatSolution(input, output){
	var smallest = 10000;

	for(i=0;i<input.length;i++){
		if(input[i].length < smallest){
			smallest = input[i].length
		}
	}
	var resSmallest = 0;

	for(a=0;a<smallest;a++){
		var matches = false;
		var letters = "";
		for(i=0;i<input.length;i++){
			if(letters.indexOf(input[i][a]) > -1){
				matches = true
			}
			letters = letters + " " + input[i][a]
		}
		if(matches == false){
			resSmallest = a+1;
			break;
		}
	}

	var solution = 'Scanner scnr = new Scanner(System.in);\nString input = scnr.nextLine();\n'
	for(i=0;i<input.length;i++){
		solution = solution + 'if(input.substring(0,'+resSmallest+').equals("'+input[i].substring(0,resSmallest)+'")){System.out.println("'+output[i].substring(0, output[i].length - 2)+'");}\n'
	}
	//console.log(resSmallest);
	console.log(solution);
}
