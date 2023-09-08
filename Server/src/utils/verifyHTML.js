const verifyHTML = (link) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <style>
          p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
          h1{ font-size: 30px !important;}
          h2{ font-size: 25px !important;}
          h3{ font-size: 18px !important;}
          h4{ font-size: 16px !important;}
          p, a{font-size: 15px !important;}
  
          .claseBoton{
              width: 30%;
                  background-color: #a3a3a3;
                  color: black; 
                  padding: 16px 32px;
                  text-align: center;
                  text-decoration: none;
                  font-weight: bold;
                  display: inline-block;
                  font-size: 16px;
                  margin: 4px 2px;
                  transition-duration: 0.4s;
                  cursor: pointer;
          }
          .claseBoton:hover{
              background-color: #000000;
              color: #ffffff;
          }
          .imag{
              width: 20px;
              height: 20px;
          }
          .contA{
              margin: 0px 5px 0 5px;
          }
          .afooter{
              color: #ffffff !important; 
              text-decoration: none;
              font-size: 13px !important;
          }
      </style>
  </head>
  <body>
      <div style="width: 100%; background-color: #e3e3e3;">
          <div style="padding: 20px 10px 20px 10px;">
              <div style="background-color: #c2c2c2; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                  <img src="cid:logo" alt="" style="width: 200px; height: 60px;">
              </div>
  
              <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                  <h1 style= "color: #000000">Welcome to VehiBuy.com</h1>
                  <p style= "color: #000000">Thanks for signing up! Click on the following button to verify your email and start shopping on Vehibuy.com
                  </p>
  
                  
                  <p style="margin-bottom: 50px;"><i>
                      Sincerely:</i><br>VehiBuy Team</p>
  
                  <a class="claseBoton" href="${link}">Verify e-mail</a>
              </div>
  
              <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                  <a href="https://www.facebook.com/pretwor" class="contA"><img src="cid:fb" class="imag" /></a>
                  <a href="https://www.linkedin.com/in/daniel-felipe-botache-zuluaga-0180391a4/" class="contA"><img src="cid:ld" class="imag" /></a>
                  <a href="https://wa.me/5732156899" class="contA"><img src="cid:wapp" class="imag" /></a>
                  <a href="mailto:vehibuy97@gmail.com" class="contA"><img src="cid:gmail" class="imag" /></a>
  
                  <h4>Support</h4>
                  <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                      Get in touch with us through the following means:<br>
                      E-mail <a class="afooter" href="mailto:vehibuy97@gmail.com">vehibuy97@gmail.com</a><br>
                      Whatsapp: <a class="afooter" href="https://wa.me/5732156899">+57 321 568 99</a><br>
                  </p>
                  <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                      © 2023 VehiBuy, All rights reserved.
                  </p>
              </div>
  
  
  
          </div>
      </div>
  </body>
  </html>`;
};
module.exports = verifyHTML;
