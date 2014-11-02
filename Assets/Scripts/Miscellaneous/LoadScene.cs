 using UnityEngine;
using System.Collections;

public class LoadScene : MonoBehaviour {

	public string m_SceneToLoad = string.Empty; 
	public string m_RootToLoad = string.Empty; 
	public float m_Time = 1.0f;

	public bool m_ShowLoading = false;
//	public bool m_AutoLaunch = false;

	void Start () {
//		if ( m_AutoLaunch ) 
//			AutoLaunchNextScene();
	}

	// Use this for initialization
	public void loadScene () {
		//Invoke ("load", m_Time);
		StartCoroutine("Load");
	}

	public void loadSceneWithTime (float _Time) {
		Invoke ("load", _Time);
	}

	IEnumerator Load () {
		//AsyncOperation async = Application.LoadLevelAsync(m_SceneToLoad);
		
		if ( m_ShowLoading )
			Application.LoadLevelAdditive("Loading");

		yield return new WaitForSeconds(m_Time);
		Application.LoadLevel(m_SceneToLoad);
	}

//	public void loadOtherRoot () {
//		StartCoroutine("LoadOtherRoot");
//	}
//	
//	public void loadOtherRootWithTime (float _Time) {
//		Invoke ("LoadOtherRoot", _Time);
//	}
//
//	IEnumerator LoadOtherRoot () {
//		if ( m_ShowLoading )
//			Application.LoadLevelAdditive("Loading");
//
//		yield return new WaitForSeconds(m_Time);
//		if ( m_RootToLoad == SceneManager.Instance.m_Barri.name ) {
//			print ( "LOAD el barri");
//			if ( SceneManager.Instance.m_Menu == null ) print ("ERROR!! LOAD MENU");
//			SceneManager.Instance.m_Barri.SetActive(true);
//			SceneManager.Instance.m_Menu.SetActive(false);
//			SceneManager.Instance.LastSceneLoaded = m_Barri.name;
//		}
//		else { 
//			print ( "LOAD el Menu");
//			if ( SceneManager.Instance.m_Menu == null ) print ("ERROR!! LOAD MENU");
//			SceneManager.Instance.m_Menu.SetActive(true);
//			SceneManager.Instance.m_Barri.SetActive(false);
//			SceneManager.Instance.LastSceneLoaded = m_Menu.name;
//		}
//
//	}

//	public void PreAnimacio () {
//		StartCoroutine("Aninem");
//	}
//	
//	IEnumerator Aninem () {
//		yield return new WaitForSeconds(0.5f);
//		//UIRoot mRoot = NGUITools.FindInParents<UIRoot>(gameObject);
//		GameObject go = NGUITools.GetRoot(this.gameObject);
//		go.GetComponent<TweenAlpha>().PlayReverse();
//		loadScene();
//	}
//
//	public void AutoLaunchNextScene () {
//		StartCoroutine("AutomaticNextScene");
//	}
//
//	IEnumerator AutomaticNextScene () {
//		yield return new WaitForSeconds(m_Time);
//		//UIRoot mRoot = NGUITools.FindInParents<UIRoot>(gameObject);
//		GameObject go = NGUITools.GetRoot(this.gameObject);
//		go.GetComponent<TweenAlpha>().PlayReverse();
//		loadScene();
//	}

	public string SceneToLoad 
	{
		get { return m_SceneToLoad; }
		set { m_SceneToLoad = value; }
	}

	public bool ShowLoading 
	{
		get { return m_ShowLoading;}
		set { m_ShowLoading = value; }			 
	}
}