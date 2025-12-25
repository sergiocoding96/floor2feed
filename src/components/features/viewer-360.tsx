"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Move3D } from "lucide-react";

interface Viewer360Props {
  imageUrl: string;
  className?: string;
}

// Inner component that renders the panorama sphere
function PanoramaSphere({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const { camera } = useThree();

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    camera.position.set(0, 0, 0.1);
  }, [texture, camera]);

  return (
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
}

// Loading fallback
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-midnight/90">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/70 text-sm">Loading 360° view...</p>
      </div>
    </div>
  );
}

export function Viewer360({ imageUrl, className = "" }: Viewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video bg-midnight rounded-xl overflow-hidden ${className}`}
    >
      {isLoading && <LoadingSpinner />}

      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0.1] }}
        gl={{ antialias: true, alpha: false }}
        onCreated={() => setIsLoading(false)}
      >
        <Suspense fallback={null}>
          <PanoramaSphere imageUrl={imageUrl} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={-0.5}
          minDistance={0.1}
          maxDistance={5}
          reverseOrbit={true}
          // Pinch zoom works automatically on touch devices
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_ROTATE,
          }}
        />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm text-white/90 text-xs px-4 py-2 rounded-full flex items-center gap-2">
          <Move3D className="w-4 h-4" />
          <span>Drag to look around • Pinch or scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}

export default Viewer360;
