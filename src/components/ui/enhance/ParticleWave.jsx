import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SnowParticles = () => {
  const mountRef = useRef(null);
  const mouseXRef = useRef(0); // Track horizontal position of mouse
  const mouseYRef = useRef(0); // Track vertical position of mouse
  const particleCount = 1000; // Total number of particles (snowflakes)
  const followStrength = 0.6; // The strength of how much the snowflakes move away from the mouse
  const driftStrength = 0.01; // Adds random jitter to the particles to make them more natural
  const maxDistance = 100; // The max distance particles should move from the center

  // Create a circular snowball texture using canvas
  const createSnowballTexture = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );

    gradient.addColorStop(0, "rgba(135, 206, 235, 1)"); // Sky Blue
    gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.4)"); // Cyan
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Fading to white
    

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    let frameId;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Snow geometry and material using BufferGeometry
    const snowParticles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3); // x, y, z for each particle
    const velocities = new Float32Array(particleCount * 3); // Velocities for snowflakes
    const sizes = new Float32Array(particleCount); // Random sizes for snowflakes
    const randomOffsets = new Float32Array(particleCount * 3); // Random jitter offsets for each snowflake

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 200 - 100; // x position
      positions[i * 3 + 1] = Math.random() * 200 - 100; // y position
      positions[i * 3 + 2] = Math.random() * 200 - 100; // z position
      velocities[i * 3 + 1] = -Math.random() * 0.1 - 0.2; // Falling speed (we'll remove this later)
      sizes[i] = Math.random() * 1.5 + 1; // Random size for each snowflake
      randomOffsets[i * 3] = Math.random() * 2 - 1; // Random X drift
      randomOffsets[i * 3 + 1] = Math.random() * 2 - 1; // Random Y drift
      randomOffsets[i * 3 + 2] = Math.random() * 2 - 1; // Random Z drift
    }

    snowParticles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    snowParticles.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    snowParticles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    snowParticles.setAttribute("offset", new THREE.BufferAttribute(randomOffsets, 3));

    const snowMaterial = new THREE.PointsMaterial({
      map: createSnowballTexture(),
      size: 1.4, // Smaller size
      transparent: true,
      alphaTest: 0.1,
      opacity: 0.9,
      depthWrite: false,
    });

    const snow = new THREE.Points(snowParticles, snowMaterial);
    scene.add(snow);

    // Track mouse position for away effect
    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseXRef.current = normalizedX * 100; // Scale to match the snowflakes' space
      mouseYRef.current = normalizedY * 100; // Scale to match the snowflakes' space
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animate snow with mouse-away effect (particles move away from mouse)
    const animate = () => {
      // Update the positions of the particles and snow accumulation
      const positionAttribute = snow.geometry.attributes.position;
      const velocityAttribute = snow.geometry.attributes.velocity;
      const sizeAttribute = snow.geometry.attributes.size;
      const offsetAttribute = snow.geometry.attributes.offset;

      for (let i = 0; i < positionAttribute.count; i++) {
        let x = positionAttribute.getX(i);
        let y = positionAttribute.getY(i);
        let z = positionAttribute.getZ(i);
        let velocityY = velocityAttribute.getY(i);
        let size = sizeAttribute.getX(i);
        let offsetX = offsetAttribute.getX(i);
        let offsetY = offsetAttribute.getY(i);
        let offsetZ = offsetAttribute.getZ(i);

        // Move snowflake away from the mouse pointer (move away effect)
        const directionX = x - mouseXRef.current;  // Reverse the direction
        const directionY = y - mouseYRef.current;  // Reverse the direction

        // Normalize direction
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);
        const directionNormalizedX = directionX / distance;
        const directionNormalizedY = directionY / distance;

        // Apply movement away from mouse pointer
        x += directionNormalizedX * followStrength + offsetX * driftStrength;
        y += directionNormalizedY * followStrength + offsetY * driftStrength;
        z += offsetZ * driftStrength; // Random z-axis drift

        // Random jitter effect
        offsetX = Math.random() * 2 - 1;
        offsetY = Math.random() * 2 - 1;
        offsetZ = Math.random() * 2 - 1;

        // Remove velocity as no downward movement is desired
        velocityY = 0;

        // Keep particles within bounds and recycle them when they go out of bounds
        if (x > maxDistance || x < -maxDistance || y > maxDistance || y < -maxDistance) {
          x = Math.random() * 200 - 100; // Randomize position when out of bounds
          y = Math.random() * 200 - 100; // Randomize position when out of bounds
          z = Math.random() * 200 - 100; // Reset z-axis position
        }

        positionAttribute.setXYZ(i, x, y, z);
        velocityAttribute.setY(i, velocityY);
        sizeAttribute.setX(i, size);
        offsetAttribute.setXYZ(i, offsetX, offsetY, offsetZ);
      }

      positionAttribute.needsUpdate = true;
      velocityAttribute.needsUpdate = true;
      sizeAttribute.needsUpdate = true;
      offsetAttribute.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none "
    />
  );
};

export default SnowParticles;
