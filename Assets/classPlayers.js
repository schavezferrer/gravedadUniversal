#pragma strict

class Players
{
	private var inputs : boolean[];
	protected var player : GameObject;
	protected var isGrounded : boolean;
	private var velocity : Vector3; 
	private var normal : Vector3;
	protected var type : int; 
	var inverDir : boolean;
	
	protected var gravity : Vector3;
	
	function Players(){}
	function Players(p : GameObject)
	{
		player = p;
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
			velocity = player.rigidbody.velocity;

		}
		else
		{
			if(inputs[0]) player.rigidbody.velocity.x = velocity.x; 
			else if(inputs[1]) player.rigidbody.velocity.x = velocity.x;
			else  
			{
				if(Mathf.Abs(player.rigidbody.velocity.x)< 0.1) player.rigidbody.velocity.x =0;
				else player.rigidbody.velocity.x -= Mathf.Sign(player.rigidbody.velocity.x)*Time.deltaTime;
			}
			
		}
		
		if(type == 0) 
		{
			if(!isGrounded) player.rigidbody.AddForce(-Physics.gravity+gravity);
			else player.rigidbody.AddForce(-Physics.gravity - normal*10);
		}
		
		if(inputs[2] && isGrounded) 
		{
			player.rigidbody.AddForce(normal*3, ForceMode.Impulse);
		}
	}
	function setInputs(inp : boolean[]) {inputs = inp;}
	function onStay(col : Collision)
	{
		setGrounded(true);
		var lastNormal : Vector3 = Vector3.zero;
		for(var norm : ContactPoint in col.contacts)
		{
			lastNormal += norm.normal;
		}
		setNormal(lastNormal.normalized);
	}
}