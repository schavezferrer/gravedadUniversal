using UnityEngine;
using System.Collections;

public class InfluenceZone : MonoBehaviour {

	#region PUBLIC_MEMBERS
	public int m_Distance = 3;
	#endregion // PUBLIC_MEMBERS

	#region PRIVATE_MEMBERS
	public int m_OriginalDistance = 3;
	#endregion // PRIVATE_MEMBERS

	#region MONOBEHABIOURS_METHODS

	// Use this for initialization
	void Start () {
		m_OriginalDistance = m_Distance;
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter ( Collider _Other ) 
	{
		if ( _Other.CompareTag("Player") )
		{
			if ( !audio.isPlaying )
				audio.Play();
		}
	}
	void OnTriggerStay ( Collider _Other ) 
	{
		if ( _Other.CompareTag("Player") )
		{
			float distancia = Vector3.Distance(_Other.transform.position, transform.position);
			print (distancia);

			if ( distancia > 5 ) 
				audio.Stop();

//			SphereCollider sc = transform.collider as SphereCollider;
//
//			audio.minDistance = distancia - sc.radius;

			if ( audio.minDistance < m_OriginalDistance )
				audio.minDistance = m_OriginalDistance;
//			else 	
//				audio.minDistance = -distancia;
		}
	}
	void OnTriggerExit ( Collider _Other ) 
	{
		if ( _Other.CompareTag("Player") )
			audio.Stop();
	}

	#endregion // MONOBEHABIOURS_METHODS

}
