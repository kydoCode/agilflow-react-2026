# Justification Direction Artistique v2 — Kanban Dark Tech

## Contexte

La DA actuelle d'AgilFlow repose sur un glassmorphisme avec gradient `#020B2D → #123363 → #0D8B7D`.
Ce choix initial était cohérent pour une landing page SaaS grand public, mais le Kanban board — cœur fonctionnel de l'application — mérite une identité visuelle plus affirmée, alignée sur les standards des outils de gestion de projet professionnels (Linear, Plane, Jira dark mode).

## Source

Sur la base des visuels générés pour le clip de présentation, réflexion menée avec allers-retours sur les interfaces UI des outils de gestion de projet professionnels (Linear, Plane, Jira dark mode) — test de nouvelle DA.

## Décisions de DA

### Palette

| Rôle | Actuel | v2 |
|------|--------|----|
| Background | `#020B2D` (gradient) | `#050B10` (noir bleuté uniforme) |
| Surfaces cartes | `rgba(255,255,255,0.05)` (glass) | `#0D1A22` (surface solide sombre) |
| Accent principal | `#0D8B7D` (teal) | `#00F2EA` (cyan électrique) |
| Accent secondaire | — | `#1DB954` (vert émeraude, états actifs) |
| Texte secondaire | `rgba(255,255,255,0.7)` | `#A0BACF` (gris bleuâtre désaturé) |

**Justification** : Le fond uniforme `#050B10` réduit la fatigue visuelle sur sessions longues. Le cyan `#00F2EA` offre un ratio de contraste supérieur sur fond sombre (WCAG AA maintenu). La surface solide `#0D1A22` améliore la lisibilité des cartes Kanban vs le flou glassmorphique.

### Effets visuels

- `box-shadow: 0 0 15px rgba(0, 242, 234, 0.2)` sur boutons et cartes actives — effet glow subtil, signature visuelle "tech"
- `border-radius: 12px` sur les cartes (vs 8px actuel) — arrondi plus généreux, perception premium
- Gradient linéaire vertical sur boutons primaires (cyan → cyan foncé)

### Typographie

Inter (déjà chargée) — pas de changement. Montserrat en fallback pour les titres si Inter non disponible.

## Conformité WCAG AA

Ratios à vérifier avant merge :
- Texte blanc `#FFFFFF` sur `#050B10` → ratio ~19:1 ✅
- Texte `#A0BACF` sur `#050B10` → ratio ~7.2:1 ✅
- Cyan `#00F2EA` sur `#050B10` → ratio ~12.6:1 ✅ (usage icônes/accents, pas texte courant)

## Stratégie de déploiement

Implémentation sur branche `feature/da-v2-kanban` uniquement.
Validation sur Vercel preview avant tout merge vers dev/main.
Critères : cohérence visuelle globale + maintien WCAG AA + avis formateur.
