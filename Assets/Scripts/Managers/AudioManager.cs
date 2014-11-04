using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class AudioManager : Singleton<AudioManager> {

	#region Singleton
	protected AudioManager() {} 			// garantizo que sea un singlenton
	#endregion

	enum Fade {In, Out}
	

	#region PUBLIC_MEMBERS
	public float m_MusicVolume = 0f;
	public float m_FxVolume = 0f;
	public float m_VoiceVolume = 0f;
	#endregion // PUBLIC_MEMBERS
	public List<AudioClip> m_Music = new List<AudioClip>();

	#region PRIVATE_MEMBERS
	private float m_AudioFadeSpeed = 3.0f;				// Velocitat en ms del fade
	private float m_OriginalMusicVolume = 1f;			// volum original de musica
	private float m_OriginalFxVolume = 1f;				// volum original de so
	private float m_OriginalVoiceVolume = 1f;			// volum original de veu
	#endregion PRIVATE_MEMBERS

	#region MONOBEHAVIOUR_METHODS
	void Awake () {

		DontDestroyOnLoad(this.gameObject);
	}

	// Use this for initialization
	void Start () {
		print ("MUSIC START");
		if ( m_Music.Count > 0 ) {
			audio.clip = m_Music[0];
			audio.loop = true;
			audio.volume = 0;
			audio.Play();
			FadeAudio(m_AudioFadeSpeed, Fade.In);
		}
	}
	
	// Update is called once per frame
	void Update () {
		//FadeAudio(m_AudioFadeSpeed, Fade.In);
	}

	void OnDisable () {
//		if ( audio )
//			audio.Pause();
		FadeAudio(m_AudioFadeSpeed, Fade.Out);
	}

	void OnEnable () {
//		if ( audio )
//			audio.Play();
		FadeAudio(m_AudioFadeSpeed, Fade.In);
	}
	#endregion // MONOBEHAVIOUR_METHODS

	#region PUBLIC_METHODS

	public void FadeIn () {
		audio.Play();
	}

	public void FadeOut () {
		audio.Stop();
	}

	public void SetSong (int _Music) {
		audio.clip = m_Music[_Music];
	}

	public void SetMusicVolumen ( float _Value ) {
		musicVolume = _Value;
	}
	
	public void SetFxVolumen ( float _Value ) {
		soundVolume = _Value;
	}
	
	public void SetVoiceVolumen ( float _Value ) {
		voiceVolume = _Value;
	}

	#endregion // PUBLIC_METHODS

	#region PRIVATE_METHODS
	private void FadeAudio ( float _Timer, Fade _Fadetype ) {
		float start = _Fadetype == Fade.In? 0f : 1f;
		float end = _Fadetype == Fade.In? 1f : 0f;
		
		float i = 0f;
		float step = 1f/_Timer;

		while ( i <= m_AudioFadeSpeed ) {
			i +=  step * Time.deltaTime;
			SetMusicVolumen(Mathf.Lerp(start, end, i));
		}
	}

	#endregion // PRIVATE_METHODS

	#region PROPERTIES 
	
	public float musicVolume {
		get { return m_MusicVolume; }
		set { m_MusicVolume = value; 
			audio.volume = m_MusicVolume;
		}
	}
	
	public float soundVolume {
		get { return m_FxVolume; }
		set { m_FxVolume = value;
			NGUITools.soundVolume = value;
		}
	}
	
	public float voiceVolume {
		get { return m_VoiceVolume; }
		set { m_VoiceVolume = value; }
	}
	
	#endregion // PROPERTIES 
}
