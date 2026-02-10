import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Mentions légales</h1>
            
            <div className="space-y-6 text-white/80">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Éditeur</h2>
                <p>AgilFlow</p>
                <p>Développé par kydoCode</p>
                <p>Contact : contact@agilflow.app</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Hébergement</h2>
                <p>Vercel Inc.</p>
                <p>340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Propriété intellectuelle</h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive d'AgilFlow.
                  Toute reproduction est interdite sans autorisation préalable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Données personnelles</h2>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression
                  de vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse ci-dessus.
                </p>
              </section>
            </div>

            <div className="mt-8">
              <Link to="/" className="text-primary hover:text-primary-light transition-colors">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
