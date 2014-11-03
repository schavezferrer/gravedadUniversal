#pragma strict

private var offset : float;

function Start () {

	offset = Random.Range(0,100);

}

function FixedUpdate () {

//	transform.eulerAngles.y = 20*Mathf.Sin(Time.time);
	transform.eulerAngles.x = 17*Mathf.Sin(Time.time+offset);
	transform.eulerAngles.z = 13*Mathf.Sin(Time.time+offset);

}