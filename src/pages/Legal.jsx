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
                <h2 className="text-xl font-semibold text-white mb-3">1. Informations Générales</h2>
                <p><strong>Nom de l'entreprise ou projet :</strong> AgilFlow</p>
                <p><strong>Forme juridique :</strong> Entreprise Individuelle (EI)</p>
                <p><strong>Adresse du siège social :</strong> 47 rue de la République, 83170 BRIGNOLES</p>
                <p><strong>Numéro SIRET :</strong> En cours d'attribution</p>
                <p><strong>Numéro TVA intracommunautaire :</strong> En cours d'attribution</p>
                <p><strong>Téléphone :</strong> 06 12 34 56 78</p>
                <p><strong>Adresse e-mail officielle :</strong> contact@agilflow.app</p>
                <p><strong>Responsable de la publication :</strong> Anon Nymous</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Hébergement du Site</h2>
                <p><strong>Nom de l'hébergeur :</strong> IONOS SARL</p>
                <p><strong>Adresse de l'hébergeur :</strong> 7, place de la Gare - BP 70109 57201 SARREGUEMINES</p>
                <p><strong>Téléphone de l'hébergeur :</strong> 0970 808 911</p>
                <p><strong>Site web de l'hébergeur :</strong> <a href="https://www.ionos.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light">https://www.ionos.fr/</a></p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Gestion des Données Personnelles</h2>
                <p><strong>Données collectées :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Nom, prénom, e-mail</li>
                  <li>Informations liées à l'utilisation du service (contenus partagés, interactions)</li>
                </ul>
                <p className="mt-3"><strong>Finalité de la collecte :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Traitement des demandes et support client</li>
                  <li>Utilisation de la plateforme</li>
                  <li>Amélioration de l'expérience utilisateur et analyses statistiques</li>
                </ul>
                <p className="mt-3"><strong>Partage des données :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Les données ne sont partagées qu'avec l'hébergeur IONOS pour des raisons techniques et légales minimales.</li>
                  <li>Aucune donnée ne sera cédée ou vendue à des tiers commerciaux.</li>
                  <li>En cas de réquisition par les autorités compétentes, AgilFlow se conformera à ses obligations légales.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Droits des Utilisateurs</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants sur vos données :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Accès, rectification, effacement, opposition, limitation du traitement et portabilité.</li>
                </ul>
                <p className="mt-3">Vous pouvez exercer ces droits en nous contactant à <a href="mailto:contact@agilflow.app" className="text-primary hover:text-primary-light">contact@agilflow.app</a> ou par courrier à l'adresse suivante : 47 rue de la République, 83170 BRIGNOLES.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Cookies et Suivi</h2>
                <p><strong>Types de cookies utilisés :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Cookies nécessaires au bon fonctionnement du site</li>
                  <li>Cookies analytiques pour améliorer l'expérience utilisateur</li>
                </ul>
                <p className="mt-3">Certains cookies tiers peuvent être déposés par des services externes intégrés au site. AgilFlow n'exerce aucun contrôle sur leur installation et vous invite à consulter les politiques de confidentialité des tiers concernés.</p>
                <p className="mt-3"><strong>Gestion des cookies :</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Une bannière s'affichera lors de votre première visite pour obtenir votre consentement.</li>
                  <li>Vous pourrez modifier vos préférences via un lien en bas de page permettant de gérer les cookies.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Sécurité des Données</h2>
                <p>Nous mettons en place des mesures adaptées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation, notamment :</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Utilisation de protocoles de chiffrement pour sécuriser les échanges de données</li>
                  <li>Mécanismes de protection des accès aux informations sensibles</li>
                  <li>Mise en place de sauvegardes régulières pour prévenir toute perte de données</li>
                </ul>
                <p className="mt-3">Cependant, malgré nos efforts pour assurer un haut niveau de sécurité, aucun système n'est totalement inviolable. En cas d'incident de sécurité affectant vos données personnelles, nous nous engageons à prendre les mesures nécessaires et à vous en informer conformément aux obligations légales en vigueur.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Informations de Contact</h2>
                <p><strong>Email de contact pour toute question relative à la politique de confidentialité ou aux demandes RGPD :</strong> <a href="mailto:contact@agilflow.app" className="text-primary hover:text-primary-light">contact@agilflow.app</a></p>
                <p className="mt-2"><strong>Adresse postale pour toute demande relative aux données personnelles :</strong> 47 rue de la République, 83170 BRIGNOLES</p>
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
