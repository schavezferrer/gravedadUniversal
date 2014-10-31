#pragma strict

private var gm : gameManager;

function Start () {

	gm = Camera.main.GetComponent(gameManager) as gameManager;

}

function Update () {

}


function OnTriggerStay(col : Collider)
{
	if(col.name == "Luna")
	{
		Application.LoadLevel(Application.loadedLevelName);
	}
	if(col.name == "Sol" )
	{
		gm.setLinked(true);
	}

}

function OnTriggerExit(col : Collider)
{
	if(col.name == "Sol" )
	{
		gm.setLinked(false);
	}

}