import Footer from 'client/app/bouncenft/components/Footer';
import Header from 'client/app/bouncenft/components/Header';
import NftHistory from 'client/app/bouncenft/components/NftHistory';
import NftOverview from 'client/app/bouncenft/components/NftOverview';

export default function Bouncenft() {
  return (
    <div className="tw relative">
      <Header />
      <NftOverview />
      <NftHistory />
      <Footer />
    </div>
  );
}
