import Footer from 'client/app/bouncenft/components/Footer';
import Header from 'client/app/bouncenft/components/Header';
import NftMint from 'client/app/bouncenft/components/NftMint';

export default function Mint() {
  return (
    <div className="tw relative">
      <Header />
      <NftMint />
      <Footer />
    </div>
  );
}
