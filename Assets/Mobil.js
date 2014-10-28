#pragma strict

var mutliVel : float;
var restorePosition : boolean;
var inverse : boolean;
var endPosition : Vector3;
var startPosition : Vector3;

private var move : boolean;

private var mod : float = 1;

private var dir : Vector3;

function Start () {


}

function Update () 
{
	if(restorePosition)	moveWithRestore();
	else moveWithoutRestore();
	
}

function moveWithoutRestore()
{
	if(move) 
	{
		var dir2 : Vector3 = (transform.position-endPosition).normalized;
		var vel : float;
		
		if(Vector3.Distance(transform.position,endPosition) > 0.1 &&
		   Vector3.Dot(dir,dir2) < 0)
		{
			vel = (Vector3.Dot(dir,transform.right));
			vel = Mathf.Pow(vel*mod,11);
			transform.Translate(Vector3.right * Time.deltaTime*vel*mutliVel); 
		}
		
		dir2 = (transform.position-startPosition).normalized;
	
		if(Vector3.Distance(transform.position,startPosition) > 0.1 &&
		   Vector3.Dot(dir,dir2) < 0)
		{
			vel = (Vector3.Dot(dir,transform.right));
			vel = Mathf.Pow(vel*mod,11);
			transform.Translate(Vector3.right * Time.deltaTime*vel*mutliVel); 
		}
	}
}
function moveWithRestore()
{
	if(move) 
	{
		if(Vector3.Distance(transform.position,endPosition) > 0.1)
		{
			var vel : float = (Vector3.Dot(dir,transform.right));
			if(inverse) 
			{
				vel = Mathf.Clamp(vel,-100,0);
				vel = Mathf.Pow(vel*mod,10);
				transform.Translate(-Vector3.right * Time.deltaTime*vel*mutliVel); 
			}
			else
			{ 
				vel = Mathf.Clamp(vel,0,100);
				vel = Mathf.Pow(vel*mod,10);
				transform.Translate(Vector3.right * Time.deltaTime*vel*mutliVel); 
			}
		}
	}
	else
	{
		if(Vector3.Distance(transform.position,startPosition) > 0.1)
		{
			if(inverse) transform.Translate(Vector3.right * Time.deltaTime); 
			else transform.Translate(-Vector3.right * Time.deltaTime); 
			mod = 1;
		}
	}
}

function setMove(val : boolean)
{
	move = val;
}
function setDir(val : Vector3)
{
	dir = val;
}

function OnCollisionStay(col : Collision)
{
	if(col.gameObject.CompareTag("Player")) mod = 0;
}

function OnCollisionExit(col : Collision)
{
	if(col.gameObject.CompareTag("Player")) mod = 1;
}


