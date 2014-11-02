Shader "Custom/auraSun" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_Tint ("Tint", Color) = (1,1,1,1)
		rimWidth ("rimWidth", float) = 0.7
		
	}
	SubShader {
		Tags {"Queue" = "Transparent+1000" "RenderType"="Transparent"  "IgnoreProjector"="True"}
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
			
			fixed4 _Tint;
			float rimWidth;
			
			struct v2f {
		    float4  pos : SV_POSITION;
		    float2  uv : TEXCOORD0;
		  	float4 color : COLOR;
			};
       
			
	        float4 _MainTex_ST; // nose

			v2f vert (appdata_base v)
			{
			    v2f o;
			    
		     	float3 viewDir = normalize(ObjSpaceViewDir(v.vertex));
//	            float dotProduct = 1 - dot(v.normal, viewDir);
	            float dotProduct = 1 - dot(v.normal, fixed3(0,0,1));
//	            float rimWidth = 1;s
	            o.color = smoothstep(1 - rimWidth, 1.0, dotProduct);
	           
	//                    o.color *= _RimColor;
	           
	            o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
			    o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
			    return o;
			}
		
			half4 frag (v2f i) : COLOR
			{
			  	float4 texcol = tex2D(_MainTex, i.uv);
            	texcol *= _Tint;
           		texcol.rgb += i.color.rgb;
           		texcol.a =i.color.a;
            	return texcol;
			}
			
			
			ENDCG
		}

	} 
	FallBack "Diffuse"
}
