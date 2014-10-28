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
	if(VirtualInput.touchPlayer() || iniSwap)
	{
		inputs[0] = false;
		inputs[1] = false;
		inputs[2] = false;
	}	
	scrPlayer.setInputs(inputs);

	changeControl();
	
	if(endMoon && endSun)
	{
		Debug.Log("Ended");
	}
	
	if(iniSwap) swap();

	
}


function OnGUI()
{
	if(!iniSwap)
	{
		if(GUI.Button(Rect(Screen.width*0.02,Screen.height*0.1,Screen.width*0.07,Screen.height*0.07),"Swap"))
		{
			iniSwap = true;
			phase = 0;
			posSunSwap  = objSun.transform.position;
			posMoonSwap  = objMoon.transform.position;
		}
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
private var iniSwap : boolean;
private var phase : int;

var posSunSwap : Vector3 ;
var posMoonSwap : Vector3 ;


function swap()
{
	
	switch(phase)
	{
		case 0:
			if((objMoon.transform.localScale.magnitude > 0.1 || objSun.transform.localScale.magnitude > 0.1))
			{
				objMoon.transform.localScale = Vector3.Lerp(objMoon.transform.localScale,Vector3.one*0.05,Time.deltaTime*20);
				objSun.transform.localScale = Vector3.Lerp(objSun.transform.localScale,Vector3.one*0.05,Time.deltaTime*20);
				scrMoon.inverDir = false;	

			}
			else
			{
		//		iniSwap = false;
				phase = 1;
//				objMoon.transform.position = posSunSwap;
//				objSun.transform.position = posMoonSwap;
			}
		break;
		
		
		case 1:
			
			
			objSun.rigidbody.useGravity = false;
			
			objMoon.transform.position = Vector3.Lerp(objMoon.transform.position,posSunSwap,Time.deltaTime*20);
			objSun.transform.position = Vector3.Lerp(objSun.transform.position,posMoonSwap,Time.deltaTime*20);
			
			if( Vector3.Distance(objMoon.transform.position,posSunSwap) < 0.1 &&
				Vector3.Distance(objSun.transform.position,posMoonSwap) < 0.1)
			{
				phase = 2;
			}

		
		break;
		
		case 2:
		
			if(((objMoon.transform.localScale-Vector3.one*0.5).magnitude > 0.01 && (objSun.transform.localScale-Vector3.one*0.5).magnitude > 0.01))
			{
				objMoon.transform.localScale = Vector3.Lerp(objMoon.transform.localScale,Vector3.one*0.5,Time.deltaTime*20);
				objSun.transform.localScale = Vector3.Lerp(objSun.transform.localScale,Vector3.one*0.5,Time.deltaTime*20);
				scrMoon.inverDir = false;	
			}
			else
			{
				phase = 0;
				iniSwap = false;
				objSun.rigidbody.useGravity = true;

			}
		
		break;
	}
	
	
//	scrMoon.setGravity(Physics.gravity);
		
	
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
			if(target == "SunInput")
			{
				currPlayer = 1;
				scrPlayer = scrSun;
				tagControl.transform.parent = objSun.transform;
				tagControl.transform.localPosition = Vector3.zero;
				
				scrMoon.setActive(false);
				scrSun.setActive(true);
				objMoon.rigidbody.angularVelocity.z =0;

			}
			if(target == "MoonInput")
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
