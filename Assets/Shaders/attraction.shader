Shader "Custom/attracted" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_Tint ("Tint", Color) = (1,1,1,1)
		_Timer ("timer", Range(0,2)) = 0
		_Timer2 ("timer2", Range(0,2)) = 0
	}
	SubShader {
		Tags {"Queue" = "Transparent+1000" "RenderType"="Transparent" }
		Pass
		{
			ZWrite On
			Blend SrcAlpha OneMinusSrcAlpha 
			Lighting Off
		
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag	
			#include "UnityCG.cginc"
			#pragma target 3.0
	
			sampler2D _MainTex;
			half _Timer;
			half _Timer2;
			fixed4 _Tint;
			half _Ypos;
			
			struct v2f {
		    float4  pos : SV_POSITION;
		    float2  uv : TEXCOORD0;
		  
			};
       
			half planarWave(vec2 p)
			{
				float A = 1;
				float T = 1;
				float lambda = 0.1;
				float2 k = normalize(float2(0,1))*3.1413/lambda;
				float w = 2*3.1413/T;
				float fi = 0;
				float2 l = p;
				float t = _Time[1];
			  	float wave = A*cos(dot(k,l)-w*t+fi);
		   
		   		return wave;
			}
	        float4 _MainTex_ST; // nose

			v2f vert (appdata_base v)
			{
			    v2f o;
			    o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
			    o.uv = TRANSFORM_TEX (v.texcoord, _MainTex); // nose
			    
			   
			    return o;
			}
		
			half4 frag (v2f i) : COLOR
			{
				fixed4 col = tex2D(_MainTex, float2(i.uv));
				float amplitude = 0.9;
				float r = 1;
				half2 center;
				
//				center[0] = 1 + r*cos(_Time[1]);
//				center[1] = 1 + r*sin(_Time[1]);
				
				center[0] = _Timer;
				center[1] = _Timer2;
				
				half2 sigma = half2(1,0.5)*0.05; 
				float gauss = amplitude*exp(-((pow(i.uv.x-center.x,2)/(2*pow(sigma.x,2)))+
											 (pow(i.uv.y-center.y,2)/(2*pow(sigma.y,2))))); 
//				center[0] = _Timer+1;
//				center[1] = _Timer2+1;							 
//			 	
//			 	if(center[0]>2)center[0] -= 2;
//			 	if(center[1]>2)center[1] -= 2;
//			 	
//			 	float gauss2 = amplitude*exp(-((pow(i.uv.x-center.x,2)/(2*pow(sigma.x,2)))+
//			 	(pow(i.uv.y-center.y,2)/(2*pow(sigma.y,2))))); 
				 
				_Tint.w = 0;
				
				
				
				return _Tint + fixed4(1,1,1,1)*gauss*1;
			}
			
			
			ENDCG
		}

	} 
	FallBack "Diffuse"
}
