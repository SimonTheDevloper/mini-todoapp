### Authentifizierung:

- Passwort-Hashing mit bcrypt
- JWT erstellen und validieren
- Login/register

### Autorisierung:

- Middleware zum Token prüfen
- User sieht nur eigene Todos
- Wird in allen Controllern gecheckt

### Input Validation:

- express-validator um zu validieren
- Fehler-Handling mit costum messages

### Rate Limiting:

> Wenn von einer IP innerhalb kurzer Zeit zu viele Anfragen kommen, wird der Zugriff vorübergehend blockiert.

- Schutz vor Brute-Force
- Unterschiedliche Limits für verschiedene Routes wie für Auth Routen oder generelle routen.
