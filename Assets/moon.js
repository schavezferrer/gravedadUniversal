#pragma strict

class Moon extends Players
{
	function Moon(){}
	function Moon(p : GameObject)
	{
		player = p;
	}
	
	
	
	
}


function getScript() : Moon {return scrMoon;}

private var scrMoon : Moon;

function Awake()
{
	scrMoon = new Moon(gameObject);
}

function OnCollisionStay(col : Collision)
{
	scrMoon.setGrounded(true);
}

function OnCollisionExit(col : Collision)
{
	scrMoon.setGrounded(false);
}	