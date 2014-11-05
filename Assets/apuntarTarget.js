#pragma strict

var finLuna : GameObject;
var finSol : GameObject;

private var target : GameObject;

function Start () {

	target = finLuna;

}

function Update () {

	transform.up = (target.transform.position - transform.position).normalized;
	transform.up.z = 0;

}

function setTarget(val : String)
{
	if(val == "Sun") target = finSol; 
	if(val == "Moon") target = finLuna; 
}