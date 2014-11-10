#pragma strict

class Sun extends Players
{
	private var attractingField : GameObject;
	private var timerAttraction : float;
	private var minScaleField : Vector3;
	private var maxScaleField : Vector3;
	private var isAttracting : boolean;
	function Sun(){}
	function Sun(p : GameObject)
	{
		player = p;
		type = 1;
	}
	
	
	function setAtraccion(val : GameObject)
	{
		attractingField = val;
		minScaleField = attractingField.transform.localScale;
		maxScaleField = attractingField.transform.localScale*5.5;
	}
	function increaseRange()
	{
		
//			attractingField.transform.localScale *= ((maxScaleField.magnitude-attractingField.transform.localScale.magnitude)/maxScaleField.magnitude + 1+Time.deltaTime); 
			attractingField.transform.localScale = Vector3.Lerp(attractingField.transform.localScale, maxScaleField,Time.deltaTime*8);
			(attractingField.GetComponent(attraction) as attraction).attracting = true;
	}
	
	function attracting()
	{
		if(active)
		{
			if(inputs[3]) 
			{
//				timerAttraction += Time.deltaTime;
//				if(timerAttraction>0.3)
//				{
					var target : String = VirtualInput.touchPlayer();
					if(target == "SunInput")
					{	
						isAttracting = !isAttracting;
						
					}
//					else attracting = false;
//				}
			}
//			else
//			{
//				timerAttraction = 0;
//				decreaseRange();
//				(attractingField.GetComponent(attraction) as attraction).attracting = false;
//			}
		}
		if(isAttracting)
		{
//			increaseRange();
		}
		else 
		{
//			decreaseRange();
//			timerAttraction = 0;
//			(attractingField.GetComponent(attraction) as attraction).attracting = false;
		}
	}
	function decreaseRange()
	{
		attractingField.transform.localScale = Vector3.Lerp(attractingField.transform.localScale, minScaleField,Time.deltaTime*8);
	}
}


function getScript() : Sun {return scrSun;}

private var scrSun : Sun;

function Awake()
{
	scrSun = new Sun(gameObject);
}

function Start()
{
	scrSun.setAtraccion(gameObject.transform.FindChild("Atraccion").gameObject);
}

function Update()
{
	if ( scrSun.isMoving() && ( scrSun.getGrounded() == true )  ) 	{
		if ( !audio.isPlaying )
			audio.Play();
			
	}
	else {
		audio.Stop();
	}
	
//	scrSun.attracting();

}

function OnCollisionStay(col : Collision)
{
	scrSun.onStay(col);
}

function OnCollisionExit(col : Collision)
{
	scrSun.setGrounded(false);
}	