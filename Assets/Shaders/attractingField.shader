Shader "Custom/attractingField" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_tint ("Base (RGB)", Color) = (1, 1, 1 ,1)
		_alpha ("alpha", Range(0,2)) = 0
		_width ("width", Range(0,0.3)) = 0
		_timer ("timer", float) = 0
//		_threshold ("threshold", Range(0,10)) = 0
		
	}
	SubShader {
		Tags {"Queue" = "Transparent+900" "RenderType"="Transparent"  "IgnoreProjector"="True" }
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
			half _width;
			half _max;
			half _threshold;
			half _timer;
			fixed4 _tint;
			
			struct v2f {
		    float4  pos : SV_POSITION;
		    float2  uv : TEXCOORD0;
		  
			};
       
			
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
				fixed4 col = _tint;
				
				half2 center = half2(0.5,1);
				half dist = distance(center,half2(i.uv.x,i.uv.y));
				col.w = 0;
				float thres = 1-_timer;
				float wd = _width*(1-i.uv.y); 
				if(dist >thres -wd && dist  < thres + wd )
				{
					col.w = i.uv.y;
				}
	
				return col;
			}
			
			
			ENDCG
		}

	} 
	FallBack "Diffuse"
}
