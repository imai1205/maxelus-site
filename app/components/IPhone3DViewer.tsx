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
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius,
  };
  
  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// iPhoneの3Dモデル（改善版）
function IPhoneModel({ screenTexture, logoTexture, appleTexture }: { 
  screenTexture: THREE.Texture | null;
  logoTexture: THREE.Texture | null;
  appleTexture: THREE.Texture | null;
}) {
  const bodyGeometry = useMemo(() => createRoundedBox(2.5, 5.5, 0.3, 0.15), []);
  const screenGeometry = useMemo(() => createRoundedBox(2.2, 4.8, 0.05, 0.1), []);

  return (
    <group>
      {/* iPhone本体（角の丸いボディ） */}
      <mesh position={[0, 0, 0]} geometry={bodyGeometry}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 画面部分（角の丸い） */}
      <mesh position={[0, 0, 0.16]} geometry={screenGeometry}>
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 画面のコンテンツ（実際のiPhone Frame画像、なければ黒画面） */}
      <mesh position={[0, 0, 0.18]}>
        <planeGeometry args={[2.0, 4.4]} />
        <meshStandardMaterial map={screenTexture || null} color={screenTexture ? undefined : "#000000"} />
      </mesh>

      {/* Dynamic Island */}
      <mesh position={[0, 2.3, 0.18]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* カメラ部分 */}
      <mesh position={[0.8, 2.1, 0.18]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* 後ろ側 - Appleマーク */}
      {appleTexture && (
        <mesh position={[0, 0, -0.15]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.8, 1.0]} />
          <meshStandardMaterial map={appleTexture} transparent />
        </mesh>
      )}

      {/* 後ろ側 - マクセラスロゴ */}
      {logoTexture && (
        <mesh position={[0, -1.5, -0.15]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.2, 0.4]} />
          <meshStandardMaterial map={logoTexture} transparent />
        </mesh>
      )}
    </group>
  );
}

// Appleマークテクスチャを生成する関数
function createAppleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 白い背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 0, 256, 256);
    // Appleロゴ風のシンプルな円形
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(128, 128, 80, 0, Math.PI * 2);
    ctx.fill();
    // 内側に小さな円（Appleの葉っぱ部分を表現）
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(128, 100, 20, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  return texture;
}

// メインコンポーネント
export default function IPhone3DViewer() {
  const [isRotating, setIsRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState<{ 
    screen: THREE.Texture | null; 
    logo: THREE.Texture | null; 
    apple: THREE.Texture | null;
  }>({ screen: null, logo: null, apple: null });
  const { resolvedTheme } = useTheme();

  // ロゴパスをテーマに応じて切り替え
  const logoPath = resolvedTheme === 'dark' 
    ? '/cases/logo(D).png' 
    : '/cases/logo(W).png';

  // iPhone Frame画像
  const screenPath = '/cases/IPhoneFrame-saron.png';

  // テクスチャを読み込む（最適化版）
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let screenTexture: THREE.Texture | null = null;
    let logoTexture: THREE.Texture | null = null;
    let appleTexture: THREE.Texture | null = null;
    let loadedCount = 0;
    const total = 3;
    let isCancelled = false;

    // Appleマークテクスチャを即座に生成（同期処理）
    appleTexture = createAppleTexture();
    loadedCount++;
    
    // すぐに基本モデルを表示（テクスチャなしでも表示）
    if (loadedCount === 1) {
      setIsLoading(false);
      setTextures({ screen: null, logo: null, apple: appleTexture });
    }

    const checkComplete = () => {
      if (isCancelled) return;
      loadedCount++;
      if (loadedCount === total) {
        setTextures({ screen: screenTexture, logo: logoTexture, apple: appleTexture });
      }
    };

    // 画面テクスチャを読み込み（非同期、エラー時はスキップ）
    loader.load(
      screenPath,
      (texture) => {
        if (isCancelled) {
          texture.dispose();
          return;
        }
        texture.flipY = false;
        screenTexture = texture;
        checkComplete();
      },
      undefined,
      () => {
        if (!isCancelled) {
          checkComplete();
        }
      }
    );

    // ロゴテクスチャを読み込み（非同期、エラー時はスキップ）
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
      screenTexture?.dispose();
      logoTexture?.dispose();
      appleTexture?.dispose();
    };
  }, [screenPath, logoPath]);

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

        {/* iPhoneモデル（テクスチャがなくても表示） */}
        <IPhoneModel 
          screenTexture={textures.screen}
          logoTexture={textures.logo}
          appleTexture={textures.apple}
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
