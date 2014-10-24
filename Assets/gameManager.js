#pragma strict


var objMoon : GameObject;
private var scrMoon : Moon;

var objSun : GameObject;
private var scrSun : Sun;

private var scrPlayer : Players;
private var currPlayer : int;

private var inputs : boolean[];


function Start () {

	scrMoon = (objMoon.GetComponent(moon) as moon).getScript();
	scrSun = (objSun.GetComponent(sun) as sun).getScript();
	
	scrPlayer = scrMoon;
	currPlayer = 0;
	
	inputs = VirtualInput.UpdateInput();	
	scrMoon.setInputs(inputs);
	scrSun.setInputs(inputs);

}

function Update () 
{
	inputs = VirtualInput.UpdateInput();	
	scrPlayer.setInputs(inputs);
	if(inputs[3]) changeControl();

	
	
}

function FixedUpdate()
{
	scrPlayer.movement();
}
function changeControl()
{
	var target : String = VirtualInput.touchPlayer();
	if(target == "Sun")
	{
		currPlayer = 1;
		scrPlayer = scrSun;
		Camera.main.GetComponent(cameraControl).target = objSun.transform;
//		Camera.main.GetComponent(SmoothLookAt).target = objSun.transform;
	}
	if(target == "Moon")
	{
		currPlayer = 0;
		scrPlayer = scrMoon;
		Camera.main.GetComponent(cameraControl).target = objMoon.transform;
//		Camera.main.GetComponent(SmoothLookAt).target = objMoon.transform;
	
	}
}
