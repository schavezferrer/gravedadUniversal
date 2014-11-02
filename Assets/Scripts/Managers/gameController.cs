using UnityEngine;
using System.Collections;

public class gameController : Singleton<gameController> {

	#region Singleton
	protected gameController() {} 			// garantizo que sea un singlenton
	#endregion

	enum Fade {In, Out}

	float m_AudioFadeSpeed = 4.0f;

	public float m_MusicVolume = 0f;
	public float m_FxVolume = 0f;
	public float m_VoiceVolume = 0f;

	private float m_OriginalMusicVolume = 1f;
	private float m_OriginalFxVolume = 1f;
	private float m_OriginalVoiceVolume = 1f;

	// Use this for initialization
	void Start () {
		m_MusicVolume = 0f;
		m_FxVolume = 0f;
		m_VoiceVolume = 0f;

		fadeAudio(m_AudioFadeSpeed, Fade.In);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void LoadPreferences () {
		m_OriginalMusicVolume = PlayerPrefs.GetFloat("MusicVolume");
		m_OriginalFxVolume = PlayerPrefs.GetFloat("FxVolume");
		m_VoiceVolume = PlayerPrefs.GetFloat("VoiceVolume");
	}
//
//	IEnumerator AudioStarter () {
//
//		float time = 0f;
//		while (time < m_AudioFadeSpeed) {
//			time += 0.001f * Time.deltaTime;
//			if ( m_MusicVolume < m_OriginalMusicVolume) 
//				m_MusicVolume += Time.deltaTime * 0.001f;
//		}
//
//		yield return null;
//
//		m_MusicVolume = m_OriginalMusicVolume;
//		m_FxVolume = m_OriginalFxVolume;
//		m_VoiceVolume = m_OriginalVoiceVolume;
//	}

	#region PUBLIC_METHODS

	public void setMusicVolumen ( float _Value ) {
		musicVolume = _Value;
	}

	public void setFxVolumen ( float _Value ) {
		soundVolume = _Value;
	}

	public void setVoiceVolumen ( float _Value ) {
		voiceVolume = _Value;
	}


	#endregion // PUBLIC_METHODS

	void fadeAudio ( float _Timer, Fade _Fadetype ) {
		float start = _Fadetype == Fade.In? 0f : 1f;
		float end = _Fadetype == Fade.Out? 1f : 0f;

		float i = 0f;
		float step = 1f/_Timer;

		while ( i <= m_AudioFadeSpeed ) {
			i +=  step * Time.deltaTime;
			m_MusicVolume = Mathf.Lerp(start, end, i);
			//yield;
		}

		m_MusicVolume = m_OriginalMusicVolume;
		m_FxVolume = m_OriginalFxVolume;
		m_VoiceVolume = m_OriginalVoiceVolume;
	}


	#region PROPERTIES 

	public float musicVolume {
		get { return m_MusicVolume; }
		set { m_MusicVolume = value; 
			audio.volume = m_MusicVolume;
		}
	}

	public float soundVolume {
		get { return m_FxVolume; }
		set { m_FxVolume = value; }
	}

	public float voiceVolume {
		get { return m_VoiceVolume; }
		set { m_VoiceVolume = value; }
	}

	#endregion // PROPERTIES 
}
