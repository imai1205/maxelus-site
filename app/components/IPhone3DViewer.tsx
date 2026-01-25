"use client";

import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// iPhoneの3Dモデル（簡易版）
function IPhoneModel() {

  return (
    <group>
      {/* iPhone本体 */}
      <mesh position={[0, 0, 0]}>
        {/* iPhoneのボディ（黒いフレーム） */}
        <boxGeometry args={[2.5, 5.5, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 画面部分 */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[2.2, 4.8, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 画面のコンテンツ（簡易表示） */}
      <mesh position={[0, 0.5, 0.18]}>
        <boxGeometry args={[2.0, 1.0, 0.02]} />
        <meshStandardMaterial color="#007AFF" />
      </mesh>
      <mesh position={[0, -0.5, 0.18]}>
        <boxGeometry args={[2.0, 1.0, 0.02]} />
        <meshStandardMaterial color="#34C759" />
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
    </group>
  );
}

// メインコンポーネント
export default function IPhone3DViewer() {
  const [isRotating, setIsRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 少し遅延させてローディングを表示
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220] rounded-xl">
        <div className="animate-pulse text-white/70 text-sm md:text-base">
          3Dモデルを読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative bg-gradient-to-br from-[#0b1220] via-[#1e293b] to-[#0b1220] rounded-xl overflow-hidden">
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

        {/* iPhoneモデル */}
        <IPhoneModel />

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
