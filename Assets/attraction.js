#pragma strict

var attracting : boolean;

function Start () {

}

function Update () {

//	transform.rg = Mathf.Sin(Time.time)*Vector3.up;

}

function OnTriggerEnter(col : Collider)
{
	if(col.CompareTag("Mobil") && attracting)
	{
//		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position).normalized; 
//		if(Mathf.Abs(Vector3.Dot(col.gameObject.transform.right,dir)) > 0.95 )
		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position).normalized; 
		(col.GetComponent(Mobil) as Mobil).dir = dir;	
		(col.GetComponent(Mobil) as Mobil).move = true;
	}
}

function OnTriggerStay(col : Collider)
{
	if(col.CompareTag("Mobil") && attracting)
	{
		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position); 
		(col.GetComponent(Mobil) as Mobil).dir = dir.normalized;
		
		if(dir.magnitude < 1) (col.GetComponent(Mobil) as Mobil).move = false;
		
		
	}
	else if (col.CompareTag("Mobil") && !attracting) (col.GetComponent(Mobil) as Mobil).move = false;
}

function OnTriggerExit(col : Collider)
{
	if(col.CompareTag("Mobil"))
	{
		(col.GetComponent(Mobil) as Mobil).move = false;
	}
}