using UnityEngine;
using System.Collections;

public class WallAttractionManager : MonoBehaviour {

	private bool m_AlreadyAttracted = false;

	void OnTriggerEnter(Collider _Other){

		if ((_Other.name == "Luna") & ( m_AlreadyAttracted == false ) )
		{
			audio.enabled = true;
			///audio.volume= 1f;
			audio.Play();
			m_AlreadyAttracted = true;
		}
	}

	void OnTriggerExit(Collider _Other){
		m_AlreadyAttracted = false;
		StopAttractionSound();
	}

	public void StopAttractionSound ()  {
		audio.Stop();
	}
}
