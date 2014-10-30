#pragma strict

var start : float;
var speed : float;
private var timer : float;

function Start () {

	timer = start;

}

function FixedUpdate () {

	timer += Time.fixedDeltaTime*speed;
	if(timer > 1) timer = 0;
	renderer.material.SetFloat("_timer",timer);
	

}