# System Defense

Les gens, on va jouer à un jeu. 
Voici un repo totalement vide : vous en faites ce que vous voulez, vous dev tout ce que vous voulez.

## 🌐 Live Demo

The application is automatically deployed to GitHub Pages on every push to the main branch:
**[https://vachmara.github.io/voyonsvoir/](https://vachmara.github.io/voyonsvoir/)**

---

## Faisons des divisions avec des expressions régulières 🚀

Il existe un jeu pour s'entrainer en algorithmie : *FooBarQix*

Selon un nombre en entrée les regles, une chaîne de caractères doit être renvoyée selon les règles suivantes :

- *Foo* si le nombre est divisible par 3
- *Bar* si le nombre est divisible par 5
- *Qix* si le nombre est divisible par 7
- Les 3 premières règles sont cumulatives
- Le nombre lui même s'il n'est divisible ni par 3, 5 ou 7

### Exemples
```
1  => 1
2  => 2
3  => Foo (divisible par 3)
4  => 4
5  => Bar (divisible par 5)
6  => Foo
7  => Qix (divisible par 7)
8  => 8
9  => Foo
10 => Bar
13 => Foo
15 => FooBar (divisible par 3 et 5)
21 => FooQix (divisible par 3 et 7)
51 => FooBar
53 => BarFoo
107 => FooBarQix (divisible par 3, 5 et 7)
```

Je vous partage donc une implémentation avec Nginx uniquement juste [ici](./division-regex-foobarqix-nginx/foobarqix.conf).

Pour tester, utilisez le docker-compose, et faites une requete avec le nombre de votre choix : `curl localhost:3570/{NUMBER}`

## 🍫 ChocoRoulette - Le Jeu en Ligne 🌶️

> [!CAUTION]
> **4 chocolats. 1 piégé au Carolina Reaper. Oserez-vous jouer ?**

[![Jouer maintenant](https://img.shields.io/badge/🎲_JOUER_MAINTENANT-FF4500?style=for-the-badge&logoColor=white)](./inferno-peppers.html)

| 🍫 Chocolat classique | 🌶️ Chocolat piégé |
|:---:|:---:|
| Praliné savoureux | 10% Carolina Reaper |
| 3 chances sur 4 | 1 chance sur 4 |
| 😋 Délicieux | 🔥 20 min de feu |

> [!TIP]
> **Envie de passer au vrai défi ?** Le coffret physique existe !  
> 👉 [Commander sur Inferno Peppers](https://www.inferno-peppers.fr/produits/packs/chocoroulette-4-chocolats-1-piege)

<details>
<summary>📖 <strong>C'est quoi le Carolina Reaper ?</strong></summary>

Le **Carolina Reaper** a été le piment le plus fort du monde de 2013 à 2023, avec une moyenne de **1,641 million d'unités Scoville** (et des pics à 2,2 millions !).

Pour comparaison :
- 🫑 Poivron : 0 SHU
- 🌶️ Jalapeño : 2 500 - 8 000 SHU  
- 🔥 Habanero : 100 000 - 350 000 SHU
- ☠️ **Carolina Reaper** : 1 400 000 - 2 200 000 SHU

</details>

## 🐧 meta-mcxiv 🐧

Un système d'exploitation Linux customisable pour Raspberry (4 et 5 ok) avec Yocto.

### Build

#### Environnement de build

Soit se farcir l'installation des outils de dev Yocto, soit utiliser mon super Dockerfile tout prêt pour build dans le container. On prend la deuxième option, pour la première vous vous débrouillez hihi.

```
cd meta-mcxiv/
# docker buildx ou autre
docker buildx build -t yoctocker ./Dockerfile --load
```

#### Build yocto

##### Choisir ta Raspberry Pi préférée (4 ou 5)

Choisis ta Raspberry préférée en modifiant la ligne 4 du fichier `meta-mcxiv/project.yml` : 

```
machine: raspberrypi5 # ou "raspberryipi4-64"
```

##### Clone les meta-layers requises

```
cd meta-mcxiv/
mkdir layers/
cd layers/
git clone https://git.yoctoproject.org/git/poky && cd poky && git checkout 357eb84b2a9bcb0f1c8f64a2989b133b37049d5b && cd ..
git clone http://git.openembedded.org/meta-openembedded && cd meta-openembedded && git checkout 6c9f1f8d4538119803bf793747b65e4d23c33544 && cd ..
git clone https://github.com/agherzan/meta-raspberrypi/ && cd meta-raspberrypi && git checkout 6df7e028a2b7b2d8cab0745dc0ed2eebc3742a17 && cd ..
git clone https://git.yoctoproject.org/git/meta-virtualization && cd meta-virtualization && git checkout 94ee980814d7c5824449b2745a934664adbf3007 && cd ..

```

##### Le vrai build

```
docker run -it --workdir /home/yoctocker/ -v <le_path_de_voyonsvoir>/meta-mcxiv/:/home/yoctocker/ yoctocker:latest
kas build project.yml
```

Là t'en as pour quelques heures en fonction de ta machine, alors va te reposer un bon coup! Je te conseille vivement 32 Go de RAM (Sinon, ajoute de la RAM swap) et 16 coeurs. Ah et le build prend environ 70 Go.

### Flash Raspberry

Sort du container Yoctocker et flash ta superbe carte SD en faisant gaffe de pas wipe ton ssd : 

```
cd meta-mcxiv/
bzcat build/tmp/deploy/images/raspberrypi5/core-image-minimal-raspberrypi5.rootfs.wic.bz2 | sudo dd of=/dev/sda bs=4M status=progress conv=fsync
# Attention au path en fonction du build rp4 ou rp5
```

Puis insert la carte SD dans ta Raspberri Pi 5.

### Accès Raspberry

Alimente ta Raspberry, et accèdes-y soit par la com. série, soit par ssh.

```
# Via com. série -> il te faut la debug probe Raspberry ou autre câble série
minicom --device /dev/ttyACM0 -b 115200

# Via ssh -> branche ta raspberry sur ton réseau local avec un câble ethernet, trouve son adresse ip et
ssh root@<adresse-ip> # ya pas de password
```

Te voilà avec un superbe device embarqué, prêt à l'emploi! (curl, vim, python, docker, bash, git, e2fsprogs et ffmpeg déjà installés)

---

## 📜 La règle du jeu
* Je merge **automatiquement** toutes les PR qui n’ont pas de conflit.
* J’ai envie de voir ce qui en sort.

---

## 🏗️ MODE D'EMPLOI
1. **Fork** le projet.
2. **Ajoute** ce que tu veux (code, texte, assets, n'importe quoi).
3. **Ouvre une Pull Request**.
4. Si pas de conflit → **C'est mergé !**

---

# HAVE FUN ! And PUT ME IN BIKINI NOW ! 👙

## Safety Notice / Notice de securite

English:
All attempts to create a virus, malware, or any harmful program will be refused.
Please do not create software intended to harm, abuse, or compromise others.
Be vigilant before running any program from this repository.
This is an experiment: do not trust this code by default, review it carefully.

Francais:
Toute tentative de creer un virus, un malware, ou tout programme nuisible sera refusee.
Merci de ne pas creer des logiciels dont le but est de nuire, abuser, ou compromettre autrui.
Merci d'etre vigilant avant d'executer tout programme depuis ce depot.
Ceci est une experience: ne faites pas confiance a ce code par defaut, verifiez-le soigneusement.

## Automated Security Checks / Verifications de securite

English:
This repository runs automated security checks on pull requests via GitHub Actions.
Checks include CodeQL (SAST), Trivy (dependency vulnerabilities), Gitleaks (secrets), and ClamAV (malware scan).
Auto-merge is enabled for any PR (including external contributors). Checks are informational; auto-merge only blocks if ClamAV detects malware.
Some checks can be limited on forked PRs due to GitHub permissions.
These checks reduce risk but do not guarantee a program is safe, so review before running.

Francais:
Ce depot execute des verifications de securite automatiques sur les pull requests via GitHub Actions.
Les checks incluent CodeQL (SAST), Trivy (vulnerabilites de dependances), Gitleaks (secrets), et ClamAV (scan malware).
Le merge automatique est active pour toute PR (y compris les contributeurs externes). Les checks sont informatifs; le merge est bloque seulement si ClamAV detecte un malware.
Certains checks peuvent etre limites pour les PRs venant de forks, a cause des permissions GitHub.
Ces checks reduisent le risque mais ne garantissent pas qu'un programme soit sans danger, donc verifiez avant execution.
