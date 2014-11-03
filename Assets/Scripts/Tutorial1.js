#pragma strict

var obj : GameObject;
private var desvanecer : boolean;
private var timer : float;

function Start () {

	timer = 1;

}

function FixedUpdate () {

	if(desvanecer)
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
//	Debug.Log(VirtualInput.touchPlayer());
	if(VirtualInput.onClick()) if(VirtualInput.touchPlayer() == "SunInput")  desvanecer = true;
}

function OnTriggerEnter(Col : Collider)
{
	if(Col.gameObject.CompareTag("Player")) desvanecer = true;
}