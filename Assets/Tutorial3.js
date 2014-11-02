#pragma strict
private var gm : gameManager;
var obj : GameObject;
private var desvanecer : boolean;
private var timer : float;

private var activo : boolean;



function Start () {

	timer = 1;
	gm = Camera.main.GetComponent(gameManager) as gameManager;
}

function FixedUpdate () {

	if(gm.getCurrPlayer() == 1)
	{
		activo = true;
		
	}
	else
	{
		activo = false;
	}
	if(activo && !desvanecer)
	{
//		if(timer < 1) timer += Time.fixedDeltaTime;
		var col : Vector4 = obj.renderer.material.GetVector("_TintColor");
		if (col[3] < 92.0/255) col[3] += Time.fixedDeltaTime;
		obj.renderer.material.SetVector("_TintColor",col);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = true;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = true;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = true;
	}
	
	if(!activo && !desvanecer)
	{
//		if(timer > 0) timer -= Time.fixedDeltaTime;
		var col2 : Vector4 = obj.renderer.material.GetVector("_TintColor");
		if(col2[3] > 0) col2[3] -= Time.fixedDeltaTime;
		obj.renderer.material.SetVector("_TintColor",col2);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = false;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = false;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = false;
		
	}

	
	if(desvanecer)
	{
		destruir();
	}

}
function destruir()
{
	timer -= Time.fixedDeltaTime;
	var col3 : Vector4 = obj.renderer.material.GetVector("_TintColor");
	col3[3] -= Time.fixedDeltaTime;
	obj.renderer.material.SetVector("_TintColor",col3);// -= Time.fixedDeltaTime;


	obj.transform.FindChild("Dedo").active = false;
	obj.transform.FindChild("Dedo").FindChild("Particle System").active = false;
	obj.transform.FindChild("Dedo").FindChild("Texto").active = false;
	
	if(timer < -1) GameObject.Destroy(gameObject.transform.parent.gameObject);
}
function OnTriggerEnter(Col : Collider)
{
	if(Col.gameObject.CompareTag("Player")) desvanecer = true;
}