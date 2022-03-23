<div>
  <h1 align="center"><a href="https://nathaelb.fr">Bot Discord 🚀 TypeScript</a></h1>
  <strong>
    Bot Template
  </strong>
  <p>
    Bot OpenSource disposant de divers modules, avec installation et mise en prod très facile
  </p>

  <a href="https://go.mikecodeur.com/react-mastery">
    <img 
      alt="Tah l'image du beau macbook pro"
      src="https://astucejeuxps4.com/wp-content/uploads/2021/10/1634884322_734_Toutes-les-specifications-la-taille-de-lecran-et-les-dimensions.jpeg"
    />
  </a>

  <a href="https://www.typescriptlang.org/" >
    <img width="100"
      alt="Apprendre Ts"
      src="https://www.techgeeknext.com/img/typescript/typescript-logo.png"
    />
  </a>
</div>

### Crédits:

- Auteur: <a href="https://nathaelb.fr">Nathael Bonnal</a>
- [Framework - Discord Factory](https://discord-factory.com)


## Les prérequis 

Afin que le déployement du bot se fasse au mieux, il faudra sur votre machine :
- <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">git<a/>
- <a href="https://nodejs.org/en/">NodeJS</a> version 16 minimum par rapport à la v13 de DiscordJS
- <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">NPM</a>

## Installation

Maintenant que les pré-requis sont installés, nous allons procéder aux téléchargement des 
dépendances du projet.
Tout d'abord il faut créer à la racine du projet le fichier : `database.sqlite`

Une commande simple suffit :
```
git clone https://github.com/NathaelB/Bot-Factory-App.git
cd ./Bot-Factory-App

npm install
// ou si vous avez yarn
yarn install

node run forge migration:run
```
La commande  `node run forge migration:run` va permettre d'initier les migrations dans la base 
de donnée.

## Lancement du bot en mode développement 
```
npm run dev
yarn dev
```
Selon votre gestionnaires de dépendances vous exécuterez l'une des deux commandes.


## Mise en Production

[Documentation du Framework](https://discord-factory.com/documentation/deployment)


### Informations supplémentaires
Le bot est en cours de développement, la documentation de chaque méthodes sera implémenté dans 
le temps comme les différents modules. Outre cela, de nouveaux micro-services verront le jour 
pour éviter la répétition du code et la simplification de ce dernier.


Si vous souhaitez nous soutenir, n'hésitez pas à partager le repo et de tester ce dernier afin 
d'y proposer divers améliorations, n'oubliez pas que les [issues sont disponibles](https://github.com/NathaelB/Bot-Factory-App/issues)
!
