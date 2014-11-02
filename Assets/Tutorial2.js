#pragma strict

var obj : GameObject;
private var desvanecer : boolean;
private var mostrar : boolean;
private var timer : float;

function Start () {

	timer = 1;

}

function FixedUpdate () {


	if(mostrar && !desvanecer)
	{
		var col2 : Vector4 = obj.renderer.material.GetVector("_TintColor");
		if (col2[3] < 92.0/255) col2[3] += Time.fixedDeltaTime;
		obj.renderer.material.SetVector("_TintColor",col2);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = true;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = true;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = true;
	}
	
	if(VirtualInput.touchPlayer() == "SunInput")  desvanecer = true;

	
	if(desvanecer && mostrar)
	{
		timer -= Time.fixedDeltaTime;
		var col : Vector4 = obj.renderer.material.GetVector("_TintColor");
		col[3] -= Time.fixedDeltaTime;
		obj.renderer.material.SetVector("_TintColor",col);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = false;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = false;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = false;
		
		if(timer < -1) GameObject.Destroy(gameObject.transform.parent.gameObject);
	}

}

function OnTriggerEnter(Col : Collider)
{
//	if(Col.gameObject.CompareTag("Player")) desvanecer = true;
	if(Col.gameObject.CompareTag("Player")) mostrar = true;
}