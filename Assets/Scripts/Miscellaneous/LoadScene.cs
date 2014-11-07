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
//		//AsyncOperation async = Application.LoadLevelAsync(m_SceneToLoad);
//		
////		if ( m_ShowLoading )
////			Application.LoadLevelAdditive("Loading");
//
//		print ("esperem ... " + m_Time.ToString());
//		print(Time.time);
		yield return new WaitForSeconds(m_Time);
//		print(Time.time);
		Application.LoadLevel(m_SceneToLoad);

		// Nomes per versio PRO
		//AsyncOperation async = Application.LoadLevelAsync(m_SceneToLoad);
		//yield return async;
		//Debug.Log("Escena carregada");
	}

//	public void loadOtherRoot () {
//		StartCoroutine("LoadOtherRoot");
//	}
//	
//	public void loadOtherRootWithTime (float _Time) {
//		Invoke ("LoadOtherRoot", _Time);
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