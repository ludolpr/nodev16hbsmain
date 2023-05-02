import { check } from 'express-validator';

export const register = () => {
    return [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Le Pseudo ne peut être vide'),
        check('name')
            .isLength({ max:25})
            .withMessage('Ton pseudo est trop grand (max 25 caractères)'),

        check('email')
            .isEmail()
            .withMessage('Email not work'),

        check('password')
            .not()
            .isEmpty()
            .withMessage('Le password ne peut pas être vide'),
        check('password')
            .isLength({ max:50})
            .withMessage('Password trop grand (max 50 caractères)'),
    ]
}

export const login = () => {
    return [
        check('email')
            .isEmail()
            .withMessage('Email not work'),
        check('password')
            .not()
            .isEmpty()
            .withMessage('Le password ne peut pas être vide'),
        check('password')
            .isLength({ max:50})
            .withMessage('Password trop grand (max 50 caractères)'),
    ]
}

export const articleCreate = () => {
    return [
        check('title')
            .not()
            .isEmpty()
            .withMessage('Le titre ne peut être vide'),
        check('title')
            .isLength({ max:40})
            .withMessage('Titre trop grand (max 40 caractères)'),

        check('price')
            .not()
            .isEmpty()
            .withMessage('Le prix ne peut être vide'),
        check('price')
            .isLength({ max:10})
            .withMessage('Prix trop grand (max 10 caractères)'),

        check('art_image')
            .custom((value, { req }) => (req.file) ? req.file : undefined)
            .withMessage('L\'image ne peut être vide'),
    ]
}
