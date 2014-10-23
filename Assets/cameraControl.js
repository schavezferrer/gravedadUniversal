#pragma strict

var target : Transform;
var offset : Vector3;

private var inputs : boolean[];

function Start () {

	transform.position.y = target.position.y + offset.y;

}

function FixedUpdate () {

	inputs = VirtualInput.UpdateInput();	
	if(inputs[0]) offset.x = -1;
	else if(inputs[1]) offset.x = 1;
	transform.position.x += (target.position.x + offset.x - transform.position.x)*Time.fixedDeltaTime*5;
	transform.position.z += (target.position.z + offset.z - transform.position.z)*Time.fixedDeltaTime*5;

}