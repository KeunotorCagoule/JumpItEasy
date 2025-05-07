const fr = {
  common: {
    save: "Enregistrer",
    cancel: "Annuler",
    retry: "Réessayer",
    loading: "Chargement...",
    saving: "Enregistrement...",
    backToHome: "Retour à l'accueil",
    yes: "Oui",
    no: "Non",
    hours: "heures",
    language: "Langue"
  },
  navigation: {
    home: "Accueil",
    about: "À propos",
    courses: "Parcours",
    generateCourse: "Créer un parcours",
    login: "Connexion",
    register: "Inscription",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    documentation: "Documentation"
  },
  userHeader: {
    profile: "Profil",
    settings: "Paramètres",
    signOut: "Déconnexion"
  },
  home: {
    hero: {
      title: "Créez votre parcours de parkour facilement",
      subtitle: "Créez des parcours de parkour personnalisés avec notre générateur alimenté par IA. Parfait pour les instructeurs et les passionnés.",
      viewCourses: "Voir les parcours",
      generateCourse: "Créer un parcours"
    },
    features: {
      intelligentDesign: {
        title: "Conception intelligente",
        description: "Notre IA analyse les paramètres pour créer des parcours équilibrés et stimulants adaptés à votre niveau."
      },
      easyCustomization: {
        title: "Personnalisation facile",
        description: "Modifiez n'importe quel aspect de votre parcours généré - obstacles, difficulté, environnement et plus encore."
      },
      shareAndPrint: {
        title: "Partage et impression",
        description: "Exportez vos parcours au format PDF ou partagez-les directement avec votre communauté parkour."
      }
    }
  },
  about: {
    title: "À propos de JumpItEasy",
    subtitle: "Simplifier la conception de parcours de parkour pour tous",
    mission: {
      title: "Notre mission",
      description: "JumpItEasy a été créé pour démocratiser la conception de parcours de parkour. Nous croyons que la création d'environnements d'entraînement de qualité devrait être accessible à tous, des débutants aux instructeurs professionnels. Notre plateforme combine la technologie IA avec l'expertise en parkour pour générer des parcours sécuritaires, stimulants et adaptés aux besoins spécifiques."
    },
    features: {
      title: "Fonctionnalités clés",
      item1: "Génération de parcours par IA basée sur des paramètres spécifiques",
      item2: "Cartographie visuelle avec placement et spécifications des obstacles",
      item3: "Directives et considérations de sécurité pour chaque parcours",
      item4: "Niveaux de difficulté et thèmes de parcours personnalisables",
      item5: "Partage de parcours et fonctionnalités communautaires"
    },
    team: {
      title: "Notre équipe",
      description: "Notre équipe est composée de pratiquants de parkour, de concepteurs et de spécialistes en IA qui partagent une passion pour le sport et la technologie. Nous nous engageons à améliorer continuellement nos algorithmes en fonction des retours des utilisateurs et de l'évolution des pratiques de parkour."
    },
    contact: {
      title: "Contactez-nous",
      description: "Vous avez des questions ou des suggestions ? Nous serions ravis de vous entendre à"
    }
  },
  profile: {
    editProfile: "Modifier le profil",
    information: "Informations personnelles",
    bio: "Biographie",
    memberSince: "Membre depuis",
    statistics: "Statistiques",
    favoriteCourses: "Parcours favoris",
    completedCourses: "Parcours terminés",
    createdCourses: "Parcours créés",
    recentCourses: "Parcours récents",
    completed: "terminé",
    noCourses: "Vous n'avez pas encore utilisé de parcours.",
    createCourse: "Créer votre premier parcours",
    viewAllCourses: "Voir tous les parcours",
    defaultBio: "Passionné de parkour explorant de nouvelles possibilités de mouvement.",
    joinedDate: "Janvier 2023",
    errorLoading: "Une erreur s'est produite lors du chargement de vos données de profil. Veuillez réessayer plus tard."
  },
  settings: {
    title: "Paramètres du compte",
    subtitle: "Gérez vos paramètres et préférences",
    profile: "Profil",
    password: "Mot de passe",
    profileInfo: "Informations de profil",
    username: "Nom d'utilisateur",
    email: "Email",
    bio: "Biographie",
    country: "Pays",
    changePassword: "Changer de mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirmer le nouveau mot de passe",
    passwordError: "Les mots de passe ne correspondent pas",
    passwordChanged: "Mot de passe changé avec succès",
    saved: "Paramètres enregistrés avec succès",
    changesDiscarded: "Modifications annulées",
    error: "Une erreur est survenue lors de l'enregistrement de vos paramètres"
  },
  auth: {
    login: {
      title: "Connexion",
      subtitle: "Connectez-vous à votre compte",
      invalidCredentials: "Nom d'utilisateur/email ou mot de passe invalide"
    },
    register: {
      title: "Créer un compte",
      subtitle: "Rejoignez la communauté JumpItEasy",
      failed: "L'inscription a échoué"
    }
  },
  courses: {
    list: {
      title: "Parcours de parkour",
      createNew: "Créer un nouveau parcours",
      noCourses: "Aucun parcours disponible",
      createFirst: "Créer votre premier parcours",
      viewDetails: "Voir les détails"
    },
    view: {
      level: "Niveau",
      duration: "Durée",
      topics: "Sujets",
      learningPath: "Cheminement d'apprentissage",
      estimatedTime: "Temps estimé",
      startLearning: "Commencer l'apprentissage",
      saveForLater: "Enregistrer pour plus tard",
      backToList: "Retour à la liste des parcours",
      errorLoading: "Erreur lors du chargement du parcours",
      notFound: "Parcours non trouvé"
    },
    generate: {
      title: "Générer un parcours de parkour",
      filters: {
        title: "Paramètres du parcours",
        duration: "Durée (minutes)",
        obstacleCount: "Nombre d'obstacles",
        difficulty: "Niveau de difficulté",
        hasWaterElements: "Inclure des éléments d'eau",
        terrainType: "Type de terrain",
        heightRange: "Plage de hauteur",
        equipment: "Équipement requis",
        courseType: "Type de parcours",
        environment: "Environnement",
        safetyFeatures: "Fonctionnalités de sécurité"
      },
      preview: {
        title: "Aperçu du parcours",
        generateNew: "Générer un nouveau parcours",
        save: "Enregistrer le parcours",
        print: "Imprimer",
        share: "Partager"
      }
    }
  },
  documentation: {
    title: "Documentation",
    subtitle: "Apprenez à tirer le meilleur parti de JumpItEasy",
    sections: {
      gettingStarted: {
        title: "Premiers pas",
        description: "Apprenez les bases de l'utilisation de JumpItEasy pour créer votre premier parcours de parkour.",
        items: {
          createAccount: {
            title: "Création d'un compte",
            content: "Inscrivez-vous pour un compte gratuit afin d'accéder à toutes les fonctionnalités de JumpItEasy. Cliquez sur le bouton 'Inscription' dans le menu de navigation et remplissez vos informations."
          },
          generateCourse: {
            title: "Générer un parcours",
            content: "Utilisez la fonctionnalité 'Générer un parcours' pour créer un nouveau parcours de parkour basé sur vos préférences. Ajustez les paramètres comme la difficulté, la durée et le type de terrain pour personnaliser votre parcours."
          },
          savingCourses: {
            title: "Enregistrer et gérer les parcours",
            content: "Tous les parcours générés peuvent être sauvegardés sur votre compte. Consultez et gérez vos parcours sauvegardés depuis votre page de profil."
          }
        }
      },
      courseParameters: {
        title: "Paramètres de parcours expliqués",
        description: "Comprendre chaque paramètre qui affecte votre parcours généré.",
        items: {
          difficulty: {
            title: "Niveaux de difficulté",
            content: "Débutant: Adapté aux personnes nouvelles au parkour avec des mouvements de base.\nIntermédiaire: Pour les pratiquants avec une certaine expérience qui peuvent effectuer des techniques standard.\nAvancé: Parcours stimulants pour les pratiquants expérimentés avec des mouvements techniques."
          },
          terrainTypes: {
            title: "Types de terrain",
            content: "Urbain: Environnements urbains avec obstacles artificiels.\nNature: Environnements naturels avec arbres, rochers et terrain irrégulier.\nMixte: Combinaison d'éléments urbains et naturels."
          },
          courseTypes: {
            title: "Types de parcours",
            content: "Linéaire: Un chemin direct du début à l a fin avec des obstacles séquentiels.\nCircuit: Parcours circulaire qui revient au point de départ.\nFreestyle: Zone ouverte avec plusieurs configurations d'obstacles pour un flux créatif."
          }
        }
      },
      safety: {
        title: "Consignes de sécurité",
        description: "Importantes considérations de sécurité lors de la pratique du parkour.",
        items: {
          preparation: {
            title: "Préparation adéquate",
            content: "Échauffez-vous toujours soigneusement avant de tenter un parcours de parkour. Vérifiez la stabilité de tous les obstacles avant utilisation."
          },
          progression: {
            title: "Entraînement progressif",
            content: "Maîtrisez les mouvements de base avant d'essayer des techniques avancées. Décomposez les mouvements complexes en étapes gérables."
          },
          equipment: {
            title: "Équipement de sécurité",
            content: "Portez des chaussures appropriées avec une bonne adhérence. Envisagez d'utiliser des tapis d'amortissement pour les mouvements nouveaux ou difficiles."
          }
        }
      },
      api: {
        title: "Documentation de l'API",
        description: "Pour les développeurs souhaitant s'intégrer à JumpItEasy.",
        items: {
          authentication: {
            title: "Authentification",
            content: "Toutes les requêtes API nécessitent un jeton JWT valide obtenu via le point de terminaison /auth/login."
          },
          endpoints: {
            title: "Points de terminaison clés",
            content: "GET /courses: Récupérer les parcours disponibles\nPOST /courses/generate: Créer un nouveau parcours\nGET /users/profile: Obtenir les informations du profil utilisateur"
          },
          rateLimit: {
            title: "Limite de débit",
            content: "Les requêtes API sont limitées à 100 requêtes par heure par utilisateur."
          }
        }
      }
    }
  },
  termsAndConditions: {
    title: "Conditions générales",
    lastUpdated: "Dernière mise à jour: 10 novembre 2023",
    sections: {
      acceptance: {
        title: "1. Acceptation des conditions",
        content: "En accédant ou en utilisant JumpItEasy, vous acceptez d'être lié par ces Conditions générales et toutes les lois et réglementations applicables. Si vous n'êtes pas d'accord avec l'une de ces conditions, vous ne pouvez pas utiliser ou accéder à ce site."
      },
      accountResponsibilities: {
        title: "2. Responsabilités du compte",
        content: "Vous êtes responsable de maintenir la confidentialité de vos informations de compte et de votre mot de passe. Vous acceptez d'assumer la responsabilité de toutes les activités qui se produisent sous votre compte."
      },
      intellectualProperty: {
        title: "3. Propriété intellectuelle",
        content: "Tout le contenu, les fonctionnalités et la fonctionnalité sur JumpItEasy, y compris mais sans s'y limiter, le texte, les graphiques, les logos, les icônes, les images, les clips audio, les téléchargements numériques et les logiciels, sont la propriété de JumpItEasy et sont protégés par les lois internationales sur le droit d'auteur, les marques de commerce, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle."
      },
      userContent: {
        title: "4. Contenu utilisateur",
        content: "En publiant, téléchargeant ou partageant du contenu sur JumpItEasy, vous nous accordez une licence non exclusive, mondiale, libre de redevance pour utiliser, reproduire, modifier et distribuer votre contenu dans le but d'exploiter et d'améliorer nos services."
      },
      liability: {
        title: "5. Limitation de responsabilité",
        content: "JumpItEasy ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre accès ou utilisation, ou de l'impossibilité d'accéder ou d'utiliser le service ou tout contenu fourni par JumpItEasy."
      },
      safetyDisclaimer: {
        title: "6. Avis de sécurité",
        content: "Le parkour implique des risques inhérents. JumpItEasy fournit des parcours générés et des informations uniquement à titre de référence. Les utilisateurs sont responsables d'évaluer les risques, leurs capacités et l'adéquation de tout parcours ou technique à leur niveau de compétence. Pratiquez toujours dans des environnements sûrs avec une supervision appropriée si nécessaire."
      },
      termination: {
        title: "7. Résiliation",
        content: "Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis ou responsabilité, pour quelque raison que ce soit, y compris sans limitation si vous enfreignez les Conditions générales."
      },
      governing: {
        title: "8. Droit applicable",
        content: "Ces conditions seront régies par les lois de France, sans égard à ses dispositions en matière de conflit de lois."
      },
      changes: {
        title: "9. Modifications des conditions",
        content: "Nous nous réservons le droit de modifier ces conditions à tout moment. Nous informerons des changements importants en mettant à jour la date 'Dernière mise à jour' en haut de cette page."
      },
      contact: {
        title: "10. Coordonnées",
        content: "Si vous avez des questions concernant ces Conditions, veuillez nous contacter à contact@jumpiteasy.com."
      }
    }
  },
  privacyPolicy: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour: 10 novembre 2023",
    sections: {
      introduction: {
        title: "Introduction",
        content: "Chez JumpItEasy, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette Politique de confidentialité explique comment nous collectons, traitons et protégeons vos informations lorsque vous utilisez notre service."
      },
      dataCollection: {
        title: "1. Informations que nous collectons",
        content: "Nous collectons les informations personnelles que vous nous fournissez directement, telles que le nom, l'adresse e-mail, le pays et les préférences linguistiques lorsque vous créez un compte. Nous collectons également des données d'utilisation, y compris votre interaction avec la plateforme et les parcours générés."
      },
      dataUse: {
        title: "2. Comment nous utilisons vos informations",
        content: "Nous utilisons vos informations pour fournir et améliorer nos services, communiquer avec vous, personnaliser votre expérience et assurer la sécurité de la plateforme. Nous pouvons utiliser des données anonymisées à des fins de recherche et d'analyse."
      },
      dataSecurity: {
        title: "3. Sécurité des données",
        content: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée."
      },
      dataSharing: {
        title: "4. Partage de vos informations",
        content: "Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager des informations anonymisées et agrégées avec des partenaires de confiance qui nous aident à analyser et améliorer notre service."
      },
      cookies: {
        title: "5. Cookies et technologies similaires",
        content: "Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre site Web et stocker certaines informations. Vous pouvez configurer votre navigateur pour qu'il refuse tous les cookies ou qu'il vous avertisse lorsqu'un cookie est envoyé."
      },
      userRights: {
        title: "6. Vos droits concernant vos données",
        content: "Selon votre emplacement, vous pouvez avoir certains droits concernant vos informations personnelles, notamment le droit d'accéder, de corriger, de supprimer ou de restreindre le traitement de vos données. Veuillez nous contacter pour exercer ces droits."
      },
      childrenPrivacy: {
        title: "7. Confidentialité des enfants",
        content: "Notre service n'est pas destiné aux personnes de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans."
      },
      changes: {
        title: "8. Modifications de cette politique de confidentialité",
        content: "Nous pouvons mettre à jour notre Politique de confidentialité de temps à autre. Nous vous informerons des changements importants en publiant la nouvelle Politique de confidentialité sur cette page et en mettant à jour la date 'Dernière mise à jour'."
      },
      contact: {
        title: "9. Contactez-nous",
        content: "Si vous avez des questions concernant cette Politique de confidentialité, veuillez nous contacter à privacy@jumpiteasy.com."
      }
    }
  },
  footer: {
    about: "À propos de JumpItEasy",
    aboutText: "JumpItEasy est une plateforme conçue pour aider les passionnés de parkour et les instructeurs à créer des parcours personnalisés avec notre générateur alimenté par IA.",
    quickLinks: "Liens rapides",
    resources: "Ressources",
    legal: "Mentions légales",
    copyright: "© 2023 JumpItEasy. Tous droits réservés.",
    designedBy: "Conçu avec ❤️ par l'équipe JumpItEasy",
    company: "Entreprise",
    aboutUs: "À propos de nous",
    documentation: "Documentation",
    faq: "FAQ",
    terms: "Conditions générales",
    privacy: "Politique de confidentialité",
    courses: "Parcours"
  },
  faq: {
    title: "Foire aux questions",
    subtitle: "Trouvez des réponses aux questions fréquemment posées sur JumpItEasy",
    search: "Rechercher des questions...",
    noResults: "Aucune question ne correspond à votre recherche. Veuillez essayer d'autres mots-clés.",
    categories: {
      general: "Général",
      account: "Compte et abonnement",
      courses: "Parcours",
      technical: "Problèmes techniques"
    },
    questions: {
      whatIs: {
        question: "Qu'est-ce que JumpItEasy ?",
        answer: "JumpItEasy est une plateforme qui utilise l'IA pour générer des parcours de parkour adaptés à des paramètres spécifiques. Elle aide les instructeurs et les pratiquants à concevoir des itinéraires d'entraînement sûrs, stimulants et personnalisés."
      },
      howGenerate: {
        question: "Comment fonctionne la génération de parcours ?",
        answer: "Notre IA analyse vos paramètres sélectionnés (difficulté, durée, type de terrain, etc.) et crée une disposition de parcours avec des obstacles appropriés, des points de repos et des marqueurs de progression basés sur les meilleures pratiques du parkour."
      },
      isFree: {
        question: "JumpItEasy est-il gratuit ?",
        answer: "JumpItEasy propose des fonctionnalités gratuites et premium. La génération de parcours de base est disponible gratuitement, tandis que les options de personnalisation avancées et les fonctionnalités supplémentaires nécessitent un abonnement."
      },
      deleteAccount: {
        question: "Comment puis-je supprimer mon compte ?",
        answer: "Vous pouvez supprimer votre compte depuis la page Paramètres. Accédez à votre Profil, sélectionnez Paramètres, faites défiler jusqu'en bas et cliquez sur 'Supprimer le compte'. Notez que cette action est permanente et que toutes vos données seront supprimées."
      },
      contactSupport: {
        question: "Comment contacter le support ?",
        answer: "Vous pouvez joindre notre équipe de support en envoyant un e-mail à support@jumpiteasy.com ou en utilisant le formulaire de contact sur notre page Contact. Nous répondons généralement dans les 24-48 heures."
      }
    },
    general: {
      title: "Questions générales",
      q1: "Quelle est la philosophie derrière JumpItEasy ?",
      a1: "Notre philosophie est de démocratiser la création de parcours de parkour et de rendre cette discipline plus accessible à tous. Nous croyons que la technologie peut aider à surmonter les barrières d'entrée et permettre à plus de personnes de découvrir les bienfaits du parkour.",
      q2: "JumpItEasy convient-il aux débutants ?",
      a2: "Absolument ! JumpItEasy est conçu pour tous les niveaux de compétence. Notre générateur de parcours permet de spécifier votre niveau d'expérience, de débutant à avancé, et adapte les parcours en conséquence avec des mouvements et des obstacles appropriés.",
      q3: "Les parcours générés sont-ils sûrs ?",
      a3: "Nous prenons la sécurité très au sérieux. Tous les parcours générés incluent des recommandations de sécurité et sont créés selon les meilleures pratiques du parkour. Cependant, la pratique du parkour comporte des risques inhérents, et nous encourageons toujours les utilisateurs à s'échauffer correctement, à évaluer leur environnement et à ne jamais dépasser leurs capacités."
    },
    account: {
      title: "Compte et abonnement",
      q1: "Comment modifier mes informations de profil ?",
      a1: "Pour modifier vos informations de profil, connectez-vous à votre compte, cliquez sur votre avatar dans le coin supérieur droit, sélectionnez 'Profil', puis cliquez sur 'Modifier le profil'. Vous pourrez y mettre à jour votre nom d'utilisateur, votre photo, votre biographie et d'autres informations.",
      q2: "Quels sont les avantages d'un abonnement premium ?",
      a2: "Un abonnement premium vous donne accès à des fonctionnalités avancées comme la génération de parcours illimitée, des options de personnalisation supplémentaires, l'exportation PDF de haute qualité, la suppression des publicités, et un accès prioritaire aux nouvelles fonctionnalités.",
      q3: "Comment puis-je annuler mon abonnement ?",
      a3: "Pour annuler votre abonnement, accédez à votre Profil, cliquez sur 'Paramètres', puis 'Abonnement', et sélectionnez 'Annuler l'abonnement'. Vous continuerez à bénéficier des avantages premium jusqu'à la fin de votre période de facturation actuelle."
    },
    courses: {
      title: "Parcours",
      q1: "Puis-je modifier un parcours après sa génération ?",
      a1: "Oui, tous les parcours générés peuvent être modifiés. Après la génération, vous pouvez ajuster l'emplacement des obstacles, changer les types d'obstacles, modifier la difficulté de sections spécifiques, et personnaliser d'autres aspects pour répondre parfaitement à vos besoins.",
      q2: "Comment partager mes parcours avec d'autres ?",
      a2: "Pour partager un parcours, ouvrez-le depuis votre profil ou la page de détails du parcours, cliquez sur le bouton 'Partager', puis choisissez de le partager via un lien, les réseaux sociaux, ou en l'exportant au format PDF pour l'imprimer.",
      q3: "Puis-je accéder à mes parcours hors ligne ?",
      a3: "Oui, vous pouvez télécharger vos parcours au format PDF pour y accéder hors ligne. Pour les utilisateurs premium, nous proposons également une fonctionnalité de synchronisation hors ligne dans notre application mobile qui vous permet d'accéder à vos parcours enregistrés sans connexion internet.",
      q4: "Comment trouver des parcours adaptés à mon environnement ?",
      a4: "Lors de la génération d'un parcours, vous pouvez spécifier le type d'environnement disponible (urbain, naturel, gymnase, etc.) ainsi que l'équipement que vous avez à disposition. Le générateur créera alors un parcours adapté à ces contraintes. Vous pouvez également filtrer les parcours partagés par la communauté selon ces critères."
    },
    technical: {
      title: "Problèmes techniques",
      q1: "L'application ne charge pas correctement, que faire ?",
      a1: "Si l'application ne charge pas correctement, essayez d'abord de rafraîchir la page. Si le problème persiste, videz le cache de votre navigateur, vérifiez votre connexion internet, et essayez d'utiliser un navigateur différent. Si aucune de ces solutions ne fonctionne, contactez notre support technique.",
      q2: "Comment signaler un bug ou suggérer une amélioration ?",
      a2: "Nous apprécions vos retours ! Pour signaler un bug ou suggérer une amélioration, utilisez la fonction 'Feedback' dans le menu principal ou envoyez un email à feedback@jumpiteasy.com. Veuillez inclure autant de détails que possible, y compris des captures d'écran si applicable."
    },
    notFound: "Vous n'avez pas trouvé la réponse à votre question ?",
    contactSupport: "Contactez notre équipe de support"
  },
  docs: {
    title: "Documentation",
    subtitle: "Apprenez à utiliser JumpItEasy efficacement",
    gettingStarted: {
      title: "Premiers pas",
      introduction: "Bienvenue sur JumpItEasy. Ce guide vous aidera à démarrer avec notre plateforme.",
      account: {
        title: "Créer votre compte",
        text: "Pour commencer à utiliser JumpItEasy, vous devez créer un compte. Cliquez sur le bouton Inscription en haut à droite de la page d'accueil."
      },
      navigation: {
        title: "Naviguer sur la plateforme",
        text: "Une fois connecté, vous pouvez accéder à toutes les fonctionnalités via le menu de navigation principal. Votre profil et vos paramètres sont accessibles en cliquant sur votre avatar."
      },
      firstCourse: {
        title: "Créer votre premier parcours",
        text: "Pour créer votre premier parcours de parkour, accédez à la page 'Générer un parcours' et définissez les paramètres souhaités. Notre IA créera un parcours personnalisé basé sur vos spécifications."
      }
    }
  },
  privacy: {
    introduction: "Introduction",
    introductionText: "Nous accordons de l'importance à votre vie privée et nous nous engageons à protéger vos données personnelles. Cette Politique de confidentialité explique comment nous traitons vos informations.",
    informationCollection: "Informations que nous collectons",
    informationCollectionText: "Nous collectons différents types d'informations pour fournir et améliorer nos services:",
    personalInfo: {
      title: "Informations personnelles",
      text: "Informations que vous nous fournissez directement, comme votre nom, email et détails de profil."
    },
    usage: {
      title: "Données d'utilisation",
      text: "Informations sur votre interaction avec notre plateforme, y compris les parcours consultés et générés."
    },
    cookies: {
      title: "Cookies et suivi",
      text: "Informations collectées via des cookies et technologies similaires pour analyser les habitudes d'utilisation."
    },
    dataUse: "Comment nous utilisons vos données",
    dataUseText: "Nous utilisons vos informations pour les finalités suivantes:",
    dataUseList: {
      item1: "Fournir et maintenir nos services",
      item2: "Personnaliser votre expérience",
      item3: "Améliorer notre plateforme selon vos retours",
      item4: "Communiquer avec vous concernant les mises à jour et offres"
    },
    dataSharing: "Partage d'informations",
    dataSharingText: "Nous ne vendons pas vos informations personnelles. Nous pouvons partager des données avec des partenaires de confiance pour nous aider à gérer notre activité.",
    dataSecurity: "Sécurité des données",
    dataSecurityText: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès ou divulgation non autorisés.",
    thirdPartyLinks: "Liens tiers",
    thirdPartyLinksText: "Notre plateforme peut contenir des liens vers des sites tiers. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites.",
    childrenPrivacy: "Confidentialité des enfants",
    childrenPrivacyText: "Nos services ne sont pas destinés aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations auprès d'enfants de moins de 13 ans.",
    changes: "Modifications de cette politique",
    changesText: "Nous pouvons mettre à jour cette Politique de confidentialité périodiquement. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page.",
    contact: "Contactez-nous",
    contactText: "Si vous avez des questions concernant cette Politique de confidentialité, veuillez nous contacter à privacy@jumpiteasy.com."
  },
  terms: {
    title: "Conditions générales",
    lastUpdated: "Dernière mise à jour",
    acceptance: "Acceptation des conditions",
    acceptanceText: "En accédant à ou en utilisant JumpItEasy, vous acceptez d'être lié par ces Conditions générales.",
    services: "Description des services",
    servicesText: "JumpItEasy fournit une plateforme alimentée par IA pour créer et partager des parcours de parkour.",
    userAccounts: "Comptes utilisateurs",
    userAccountsText1: "Vous devez vous inscrire pour accéder à certaines fonctionnalités de notre plateforme.",
    userAccountsText2: "Vous êtes responsable de maintenir la confidentialité de vos identifiants de compte et de toutes les activités sous votre compte.",
    content: "Contenu utilisateur",
    contentText1: "Vous conservez la propriété du contenu que vous créez et partagez sur notre plateforme.",
    contentText2: "En publiant du contenu, vous nous accordez une licence pour l'utiliser afin d'exploiter et d'améliorer nos services.",
    intellectualProperty: "Propriété intellectuelle",
    intellectualPropertyText: "Tout le contenu et les fonctionnalités de la plateforme non générés par les utilisateurs appartiennent à JumpItEasy et sont protégés par les lois sur la propriété intellectuelle.",
    prohibitedActivities: "Activités interdites",
    prohibitedActivitiesText: "En utilisant notre plateforme, vous acceptez de ne pas:",
    prohibitedList: {
      item1: "Violer des lois ou réglementations",
      item2: "Porter atteinte aux droits d'autrui",
      item3: "Soumettre des informations fausses ou trompeuses",
      item4: "Télécharger du contenu nuisible ou des logiciels malveillants",
      item5: "Tenter d'accéder sans autorisation à nos systèmes"
    },
    disclaimer: "Avertissement",
    disclaimerText: "JumpItEasy est fourni 'tel quel' sans garanties, expresses ou implicites.",
    limitation: "Limitation de responsabilité",
    limitationText: "JumpItEasy ne sera pas responsable des dommages indirects, accessoires ou consécutifs.",
    changes: "Modifications des conditions",
    changesText: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après publication.",
    contact: "Informations de contact",
    contactText: "Pour toute question concernant ces Conditions, veuillez nous contacter à legal@jumpiteasy.com."
  }
};

export default fr;
