 var isSafari = ((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Safari") != -1));
var isIE5 = (navigator.userAgent.indexOf("MSIE 5.") != -1) ; 
var isIE6 = (navigator.userAgent.indexOf("MSIE 6.") != -1); 
var isIE7 = (navigator.userAgent.indexOf("MSIE 7.") != -1); 
var isIE8 = (navigator.userAgent.indexOf("MSIE 8.") != -1); 
var isPc = (navigator.userAgent.indexOf("Windows") != -1);
 if(isPc){
  console.log(" is PC");
	if(isIE7 || isIE5 || isIE6){
		console.log(" ie 7");
		window.location="update.html";
	}
 }
 
 if(isSafari){
	console.log(" safari ");
 }
 //detect ie on mac
	var _ie_on_mac_ = navigator.userAgent.indexOf("mac") > -1;
	
	if(_ie_on_mac_)
	{	if(isIE5 || isIE6 || isIE7)	
		{
			window.location="update.html";
		}
	}
	
	
//now lets start with project by first creating form to store cookies
//we create form called by onload function
function create_form_name_local_cookies(){
	
	var _form_div = document.createElement('div');
	_form_div.setAttribute('class','name-form-lightbox-effect');
	_form_div.setAttribute('id','cookie_form');
	
	//create a different form css for ie8 since most features of css3 not supported
	if(isIE8){
		//_form_div.style.setAttribute('border','3px solid #ccc');
		_form_div.setAttribute('style','border:3px solid #ccc');
		_form_div.style.setAttribute('margin-top','5%');
	}
	
	//create input tag for form 
	var _form_tag = document.createElement('form');
	//_form_tag.setAttribute('onsubmit','validate_create_form_name_local_cookies()');
	_form_tag.setAttribute('name','form_name');
	_form_tag.setAttribute('action','canvas.html');
	//_form_tag.setAttribute('method','POST');
	
	//create break tag to partition both tags
	var _break_tag = document.createElement('br');
	var _input_f_name = document.createElement('input');
	_input_f_name.setAttribute('type','text');
	_input_f_name.setAttribute('name','first');
	_input_f_name.setAttribute('size','30');
	
	//create last name
	var _input_l_name = document.createElement('input');
	_input_l_name.setAttribute('type','text');
	_input_l_name.setAttribute('name','last');
	_input_l_name.setAttribute('size','30');
	
	//create submit button
	var submit_button = document.createElement('input');
	submit_button.setAttribute('type','button');
	submit_button.setAttribute('value','Submit');
	submit_button.setAttribute('name','submit_button');
	submit_button.setAttribute('onclick','validate_create_form_name_local_cookies()');
	
	//create reset button
	var reset_button = document.createElement('input');
	reset_button.setAttribute('type','reset');
	reset_button.setAttribute('value','Reset');
	reset_button.setAttribute('name','reset_button');
	
	
	//create first name text node
	var _f_name_text_node = document.createTextNode('First Name');
	//create last name text node
	var _l_name_text_node = document.createTextNode('Last Name');
	
	//now append all created tag
	_form_tag.appendChild(_f_name_text_node); //first name text node
	_form_tag.appendChild(_input_f_name); //first name input tag
	_form_tag.appendChild(_break_tag); //break
	_form_tag.appendChild(_l_name_text_node); //last name text node
	_form_tag.appendChild(_input_l_name); //last name input tag
	_form_tag.appendChild(submit_button); //submit button
	_form_tag.appendChild(reset_button); //submit button
	_form_div.appendChild(_form_tag); //append form the form to div
	
	//append the form to main id
	document.getElementById('main').appendChild(_form_div); 
}

//now validate the input
function validate_create_form_name_local_cookies()
{
	var _first_name;
	var _last_name;
	var getHits;
		if(GetCookie('fname') == null || GetCookie('lname') == null){
		
		getName = document.form_name.first.value;
		lastName = document.form_name.last.value;
			if(document.form_name.first.value == "" || document.form_name.last.value == ""){
			
			alert('<h3> Please Enter Your First Name and Last Name to Proceed </h3>');
			
			}else{
			console.log("name is "+getName);
			console.log("last is "+lastName);
			SetCookie('fname', getName);
			SetCookie('lname', lastName);
			SetCookie('hit_count','1');		
			create_welcome_msg(getName, lastName,'1');
			}
		}
		else{
		//if user entered the form without any error store the cookie
		_first_name = GetCookie('fname');
		_last_name = GetCookie('lname');
		getHits = GetCookie('hit_count');
		create_welcome_msg(_first_name, _last_name,getHits);
		}
		
}

/////////////////////////////////////////////////////////////////////
//function to create welcome message
//
/////////////////////////////////////////////////////////////
function create_welcome_msg(_f_name, _l_name,_hits){
	var _first_name = _f_name;
	var _last_name = _l_name;
	var getHits = _hits;
	if(_first_name != document.form_name.first.value || _last_name != document.form_name.last.value){
				alert("Your name is already locally stored, you cannot change it"+"<br/> to change the name close the browser and open the project again. Thank You ");
			}
			//create a div to dispay the welcome message
			var cookie_div = document.createElement('div')
			cookie_div.setAttribute('class','name-form-lightbox-effect');
			cookie_div.setAttribute('id','cookie_storage_div_id');
			
			//display a welcome message to the user
			var _wel_come_msg = " Welcome, "+ _first_name + " to Dynamic Bar"+" You have visited this bar " + getHits+" times.";
			getHits = parseInt(getHits) + 1;
			
			//set hit counts so that it be incremental after every visit
			SetCookie('hit_count', ''+ getHits, expiry);
			
			//append the welcome message to the text node
			var cookie_store_text = document.createTextNode(_wel_come_msg);
			
			//append the text node to the div
			cookie_div.appendChild(cookie_store_text);
			
			//remove the form
			document.getElementById('main').removeChild(document.getElementById('cookie_form'));
			
			//create restart button
			var _restart = document.createElement('input');
			_restart.setAttribute('name','restart');
			_restart.setAttribute('value',' Order Again');
			_restart.setAttribute('class','button');
			_restart.setAttribute('id','order');
			_restart.setAttribute('type','button');
			_restart.setAttribute('onclick','clear_form()');
			
			//append to the div
			document.getElementById('div_select').appendChild(_restart);
			
			//after removing the form append the child
			document.getElementById('main').appendChild(cookie_div);
			
			//now finally the select tag
			create_select_tags('begin');


}//end of welcome msg

//////////////////////////////////////////////////////////////////////////
//function to order again
//
///////////////////////////////////////////////////////////////////////////
function clear_form(){
	what = document.getElementById("div_select");
	console.log(what);
	 while(what.hasChildNodes()){
			// //i++;
			// console.log(" ------ in while ----");
			// //console.log(i);
			// console.log(what.parentNode);
			// console.log("compare");
			// console.log(what.parentNode.parentNode.lastChild);
			// console.log("----end of in while ----");
			
			what.removeChild(what.firstChild);
		}
	//create_select_tags("begin");
	
	//create restart button
			var _restart = document.createElement('input');
			_restart.setAttribute('name','restart');
			_restart.setAttribute('value',' Order Again');
			_restart.setAttribute('class','button');
			_restart.setAttribute('id','order');
			_restart.setAttribute('type','button');
			_restart.setAttribute('onclick','clear_form()');
			
			//append to the div
			document.getElementById('div_select').appendChild(_restart);
	
	create_select_tags("begin");
	
}

////////////////////////////////////////////////////////////////////////////
//function to create select tags
//
///////////////////////////////////////////////////////////////////////////
function create_select_tags(what){
	
	var which;
	if(document.getElementById("myCanvas")){
		document.getElementById("myCanvas").style.visibility = "hidden";
		//document.getElementById("myCanvas").style.display = "none";
	}
	
	remove_your_order();
	
	//check the selection
	if( what == 'begin'){
		//then assign 
		which = what;
		
	}else{
	
		//which ever the select tag value is
		which = what.value;
		
		console.log( "which " + which);
		console.log(which.parentNode);
		//console.log(" parent parent "+which.parentNode.parentNode.nodeName);
		//console.log(" parent parent last "+what.parentNode.lastChild.nodeName);
		console.log(what.parentNode.lastChild);
		console.log("above last child node outside while");
		//to remove previous selection not part of array
		var i = 0;
		while(what.parentNode != what.parentNode.parentNode.lastChild){
			i++;
			console.log(" ------ in while ----");
			console.log(what.parentNode);
			console.log(what.parentNode.parentNode);
			console.log("compare");
			console.log(what.parentNode.parentNode.lastChild);
			console.log("----end of in while ----");
			
			what.parentNode.parentNode.removeChild(what.parentNode.parentNode.lastChild);
		}
	
	} //end of if begin
	
	//now store the local storage in the function where we need to do local storage
	//window.storage of typeof()
	if(typeof(Storage) != "undefined"){
		
		
		//now check selection in array to display the select tag
		if(select[which]){
		
			var _select_div = document.createElement('div');
			_select_div.setAttribute('id',select[which][0]); //select.which.0 assign the numerical value to the div
			_select_div.setAttribute('class','select-tag-class select-tag-oval');
			
			
			//now create the select tag and append to dynamicaly created div
			var _select_tag = document.createElement('select');
			_select_tag.setAttribute('id',which);
			
			_select_tag.setAttribute('onchange','create_select_tags(this)');
			
			//now iterate the value from array to assign to option tag
			//for loop iterated from 1 since 0 is the numerical value
			//which we later used for ids

			var _option_tag_default =  document.createElement('option');
			_option_tag_default.setAttribute('value',"--Select Option--");
			var _option_default = document.createTextNode("--Select Option---");
			_option_tag_default.appendChild(_option_default);				
				
			//append option to select tag
			_select_tag.appendChild(_option_tag_default);
				
			for(var i=1; i < select[which].length; i++){
				
				//to iterate for loop we need to create array
				//so store the option value in an array
				
			    _option_tag =  document.createElement('option');
				_option_tag.setAttribute('value',select[which][i]);
				//create text node to display
				 _option_text= document.createTextNode(select[which][i]);
				_option_tag.appendChild(_option_text);
				
				//append option to select tag
				_select_tag.appendChild(_option_tag);
				
			} //end of option tag for loop
			
			//append the select tag
			_select_div.appendChild(_select_tag);
			
			//var storeDiv = document.createElement('div');
			//storeDiv.setAttribute('id','storeDiv');
			//append the div to the div with main id
			//storeDiv.appendChild(_select_div);
			document.getElementById('div_select').appendChild(_select_div);
			
			var _element_id = select[which][0];
			
			if(document.getElementById(_element_id)){
			//console.log("inside if id 1");
			positionElement(_element_id,0,0);
			}else{
			//do nothing
			 //console.log("inside else id 1");
			}

		}else{
			//this suggest the which value in the array have no further value
			//ie we reached the final stage
			//now display the image
			
			//console.log("final round");
			display_bar_selection();
		
		}//end of selection which
	}else{
		//no local storage stored
	}

}//end of create select tag function
//////////////////////////////////////////////////////////////
//function to display final output
//
//////////////////////////////////////////////////////////////
function display_bar_selection(){
	console.log("in display bar selection");
	remove_your_order();
	var _container = " ";
	
	var _choice = " ";
	
	var _color = " ";
		
	//select the select tag for identifying the conatiner to be drawn
	var _container_select = document.getElementById("1").firstChild;
	 _container = _container_select.options[_container_select.selectedIndex].value;
	
	//select the select tag to identify the type of second choice
	var _choice_tag = document.getElementById("2").firstChild;
	 _choice = _choice_tag.options[_choice_tag.selectedIndex].value;
	
	//to identify the color to be colored
	var _color_select = document.getElementById("3").firstChild;
	 _color = _color_select.options[_color_select.selectedIndex].value;
		
	//document.getElementById('choice-div-id').style.visibility = "visible";
	
	//ie 8 doesn't support canvas 
	if(isIE8){
		your_order(_container,_choice,_color);
	}else{
		create_selection(_container,_color);
		your_order(_container,_choice,_color);
	}
}

//////////////////////////////////////////////////////////////
//function to create selection to display it
//
/////////////////////////////////////////////////////////////
function create_selection(type, color){
	console.log("in create selectrion");
	console.log(type);
	console.log(color);
	
	var mycanvas = document.getElementById('myCanvas');
	mycanvas.style.visibility = "visible";
	
	
	
	create_anit_booze();
	create_anti_tin();
	create_anti_Bottle();
	
	if(color == "Honey" || color == "Pale_Ale" || color == "Stout"){
		color = "#B45F04";
	}else if(color == "Vodka" || color == "Maritini" || color == "Tequila" || color == "White"){
		color = "#ccc";
	}else if(color == "St_Patrick_Day_Special"){
		color = "green";
	}else if (color == "Diet" || color == "Pepsi" || color == "Cola" || color == "Regular"){
		color = "#61210B";
	}else if (color == "Mt_Dew" || color == "Sprite" || color == "Shandy"){
		color = "yellow";
	}else if (color == "Aquafina" || color == "Dasani" || color == "Tap Water"){
		color = "#00BFFF";
	}
	if(type == "Liquor"){
		create_Booze(color);
	}else if(type == "Soda"){
		create_tin(color);
	}else if(type == "Water"){
		create_Bottle(color);
	}else{
		//do nothing
	}
	
}

////////////////////////////////////////////////////////////////////
//function to create Booze bottle
//
//////////////////////////////////////////////////////////////////////
function create_Booze(shade){
	
	
	var c=document.getElementById("myCanvas");
	var context=c.getContext("2d");
	context.beginPath();
	context.rect(170, 20, 50, 140);
	context.fillStyle = 'yellow';
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();

	context.moveTo(170,160);
	context.lineTo(118,250);
	context.fillStyle = shade;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();

	context.moveTo(220,160);
	context.lineTo(268,250);

	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();

	context.beginPath();
	context.rect(118, 250, 150, 340);
	context.fillStyle = shade;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();

}
////////////////////////////////////////////////////////////////////
//function to disappar liqour bottle since clear rect fail 
//
//////////////////////////////////////////////////////////////////////
function create_anit_booze(){
console.log('in anit booze');
	var c=document.getElementById("myCanvas");
	var context=c.getContext("2d");
	context.beginPath();
	context.rect(170, 20, 50, 140);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = 'white';
	context.stroke();

	context.moveTo(170,160);
	context.lineTo(118,250);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = 'white';
	context.stroke();

	context.moveTo(220,160);
	context.lineTo(268,250);

	context.lineWidth = 2;
	context.strokeStyle = 'white';
	context.stroke();

	context.beginPath();
	context.rect(118, 250, 150, 340);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = 'white';
	context.stroke();
}

////////////////////////////////////////////////////////////////////
//function to create tin for soda
//
//////////////////////////////////////////////////////////////////////
function create_tin(shade){

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
      ctx.rect(100,120, 200, 290);
      ctx.fillStyle = shade;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(110,110);
      ctx.lineTo(100,120);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(290,110);
      ctx.lineTo(300,120);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      
      ctx.moveTo(110,110);
      ctx.lineTo(290,110);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      //lower part of tin
      ctx.moveTo(110,420);
      ctx.lineTo(100,410);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(290,420);
      ctx.lineTo(300,410);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(110,420);
      ctx.lineTo(290,420);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

}

////////////////////////////////////////////////////////////////////
//function to clear tin if alredy existed since clearRect not working
//
//////////////////////////////////////////////////////////////////////

function create_anti_tin(){

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
      ctx.rect(100,120, 200, 290);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(110,110);
      ctx.lineTo(100,120);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(290,110);
      ctx.lineTo(300,120);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      
      ctx.moveTo(110,110);
      ctx.lineTo(290,110);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      //lower part of tin
      ctx.moveTo(110,420);
      ctx.lineTo(100,410);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(290,420);
      ctx.lineTo(300,410);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(110,420);
      ctx.lineTo(290,420);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

}

////////////////////////////////////////////////////////////////////
//function to create bottle for water
//
//////////////////////////////////////////////////////////////////////
function create_Bottle(shade){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.rect(160,70, 80, 38);
      ctx.fillStyle = '#0040FF';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(100,120, 200, 290);
      ctx.fillStyle = shade;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(110,110);
      ctx.lineTo(100,120);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(290,110);
      ctx.lineTo(300,120);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      
      ctx.moveTo(110,110);
      ctx.lineTo(290,110);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      //lower part of tin
      ctx.moveTo(110,420);
      ctx.lineTo(100,410);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(290,420);
      ctx.lineTo(300,410);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.moveTo(110,420);
      ctx.lineTo(290,420);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();

}

////////////////////////////////////////////////////////////////////
//function to clear bottle of water if already drawn, code manipulation
//
//////////////////////////////////////////////////////////////////////
function create_anti_Bottle(){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.rect(160,70, 80, 38);
      ctx.fillStyle = '#FFF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(100,120, 200, 290);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(110,110);
      ctx.lineTo(100,120);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(290,110);
      ctx.lineTo(300,120);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      
      ctx.moveTo(110,110);
      ctx.lineTo(290,110);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      //lower part of tin
      ctx.moveTo(110,420);
      ctx.lineTo(100,410);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(290,420);
      ctx.lineTo(300,410);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.moveTo(110,420);
      ctx.lineTo(290,420);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

}
//////////////////////////////////////////////////////////////////////
//function to begin animation position
//
///////////////////////////////////////////////////////////////////////
function positionElement(elementID,top,left) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	elem.style.position = "absolute";
	elem.style.left = left + "px";
	elem.style.top = top + "px";
	moveElement(elementID,200,500,60)
} //postionElement

//////////////////////////////////////////////////////////////////////////
// function to create animatiom
//
/////////////////////////////////////////////////////////////////////////			
function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) { //see if a movement variable exists for this element, 
									//if it does, clear out any animation
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {  //set default left if isn't set
		elem.style.left = "0px";
	}
	if (!elem.style.top) {  //set default top if isn't set
		elem.style.top = "0px";
	}
	
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil((final_x -xpos)/10); //move faster the farther away it is, 
																  //Math.ceil - up, Math.floor - down, 
																  //Math.round - nearest up or down
		xpos = xpos + dist;
	}
	if (xpos == final_x) {
		// var dist = Math.ceil((xpos-final_x)/10); //move faster the farther away it is, Math.ceil - up, Math.floor - down, Math.round - nearest up or down
		// xpos = xpos - dist;
		parseId = parseInt(elementID);
		//console.log("parse id ");
		//console.log(parseId);
		final_x = 650;
		final_y = 50 + (parseId * 50);
		//moveElement(elementID,250,150,60)
	}

	if (xpos > final_x) {
		var dist = Math.ceil((xpos-final_x)/10); //move faster the farther away it is, Math.ceil - up, Math.floor - down, Math.round - nearest up or down
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil((final_y - ypos)/10); //move faster the farther away it is, Math.ceil - up, Math.floor - down, Math.round - nearest up or down
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil((ypos - final_y)/10); //move faster the farther away it is, Math.ceil - up, Math.floor - down, Math.round - nearest up or down
		ypos = ypos - dist;
	}
	
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval); //create the movement variable for this element
} //moveElement

