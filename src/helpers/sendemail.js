import nodemailer from "nodemailer";
import {config} from "./smtp.js";

const transporter = nodemailer.createTransport(config);

function sendEmail(email, newPassword) {
    transporter.sendMail({
        subject: `Redefinição de senha - Intec`,
        from: `Suporte Intec <guilhermebreezy05@gmail.com>`,
        to: `${email}`,
        html: `
        <html>
            <body>
                <p> Olá usuário!
                <br>Você solicitou a alteração da sua senha. Sua nova senha de acesso é: <h3> ${newPassword} </h3> </p>
                <a href="#"> Clique aqui para acessar o site </a>
            </body>
        </html>
        `
    });
}

export {sendEmail}