import Hero from '@/components/home/Hero';
import Expertises from '@/components/home/Expertises';
import Equipe from '@/components/home/Equipe';
import Partenaires from '@/components/home/Partenaires';
import AppelDevis from '@/components/home/AppelDevis';
import WhatsAppFlottant from '@/components/ui/WhatsAppFlottant';

export default function Accueil() {
  return (
    <>
      <Hero />
      <Expertises />
      <Equipe />
       <WhatsAppFlottant />
      <Partenaires />
      <AppelDevis />
    </>
  );
}
