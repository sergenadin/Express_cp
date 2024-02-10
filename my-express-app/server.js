const express = require('express');
const app = express();

// Middleware pour servir les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Middleware personnalisé pour vérifier l'heure de la requête
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (dimanche) à 6 (samedi)
    const hourOfDay = date.getHours(); // 0 à 23

    // Vérifier si c'est un jour de semaine (lundi à vendredi) et si l'heure est entre 9h et 17h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next(); // Continuer vers la route suivante
    } else {
        res.send('Désolé, cette application est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
    }
};

// Configuration des vues avec EJS (optionnel)
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', checkWorkingHours, (req, res) => {
    res.render('home');
});

app.get('/services', checkWorkingHours, (req, res) => {
    res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
    res.render('contact');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur Express démarré sur le port ${PORT}`);
});
