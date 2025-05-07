const enTranslations = {
  common: {
    save: "Save",
    cancel: "Cancel",
    retry: "Retry",
    loading: "Loading...",
    saving: "Saving...",
    backToHome: "Back to Home",
    yes: "Yes",
    no: "No",
    hours: "hours",
    language: "Language"
  },
  navigation: {
    home: "Home",
    about: "About",
    courses: "Courses",
    generateCourse: "Generate Course",
    login: "Sign In",
    register: "Sign Up",
    profile: "Profile",
    settings: "Settings",
    logout: "Sign Out",
    documentation: "Documentation"
  },
  userHeader: {
    profile: "Profile",
    settings: "Settings",
    signOut: "Sign Out"
  },
  home: {
    hero: {
      title: "Design Your Equestrian Course Easily",
      subtitle: "Create personalized equestrian courses with our AI-powered generator. Perfect for instructors and enthusiasts.",
      viewCourses: "View Courses",
      generateCourse: "Generate a Course",
    },
    features: {
      intelligentDesign: {
        title: "Intelligent Design",
        description: "Our AI analyzes parameters to create balanced, challenging courses adapted to your skill level."
      },
      easyCustomization: {
        title: "Easy Customization",
        description: "Tweak any aspect of your generated course - obstacles, difficulty, environment, and more."
      },
      shareAndPrint: {
        title: "Share & Print",
        description: "Export your course designs to PDF or share them directly with your parkour community."
      }
    }
  },
  about: {
    title: "About JumpItEasy",
    subtitle: "Simplifying parkour course design for everyone",
    mission: {
      title: "Our Mission",
      description: "JumpItEasy was created to democratize parkour course design. We believe that creating quality training environments should be accessible to everyone, from beginner enthusiasts to professional instructors. Our platform combines AI technology with parkour expertise to generate courses that are safe, challenging, and tailored to specific needs."
    },
    features: {
      title: "Key Features",
      item1: "AI-powered course generation based on specific parameters",
      item2: "Visual course mapping with obstacle placement and specifications",
      item3: "Safety guidelines and considerations for each course",
      item4: "Customizable difficulty levels and course themes",
      item5: "Course sharing and community features"
    },
    team: {
      title: "Our Team",
      description: "Our team consists of parkour practitioners, designers, and AI specialists who share a passion for the sport and technology. We're committed to continuous improvement, constantly refining our algorithms based on user feedback and evolving parkour practices."
    },
    contact: {
      title: "Contact Us",
      description: "Have questions or suggestions? We'd love to hear from you at"
    }
  },
  profile: {
    editProfile: "Edit Profile",
    information: "Personal Information",
    bio: "Biography",
    memberSince: "Member since",
    statistics: "Statistics",
    favoriteCourses: "Favorite Courses",
    completedCourses: "Completed Courses",
    createdCourses: "Created Courses",
    recentCourses: "Recent Courses",
    completed: "completed",
    noCourses: "You haven't used any courses yet.",
    createCourse: "Create Your First Course",
    viewAllCourses: "View all courses",
    defaultBio: "Parkour enthusiast exploring new movement possibilities.",
    joinedDate: "January 2023",
    errorLoading: "There was an error loading your profile data. Please try again later."
  },
  settings: {
    title: "Account Settings",
    subtitle: "Manage your account settings and preferences",
    profile: "Profile",
    password: "Password",
    profileInfo: "Profile Information",
    username: "Username",
    email: "Email",
    bio: "Biography",
    country: "Country",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    passwordError: "Passwords don't match",
    passwordChanged: "Password successfully changed",
    saved: "Settings saved successfully",
    changesDiscarded: "Changes discarded",
    error: "An error occurred while saving your settings"
  },
  auth: {
    login: {
      title: "Sign In",
      subtitle: "Sign in to your account",
      invalidCredentials: "Invalid username/email or password",
      usernameOrEmail: "Username or Email",
      usernameOrEmailPlaceholder: "Username / Email Address",
      password: "Password",
      passwordPlaceholder: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot your password?",
      signIn: "Sign in",
      noAccount: "Don't have an account?",
      registerHere: "Register here"
    },
    register: {
      title: "Create Account",
      subtitle: "Join the JumpItEasy community",
      failed: "Registration failed",
      username: "Username",
      usernamePlaceholder: "Username",
      email: "Email address",
      emailPlaceholder: "Email address",
      password: "Password",
      passwordPlaceholder: "Password",
      confirmPassword: "Confirm password",
      confirmPasswordPlaceholder: "Confirm password",
      country: "Country",
      language: "Language",
      acceptTermsPrefix: "I accept the",
      termsAndConditions: "terms and conditions",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      signInHere: "Sign in here",
      passwordStrength: "Password strength",
      strength: {
        veryWeak: "Very Weak",
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong"
      }
    }
  },
  courses: {
    list: {
      title: "Parkour Courses",
      createNew: "Create New Course",
      noCourses: "No courses available",
      createFirst: "Create Your First Course",
      viewDetails: "View Details"
    },
    view: {
      level: "Level",
      duration: "Duration",
      topics: "Topics",
      learningPath: "Learning Path",
      estimatedTime: "Estimated Time",
      startLearning: "Start Learning",
      saveForLater: "Save for Later",
      backToList: "Back to Courses",
      errorLoading: "Error loading course",
      notFound: "Course not found"
    },
    generate: {
      title: "Generate Parkour Course",
      filters: {
        title: "Course Parameters",
        duration: "Duration (minutes)",
        obstacleCount: "Number of Obstacles",
        difficulty: "Difficulty Level",
        hasWaterElements: "Include Water Elements",
        terrainType: "Terrain Type",
        heightRange: "Height Range",
        equipment: "Equipment Required",
        courseType: "Course Type",
        environment: "Environment",
        safetyFeatures: "Safety Features",
        parcoursType: {
          item1: "Grand Prix",
          item2: "Speed",
          item3: "Special"
        }
      },
      details: {
        title: "Course Details",
        titleField: "Title",
        titlePlaceholder: "Enter a title for your course",
        descriptionField: "Description",
        descriptionPlaceholder: "Describe your course",
        privateField: "Make this course private"
      },
      preview: {
        title: "Course Preview",
        generateNew: "Generate New Course",
        save: "Save Course",
        print: "Print",
        share: "Share"
      }
    }
  },
  documentation: {
    title: "Documentation",
    subtitle: "Learn how to get the most out of JumpItEasy",
    sections: {
      gettingStarted: {
        title: "Getting Started",
        description: "Learn the basics of using JumpItEasy to create your first parkour course.",
        items: {
          createAccount: {
            title: "Creating an Account",
            content: "Sign up for a free account to access all features of JumpItEasy. Click the 'Sign Up' button in the navigation menu and fill in your details."
          },
          generateCourse: {
            title: "Generating a Course",
            content: "Use the 'Generate Course' feature to create a new parkour course based on your preferences. Adjust parameters like difficulty, duration, and terrain type to customize your course."
          },
          savingCourses: {
            title: "Saving and Managing Courses",
            content: "All generated courses can be saved to your account. View and manage your saved courses from your profile page."
          }
        }
      },
      courseParameters: {
        title: "Course Parameters Explained",
        description: "Understand each parameter that affects your generated course.",
        items: {
          difficulty: {
            title: "Difficulty Levels",
            content: "Beginner: Suitable for those new to parkour with basic movements.\nIntermediate: For practitioners with some experience who can perform standard techniques.\nAdvanced: Challenging courses for experienced practitioners with technical movements."
          },
          terrainTypes: {
            title: "Terrain Types",
            content: "Urban: City-based environments with man-made obstacles.\nNature: Natural environments with trees, rocks, and uneven terrain.\nMixed: Combination of urban and natural elements."
          },
          courseTypes: {
            title: "Course Types",
            content: "Linear: A straight path from start to finish with sequential obstacles.\nCircuit: Circular course that returns to the starting point.\nFreestyle: Open area with multiple obstacle configurations for creative flow."
          }
        }
      },
      safety: {
        title: "Safety Guidelines",
        description: "Important safety considerations when practicing parkour.",
        items: {
          preparation: {
            title: "Proper Preparation",
            content: "Always warm up thoroughly before attempting any parkour course. Check all obstacles for stability before use."
          },
          progression: {
            title: "Progressive Training",
            content: "Master basic movements before attempting advanced techniques. Break down complex movements into manageable steps."
          },
          equipment: {
            title: "Safety Equipment",
            content: "Wear appropriate footwear with good grip. Consider using crash mats for new or challenging movements."
          }
        }
      },
      api: {
        title: "API Documentation",
        description: "For developers looking to integrate with JumpItEasy.",
        items: {
          authentication: {
            title: "Authentication",
            content: "All API requests require a valid JWT token obtained through the /auth/login endpoint."
          },
          endpoints: {
            title: "Key Endpoints",
            content: "GET /courses: Retrieve available courses\nPOST /courses/generate: Create a new course\nGET /users/profile: Get user profile information"
          },
          rateLimit: {
            title: "Rate Limiting",
            content: "API requests are limited to 100 requests per hour per user."
          }
        }
      }
    }
  },
  termsAndConditions: {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated: November 10, 2023",
    sections: {
      acceptance: {
        title: "1. Acceptance of Terms",
        content: "By accessing or using JumpItEasy, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
      },
      accountResponsibilities: {
        title: "2. Account Responsibilities",
        content: "You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account."
      },
      intellectualProperty: {
        title: "3. Intellectual Property",
        content: "All content, features, and functionality on JumpItEasy, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are owned by JumpItEasy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."
      },
      userContent: {
        title: "4. User Content",
        content: "By posting, uploading, or sharing content on JumpItEasy, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content for the purpose of operating and improving our services."
      },
      liability: {
        title: "5. Limitation of Liability",
        content: "JumpItEasy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the service or any content provided by JumpItEasy."
      },
      safetyDisclaimer: {
        title: "6. Safety Disclaimer",
        content: "Parkour involves inherent risks. JumpItEasy provides generated courses and information for reference purposes only. Users are responsible for assessing risks, their abilities, and the suitability of any courses or techniques for their skill level. Always practice in safe environments with appropriate supervision when necessary."
      },
      termination: {
        title: "7. Termination",
        content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms and Conditions."
      },
      governing: {
        title: "8. Governing Law",
        content: "These Terms shall be governed by the laws of France, without regard to its conflict of law provisions."
      },
      changes: {
        title: "9. Changes to Terms",
        content: "We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the 'Last Updated' date at the top of this page."
      },
      contact: {
        title: "10. Contact Information",
        content: "If you have any questions about these Terms, please contact us at contact@jumpiteasy.com."
      }
    }
  },
  privacyPolicy: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: November 10, 2023",
    sections: {
      introduction: {
        title: "Introduction",
        content: "At JumpItEasy, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, process, and safeguard your information when you use our service."
      },
      dataCollection: {
        title: "1. Information We Collect",
        content: "We collect personal information that you provide directly to us, such as name, email address, country, and language preferences when you register an account. We also collect usage data including your interaction with the platform and generated courses."
      },
      dataUse: {
        title: "2. How We Use Your Information",
        content: "We use your information to provide and improve our services, communicate with you, personalize your experience, and ensure platform security. We may use anonymized data for research and analytics purposes."
      },
      dataSecurity: {
        title: "3. Data Security",
        content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure."
      },
      dataSharing: {
        title: "4. Sharing Your Information",
        content: "We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregate information with trusted partners who help us analyze and improve our service."
      },
      cookies: {
        title: "5. Cookies and Similar Technologies",
        content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
      },
      userRights: {
        title: "6. Your Data Rights",
        content: "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your data. Please contact us to exercise these rights."
      },
      childrenPrivacy: {
        title: "7. Children's Privacy",
        content: "Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13."
      },
      changes: {
        title: "8. Changes to This Privacy Policy",
        content: "We may update our Privacy Policy from time to time. We will notify you of significant changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date."
      },
      contact: {
        title: "9. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at privacy@jumpiteasy.com."
      }
    }
  },
  footer: {
    about: "About JumpItEasy",
    aboutText: "JumpItEasy is a platform designed to help parkour enthusiasts and instructors create personalized courses with our AI-powered generator.",
    quickLinks: "Quick Links",
    resources: "Resources",
    legal: "Legal",
    copyright: "© 2023 JumpItEasy. All rights reserved.",
    designedBy: "Designed with ❤️ by JumpItEasy Team",
    company: "Company",
    aboutUs: "About Us",
    documentation: "Documentation",
    faq: "FAQ",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    courses: "Courses",
    allRightsReserved: "All rights reserved.",
    contact: "Contact"
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to commonly asked questions about JumpItEasy",
    search: "Search questions...",
    noResults: "No questions match your search. Please try different keywords.",
    categories: {
      general: "General",
      account: "Account & Subscription",
      courses: "Courses",
      technical: "Technical Issues"
    },
    questions: {
      whatIs: {
        question: "What is JumpItEasy?",
        answer: "JumpItEasy is a platform that uses AI to generate parkour courses tailored to specific parameters. It helps instructors and practitioners design safe, challenging, and personalized training routes."
      },
      howGenerate: {
        question: "How does the course generation work?",
        answer: "Our AI analyzes your selected parameters (difficulty, duration, terrain type, etc.) and creates a course layout with appropriate obstacles, rest points, and progression markers based on parkour best practices."
      },
      isFree: {
        question: "Is JumpItEasy free to use?",
        answer: "JumpItEasy offers both free and premium features. Basic course generation is available for free, while advanced customization options and additional features require a subscription."
      },
      deleteAccount: {
        question: "How can I delete my account?",
        answer: "You can delete your account from the Settings page. Go to your Profile, select Settings, scroll to the bottom, and click 'Delete Account'. Note that this action is permanent and all your data will be removed."
      },
      contactSupport: {
        question: "How do I contact support?",
        answer: "You can reach our support team by emailing support@jumpiteasy.com or by using the contact form on our Contact page. We typically respond within 24-48 hours."
      }
    },
    general: {
      title: "General Questions",
      q1: "What is the philosophy behind JumpItEasy?",
      a1: "Our philosophy is to democratize parkour course creation and make the discipline more accessible to everyone. We believe technology can help overcome barriers to entry and enable more people to discover the benefits of parkour.",
      q2: "Is JumpItEasy suitable for beginners?",
      a2: "Absolutely! JumpItEasy is designed for all skill levels. Our course generator allows you to specify your experience level, from beginner to advanced, and tailors courses accordingly with appropriate movements and obstacles.",
      q3: "Are the generated courses safe?",
      a3: "We take safety very seriously. All generated courses include safety recommendations and are created according to parkour best practices. However, parkour inherently involves risk, and we always encourage users to warm up properly, assess their environment, and never exceed their capabilities."
    },
    account: {
      title: "Account & Subscription",
      q1: "How do I edit my profile information?",
      a1: "To edit your profile information, log in to your account, click on your avatar in the top right corner, select 'Profile', then click 'Edit Profile'. There you can update your username, photo, bio, and other information.",
      q2: "What are the benefits of a premium subscription?",
      a2: "A premium subscription gives you access to advanced features such as unlimited course generation, additional customization options, high-quality PDF exports, ad removal, and priority access to new features.",
      q3: "How do I cancel my subscription?",
      a3: "To cancel your subscription, go to your Profile, click on 'Settings', then 'Subscription', and select 'Cancel Subscription'. You'll continue to enjoy premium benefits until the end of your current billing period."
    },
    courses: {
      title: "Courses",
      q1: "Can I modify a course after it's generated?",
      a1: "Yes, all generated courses can be modified. After generation, you can adjust obstacle placement, change obstacle types, modify the difficulty of specific sections, and customize other aspects to perfectly meet your needs.",
      q2: "How do I share my courses with others?",
      a2: "To share a course, open it from your profile or the course details page, click the 'Share' button, then choose to share via link, social media, or export it as a PDF to print.",
      q3: "Can I access my courses offline?",
      a3: "Yes, you can download your courses as PDFs for offline access. For premium users, we also offer an offline sync feature in our mobile app that allows you to access your saved courses without an internet connection.",
      q4: "How do I find courses suitable for my environment?",
      a4: "When generating a course, you can specify the type of environment available (urban, natural, gym, etc.) and the equipment you have access to. The generator will then create a course adapted to these constraints. You can also filter community-shared courses according to these criteria."
    },
    technical: {
      title: "Technical Issues",
      q1: "The application isn't loading properly, what should I do?",
      a1: "If the application isn't loading correctly, first try refreshing the page. If the problem persists, clear your browser's cache, check your internet connection, and try using a different browser. If none of these solutions work, contact our technical support.",
      q2: "How do I report a bug or suggest an improvement?",
      a2: "We appreciate your feedback! To report a bug or suggest an improvement, use the 'Feedback' function in the main menu or send an email to feedback@jumpiteasy.com. Please include as much detail as possible, including screenshots if applicable."
    },
    notFound: "Didn't find the answer to your question?",
    contactSupport: "Contact our support team"
  },
  docs: {
    title: "Documentation",
    subtitle: "Learn how to use JumpItEasy effectively",
    gettingStarted: {
      title: "Getting Started",
      introduction: "Welcome to JumpItEasy. This guide will help you get started with our platform.",
      account: {
        title: "Creating Your Account",
        text: "To get started with JumpItEasy, you'll need to create an account. Click the Sign Up button in the top right corner of the homepage."
      },
      navigation: {
        title: "Navigating the Platform",
        text: "Once logged in, you can access all features through the main navigation menu. Your profile and settings can be accessed by clicking on your avatar."
      },
      firstCourse: {
        title: "Creating Your First Course",
        text: "To create your first parkour course, navigate to the 'Generate Course' page and set your desired parameters. Our AI will create a customized course based on your specifications."
      }
    }
  },
  privacy: {
    introduction: "Introduction",
    introductionText: "We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we handle your information.",
    informationCollection: "Information We Collect",
    informationCollectionText: "We collect various types of information to provide and improve our services to you:",
    personalInfo: {
      title: "Personal Information",
      text: "Information you provide directly to us, such as name, email, and profile details."
    },
    usage: {
      title: "Usage Data",
      text: "Information about how you interact with our platform, including courses viewed and generated."
    },
    cookies: {
      title: "Cookies and Tracking",
      text: "Information collected through cookies and similar technologies to analyze usage patterns."
    },
    dataUse: "How We Use Your Data",
    dataUseText: "We use your information for the following purposes:",
    dataUseList: {
      item1: "To provide and maintain our services",
      item2: "To personalize your experience",
      item3: "To improve our platform based on your feedback",
      item4: "To communicate with you about updates and offers"
    },
    dataSharing: "Information Sharing",
    dataSharingText: "We do not sell your personal information. We may share data with trusted partners to help us operate our business.",
    dataSecurity: "Data Security",
    dataSecurityText: "We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.",
    thirdPartyLinks: "Third-Party Links",
    thirdPartyLinksText: "Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites.",
    childrenPrivacy: "Children's Privacy",
    childrenPrivacyText: "Our services are not intended for children under 13. We do not knowingly collect information from children under 13.",
    changes: "Changes to This Policy",
    changesText: "We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on this page.",
    contact: "Contact Us",
    contactText: "If you have questions about this Privacy Policy, please contact us at privacy@jumpiteasy.com."
  },
  terms: {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated",
    acceptance: "Acceptance of Terms",
    acceptanceText: "By accessing or using JumpItEasy, you agree to be bound by these Terms and Conditions.",
    services: "Services Description",
    servicesText: "JumpItEasy provides an AI-powered platform for creating and sharing parkour courses.",
    userAccounts: "User Accounts",
    userAccountsText1: "You must register for an account to access certain features of our platform.",
    userAccountsText2: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
    content: "User Content",
    contentText1: "You retain ownership of content you create and share on our platform.",
    contentText2: "By posting content, you grant us a license to use it for operating and improving our services.",
    intellectualProperty: "Intellectual Property",
    intellectualPropertyText: "All platform content and features not user-generated are owned by JumpItEasy and protected by intellectual property laws.",
    prohibitedActivities: "Prohibited Activities",
    prohibitedActivitiesText: "When using our platform, you agree not to:",
    prohibitedList: {
      item1: "Violate any laws or regulations",
      item2: "Infringe on the rights of others",
      item3: "Submit false or misleading information",
      item4: "Upload harmful content or malware",
      item5: "Attempt to gain unauthorized access to our systems"
    },
    disclaimer: "Disclaimer",
    disclaimerText: "JumpItEasy is provided 'as is' without any warranties, expressed or implied.",
    limitation: "Limitation of Liability",
    limitationText: "JumpItEasy shall not be liable for any indirect, incidental, or consequential damages.",
    changes: "Changes to Terms",
    changesText: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.",
    contact: "Contact Information",
    contactText: "For questions about these Terms, please contact us at legal@jumpiteasy.com."
  }
};

export default enTranslations;
