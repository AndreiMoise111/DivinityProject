# DivinityProject
Projet réalisé par Andrei Moise et Louis Lecoeur
## Généralités
Ce projet est la simulation de deux cités qui gèrent leurs ressources, marchandes et combattent entre elles. Chacune de ces cités possède deux types de ressource: le blé et d'or ainsi qu'une divinité qu'elles venèrent. Pour satisfaire leur divinité, les deux cités effectuent des offrandes régulière dans l'espoir d'obtenir une bénédiction. Les cités peuvent créer leurs troupes au détriment d'un certain coût en blé et or afin de mener leur peuple à la victoire.

## Le code
4 classes ont été créé pour ce projet:
* Divinity
  1. En retour des offrandes renvoi un certain montant de ressources en récompense
* City  (la majeure partie des fonctions se trouvent dans la classe City)
  1. Effectue des offrandes régulièrement
  2. Forme de nouvelles troupes
  3. La cité envoie ses troupes au combat lorsqu'elle en dispose d'un certain nombre
* Troupe
  1. Les troupes appartiennent à une cité et peuvent mourir de vieilesse
* Trader
  1. Chaque marchand appartient à une cité
  2. Il est chargé de faire l'intermédiaire entre 2 cité lors d'un échange de ressources
  3. Possibilité de se faire attaqué lors de l'échange et de se faire dérober ses ressources

  Un programme main appelle les fonctions avec des setInterval() pour effectuer la simulation.
