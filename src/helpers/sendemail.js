import nodemailer from 'nodemailer';
import {config} from './smtp.js';

const transporter = nodemailer.createTransport(config);

function sendEmail(email, newPassword) {
    transporter.sendEmail({
        subject: 'Redefinição de senha - IntecLab',
        from: 'Suporte IntecLab <guilhermebreeezy05@gmail.com>',
        to: `${email}`,
        html: `
        <html>
            <body>
                <p> Olá usuário(a)! 
                <br>Você solicitou a recuperação da sua senha da nossa plataforma.
                Sua Nova senha de acesso é: <h3> ${newPassword} </h3> </p>
                <a href="#"> Clique aqui para acessar o site </a>
            </body>
        </html>
        `
    });
}

export {sendEmail};