//////////////////////////////////////////////////////////////////////////////////////
//function display order selection
//
//////////////////////////////////////////////////////////////////////////////////////
 function your_order(_container,_choice,_color){
	var choice_div = document.createElement('div');
	choice_div.setAttribute('class','name-form-lightbox-effect');
	choice_div.setAttribute('id','choice-div-id');
	
	if(isIE8){
		choice_div.style.setAttribute('border','3px solid #CCC');
		choice_div.style.setAttribute('margin','50 0 0 35');
		choice_div.style.setAttribute('font-family','arial, sans-serif');
	}
	var p_tag_1 = document.createElement('p');
	var p_tag_2 = document.createElement('p');
	var p_tag_3 = document.createElement('p');
	
	var span_1 = document.createElement('span');
	span_1.setAttribute('class','font-css');
	var span_2 = document.createElement('span');
	span_2.setAttribute('class','font-css');
	var span_3 = document.createElement('span');
	span_3.setAttribute('class','font-css');
	
	var label_1 = document.createTextNode(" You Ordered : ");
	var label_2 = document.createTextNode(" Of type : " );
	var label_3 = document.createTextNode(" Of flavor : ");
	
	var choice_1 = document.createTextNode(_container);
	var choice_2 = document.createTextNode(_choice);
	var choice_3 = document.createTextNode(_color);
	
	span_1.appendChild(label_1);
	span_2.appendChild(label_2);
	span_3.appendChild(label_3);
	
	p_tag_1.appendChild(span_1);
	p_tag_1.appendChild(choice_2);
	
	p_tag_2.appendChild(span_2);
	p_tag_2.appendChild(choice_1);
	
	p_tag_3.appendChild(span_3);
	p_tag_3.appendChild(choice_3);
	
	choice_div.appendChild(p_tag_1);
	choice_div.appendChild(p_tag_2);
	choice_div.appendChild(p_tag_3);
	
	document.getElementById('main').appendChild(choice_div);
 }
 
 ////////////////////////////////////////////////////////
 //
 //
 ////////////////////////////////////////////////////////
 function remove_your_order(){
 
	if(document.getElementById('choice-div-id')){
		document.getElementById('main').removeChild(document.getElementById('choice-div-id'));
	}
 }
