Shader "Custom/attractingField" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_alpha ("alpha", Range(0,2)) = 0
		_Ypos ("YPos", Range(0,2)) = 0
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
			half _alpha;
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
				if(col.w)	col = fixed4(1,1,1,1)*planarWave(i.uv);
				
				col.w = pow(i.uv.y,3);
				col.w -= _alpha;
//				col = fixed4(1,1,1,1);
//				if(i.uv.x < _Xpos) col.w = 0;
//				if(i.uv.y < (0.1+0.1*sin(i.uv.x*30+_Time[1]))*(0.5+0.5*sin(_Time[1]*3))) col.w = 0;
				return col;
			}
			
			
			ENDCG
		}

	} 
	FallBack "Diffuse"
}
