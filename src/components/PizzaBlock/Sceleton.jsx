import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={322}
    height={500}
    viewBox="0 0 322 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="164" cy="139" r="139" /> 
    <rect x="14" y="296" rx="5" ry="5" width="292" height="30" /> 
    <rect x="14" y="340" rx="10" ry="10" width="292" height="88" /> 
    <rect x="14" y="455" rx="5" ry="5" width="88" height="30" /> 
    <rect x="153" y="443" rx="7" ry="7" width="152" height="45" />
  </ContentLoader>
)
export default Sceleton;
