#pragma strict

var obj : GameObject;

private var desvanecer : boolean;
private var mostrar : boolean;
private var timer : float;

private var done : boolean;
private var gm : gameManager;

function Start () {

	timer = 1;
	gm = Camera.main.GetComponent(gameManager) as gameManager;

}

function FixedUpdate () {


	if(!done)
	{
		if(gm.getFar())
		{
			done = true;
			mostrar = true;

			(Camera.main.GetComponent(gameManager) as gameManager).setSwapEnabled(true);
			
		}
	}

	if(mostrar && !desvanecer)
	{
		var col2 : Vector4 = obj.renderer.material.GetVector("_TintColor");
		if (col2[3] < 92.0/255) col2[3] += Time.fixedDeltaTime*1.5;
		obj.renderer.material.SetVector("_TintColor",col2);// -= Time.fixedDeltaTime;
//		gameObject.transform.parent.FindChild("Dedo").position = Camera.main.ViewportToWorldPoint(Vector3(0.2,0.9,5));
		obj.transform.FindChild("Dedo").active = true;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = true;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = true;
		obj.transform.FindChild("Dedo").FindChild("Texto2").active = true;
	}
	
	if(VirtualInput.onClick() && mostrar && col2[3] > 92.0/255) desvanecer = true;

	
	if(desvanecer && mostrar)
	{
		timer -= Time.fixedDeltaTime*1.5;
		var col : Vector4 = obj.renderer.material.GetVector("_TintColor");
		col[3] -= Time.fixedDeltaTime*1.5;
		obj.renderer.material.SetVector("_TintColor",col);// -= Time.fixedDeltaTime;
		
		obj.transform.FindChild("Dedo").active = false;
		obj.transform.FindChild("Dedo").FindChild("Particle System").active = false;
		obj.transform.FindChild("Dedo").FindChild("Texto").active = false;
		obj.transform.FindChild("Dedo").FindChild("Texto2").active = false;
		
		if(timer < -1) GameObject.Destroy(gameObject.transform.parent.gameObject);
	}

}

