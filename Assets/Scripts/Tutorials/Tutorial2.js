﻿#pragma strict

var obj : GameObject;
var target : GameObject;
private var desvanecer : boolean;
private var mostrar : boolean;
private var timer : float;

private var done : boolean;


function Start () {

	timer = 1;

}

function FixedUpdate () {


	if(!done)
	{
		if(Vector3.Distance(transform.position,target.transform.position) < 0.1)
		{
			done = true;
			if(	(Camera.main.GetComponent(gameManager) as gameManager).getSunEnabled())
			{
				
				mostrar = true;
		
				gameObject.transform.parent.FindChild("Dedo").position = GameObject.Find("Sol").transform.position;
				gameObject.transform.parent.FindChild("Dedo").position.z = -5;
				gameObject.transform.parent.FindChild("Dedo").position.x += 3;
				gameObject.transform.parent.FindChild("Dedo").position.y += 1.5;
				
			}
			GameObject.Find("Luna").rigidbody.velocity = Vector3.zero;
			GameObject.Find("Luna").rigidbody.angularVelocity = Vector3.zero;
			
			(Camera.main.GetComponent(gameManager) as gameManager).setMoonEnabled(false);
		}
	}
	

	if(mostrar && !desvanecer)
	{
		var col2 : Vector4 = obj.renderer.material.GetVector("_TintColor");
		if (col2[3] < 92.0/255) col2[3] += Time.fixedDeltaTime*1.5;
		obj.renderer.material.SetVector("_TintColor",col2);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = true;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = true;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = true;
	}
	
	if(VirtualInput.onClick())  if(VirtualInput.touchPlayer() == "SunInput")  desvanecer = true;

	
	if(desvanecer && mostrar)
	{
		timer -= Time.fixedDeltaTime*1.5;
		var col : Vector4 = obj.renderer.material.GetVector("_TintColor");
		col[3] -= Time.fixedDeltaTime*1.5;
		obj.renderer.material.SetVector("_TintColor",col);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = false;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = false;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = false;
		
		if(timer < -1) GameObject.Destroy(gameObject.transform.parent.gameObject);
	}

}

function OnTriggerEnter(Col : Collider)
{

	
}