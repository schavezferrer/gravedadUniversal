#pragma strict

var efectoParticulas : GameObject;
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

function OnTriggerEnter(col : Collider)
{
	if ( (col.name == "Luna"  && endMoon) || (col.name == "Sol"  && endSun) )
	{
		if (audio != null){
			audio.Play();
		}	
	}
}

function OnTriggerStay(col : Collider)
{
	if(col.name == "Luna"  && endMoon)
	{
		if(Vector3.Distance(transform.position,col.transform.position) < 0.6)
		{
			GM.setEndMoon(true);
			transform.parent.renderer.material.SetFloat("_gaussEnabled",1);
			efectoParticulas.active = true;
		}
	}
	
	
	if(col.name == "Sol"  && endSun)
	{
		if(Vector3.Distance(transform.position,col.transform.position) < 0.6) 
		{
			transform.parent.renderer.material.SetFloat("_gaussEnabled",1);
			efectoParticulas.active = true;
			GM.setEndSun(true);
		}
	}
}


function OnTriggerExit(col : Collider)
{
	if(col.name == "Luna"  && endMoon)
	{
		transform.parent.renderer.material.SetFloat("_gaussEnabled",0);
		GM.setEndMoon(false);
		efectoParticulas.active = false;

	}
	
	
	if(col.name == "Sol"  && endSun)
	{
		transform.parent.renderer.material.SetFloat("_gaussEnabled",0);
		GM.setEndSun(false);
		efectoParticulas.active = false;

	}
}