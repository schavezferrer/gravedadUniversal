#pragma strict

var moon  : Transform;
var sun : Transform;
var offset : Vector3;
var pos : Vector3;
private var inputs : boolean[];

function Start () {


}

function FixedUpdate () {

	inputs = VirtualInput.UpdateInput();	
	if(inputs[0]) offset.x = -1;
	else if(inputs[1]) offset.x = 1;
	
	pos.x =  (moon.position.x + sun.position.x)/2;
	pos.y =  (moon.position.y + sun.position.y)/2;
	var distance : float = Vector2.Distance(Vector2(moon.position.x,moon.position.y),Vector2(sun.position.x,sun.position.y))*1.5;
	if(distance <  15) distance = 15;
	pos.z = - distance;
//	transform.position.x += (target.position.x + offset.x - transform.position.x)*Time.fixedDeltaTime*5;
	transform.position.x += (pos.x + offset.x - transform.position.x)*Time.fixedDeltaTime*5;
	transform.position.y += (pos.y + offset.y - transform.position.y)*Time.fixedDeltaTime*5;
	transform.position.z += (pos.z + offset.z - transform.position.z)*Time.fixedDeltaTime*5;
//	transform.position.z += (target.position.z + offset.z - transform.position.z)*Time.fixedDeltaTime*5;
	
	
	
//	transform.position.y += (target.position.y + offset.y - transform.position.y)*Time.fixedDeltaTime*0.5;

}