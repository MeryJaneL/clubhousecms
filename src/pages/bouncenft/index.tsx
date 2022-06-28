import Footer from 'client/app/bouncenft/components/Footer';
import Header from 'client/app/bouncenft/components/Header';
import MainHero from 'client/app/bouncenft/components/MainHero';
import NftList from 'client/app/bouncenft/components/NftList';

export default function Bouncenft() {
  return (
    <div className="tw relative">
      <Header />
      <MainHero />
      <NftList title="현재 Bounce NFT에서 25개의 NFT가 발행되었습니다." />
      <Footer />
    </div>
  );
}
