#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider)
{
	if(col.name == "Luna" || col.name == "Sol" )
	{
		Application.LoadLevel(Application.loadedLevelName);
	}
}