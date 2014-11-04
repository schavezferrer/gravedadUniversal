#pragma strict

class Players
{
	protected var inputs : boolean[];
	protected var player : GameObject;
	protected var isGrounded : boolean;
	private var velocity : Vector3; 
	protected var normal : Vector3;
	
	var stop : float = 1;
	
	protected var type : int; 
	var inverDir : boolean;
	protected var active : boolean;
	
	protected var gravity : Vector3;
	
	function Players(){}
	function Players(p : GameObject)
	{
		player = p;
	}
	function setActive(val : boolean)
	{
		active = val;
		if(!active)
		{
			inputs = VirtualInput.newInputs();
		}
	}
	function setGrounded(ground : boolean)
	{
		isGrounded = ground;
	}

	function setNormal(nor : Vector3)
	{
		normal = nor;	
	}
	
	
	
	function movement()
	{
//		if(type == 1) 
//		{
//			if(player.rigidbody.velocity.y > 0) isGrounded = false;
//			Debug.Log(isGrounded);
//		}
		if(isGrounded)
		{
			var sign : int;
			if(inverDir) sign = -1;
			else sign = 1;
			if(inputs[0] && player.rigidbody.angularVelocity.z < 200) player.rigidbody.AddTorque(sign*Vector3.forward*100); 
			else if(inputs[1] && player.rigidbody.angularVelocity.z > -200) player.rigidbody.AddTorque(-sign*Vector3.forward*100); 
			else  
			{
				if(Mathf.Abs(player.rigidbody.angularVelocity.z)< 0.1) player.rigidbody.angularVelocity.z =0;
				else player.rigidbody.AddTorque(-Mathf.Sign(player.rigidbody.angularVelocity.z)*2*Vector3.forward);
			}
			velocity = player.rigidbody.velocity*0.8;

		}
		else
		{	
			player.rigidbody.velocity.x = velocity.x*stop; 
//			else if(inputs[1]) player.rigidbody.velocity.x = Mathf.Abs(velocity.x);
//			else  
//			{
				if(Mathf.Abs(player.rigidbody.velocity.x)< 0.1) player.rigidbody.velocity.x =0;
				else player.rigidbody.velocity.x -= Mathf.Sign(player.rigidbody.velocity.x)*Time.deltaTime;
//			}
		}
		
		if(type == 0) 
		{
			player.rigidbody.AddForce(gravity);
		}
		
		if(inputs[2] && isGrounded && type == 0) 
		{
			player.rigidbody.AddForce(normal*3.5, ForceMode.Impulse);
		}
	}
	function setInputs(inp : boolean[]) {inputs = inp;}
	function onStay(col : Collision)
	{
		if(type == 0) setGrounded(true);
		else
		{
			if(col.gameObject.layer == 12) setGrounded(false);
			else setGrounded(true);
		}
		var lastNormal : Vector3 = Vector3.zero;
		for(var norm : ContactPoint in col.contacts)
		{
			lastNormal += norm.normal;
		}
		setNormal(lastNormal.normalized);
	}
}