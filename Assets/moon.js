#pragma strict

class Moon extends Players
{
	
	function Moon(){}
	function Moon(p : GameObject)
	{
		player = p;
		type = 0;
	}
	
	function setGravity(val : Vector3)
	{
		gravity = val;
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
	scrMoon.onStay(col);
	scrMoon.setGravity(-col.contacts[0].normal);
	Debug.DrawRay(col.contacts[0].point,col.contacts[0].normal);

}

function OnCollisionExit(col : Collision)
{
	scrMoon.setGrounded(false);
	
}
function OnCollisionEnter(col : Collision)
{
}	