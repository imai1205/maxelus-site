"use client";

import { useState, useEffect, useMemo } from "react";
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

// iPhoneの3Dモデル（iPhone Frame画像を立体的に表示）
function IPhoneModel({ frameTexture, logoTexture }: { 
  frameTexture: THREE.Texture | null;
  logoTexture: THREE.Texture | null;
}) {
  // iPhone Frame画像のアスペクト比を保持（約9:19.5）
  const frameWidth = 3.0;
  const frameHeight = 6.5;
  const frameDepth = 0.15; // 厚みを薄く（黒枠を小さく）
  const cornerRadius = 0.3; // 角の丸み

  // 角の丸いジオメトリ
  const roundedGeometry = useMemo(() => 
    createRoundedBox(frameWidth, frameHeight, frameDepth, cornerRadius), 
    []
  );

  return (
    <group>
      {/* 前面 - iPhone Frame画像（角の丸いマスク） */}
      {frameTexture && (
        <mesh position={[0, 0, frameDepth / 2 + 0.01]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          <meshStandardMaterial map={frameTexture} />
        </mesh>
      )}

      {/* 側面（角の丸い厚みを表現、黒枠を薄く） */}
      <mesh position={[0, 0, 0]} geometry={roundedGeometry}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 後ろ側 - マクセラスロゴ（ど真ん中に大きく配置、正しい向き） */}
      {logoTexture && (
        <mesh position={[0, 0, -frameDepth / 2 - 0.01]} rotation={[0, 0, 0]}>
          <planeGeometry args={[frameWidth * 0.7, frameHeight * 0.25]} />
          <meshStandardMaterial map={logoTexture} transparent />
        </mesh>
      )}
    </group>
  );
}


// メインコンポーネント
export default function IPhone3DViewer() {
  const [isRotating, setIsRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState<{ 
    frame: THREE.Texture | null; 
    logo: THREE.Texture | null;
  }>({ frame: null, logo: null });
  const { resolvedTheme } = useTheme();

  // ロゴパスをテーマに応じて切り替え
  const logoPath = resolvedTheme === 'dark' 
    ? '/cases/logo(D).png' 
    : '/cases/logo(W).png';

  // iPhone Frame画像
  const framePath = '/cases/IPhoneFrame-car.png';

  // テクスチャを読み込む（最適化版）
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let frameTexture: THREE.Texture | null = null;
    let logoTexture: THREE.Texture | null = null;
    let loadedCount = 0;
    const total = 2;
    let isCancelled = false;

    const checkComplete = () => {
      if (isCancelled) return;
      loadedCount++;
      if (loadedCount === total) {
        setIsLoading(false);
        setTextures({ frame: frameTexture, logo: logoTexture });
      } else if (loadedCount === 1) {
        // 1つでも読み込めたら表示開始
        setIsLoading(false);
        setTextures({ frame: frameTexture, logo: logoTexture });
      }
    };

    // iPhone Frameテクスチャを読み込み
    loader.load(
      framePath,
      (texture) => {
        if (isCancelled) {
          texture.dispose();
          return;
        }
        texture.flipY = false;
        frameTexture = texture;
        checkComplete();
      },
      undefined,
      () => {
        if (!isCancelled) {
          checkComplete();
        }
      }
    );

    // ロゴテクスチャを読み込み
    loader.load(
      logoPath,
      (texture) => {
        if (isCancelled) {
          texture.dispose();
          return;
        }
        texture.flipY = false;
        logoTexture = texture;
        checkComplete();
      },
      undefined,
      () => {
        if (!isCancelled) {
          checkComplete();
        }
      }
    );

    return () => {
      isCancelled = true;
      frameTexture?.dispose();
      logoTexture?.dispose();
    };
  }, [framePath, logoPath]);

  return (
    <div className="w-full h-[500px] relative bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220] rounded-xl overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220]">
          <div className="animate-pulse text-white/70 text-sm md:text-base">
            3Dモデルを読み込み中...
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* ライティング */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />

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

        {/* iPhoneモデル（iPhone Frame画像を立体的に表示） */}
        <IPhoneModel 
          frameTexture={textures.frame}
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
