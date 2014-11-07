#pragma strict

var startFeedback : GameObject;
var targetPostStart : GameObject;
var guia : GameObject;

var emulate : boolean;

var maxDist : float = 10;

var objMoon : GameObject;
private var scrMoon : Moon;

var objSun : GameObject;
private var scrSun : Sun;

//var tagControl : GameObject;
var linkControl : GameObject;

private var scrPlayer : Players;
private var currPlayer : int;

private var inputs : boolean[];

private var endMoon : boolean;
private var endSun : boolean;

private var linked : boolean;

private var posSunSwap : Vector3 ;
private var posMoonSwap : Vector3 ;

private var moonEnabled : boolean;
private var sunEnabled : boolean;
private var swapEnabled : boolean;

private var timerEnd : float;
private var timerStart : float;

private var starting : boolean;

private var far : boolean;

function Start () {

	scrMoon = (objMoon.GetComponent(moon) as moon).getScript();
	scrSun = (objSun.GetComponent(sun) as sun).getScript();
	VirtualInput.setEmulate(emulate);
	scrPlayer = scrMoon;
	currPlayer = 0;
	moonEnabled = true;
	sunEnabled = true;
	inputs = VirtualInput.UpdateInput(scrPlayer);	
	scrMoon.setInputs(inputs);
	scrSun.setInputs(inputs);
	swapEnabled = Application.loadedLevelName != "Level1" && Application.loadedLevelName != "Level2";	
//	tagControl.transform.parent = objMoon.transform;
//	tagControl.transform.localPosition = Vector3.zero;

	objSun.transform.FindChild("TagControl").active = false;
	objMoon.transform.FindChild("TagControl").active = true;
	starting = true;
	
	
	guia.transform.parent = objMoon.transform;
	guia.transform.localPosition = Vector3(0,0,-2);
	(guia.GetComponent(apuntarTarget) as apuntarTarget).setTarget("Moon");

}

