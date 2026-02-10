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
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Politique de Confidentialité d'AgilFlow</h1>
            
            <div className="space-y-6 text-white/80">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                <p>
                  La présente Politique de Confidentialité explique comment AgilFlow collecte, utilise et protège vos données personnelles lorsque vous utilisez nos services. Nous nous engageons à respecter votre vie privée et à traiter vos données en conformité avec le Règlement Général sur la Protection des Données (RGPD).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Données Collectées</h2>
                <p>Nous collectons uniquement les données nécessaires à l'amélioration et au bon fonctionnement de nos services :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li><strong>Données fournies par l'utilisateur :</strong> Nom, prénom, adresse e-mail.</li>
                  <li><strong>Données générées par l'utilisation de la plateforme :</strong> Contenus partagés, interactions avec le service.</li>
                  <li><strong>Données techniques :</strong> Adresse IP, type de navigateur, informations de connexion.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Finalité de la Collecte des Données</h2>
                <p>Nous utilisons vos données pour :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Répondre à vos demandes et assurer le support client.</li>
                  <li>Améliorer l'expérience utilisateur et optimiser nos services.</li>
                  <li>Réaliser des analyses statistiques.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Partage des Données</h2>
                <p>Vos données ne sont partagées qu'avec des tiers strictement nécessaires :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li><strong>Hébergeur (IONOS) :</strong> Pour assurer la disponibilité technique du site.</li>
                  <li><strong>Autorités légales :</strong> En cas de réquisition par les autorités compétentes.</li>
                  <li><strong>Aucun partage commercial :</strong> Vos données ne seront ni vendues, ni cédées à des tiers à des fins publicitaires.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Vos Droits</h2>
                <p>Vous disposez des droits suivants sur vos données personnelles :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Droit d'accès, de rectification, d'effacement et d'opposition.</li>
                  <li>Droit à la limitation du traitement et à la portabilité des données.</li>
                </ul>
                <p className="mt-3">
                  Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@agilflow.app" className="text-primary hover:text-primary-light">contact@agilflow.app</a> ou à l'adresse postale suivante : 47 rue de la République, 83170 BRIGNOLES.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Cookies et Suivi</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nous utilisons uniquement des cookies nécessaires au bon fonctionnement du site et des cookies analytiques pour améliorer l'expérience utilisateur.</li>
                  <li>Certains cookies tiers peuvent être déposés indépendamment de notre volonté.</li>
                  <li>Une bannière de consentement s'affiche lors de votre première visite pour vous permettre de gérer vos préférences.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Sécurité des Données</h2>
                <p>Nous appliquons des mesures de protection visant à garantir la sécurité de vos données personnelles et à prévenir tout accès non autorisé, altération, perte ou divulgation.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Utilisation de technologies de chiffrement pour sécuriser les échanges</li>
                  <li>Mécanismes renforcés de protection des accès aux informations</li>
                  <li>Systèmes de sauvegardes régulières pour assurer l'intégrité des données</li>
                </ul>
                <p className="mt-3">
                  Malgré ces précautions, aucun système n'est infaillible. En cas d'incident de sécurité affectant vos données, nous prendrons les mesures nécessaires et vous informerons conformément aux réglementations en vigueur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Modifications de la Politique de Confidentialité</h2>
                <p>Cette politique peut être mise à jour à tout moment. Nous vous informerons des changements importants via notre site web.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
                <p>Si vous avez des questions, vous pouvez nous contacter à :</p>
                <p className="mt-2"><strong>Email :</strong> <a href="mailto:contact@agilflow.app" className="text-primary hover:text-primary-light">contact@agilflow.app</a></p>
                <p><strong>Adresse postale :</strong> 47 rue de la République, 83170 BRIGNOLES</p>
              </section>

              <p className="mt-8 text-sm text-white/60">
                Cette Politique de Confidentialité est en vigueur à compter du 30/01/2025.
              </p>
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
