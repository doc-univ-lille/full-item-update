# Documentation tehchnique

## Packages importants

- cloudapp.src.app.
  - main => Composant principal de la cloudapp. C'est lui qui gère la majorité de cette cloud-app.
  - models => Contient le modèle de l'objet Item, la représentation d'un exemplaire dans l'application.
  - services => Contient les classes et les méthodes effectuant les appels API vers Alma
- cloudapp.src.i18n => Contient les fichiers .json de traduction

## Méthodes internes à chaque fichier important de l'application

Cette documentation part du principe que le lecteur connaît les bases d'angular, nous ne parlerons donc que des fichiers TypeScript

### Le composant Main

_main.component.ts_

**Les attributs de la classe**
**Les attributs de la classe**

- Les labels (:string)
  - ErrorLabel => Affiché dans le html de l'application pour prévenir d'une erreur
  - evaluatingLabel => Affiché dans le html de l'application pour prévenir que le csv est en cours de traitement ou que le traitement est terminé
- Les booléens (:boolean)
  - hasEvaluationEnded => Est à true si l'évaluation est terminée
  - isAdmin => Est à true si l'utilisateur est Administrateur général
  - needToStop => Est à true si il y a une erreur bloquante lors de l'évaluation
- files (:File[]) => Permet de stocker le fichier CSV inséré en entrée
- barcodeList (:string[]) => Liste des code-barres présents dans le CSV inséré en entrée
- Les préparations de fichiers (:string)
  - csvString => Permet de créer le fichier de backup
  - journal => Permet de créer le journal de logs

**Les méthodes de la classe**

- ngOnInit => Utilisé pour la gestion des droits
- onFileChange => Appelée lorsqu'un fichier est insérée dans la cloudapp
- load => Parsing du CSV et lancement du traitement
- evaluateParsing => Utilisée pour traiter le fichier parsé
- parsedCsvToMap => Prend en paramètre le CSV parsé et retourne une liste de maps contenant en clé les champs en en-tête du CSV et en valeur, la valeur associée à cette colonne dans le CSV.
- findMapInMapList => Prend en paramètre un code-barres et une liste de Maps (représentant les données du CSV) et retrouve dans la liste de celle correspondant à la ligne avec le code-barres.
- downloadBackupFile => Permet de télécharger le fichier de backup
- downloadLogsFile => Permet de télécharger de fichier de logs
- resetApplication => Utilisée pour réinitialiser l'application

### Le Service alma.service

**Les méthodes de la classe**

- getBarcode => Permet de retrouver un item grâce à son code-barres passé en paramètre
- buildItemLink => Prend un item en paramètre et construit son lien
- updateItem => Prend un item en paramètre et le modifie
- updateArrayOfItems => Prend une liste d'items en paramètre et les modifie

### L'utilitaire ItemUtils.ts

**Les attributs de la classe**

- acceptedHeaders (:Set< string >) => La liste des champs disponibles dans le header du CSV
- headersWithDesc (:Set< string >) => La liste des headers possédant un champ value et un champ desc dans leur représentaton

**Les méthodes de la classe**

- isInAcceptedHeaders => renvoie true si le nom du champ passé en paramètre est dans la liste des champs disponibles
- modifItem => Modifie un item donnée en paramètre grâce au nom de l'attribut à modifier et à la valeur à modifier (tout deux donnés en paramètre)

* getValueByHeaderLabel => Renvoie la valeur d'un champ donné en paramètre pour un item donné en paramètre.
