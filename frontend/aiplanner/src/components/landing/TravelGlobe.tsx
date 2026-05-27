import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function TravelGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.45, 5.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 64, 64),
      new THREE.MeshStandardMaterial({
        color: "#082f49",
        roughness: 0.55,
        metalness: 0.18,
        emissive: "#0e7490",
        emissiveIntensity: 0.22,
      }),
    )
    group.add(globe)

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(1.465, 32, 32),
      new THREE.MeshBasicMaterial({
        color: "#67e8f9",
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      }),
    )
    group.add(wire)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#fbbf24",
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    })

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.012, 12, 140), ringMaterial)
    ring.rotation.x = Math.PI / 2.8
    ring.rotation.y = -0.65
    group.add(ring)

    const arcMaterial = new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.95 })
    const arcPoints = new THREE.EllipseCurve(0, 0, 1.75, 0.72, 0.05, Math.PI - 0.25).getPoints(80)
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(
      arcPoints.map((point) => new THREE.Vector3(point.x, point.y + 0.18, 0.64)),
    )
    const arc = new THREE.Line(arcGeometry, arcMaterial)
    arc.rotation.z = -0.24
    group.add(arc)

    const pinMaterial = new THREE.MeshStandardMaterial({ color: "#fb7185", emissive: "#be123c", emissiveIntensity: 0.5 })
    const pins = [
      [-0.82, 0.78, 1.04],
      [0.58, 0.35, 1.28],
      [0.18, -0.64, 1.31],
      [-1.12, -0.18, 0.93],
    ]

    pins.forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(new THREE.SphereGeometry(0.055, 18, 18), pinMaterial)
      pin.position.set(x, y, z)
      group.add(pin)
    })

    const hotel = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.58, 0.18),
      new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.28 }),
    )
    hotel.position.set(1.28, -0.95, 0.75)
    hotel.rotation.y = -0.3
    group.add(hotel)

    const transport = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.48, 4),
      new THREE.MeshStandardMaterial({ color: "#22d3ee", emissive: "#0891b2", emissiveIntensity: 0.35 }),
    )
    transport.position.set(-1.35, -1.02, 0.7)
    transport.rotation.z = -0.8
    group.add(transport)

    const ambient = new THREE.AmbientLight("#ffffff", 1.8)
    const key = new THREE.DirectionalLight("#cffafe", 2.4)
    key.position.set(2.2, 2.8, 4)
    scene.add(ambient, key)

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener("resize", resize)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      group.rotation.y += 0.0035
      ring.rotation.z += 0.002
      transport.rotation.y += 0.015
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-[360px] w-full sm:h-[460px] lg:h-[560px]" />
}
