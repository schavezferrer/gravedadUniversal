#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider)
{
	if(col.name == "Moon" || col.name == "Sun" )
	{
		Application.LoadLevel(Application.loadedLevelName);
	}
}