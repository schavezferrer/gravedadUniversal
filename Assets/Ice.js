#pragma strict

private var gm : gameManager;

function Start () {

	gm = Camera.main.GetComponent(gameManager) as gameManager;

}

function Update () {

}


function OnTriggerEnter(col : Collider)
{
	if(col.name == "Sun")
	{
		Application.LoadLevel(Application.loadedLevelName);
	}


}
