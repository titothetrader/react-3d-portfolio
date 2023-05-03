import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()
  return (
    <Html>
      <span className='canvas-load'></span>
      <p className='text-[#f1f1f1] text-xl font-bold mt-40'>{progress.toFixed(2)}%</p>
      <img src="https://tensai.nyc3.cdn.digitaloceanspaces.com/web-tensai/Tensai-logo-symbol-anim.gif" />
    </Html>
  )
}

export default Loader