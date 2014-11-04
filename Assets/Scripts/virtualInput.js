#pragma strict

static class VirtualInput
{
	private var emulate : boolean;
	function UpdateInput() : boolean[]
	{
		var inputs : boolean[] = newInputs();

		if( Application.platform == RuntimePlatform.Android || 
		Application.platform == RuntimePlatform.IPhonePlayer)
		{
			if(Input.touchCount)
			{
				inputs[0] = Input.touches[0].position.x < Screen.width*0.5;
				inputs[1] = Input.touches[0].position.x >= Screen.width*0.5;
				inputs[2] = Input.touches[0].position.y > Screen.height*0.5;
				inputs[3] = Input.touches[0].phase == TouchPhase.Began;
				inputs[4] = true;
			}
		}
		else
		{
			if(!emulate)
			{
				inputs[0] = Input.GetKey(KeyCode.A);
				inputs[1] = Input.GetKey(KeyCode.D);
				inputs[2] = Input.GetKey(KeyCode.Space);
				inputs[3] = Input.GetMouseButtonDown(0);
				inputs[4] = Input.GetMouseButton(0);	
			}
			else
			{
				inputs[0] = Input.GetMouseButton(0) && Input.mousePosition.x < Screen.width*0.5;
				inputs[1] = Input.GetMouseButton(0) && Input.mousePosition.x >= Screen.width*0.5;
				inputs[2] = Input.GetMouseButton(0) && Input.mousePosition.y > Screen.height*0.5;
				inputs[3] = Input.GetMouseButtonDown(0);
				inputs[4] = true;
			}
			
		}
		
		return inputs;
	}
	function setEmulate(val : boolean)
	{
		emulate = val;
	}
	function onClick()
	{
		if(Application.platform == RuntimePlatform.Android || 
		Application.platform == RuntimePlatform.IPhonePlayer)
		{
			if(Input.touchCount >0)
			{
				return  Input.touches[0].phase == TouchPhase.Began;
			}
		}
		else return Input.GetMouseButtonDown(0);
	}
	
	function getPosInput() : Vector2
	{
		if( Application.platform == RuntimePlatform.Android || 
			Application.platform == RuntimePlatform.IPhonePlayer)
		{
			if(Input.touchCount) return Input.touches[0].position;	
			else return Vector2.zero;
		}
		else return Input.mousePosition;
	}
	
	function newInputs() : boolean[]
	{
		return new boolean[5];
	}
	
	function touchPlayer() : String
	{
		var ray : Ray = Camera.main.ScreenPointToRay (getPosInput());
		var hit : RaycastHit;
		var layerMask : int = 1<< 8;
		if(Physics.Raycast(ray,hit,100,layerMask))
		{
			return hit.collider.name;
		}
	}
	
}	