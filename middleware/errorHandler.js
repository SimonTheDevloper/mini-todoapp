exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // In Production: Keine Stack-Traces an Client sind diese großen und langen pre errors wo auch irgendwie datenordner verzeichnis zurück gegen wird
    if (process.env.NODE_ENV === 'production') {
        res.status(err.status || 500).json({
            error: 'Internal Server Error'
        });
    } else {
        // beim entwickeln sind etaillierte Errors dann egal
        res.status(err.status || 500).json({
            error: err.message,
            stack: err.stack
        });
    }
};