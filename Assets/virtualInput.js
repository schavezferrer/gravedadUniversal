#pragma strict

static class VirtualInput
{

	function UpdateInput() : boolean[]
	{
		var inputs : boolean[] = new boolean[4];
		inputs[0] = Input.GetKey(KeyCode.A);
		inputs[1] = Input.GetKey(KeyCode.D);
		inputs[2] = Input.GetKeyDown(KeyCode.W);
		inputs[3] = Input.GetMouseButtonDown(0);
		
		return inputs;
	}
	
	function getPosInput() : Vector2
	{
		return Input.mousePosition;
	}
	
	function touchPlayer() : String
	{
		var ray : Ray = Camera.main.ScreenPointToRay (getPosInput());
		var hit : RaycastHit;
		var layerMask : int = 1<< 8;
		if(Physics.Raycast(ray,hit,layerMask))
		{
			return hit.collider.name;
		}
	}
	
}	