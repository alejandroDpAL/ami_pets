import { check } from "express-validator";

export const validacion = [
    check('identificacion', 'La identificación es obligatoria')
        .not().isEmpty().withMessage('La identificación es obligatoria')
        .isNumeric().withMessage('La identificación debe ser numérica'),
    check('nombre', 'El nombre es obligatorio')
        .not().isEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 50 }).withMessage('El nombre no debe tener más de 50 caracteres'),
    check('telefono', 'El teléfono es obligatorio')
        .not().isEmpty().withMessage('El teléfono es obligatorio')
        .isLength({ max: 50 }).withMessage('El teléfono no debe tener más de 50 caracteres'),
    check('correo', 'El correo es obligatorio')
        .not().isEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe proporcionar un correo válido')
        .isLength({ max: 50 }).withMessage('El correo no debe tener más de 50 caracteres'),
    check('password', 'La contraseña es obligatoria')
        .not().isEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres')
        .isLength({ max: 50 }).withMessage('La contraseña no debe tener más de 50 caracteres'),
    check('direccion', 'La dirección es obligatoria')
        .not().isEmpty().withMessage('La dirección es obligatoria')
        .isLength({ max: 40 }).withMessage('La dirección no debe tener más de 40 caracteres'),
    check('foto', 'La URL de la foto no debe tener más de 300 caracteres')
        .optional()
        .isLength({ max: 300 }).withMessage('La URL de la foto no debe tener más de 300 caracteres')
];
