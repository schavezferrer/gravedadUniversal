using UnityEngine;
using System.Collections;

public class StopAttractionSound : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter(Collider _Collider )
	{
		AudioSource a = FindObjectOfType<AudioSource>();
		if ( a != null )
			a.Stop();
	}
}
