#pragma strict

class Players
{
	private var inputs : boolean[];
	protected var player : GameObject;
	protected var isGrounded : boolean;
	private var velocity : Vector3; 
	function Players(){}
	function Players(p : GameObject)
	{
		player = p;
	}
	
	function setGrounded(ground : boolean)
	{
		isGrounded = ground;
	}

	
	function movement()
	{
		if(isGrounded)
		{
			if(inputs[0] && player.rigidbody.angularVelocity.z < 200) player.rigidbody.AddTorque(Vector3.forward*100,ForceMode.Acceleration); 
			else if(inputs[1] && player.rigidbody.angularVelocity.z > -200) player.rigidbody.AddTorque(-Vector3.forward*100,ForceMode.Acceleration); 
			else  
			{
				 player.rigidbody.AddTorque(Vector3.zero); 
				if(Mathf.Abs(player.rigidbody.angularVelocity.x)< 0.1) player.rigidbody.angularVelocity.z =0;
				else player.rigidbody.AddTorque(Mathf.Sign(player.rigidbody.angularVelocity.x)*Vector3.forward);
			}
			velocity = player.rigidbody.velocity;

		}
		else
		{
			if(inputs[0]) player.rigidbody.velocity.x = -Mathf.Abs(velocity.x); 
			else if(inputs[1]) player.rigidbody.velocity.x = Mathf.Abs(velocity.x);
			else  
			{
				if(Mathf.Abs(player.rigidbody.velocity.x)< 0.1) player.rigidbody.velocity.x =0;
				else player.rigidbody.velocity.x -= Mathf.Sign(player.rigidbody.velocity.x)*Time.deltaTime;
			}
		}
		
		
		if(inputs[2] && isGrounded) player.rigidbody.AddForce(Vector3.up*7, ForceMode.Impulse);
	}
	function setInputs(inp : boolean[]) {inputs = inp;}
		
}