function Update () 
{
	if(starting)
	{
		timerStart += Time.deltaTime;
		if(timerStart < 1) (startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).text = "Starting . . .";
		else if(timerStart >= 1 && timerStart <2) (startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).text = "Ready ! !";
		else if(timerStart >= 2) 
		{
			(startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).text = "Let's Go !";
			(startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).color.a -= Time.deltaTime*1.5;
			startFeedback.renderer.material.SetVector("_TintColor",Vector4(0,0,0,1 - (timerStart-2)*1.5));
			if(targetPostStart != null) targetPostStart.active = true;
		}
				
		if(timerStart > 3) 
		{
			
			starting = false;
		}
		
		scrMoon.setInputs(VirtualInput.newInputs());
		scrSun.setInputs(VirtualInput.newInputs());
	}
	else
	{
		inputs = VirtualInput.UpdateInput(scrPlayer);
		var distB = Vector3.Distance(objMoon.transform.position,objSun.transform.position);

		
		if(VirtualInput.touchPlayer() || iniSwap)
		{
			inputs[0] = false;
			inputs[1] = false;
			inputs[2] = false;
		}
		
	//	if(distB > maxDist*0.8)
	//	{
	//		linkControl.active= true;
			if(!linked)
			{
				linkControl.transform.GetChild(0).particleSystem.startColor = Vector4(255,213,101,0)/255.0;
				linkControl.transform.GetChild(0).particleSystem.startColor.a = (distB - maxDist*0.7)/(maxDist-maxDist*0.7);
				linkControl.transform.GetChild(0).particleSystem.startSpeed = 0;
				linkControl.transform.GetChild(0).particleSystem.emissionRate = 120;
				
				linkControl.transform.GetChild(1).particleSystem.startColor = Vector4(1,1,1,0);
				linkControl.transform.GetChild(1).particleSystem.startColor.a = (distB - maxDist*0.7)/(maxDist-maxDist*0.7)*80/255;
			}
			
	//	}
	//	else linkControl.active= false;
		
		if(distB > maxDist)
		{
			var dir : Vector2; 
			far = true;
			if(currPlayer == 0)
			{
				dir = Vector2(objSun.transform.position.x,objSun.transform.position.y) - 
					  Vector2(objMoon.transform.position.x,objMoon.transform.position.y);
				
				scrMoon.stop = 0;
				
				if(dir.x < 0 && inputs[1]) 
				{
					inputs[1] = false;
					inputs[2] = false;
					objMoon.rigidbody.velocity.x = 0;

				}
				else if(dir.x > 0 && inputs[0]) 
				{
					inputs[0] = false;
					inputs[2] = false;

				}
				else if(dir.x < 0 && inputs[0] )
				{
					scrMoon.stop = 1;
				}
				else if(dir.x > 0 && inputs[1] )
				{
					scrMoon.stop = 1;
				}
				else if(!inputs[0] && !inputs[1])
				{
					scrMoon.stop = 1;
				}
				
				
				if(objMoon.rigidbody.velocity.x>0 || objMoon.rigidbody.velocity.x < 0)
				{
					objMoon.rigidbody.velocity.x = 0;
				}
	//			else 
			}
			
			if(currPlayer == 1)
			{
				dir = Vector2(objMoon.transform.position.x,objMoon.transform.position.y) - 
					  Vector2(objSun.transform.position.x,objSun.transform.position.y);
				
				scrSun.stop = 0;
				
				if(dir.x < 0 && inputs[1]) 
				{
					inputs[1] = false;
					inputs[2] = false;
					objSun.rigidbody.velocity.x = 0;

				}
				else if(dir.x > 0 && inputs[0]) 
				{
					inputs[0] = false;
					inputs[2] = false;

				}
				else if(dir.x < 0 && inputs[0] )
				{
					scrMoon.stop = 1;
				}
				else if(dir.x > 0 && inputs[1] )
				{
					scrMoon.stop = 1;
				}
				else if(!inputs[0] && !inputs[1])
				{
					scrMoon.stop = 1;
				}
				
				
				if(objSun.rigidbody.velocity.x>0 || objSun.rigidbody.velocity.x < 0)
				{
					objSun.rigidbody.velocity.x = 0;
				}
	//			else 
			}
		}
		else 
		{
			far = false;
			scrSun.stop = 1;
		}

		changeControl();
		
		if(endMoon && endSun)
		{
			moonEnabled = false;
			sunEnabled = false;
			
			timerEnd += Time.deltaTime;
			startFeedback.transform.GetChild(0).position = Camera.main.transform.position + Camera.main.transform.forward*5;
		
			(startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).text = "DONE!";
			(startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).color.a += Time.deltaTime*1.5;
			startFeedback.renderer.material.SetVector("_TintColor",Vector4(0,0,0,timerEnd*1.5));
			
			if(timerEnd > 2) Application.LoadLevel(Application.loadedLevel+1);		
		}
		else
		{
			timerEnd = 0;
			(startFeedback.transform.GetChild(0).GetComponent(TextMesh) as TextMesh).color.a = 0;
			if(!endMoon) moonEnabled = true;
			if(!endSun) sunEnabled = true;
			startFeedback.renderer.material.SetVector("_TintColor",Vector4(0,0,0,0));
		}
		
		if(iniSwap) swap();
		
		
		if((moonEnabled && currPlayer == 0) || (sunEnabled && currPlayer == 1) ) scrPlayer.setInputs(inputs);
		if (!moonEnabled) scrMoon.setInputs(VirtualInput.newInputs());
		if (!sunEnabled) scrSun.setInputs(VirtualInput.newInputs());
	}

	
}

function getFar() :  boolean
{
	return far;
}
function setSwapEnabled(val : boolean)
{
	swapEnabled = val;
}	
function setMoonEnabled(val : boolean)
{
	moonEnabled = val;
}	
function setSunEnabled(val : boolean)
{
	sunEnabled = val;
}
function getCurrPlayer()
{
	return currPlayer;
}

function getSunEnabled()
{
	return sunEnabled;
}
function getMoonEnabled()
{
	return moonEnabled;
}



function setLinked(val : boolean)
{
	linked = val;
	if(linked) 
	{
		if(currPlayer == 0)
		{
			linked = false;
		}

		
	}
//	else	linkControl.transform.position = objSun.transform.position;

	if(linked)
	{
//		linkControl.transform.GetChild(0).particleSystem.startColor = Vector4(1,0,0,0);
		linkControl.transform.GetChild(0).particleSystem.emissionRate = 500;

		linkControl.transform.GetChild(0).particleSystem.startSpeed = 1;
		linkControl.transform.GetChild(0).particleSystem.startColor.a = 1;
		linkControl.transform.GetChild(1).particleSystem.startColor = Vector4(255,60,0,80)/255.0;
//		linkControl.transform.GetChild(1).particleSystem.startColor.a = 80.0/255;
	}
//	linkControl.active = linked;
}

