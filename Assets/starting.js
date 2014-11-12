#pragma strict

function Start () {

}

function Update () {

}

function OnGUI()
{
	if(GUI.Button(Rect(Screen.width*0.5-Screen.width*0.1/2.0,Screen.height*0.8,Screen.width*0.1,Screen.width*0.1),"PLAY"))
	{
		Application.LoadLevel("Level1");
	}
}