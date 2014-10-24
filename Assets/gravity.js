#pragma strict

var invertirDireccion : boolean;

function Start () {

	

}

function Update () {

}

function OnTriggerStay(col : Collider)
{
	if(col.name == "Moon")
	{
		var dir : Vector3;
		dir = -transform.InverseTransformPoint(col.gameObject.transform.position);
		dir.x = 0;
		dir.z = 0;
		dir = transform.TransformDirection(dir).normalized;
		dir = -transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(dir*9.8);
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = invertirDireccion;

	}
}

function OnTriggerEnter(col : Collider)
{
	if(col.name == "Moon")
	{
		var dir : Vector3;
		dir = -transform.InverseTransformPoint(col.gameObject.transform.position);
		dir.x = 0;
		dir.z = 0;
		dir = transform.TransformDirection(dir).normalized;
		dir =-transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(dir*9.8);
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = invertirDireccion;

	}
}

function OnTriggerExit(col : Collider)
{
	if(col.name == "Moon")
	{
		var dir : Vector3;
		dir = -transform.InverseTransformPoint(col.gameObject.transform.position);
		dir.x = 0;
		dir.z = 0;
		dir = transform.TransformDirection(dir).normalized;
		dir = transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(Physics.gravity);
		
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = false;

	}
}