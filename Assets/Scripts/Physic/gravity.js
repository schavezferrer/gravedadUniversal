#pragma strict

var invertirDireccion : boolean;
static var m_AlreadyAttracted : boolean;

function Start () {

	m_AlreadyAttracted = false;

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
	if ((col.name == "Luna") & ( m_AlreadyAttracted == false ) )
	{
		var dir : Vector3;
	
		dir =-transform.up;
		(col.gameObject.GetComponent(moon) as moon).getScript().setGravity(dir*9.8-Physics.gravity);
		(col.gameObject.GetComponent(moon) as moon).getScript().inverDir = invertirDireccion;

		audio.enabled = true;
		audio.Play();
		m_AlreadyAttracted = true;
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
		
		m_AlreadyAttracted = false;
	}
}