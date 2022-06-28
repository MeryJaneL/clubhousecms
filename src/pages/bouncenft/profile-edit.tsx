import Footer from 'client/app/bouncenft/components/Footer';
import Header from 'client/app/bouncenft/components/Header';
import ProfileEdit from 'client/app/bouncenft/components/ProfileEdit';

export default function Bouncenft() {
  return (
    <div className="tw relative">
      <Header />
      <ProfileEdit />
      <Footer />
    </div>
  );
}
