Shader "Custom/swap" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_Tint ("Tint", Color) = (1,1,1,1)
		_alpha ("alpha", Range(0,2)) = 0
		_alpha2 ("alpha2", Range(0,2)) = 0
		_offset ("Ofsset", float) = 0
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
			half _alpha2;
			fixed4 _Tint;
			half _Ypos;
			half _offset;
			
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
				fixed4 col = tex2D(_MainTex, float2(i.uv));
				
				
				float amplitude = 0.9;
				float r = 0.45;
				half2 center;
				center[0] =1+cos(_Time[1]+_offset);
				
				center[1] = 1.3 ;
//				half2 center = half2(_DinamicCenter[0],_DinamicCenter[1]); 
				half2 sigma = half2(1,1)*0.05; 
				float gauss = amplitude*exp(-((pow(i.uv.x-center.x,2)/(2*pow(sigma.x,2)))+
											 (pow(i.uv.y-center.y,2)/(2*pow(sigma.y,2))))); 
				
				
				col =_Tint ;
				
					col.z = 1-exp(-i.uv.y);
					col.w =1;
					
				if(i.uv.y > _alpha)
				{
					col.w = pow(1-(i.uv.y-_alpha)/(2.0-_alpha),5);
				}
				
				if(i.uv.y < _alpha2) col.w =0;
//				if(col.w)	
//				{
//					col = fixed4(0,0,1,0);
//					col.w = _alpha;
//				}
				col += + fixed4(1,1,1,1)*gauss;
				return col;
			}
			
			
			ENDCG
		}

	} 
	FallBack "Diffuse"
}
