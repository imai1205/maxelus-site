"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

// 角の丸いボックスジオメトリを作成する関数
function createRoundedBox(width: number, height: number, depth: number, radius: number) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  
  shape.moveTo(-w + radius, -h);
  shape.lineTo(w - radius, -h);
  shape.quadraticCurveTo(w, -h, w, -h + radius);
  shape.lineTo(w, h - radius);
  shape.quadraticCurveTo(w, h, w - radius, h);
  shape.lineTo(-w + radius, h);
  shape.quadraticCurveTo(-w, h, -w, h - radius);
  shape.lineTo(-w, -h + radius);
  shape.quadraticCurveTo(-w, -h, -w + radius, -h);
  
  const extrudeSettings = {
    depth: depth,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// iPhoneのような形でロゴを前面に表示するモデル
function LogoModel({ logoTexture }: { 
  logoTexture: THREE.Texture | null;
}) {
  // iPhone Frame画像のアスペクト比を保持（約9:19.5）
  const frameWidth = 3.0;
  const frameHeight = 6.5;
  const frameDepth = 0.15; // 厚みを薄く（黒枠を小さく）
  const cornerRadius = 0.3; // 角の丸み

  // ロゴのサイズ（iPhoneの前面に表示）
  const logoWidth = frameWidth * 0.8;
  const logoHeight = frameHeight * 0.3;

  // 角の丸いジオメトリ（iPhoneのフレーム）
  const roundedGeometry = useMemo(() => 
    createRoundedBox(frameWidth, frameHeight, frameDepth, cornerRadius), 
    []
  );

  // ロゴマテリアル（メタリックで光る）- テクスチャが確実に適用されるように
  const logoMaterial = useMemo(() => {
    if (logoTexture) {
      const img = logoTexture.image as HTMLImageElement | undefined;
      console.log('ロゴマテリアル作成:', { hasTexture: !!logoTexture, width: img?.width, height: img?.height });
      const mat = new THREE.MeshStandardMaterial({ 
        map: logoTexture,
        transparent: true,
        metalness: 0.9, // メタリック感
        roughness: 0.1, // 滑らかで光る
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0.1
      });
      // テクスチャを確実に設定
      mat.map = logoTexture;
      mat.needsUpdate = true;
      logoTexture.needsUpdate = true;
      return mat;
    }
    console.log('ロゴマテリアル作成（テクスチャなし）');
    return new THREE.MeshStandardMaterial({ 
      color: "#ff0000", // デバッグ用：赤
      metalness: 0.9,
      roughness: 0.1
    });
  }, [logoTexture]);

  // 側面のマテリアル（メタリック）
  const sideMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({ 
      color: "#1a1a1a",
      metalness: 0.95,
      roughness: 0.05
    }), 
    []
  );

  return (
    <group>
      {/* 前面 - ロゴ画像（iPhoneの画面部分に表示、正しい向き、最前面に配置） */}
      <mesh 
        position={[0, 0, frameDepth / 2 + 0.02]} 
        rotation={[0, 0, 0]}
        key={`logo-${logoTexture ? 'loaded' : 'empty'}`}
      >
        <planeGeometry args={[logoWidth, logoHeight]} />
        {logoTexture ? (
          <meshStandardMaterial 
            map={logoTexture}
            transparent={true}
            metalness={0.9}
            roughness={0.1}
          />
        ) : (
          <meshStandardMaterial color="#ff0000" />
        )}
      </mesh>

      {/* 側面（角の丸い厚みを表現、メタリック） */}
      <mesh position={[0, 0, 0]} geometry={roundedGeometry}>
        <primitive object={sideMaterial} attach="material" />
      </mesh>
    </group>
  );
}


// メインコンポーネント
export default function IPhone3DViewer() {
  const [isRotating, setIsRotating] = useState(true);
  const [textures, setTextures] = useState<{ 
    logo: THREE.Texture | null;
  }>({ logo: null });
  const { resolvedTheme } = useTheme();

  // ロゴパスをテーマに応じて切り替え
  const logoPath = resolvedTheme === 'dark' 
    ? '/cases/logo(D).png' 
    : '/cases/logo(W).png';


  // ロゴテクスチャのみを読み込む（シンプルな方法）
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let logoTexture: THREE.Texture | null = null;
    let isCancelled = false;

    console.log('ロゴテクスチャ読み込み開始:', { logoPath });

    // ロゴテクスチャを読み込み
    loader.load(
      logoPath,
      (texture) => {
        if (isCancelled) {
          texture.dispose();
          return;
        }
        console.log('ロゴテクスチャ読み込み成功:', texture, { 
          width: texture.image?.width, 
          height: texture.image?.height,
          flipY: texture.flipY 
        });
        texture.flipY = false;
        texture.needsUpdate = true;
        logoTexture = texture;
        console.log('ロゴテクスチャをstateに設定:', { hasTexture: !!logoTexture });
        setTextures(prev => {
          console.log('ロゴテクスチャstate更新:', { prev: !!prev.logo, new: !!logoTexture });
          return { ...prev, logo: logoTexture };
        });
      },
      undefined,
      (error) => {
        console.error('ロゴテクスチャ読み込みエラー:', error, logoPath);
      }
    );

    return () => {
      isCancelled = true;
      logoTexture?.dispose();
    };
  }, [logoPath]);


  return (
    <div className={`w-full h-[500px] relative rounded-xl overflow-hidden ${
      resolvedTheme === 'dark' 
        ? 'bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220]' 
        : 'bg-gradient-to-br from-[#f8f9fa] via-[#ffffff] to-[#f0f2f5]'
    }`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* ライティング（メタリック感を強調） */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, -5, -5]} intensity={1.5} />
        <directionalLight position={[0, 5, 0]} intensity={1.0} />
        <pointLight position={[0, 0, 10]} intensity={2.0} />
        <pointLight position={[-5, 0, 5]} intensity={1.5} />
        <pointLight position={[5, 0, 5]} intensity={1.5} />

        {/* カメラコントロール（マウス/タッチで回転） */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={6}
          maxDistance={12}
          autoRotate={isRotating}
          autoRotateSpeed={1}
        />

        {/* ロゴモデル（ロゴのみを表示） */}
        <LogoModel 
          logoTexture={textures.logo}
        />

        {/* 環境マッピング（反射を追加） */}
        <Environment preset="city" />
      </Canvas>

      {/* コントロールUI */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="text-white text-xs md:text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isRotating ? "⏸ 自動回転停止" : "▶ 自動回転開始"}
        </button>
        <div className="text-white/70 text-xs md:text-sm px-3 py-1 flex items-center gap-1">
          <span className="hidden md:inline">ドラッグ/スワイプで回転</span>
          <span className="md:hidden">スワイプで回転</span>
        </div>
      </div>
    </div>
  );
}
