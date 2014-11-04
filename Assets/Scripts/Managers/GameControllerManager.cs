using UnityEngine;
using System.Collections;

public class GameControllerManager : Singleton<GameControllerManager> {

	#region Singleton
	protected GameControllerManager() {} 			// garantizo que sea un singlenton
	#endregion

	public enum DIFFICULT {
		EASY = 0,
		MEDIUM,
		HARD
	}

	#region PUBLIC_MEMBERS

	#endregion  // PUBLIC_MEMBERS

	#region PRIVATE_MEMBERS
	private OptionsPreferencesManager m_Options; 

	private DIFFICULT m_difficult = DIFFICULT.EASY; 
	#endregion  // PRIVATE_MEMBERS


	#region MONOBEHAVIOUR_METHODS
	void awake () {
		m_Options = gameObject.GetComponent<OptionsPreferencesManager>() as OptionsPreferencesManager;
	}

	// Use this for initialization
	void Start () {
		print ("GAME CONTROLLER START");
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void LoadPreferences () {
		m_Options.LoadPreferences();
	}

	#endregion // MONOBEHAVIOUR_METHODS

	#region PUBLIC_METHODS

	#endregion // PUBLIC_METHODS

	#region PRIVATE_METHODS


	#endregion // PRIVATE_METHODS

	#region PROPERTIES 

	public DIFFICULT difficult {
		get { return m_difficult; }
		set { m_difficult = value; }
	}

	public bool isPreferencesLoaded {
		get { return m_Options.isLoadedPreferences; }
	}
	#endregion // PROPERTIES 
}
