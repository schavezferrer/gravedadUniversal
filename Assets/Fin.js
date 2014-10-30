#pragma strict

var endMoon : boolean;
var endSun : boolean;
var offsetEffect : float;
private var GM : gameManager;
function Start () {

	GM = Camera.main.GetComponent(gameManager) as gameManager;
	renderer.material.SetFloat("_offset", offsetEffect);

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