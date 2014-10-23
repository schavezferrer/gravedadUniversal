#pragma strict

class Sun extends Players
{
	function Sun(){}
	function Sun(p : GameObject)
	{
		player = p;
	}
	
	
	
	
}


function getScript() : Sun {return scrSun;}

private var scrSun : Sun;

function Awake()
{
	scrSun = new Sun(gameObject);
}

function OnCollisionStay(col : Collision)
{
	scrSun.setGrounded(true);
}

function OnCollisionExit(col : Collision)
{
	scrSun.setGrounded(false);
}	