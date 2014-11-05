#pragma strict

var invertirDireccion : boolean;

function Start () {

	

}

function Update () {

}

function OnTriggerStay(col : Collider)
{
	if(col.name == "Luna")
	{
		var dir : Vector3;
	
		dir = -transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(dir*9.8-Physics.gravity);
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = invertirDireccion;

	}
}

function OnTriggerEnter(col : Collider)
{
	if(col.name == "Luna")
	{
		var dir : Vector3;
	
		dir =-transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(dir*9.8-Physics.gravity);
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = invertirDireccion;

	}
}

function OnTriggerExit(col : Collider)
{
	if(col.name == "Luna")
	{
		var dir : Vector3;
	
		dir = transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(Vector3.zero);
		
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = false;

	}
}