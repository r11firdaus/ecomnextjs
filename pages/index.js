import Nav from "../components/nav";
// import Saldo from "../components/saldo";
// import PromoBanner from "../components/promoBanner";
// import TilesMenu from "../components/tilesMenu";
import { memo } from "react";

const Home = () => {

  return (<>
    <Nav type="home" title="Jwallin" />

    {/* <Saldo />
    
    <PromoBanner />

    <TilesMenu />     */}
  </>)
}

export default memo(Home)