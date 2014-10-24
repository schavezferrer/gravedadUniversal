#pragma strict


var objMoon : GameObject;
private var scrMoon : Moon;

var objSun : GameObject;
private var scrSun : Sun;

var tagControl : GameObject;
var linkControl : GameObject;

private var scrPlayer : Players;
private var currPlayer : int;

private var inputs : boolean[];

private var endMoon : boolean;
private var endSun : boolean;

private var linked : boolean;


function Start () {

	scrMoon = (objMoon.GetComponent(moon) as moon).getScript();
	scrSun = (objSun.GetComponent(sun) as sun).getScript();
	
	scrPlayer = scrMoon;
	currPlayer = 0;
	
	inputs = VirtualInput.UpdateInput();	
	scrMoon.setInputs(inputs);
	scrSun.setInputs(inputs);
	
	tagControl.transform.parent = objMoon.transform;
	tagControl.transform.localPosition = Vector3.zero;

}

function Update () 
{
	inputs = VirtualInput.UpdateInput();	
	scrPlayer.setInputs(inputs);

	changeControl();
	
	if(endMoon && endSun)
	{
		Debug.Log("Ended");
	}
	
	
}


function OnGUI()
{
	if(GUI.Button(Rect(Screen.width*0.02,Screen.height*0.1,Screen.width*0.07,Screen.height*0.07),"Swap"))
	{
		swap();
	}
	
	if(GUI.Button(Rect(Screen.width*0.02,Screen.height*0.1+100,Screen.width*0.07,Screen.height*0.07),"Link"))
	{
		linked = !linked;
		linkControl.particleSystem.renderer.enabled = linked;
	}
	
	
}

function FixedUpdate()
{
	scrMoon.movement();
	scrSun.movement();
//	if(Input.GetKeyDown(KeyCode.S))
//	{
//		swap();
//	}
//	if(Input.GetKeyDown(KeyCode.C))
//	{
//		changeControl();
//	}
	
	if(linked) link();

	
}

function swap()
{
	var posSun : Vector3 = objSun.transform.position;
	var posMoon : Vector3 = objMoon.transform.position;
	
	objMoon.transform.position = posSun;
	objSun.transform.position = posMoon;
	
//	scrMoon.setGravity(Physics.gravity);
		
	scrMoon.inverDir = false;
	
}	

function link()
{	
	var dir : Vector3;
	if(currPlayer == 0)
	{
		dir  = (objMoon.transform.position - objSun.transform.position);
		objSun.rigidbody.AddForce(dir.normalized*dir.magnitude*5-Physics.gravity);
		linkControl.transform.position = objMoon.transform.position;
		linkControl.transform.right = -dir.normalized;
		linkControl.particleSystem.startLifetime = dir.magnitude/5;
	
	}
	else if(currPlayer == 1)
	{
		dir = -(objMoon.transform.position - objSun.transform.position);
		objMoon.rigidbody.AddForce(dir.normalized*dir.magnitude*5-Physics.gravity);
		linkControl.transform.position = objSun.transform.position;
		linkControl.transform.right = -dir.normalized;
		linkControl.particleSystem.startLifetime = dir.magnitude/5;
		
	}
}

function changeControl()
{
	
//	if(inputs[3] || Input.GetKeyDown(KeyCode.C))
//	{
//		if(Input.GetKeyDown(KeyCode.C))
//		{
//			if(currPlayer == 1) target = "Moon";
//			if(currPlayer == 0) target = "Sun";
//		} else 	

		if(inputs[3])
		{
			var target : String;

			target = VirtualInput.touchPlayer();
//
//			if(currPlayer == 1) target = "Moon";
//			if(currPlayer == 0) target = "Sun";
			if(target == "Sun")
			{
				currPlayer = 1;
				scrPlayer = scrSun;
				tagControl.transform.parent = objSun.transform;
				tagControl.transform.localPosition = Vector3.zero;
				
				scrMoon.setActive(false);
				scrSun.setActive(true);
				objMoon.rigidbody.angularVelocity.z =0;

			}
			if(target == "Moon")
			{
				currPlayer = 0;
				scrPlayer = scrMoon;
				tagControl.transform.parent = objMoon.transform;
				tagControl.transform.localPosition = Vector3.zero;
				scrMoon.setActive(true);
				scrSun.setActive(false);		
				objSun.rigidbody.angularVelocity.z =0;
			}
		}
//	}
}

function setEndMoon(val : boolean)
{
	endMoon = val;	
}

function setEndSun(val : boolean)
{
	endSun = val;	
}
