#pragma strict

class Sun extends Players
{
	function Sun(){}
	function Sun(p : GameObject)
	{
		player = p;
		type = 1;
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
	scrSun.onStay(col);
}

function OnCollisionExit(col : Collision)
{
	scrSun.setGrounded(false);
}	