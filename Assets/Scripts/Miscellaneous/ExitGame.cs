using UnityEngine;
using System.Collections;

public class ExitGame : MonoBehaviour {


	// Update is called once per frame
	void Update () {
		if (Input.GetKey("escape")) { 
			Application.Quit();

//			SceneManager.Instance.LastSceneLoaded = "";
		}
	}

	void OnDisable () { 
		Time.timeScale = 0f;

	}

	void OnEnable () { 
		Time.timeScale = 1f;
		
	}

	void OnApplicationQuit () { 
//		print ("OnApplicationQuit + " + PlayerPrefs.GetString("LastRootLoaded") );
//		PlayerPrefs.SetString("LastRootLoaded", "");
//		PlayerPrefs.Save();	
	}
}
