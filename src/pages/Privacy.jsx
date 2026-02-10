import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Politique de confidentialité</h1>
            
            <div className="space-y-6 text-white/80">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Collecte des données</h2>
                <p>
                  Nous collectons uniquement les données nécessaires au fonctionnement du service :
                  nom, email, mot de passe (chiffré), et contenu des User Stories que vous créez.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Utilisation des données</h2>
                <p>
                  Vos données sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Vous permettre d'accéder à votre compte</li>
                  <li>Sauvegarder vos User Stories</li>
                  <li>Améliorer le service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Partage des données</h2>
                <p>
                  Vos données ne sont jamais vendues ni partagées avec des tiers, sauf obligation légale.
                  Elles sont hébergées de manière sécurisée sur Vercel et Neon (PostgreSQL).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la portabilité</li>
                </ul>
                <p className="mt-3">
                  Pour exercer ces droits, contactez-nous à : contact@agilflow.app
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
                <p>
                  Nous utilisons uniquement des cookies essentiels au fonctionnement du site
                  (authentification). Aucun cookie de tracking ou publicitaire.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">Sécurité</h2>
                <p>
                  Vos mots de passe sont chiffrés avec bcrypt. Les communications sont sécurisées
                  via HTTPS. Nous appliquons les meilleures pratiques de sécurité.
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
