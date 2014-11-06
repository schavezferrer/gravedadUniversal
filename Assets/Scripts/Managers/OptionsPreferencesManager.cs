using UnityEngine;
using System.Collections;

public class OptionsPreferencesManager : MonoBehaviour {

	#region PUBLIC_MEMBERS
	public bool m_LoadedPreferences = false;

	#endregion  // PUBLIC_MEMBERS

	#region MONOBEHAVIOUR_METHODS
	// Use this for initialization
	void Start () {
		LoadPreferences();
		m_LoadedPreferences = true;
	}
	
	void OnDisable () { 
		SavePreferences();
	}

	void OnEnable () { 
	}

	#endregion // MONOBEHAVIOUR_METHODS

	#region PUBLIC_METHODS

	public void LoadPreferences () {
		// Guardo el so
		AudioManager.Instance.musicVolume = PlayerPrefs.GetFloat("MusicVolume", 0f);
		AudioManager.Instance.soundVolume = PlayerPrefs.GetFloat("FxVolume", 1f);
		AudioManager.Instance.voiceVolume = PlayerPrefs.GetFloat("VoiceVolume", 0f);

		// Guardo la dificultat
		GameControllerManager.Instance.difficult = (GameControllerManager.DIFFICULT) PlayerPrefs.GetInt("Difficult");
	}

	public void SavePreferences () {
		// Guardo el so
		PlayerPrefs.SetFloat("MusicVolume", AudioManager.Instance.musicVolume);
		PlayerPrefs.SetFloat("FxVolume", AudioManager.Instance.soundVolume);
		PlayerPrefs.SetFloat("VoiceVolume", AudioManager.Instance.voiceVolume);

		// Guardo la dificultat
		PlayerPrefs.SetInt("Difficult", (int) GameControllerManager.Instance.difficult);
	}
	#endregion // PUBLIC_METHODS
	
	#region PRIVATE_METHODS

	#endregion // PRIVATE_METHODS

	public bool isLoadedPreferences {
		get { return m_LoadedPreferences; }
		set { m_LoadedPreferences = value; }
	}

}
