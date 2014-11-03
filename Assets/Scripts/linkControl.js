#pragma strict

var objSol : GameObject;
var objLuna : GameObject;

private var target : GameObject;

function Start () {

	target = objLuna;

}

function FixedUpdate () {

	var dir : Vector3 = target.transform.position - transform.position;
	transform.Translate(dir.normalized*Time.fixedDeltaTime*10);

	if(dir.magnitude < 0.5) 
	{
		if(target == objLuna) target = objSol;
		else if(target == objSol) target = objLuna;
	}
	

}