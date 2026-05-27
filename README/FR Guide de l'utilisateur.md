# Documentation fonctionnelle

## Informations générales

La cloud-app Full-item-update a pour objectif de permettre à un utilisateur **ayant un rôle administrateur**, de mettre à jour tous les champs des exemplaires listés dans un fichier CSV.

**Attention : Si un champ est laissé vide pour un exemplaire, l'ancienne valeur est supprimée.**

# Comment la cloud-app fonctionne

## 1. Insérer le fichier CSV

Cliquer sur le bouton “Parcourir…” afin d'insérer le fichier.
![alt text](../assets/first-step.png)

## 2. Lancer le traitement

Si le fichier est correct, le bouton “Lancer la traitement” apparaît. Sinon, un erreur s'affiche en dessous du bouton “Parcourir…”.
![alt text](../assets/second-step.png)

## 3. Traitement est en cours

Lorsque le traitement est en cours, un texte “En traitement” s'affiche sous le bouton “Parcourir..”. Si une erreur bloquante se déclenche, le traitement sera interrompu et un message d'erreur s'affichera à la place du texte.
![alt text](../assets/third-step.png)

## 4. Traitement est terminé

Lorsque le traitement est fini, deux boutons s'affichent.

Ils permettent de télécharger :

- le fichier contenant les données avant changement (csv au format .xlsx) en cliquant sur “Télécharger le fichier de Backup”.
- le journal d'erreur (format .txt) en cliquant sur “Télécharger le fichier de logs”.

![alt text](../assets/fourth-step.png)
