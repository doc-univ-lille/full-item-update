# Documentation fonctionnelle

## Informations générales

La cloud-app Full-item-update a pour objectif de permettre à un utilisateur **ayant un rôle administrateur**, de mettre à jour tous les champs des exemplaires listés dans un fichier CSV.

**Attention : Si un champ est laissé vide pour un exemplaire, l'ancienne valeur est supprimée.**

**Le fichier CSV peut comporter au maximum 5 000 lignes**

Un dysfonctionnement a été remarqué avec l'utilisaion de Firefox sous Windows lors de l'insertion d'un fichier. Cela semble commun à plusieurs cloud-apps.

# Comment la cloud-app fonctionne

## 1. Insérer le fichier CSV

Cliquer sur le bouton “Parcourir…” afin d'insérer le fichier.

![alt text](../assets/first-step.png)

## 2. Lancer le traitement

Si le fichier est correct, le bouton “Lancer la traitement” apparaît. Sinon, un erreur s'affiche en dessous du bouton “Parcourir…”.

![alt text](../assets/second-step.png)

## 3. Génération du fichier de Backup

Lorsque la première phase du traitement est en cours, un texte “Génération du fichier de backup” s'affiche sous le bouton “Parcourir..”. Si une erreur bloquante se déclenche, le traitement sera interrompu et un message d'erreur s'affichera à la place du texte.

![alt text](../assets/third-step.png)

## 4. Génération terminée

A la fin de la première phase du traitement, deux boutons s'affichent :

- le bouton “Télécharger le fichier de Backup” permettant de télécharger le fichier contenant les données avant changement (csv au format .xlsx).
- le bouton “Mettre à jour les exemplaires” qui permet de lancer la phase suivante du traitement.

![alt text](../assets/fourth-step.png)

## 5. Mise à jour des notices

Après le clic sur le bouton “Mettre à jour les exemplaires” l'application va lancer la mise à jour des notices et le texte “en traitement” va apparaître. Veuillez ne pas fermer la fenêtre lors de ce traitement.

![alt text](../assets/fifth-step.png)

## 6. Traitement terminé

Lorsque le traitement est fini, un bouton s'affiche. Il permet de télécharger le journal d'erreur (format .txt)

![alt text](../assets/sixth-step.png)
