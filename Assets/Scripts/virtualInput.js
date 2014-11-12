#pragma strict

static class VirtualInput
{
	private var emulate : boolean;
	function UpdateInput(scrPlayer : Players) : boolean[]
	{
		var inputs : boolean[] = newInputs();
		var posPlayer = Camera.main.WorldToScreenPoint(scrPlayer.player.transform.position);
		if( Application.platform == RuntimePlatform.Android || 
		Application.platform == RuntimePlatform.IPhonePlayer)
		{
			if(Input.touchCount)
			{				
				
				inputs[0] = Input.touches[0].position.x > Screen.width*0.75 && 
							Input.touches[0].position.x < Screen.width*0.85 &&
							Input.touches[0].position.y < Screen.height*(1-0.8) && 
							Input.touches[0].position.y > Screen.height*(1-0.9);
			
				inputs[1] = Input.touches[0].position.x > Screen.width*0.85 && 
							Input.touches[0].position.x < Screen.width*0.95 &&
							Input.touches[0].position.y < Screen.height*(1-0.8) && 
							Input.touches[0].position.y > Screen.height*(1-0.9);
							
				if(Application.loadedLevelName != "Level1")		
				{		
					inputs[2] = (Input.touches[0].position.x > Screen.width*0.15 && 
								Input.touches[0].position.x < Screen.width*0.25 &&
								Input.touches[0].position.y < Screen.height*(1-0.8) && 
								Input.touches[0].position.y > Screen.height*(1-0.9));
								
								
					if(Input.touchCount >= 2)
					{
						inputs[2] = inputs[2] || 
									(Input.touches[1].position.x > Screen.width*0.15 && 
									Input.touches[1].position.x < Screen.width*0.25 &&
									Input.touches[1].position.y < Screen.height*(1-0.8) && 
									Input.touches[1].position.y > Screen.height*(1-0.9));
					}
				}else inputs[2] = false;
				
				
				inputs[3] = Input.touches[0].phase == TouchPhase.Began;
				inputs[4] = true;
				
				
				
			}
		}
		else
		{
			if(!emulate)
			{
				inputs[0] = Input.GetKey(KeyCode.LeftArrow);
				inputs[1] = Input.GetKey(KeyCode.RightArrow);
				inputs[2] = Input.GetKey(KeyCode.UpArrow);
				inputs[3] = Input.GetMouseButtonDown(0);
				inputs[4] = Input.GetMouseButton(0);	
			}
			else
			{
				if(Input.GetMouseButton(0))
				{
					inputs[0] = (Input.mousePosition.x > Screen.width*0.75 && 
								Input.mousePosition.x < Screen.width*0.85 &&
								Input.mousePosition.y < Screen.height*(1-0.8) && 
								Input.mousePosition.y > Screen.height*(1-0.9));
				
					inputs[1] = Input.mousePosition.x > Screen.width*0.85 && 
								Input.mousePosition.x < Screen.width*0.95 &&
								Input.mousePosition.y < Screen.height*(1-0.8) && 
								Input.mousePosition.y > Screen.height*(1-0.9);
								
					if(Application.loadedLevelName != "Level1")		
					{		
						inputs[2] = (Input.mousePosition.x > Screen.width*0.15 && 
									Input.mousePosition.x < Screen.width*0.25 &&
									Input.mousePosition.y < Screen.height*(1-0.8) && 
									Input.mousePosition.y > Screen.height*(1-0.9));
									
					}else inputs[2] = false;

//					inputs[0] = Input.GetMouseButton(0) && Input.mousePosition.x <  posPlayer.x;
//					inputs[1] = Input.GetMouseButton(0) && Input.mousePosition.x >=  posPlayer.x;
//					inputs[2] = Input.GetMouseButton(0) && Input.GetMouseButton(1);
					inputs[3] = Input.GetMouseButtonDown(0);
					inputs[4] = true;
				}
			}
			
		}
		
		return inputs;
	}
	function setEmulate(val : boolean)
	{
		emulate = val;
	}
	
	function onJumping() : boolean
	{
		if(Application.platform == RuntimePlatform.Android || 
		Application.platform == RuntimePlatform.IPhonePlayer)
		{
			return Input.touchCount >= 2;
		}
		else
		{
			if(!emulate)
			{
				return Input.GetKey(KeyCode.UpArrow);
			}
			else
			{	
				return Input.GetMouseButton(0) && Input.GetMouseButton(1);
			}
		}
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
		else 
		{
			if(!emulate)
			{
				return Input.GetMouseButtonDown(0);
			}
			else
			{	
				return Input.GetMouseButtonDown(0);
			}
		}
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