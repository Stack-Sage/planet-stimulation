import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const SunParticleScene = ({ size = 500 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Transparent background

      // Camera setup
      const camera = new BABYLON.ArcRotateCamera(
        'ArcRotateCamera',
        Math.PI / 2,
        Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = camera.upperRadiusLimit = 10;
      camera.panningSensibility = 0;
      camera.wheelPrecision = 0;
      camera.inputs.removeByType('ArcRotateCameraMouseWheelInput');

      // Core sun sphere
      const coreSphere = BABYLON.MeshBuilder.CreateSphere('coreSphere', {
        diameter: 2.01,
        segments: 120,
      }, scene);

      const coreMat = new BABYLON.StandardMaterial('coreMat', scene);
      coreMat.emissiveColor = new BABYLON.Color3(0.3773, 0.093, 0.0266);
      coreMat.disableLighting = true;
      coreSphere.material = coreMat;

      // Particle emitter setup
      const sunEmitter = new BABYLON.SphereParticleEmitter();
      sunEmitter.radius = 1;
      sunEmitter.radiusRange = 0;

      // Particle systems
      const surfaceParticles = new BABYLON.ParticleSystem('surfaceParticles', 1600, scene);
      const flareParticles = new BABYLON.ParticleSystem('flareParticles', 200, scene);
      const coronaParticles = new BABYLON.ParticleSystem('coronaParticles', 600, scene);

      // Textures
      surfaceParticles.particleTexture = new BABYLON.Texture(
        'https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunSurface.png',
        scene
      );
      flareParticles.particleTexture = new BABYLON.Texture(
        'https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_SunFlare.png',
        scene
      );
      coronaParticles.particleTexture = new BABYLON.Texture(
        'https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Sun/T_Star.png',
        scene
      );

      // Shared settings
      [surfaceParticles, flareParticles, coronaParticles].forEach(ps => {
        ps.emitter = coreSphere;
        ps.particleEmitterType = sunEmitter;
        ps.gravity = new BABYLON.Vector3(0, 0, 0);
        ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
        ps.preWarmStepOffset = 10;
        ps.preWarmCycles = 100;
        ps.minInitialRotation = -2 * Math.PI;
        ps.maxInitialRotation = 2 * Math.PI;
      });

      // Color gradients
      surfaceParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
      surfaceParticles.addColorGradient(0.4, new BABYLON.Color4(0.6259, 0.3056, 0.0619, 0.5));
      surfaceParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.5));
      surfaceParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));

      flareParticles.addColorGradient(0, new BABYLON.Color4(1, 0.9612, 0.5141, 0.0));
      flareParticles.addColorGradient(0.25, new BABYLON.Color4(0.9058, 0.7152, 0.3825, 1.0));
      flareParticles.addColorGradient(1.0, new BABYLON.Color4(0.6320, 0.0, 0.0, 0.0));

      coronaParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
      coronaParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.12));
      coronaParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));

      // Particle sizes and scaling
      surfaceParticles.minSize = 0.4;
      surfaceParticles.maxSize = 0.7;

      flareParticles.minScaleX = flareParticles.minScaleY = 0.5;
      flareParticles.maxScaleX = flareParticles.maxScaleY = 1.0;
      flareParticles.addSizeGradient(0, 0);
      flareParticles.addSizeGradient(1, 1);

      coronaParticles.minScaleX = 0.5;
      coronaParticles.maxScaleX = 1.2;
      coronaParticles.minScaleY = 0.75;
      coronaParticles.maxScaleY = 3.0;

      // Lifetimes
      surfaceParticles.minLifeTime = surfaceParticles.maxLifeTime = 8.0;
      flareParticles.minLifeTime = flareParticles.maxLifeTime = 10.0;
      coronaParticles.minLifeTime = coronaParticles.maxLifeTime = 2.0;

      // Emission settings
      surfaceParticles.emitRate = 200;
      flareParticles.emitRate = 1;
      coronaParticles.emitRate = 300;

      surfaceParticles.updateSpeed = 0.005;
      surfaceParticles.minEmitPower = surfaceParticles.maxEmitPower = 0;
      flareParticles.minEmitPower = 0.001;
      flareParticles.maxEmitPower = 0.01;
      coronaParticles.minEmitPower = coronaParticles.maxEmitPower = 0;

      surfaceParticles.minAngularSpeed = -0.4;
      surfaceParticles.maxAngularSpeed = 0.4;

      // Billboarding
      surfaceParticles.isBillboardBased = false;
      flareParticles.isBillboardBased = true;
      coronaParticles.isBillboardBased = true;

      // Rendering layers
      surfaceParticles.renderingGroupId = 3;
      flareParticles.renderingGroupId = 2;
      coronaParticles.renderingGroupId = 1;
      coreSphere.renderingGroupId = 3;

      // Start the particles
      surfaceParticles.start();
      flareParticles.start();
      coronaParticles.start();

      return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(() => {
      scene.render();
      const core = scene.getMeshByName('coreSphere');
      if (core) core.rotation.y += 0.1;
    });

    window.addEventListener('resize', () => engine.resize());

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none  -top-60 "
      style={{ zIndex: 20 }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

export default SunParticleScene;
