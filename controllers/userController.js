const USER = require('../models/user');
const RefreshToken = require('../models/refreshToken')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await USER.create({
            username: username.trim(),
            email: email.trim(),
            password: password
        })
        res.status(201).json({ msg: "Neuer User erfolgreich erstellt" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).send("Kein User mit dieser E-Mail gefunden");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign(
                { id: user._id },          // 1. DER INHALT (Payload)
                process.env.JWT_SECRET,    // 2. DAS SIEGEL (Secret Key)
                { expiresIn: '15m' }       // 3. DAS HALTBARKEITSDATUM (Options)
            );
            const refreshToken = crypto.randomBytes(32).toString('hex');

            await RefreshToken.create({
                userId: user._id,
                token: refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)  // 30 Tage ab jetztiges datum
            });
            res.status(200).json({ accessToken, refreshToken });
        } else {
            return res.status(401).send("Not Allowed");
        }

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!tokenDoc) {
        return res.status(404).json({ error: "Token nicht gefunden" });
    }

    if (tokenDoc.expiresAt <= Date.now()) {
        return res.status(401).json({ error: "Token abgelaufen" });
    }
    const newAccessToken = jwt.sign(
        { id: tokenDoc.userId },          // 1. DER INHALT (Payload)
        process.env.JWT_SECRET,    // 2. DAS SIEGEL (Secret Key)
        { expiresIn: '15m' }       // 3. DAS HALTBARKEITSDATUM (Options)
    );
    res.status(200).send(newAccessToken)
}; 