function OnGUI()
{
	if(!iniSwap && swapEnabled)
	{
		if(GUI.Button(Rect(Screen.width*0.02,Screen.height*0.1,Screen.width*0.07,Screen.height*0.07),"Swap"))
		{
			iniSwap = true;
			phase = 0;
			posSunSwap  = objSun.transform.position;
			posMoonSwap  = objMoon.transform.position;
		}
	}
	
	if(GUI.Button(Rect(Screen.width*0.02,Screen.height*0.1+100,Screen.width*0.07,Screen.height*0.07),"Reload"))
	{
//		linked = !linked;
//		linkControl.particleSystem.renderer.enabled = linked;

		Application.LoadLevel(Application.loadedLevelName);
	}
	
	
}

function FixedUpdate()
{
	scrMoon.movement();
	scrSun.movement();

	
	if(linked) link();

	
}
private var iniSwap : boolean;
private var phase : int;



function swap()
{
	inputs[0] = false;
	inputs[1] = false;
	inputs[2] = false;
	
	scrMoon.setInputs(inputs);
	scrSun.setInputs(inputs);

	
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
			
			if( Vector3.Distance(objMoon.transform.position,posSunSwap) < 0.15 &&
				Vector3.Distance(objSun.transform.position,posMoonSwap) < 0.15)
			{
				phase = 2;
			}

		
		break;
		
		case 2:
		
			if(((objMoon.transform.localScale-Vector3.one*0.5).magnitude > 0.01 && (objSun.transform.localScale-Vector3.one*0.73).magnitude > 0.01))
			{
				objMoon.transform.localScale = Vector3.Lerp(objMoon.transform.localScale,Vector3.one*0.5,Time.deltaTime*20);
				objSun.transform.localScale = Vector3.Lerp(objSun.transform.localScale,Vector3.one*0.73,Time.deltaTime*20);
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

	}
	else if(currPlayer == 1)
	{
		dir = -(objMoon.transform.position - objSun.transform.position);
		objMoon.rigidbody.AddForce(dir.normalized*dir.magnitude*5-Physics.gravity);
	
	}
}

function changeControl()
{
	
//	if(inputs[3] || Input.GetKeyDown(KeyCode.C))
//	{
//		if(Input.GetKeyDown(KeyCode.C))
//		{
//			if(currPlayer == 1) target = "Luna";
//			if(currPlayer == 0) target = "Sol";
//		} else 	

		if(inputs[3])
		{
			var target : String;

			target = VirtualInput.touchPlayer();
//
//			if(currPlayer == 1) target = "Luna";
//			if(currPlayer == 0) target = "Sol";
			if(target == "SunInput" && sunEnabled)
			{
				currPlayer = 1;
				scrPlayer = scrSun;
//				tagControl.transform.parent = objSun.transform;
//				tagControl.transform.localPosition = Vector3.zero;
				objSun.transform.FindChild("TagControl").active = true;
				objMoon.transform.FindChild("TagControl").active = false;
				
				inputs[0] = false;
				inputs[1] = false;
				inputs[2] = false;
				
				scrMoon.setInputs(inputs);

				
				scrMoon.setActive(false);
				scrSun.setActive(true);
				objMoon.rigidbody.angularVelocity.z =0;
				
				guia.transform.parent = objSun.transform;
				guia.transform.localPosition = Vector3(0,0,-2);
				(guia.GetComponent(apuntarTarget) as apuntarTarget).setTarget("Sun");

			}
			if(target == "MoonInput" && moonEnabled)
			{
				currPlayer = 0;
				scrPlayer = scrMoon;
//				tagControl.transform.parent = objMoon.transform;
//				tagControl.transform.localPosition = Vector3.zero;
				
				objSun.transform.FindChild("TagControl").active = false;
				objMoon.transform.FindChild("TagControl").active = true;
				
				inputs[0] = false;
				inputs[1] = false;
				inputs[2] = false;
				
				scrSun.setInputs(inputs);
				
				scrMoon.setActive(true);
				scrSun.setActive(false);		
				objSun.rigidbody.angularVelocity.z =0;
				
				guia.transform.parent = objMoon.transform;
				guia.transform.localPosition = Vector3(0,0,-2);
				(guia.GetComponent(apuntarTarget) as apuntarTarget).setTarget("Moon");
				
				
				setLinked(false);
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
