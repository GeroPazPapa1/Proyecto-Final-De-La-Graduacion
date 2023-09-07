const verifyHTML = (link) => {
  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Estilos CSS personalizados aquí */
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #494443;
                color: rgb(255, 255, 255);
                text-decoration: none;
                margin: auto;
            }
            .logo{
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
            .div{
              height: 150px;
              width:300px;
              margin: auto;
            }
            .h1{
              text-align: center;
            }
            .divBtn{
              width:100%;
              display: flex;
              margin-top: 2em;
            }
            .p{
              margin-top: 3em;
              text-align: center;
            }
        </style>
    </head>
    <body>
    <div class="div">
    <img class="logo" alt="Vehibuy logo" src="https://res.cloudinary.com/dyiyju2b9/image/upload/v1694069101/jhjzrncbw1whgolmendp.webp">
    </div>
        <h1 class= "h1">Welcome to Vehibuy.com</h1>
        <p class="p">Thanks for signing up! Click on the following button to verify your email and start shopping on Vehibuy.com:</p>
        <div class="divBtn"><a class="button" href= ${link}>  Verify E-mail</a></div>
    </body>
    </html>`;
};
module.exports = verifyHTML;
