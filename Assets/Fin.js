#pragma strict

var endMoon : boolean;
var endSun : boolean;
private var GM : gameManager;
function Start () {

	GM = Camera.main.GetComponent(gameManager) as gameManager;

}

function Update () {

}



function OnTriggerStay(col : Collider)
{
	if(col.name == "Moon"  && endMoon)
	{
		GM.setEndMoon(true);
	}
	
	
	if(col.name == "Sun"  && endSun)
	{
		GM.setEndSun(true);
	}
}


function OnTriggerExit(col : Collider)
{
	if(col.name == "Moon"  && endMoon)
	{
		GM.setEndMoon(false);
	}
	
	
	if(col.name == "Sun"  && endSun)
	{
		GM.setEndSun(false);
	}
}