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
	
	function attract()
	{
		if(type == 0) 
		{
//			player.rigidbody.AddForce(gravity);
//			else player.rigidbody.AddForce(-Physics.gravity - normal*10);
		}
	}
	
	
}


function getScript() : Moon {return scrMoon;}

private var scrMoon : Moon;

function Awake()
{
	scrMoon = new Moon(gameObject);
}

function FixedUpdate()
{
	if ( scrMoon.isMoving() && ( scrMoon.getGrounded() == true )  ) 	{
		if ( !audio.isPlaying )
			audio.Play();
	}
	else {
		audio.Stop();
	}
	
	scrMoon.attract();
}

function OnCollisionStay(col : Collision)
{
	scrMoon.onStay(col);
//	scrMoon.setGravity(-col.contacts[0].normal);

}

function OnCollisionExit(col : Collision)
{
	scrMoon.setGrounded(false);
	
}
