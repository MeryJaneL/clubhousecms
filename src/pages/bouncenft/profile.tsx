import Footer from 'client/app/bouncenft/components/Footer';
import Header from 'client/app/bouncenft/components/Header';
import NftList from 'client/app/bouncenft/components/NftList';
import ProfileHeader from 'client/app/bouncenft/components/ProfileHeader';

export default function Bouncenft() {
  return (
    <div className="tw relative">
      <Header />
      <ProfileHeader />
      <NftList title={null} />
      <Footer />
    </div>
  );
}
