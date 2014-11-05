#pragma strict

var attracting : boolean;

private var timer : float; 
private var timer2 : float; 

function Start () {

}

function FixedUpdate () {

	timer += 1.5*Time.fixedDeltaTime;
	timer2 += 1.5*Time.fixedDeltaTime*0.15;
	if(timer > 2) 
	{
		timer = 0;
	}
	
	if(timer2 > 2) 
	{
		timer2 = 0;
	}
	
//	transform.rg = Mathf.Sin(Time.time)*Vector3.up;
	renderer.material.SetFloat("_Timer",timer);
	renderer.material.SetFloat("_Timer2",timer2);
	attracting = true;
}

function OnTriggerEnter(col : Collider)
{
	if(col.CompareTag("Mobil") && attracting)
	{
//		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position).normalized; 
//		if(Mathf.Abs(Vector3.Dot(col.gameObject.transform.right,dir)) > 0.95 )
		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position).normalized; 
		(col.GetComponent(Mobil) as Mobil).setDir(dir);	
		(col.GetComponent(Mobil) as Mobil).setMove( true);
	}
}

function OnTriggerStay(col : Collider)
{
	if(col.CompareTag("Mobil") && attracting)
	{
		var dir : Vector3 = (gameObject.transform.position - col.gameObject.transform.position); 
		(col.GetComponent(Mobil) as Mobil).setDir(dir.normalized);
		
		if(dir.magnitude < 1) (col.GetComponent(Mobil) as Mobil).setMove(false);
		
		
	}
	else if (col.CompareTag("Mobil") && !attracting) (col.GetComponent(Mobil) as Mobil).setMove( false);
}

function OnTriggerExit(col : Collider)
{
	if(col.CompareTag("Mobil"))
	{
		(col.GetComponent(Mobil) as Mobil).setMove(false);
	}
}