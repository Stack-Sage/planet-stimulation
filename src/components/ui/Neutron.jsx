import React, { useRef, useEffect, useContext } from "react";
import * as THREE from "three";
import { CollisionContext } from "../../contents/content";

const NeutronStar = ({
  size = 6, // Customizable size
  spikeFactor = 4, // Customizable spikes
  color = 0xFFFF00, // Base color
  emissiveColor = 	0xC0C0C0, // Emission from non-white parts
  emissiveIntensity = 100, // Glow intensity
  roughness = 0.3, // Surface roughness
  metalness = 1, // Metallic effect
}) => {
  const sceneRef = useRef(null);
  const { speed } = useContext(CollisionContext);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    sceneRef.current.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    // Function to create spiky neutron stars
    const createSpikyGeometry = (radius, detail, spikeFactor) => {
      const geometry = new THREE.IcosahedronGeometry(radius, detail);
      const positionAttribute = geometry.attributes.position;

      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
        vertex.normalize().multiplyScalar(radius + Math.random() * spikeFactor);
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      geometry.computeVertexNormals();
      return geometry;
    };

    // Material with emissive light from non-white parts
    const starMaterial = new THREE.MeshStandardMaterial({
      color: color,
      emissive: new THREE.Color(emissiveColor),
      emissiveIntensity: emissiveIntensity,
      roughness: roughness,
      metalness: metalness,
    });

    // Create neutron stars
    const star1 = new THREE.Mesh(createSpikyGeometry(size, 4, spikeFactor), starMaterial);
    const star2 = new THREE.Mesh(createSpikyGeometry(size, 4, spikeFactor), starMaterial);
    star1.position.set(20, 10, 0);
    star2.position.set(-20, -10, 0);
    scene.add(star1, star2);

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 5, 100);
    light1.position.set(0, 0, 0);
    light1.castShadow = true;
    scene.add(light1);

    const ambientLight = new THREE.AmbientLight(0x606060, 1);
    scene.add(ambientLight);

    // Background stars
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      starVertices.push(
        Math.random() * 400 - 200,
        Math.random() * 400 - 200,
        Math.random() * 400 - 200
      );
    }
    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Camera position
    camera.position.z = 180;

    // Interactive background movement
    let mouseX = 10;
    let mouseY = 10;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      const radius = 50;

      star1.position.x = radius * Math.cos(time * speed);
      star1.position.z = radius * Math.sin(time * speed);
      star2.position.x = -radius * Math.cos(time * speed);
      star2.position.z = -radius * Math.sin(time * speed);

      // Rotate stars
      star1.rotation.y += 0.01;
      star2.rotation.y += 0.01;

      // Move background on mouse movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, [speed, size, spikeFactor, color, emissiveColor, emissiveIntensity, roughness, metalness]);

  return <div ref={sceneRef} className="fixed z-0 inset-0 w-full h-full" />;
};

export default NeutronStar;
