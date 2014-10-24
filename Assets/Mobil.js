#pragma strict


var move : boolean;
var inverse : boolean;

var endPosition : Vector3;
var mutliVel : float;
private var startPosition : Vector3;
private var mod : float = 1;
var dir : Vector3;

function Start () {

	startPosition = transform.position;

}

function Update () 
{

	if(move) 
	{
		if(Vector3.Distance(transform.position,endPosition) > 0.1)
		{
			var vel : float = Mathf.Abs(Vector3.Dot(dir,transform.right));
			vel = Mathf.Pow(vel*mod,10);
			if(inverse) transform.Translate(-Vector3.right * Time.deltaTime*vel*mutliVel); 
			else transform.Translate(Vector3.right * Time.deltaTime*vel*mutliVel); 
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

function OnCollisionStay(col : Collision)
{
	if(col.gameObject.CompareTag("Player")) mod = 0;
}

function OnCollisionExit(col : Collision)
{
	if(col.gameObject.CompareTag("Player")) mod = 1;
}


