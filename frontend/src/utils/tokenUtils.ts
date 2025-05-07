/**
 * Utilitaires pour gérer les tokens JWT
 */

/**
 * Décode un token JWT et retourne son payload
 */
export const decodeJwtToken = (token: string): Record<string, unknown> => {
    try {
        // Divise le token en ses trois parties (header, payload, signature)
        const base64Url = token.split('.')[1];
        // Remplace les caractères spéciaux pour la base64 standard
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Décode le payload
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erreur de décodage du token JWT:', error);
        return {};
    }
};

/**
 * Vérifie si un token JWT est expiré
 * @returns true si le token est expiré, false sinon
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = decodeJwtToken(token);

        if (!decodedToken || !decodedToken.exp) {
            // Si le token n'a pas de champ exp, on considère qu'il est expiré par précaution
            return true;
        }

        // La date d'expiration est un timestamp Unix en secondes,
        // donc on le multiplie par 1000 pour le comparer avec Date.now() qui est en millisecondes
        const expirationDate = (decodedToken.exp as number) * 1000;
        const currentDate = Date.now();

        return currentDate >= expirationDate;
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'expiration du token:', error);
        // En cas d'erreur, on considère que le token est expiré par précaution
        return true;
    }
};

/**
 * Obtient la date d'expiration d'un token JWT sous forme de Date
 */
export const getTokenExpirationDate = (token: string): Date | null => {
    try {
        const decodedToken = decodeJwtToken(token);

        if (!decodedToken || !decodedToken.exp) {
            return null;
        }

        // Convertit le timestamp en Date
        return new Date(Number(decodedToken.exp) * 1000);
    } catch (error) {
        console.error('Erreur lors de l\'obtention de la date d\'expiration:', error);
        return null;
    }
};

/**
 * Obtient le délai restant avant l'expiration du token en secondes
 * @returns le nombre de secondes avant expiration, ou 0 si le token est déjà expiré
 */
export const getTokenRemainingTime = (token: string): number => {
    try {
        const expirationDate = getTokenExpirationDate(token);

        if (!expirationDate) {
            return 0;
        }

        const currentTime = Date.now();
        const expirationTime = expirationDate.getTime();
        const remainingTime = expirationTime - currentTime;

        return Math.max(0, Math.floor(remainingTime / 1000));
    } catch (error) {
        console.error('Erreur lors du calcul du temps restant:', error);
        return 0;
    }
};
