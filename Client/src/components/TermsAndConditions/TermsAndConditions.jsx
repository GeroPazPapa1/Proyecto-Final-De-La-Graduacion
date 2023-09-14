import React, { useEffect, useState } from 'react';
import styles from './TermsAndConditions.module.css';
import { Link } from "react-router-dom";
import { ButtonBack } from "../../assets/svgs";

const TermsAndConditions = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const termsText = `Bienvenido a nuestra sección de Términos y Condiciones para la venta de autos de lujo. A continuación, encontrarás información importante para garantizar una experiencia satisfactoria al adquirir uno de nuestros vehículos.

Garantía
Nuestros autos de lujo vienen con una garantía estándar de [X] años que cubre defectos de fabricación y problemas mecánicos. Sin embargo, tenga en cuenta que la garantía no cubre daños causados por accidentes, mal uso o modificaciones no autorizadas.

Responsabilidad
Al adquirir un auto de lujo, el comprador acepta la responsabilidad de mantener el vehículo en buen estado y seguir las instrucciones de mantenimiento proporcionadas por el fabricante. No nos hacemos responsables de ningún daño o lesión causada por un mal uso del vehículo.

Entrega y Plazos
Haremos todo lo posible para entregar su auto de lujo en el menor tiempo posible. Sin embargo, tenga en cuenta que los plazos de entrega pueden variar según la disponibilidad del modelo y otros factores externos. Le mantendremos informado sobre el progreso de su pedido.

Temas Legales
Es importante que esté familiarizado con las leyes y regulaciones relacionadas con la venta de autos de lujo. Al realizar una compra, acepta cumplir con todas las leyes aplicables, incluidas las relacionadas con la importación y exportación, impuestos, y cualquier otro requisito legal específico de su país o región.

Política de Devoluciones
Ofrecemos una política de devoluciones de [X] días para nuestros autos de lujo. Si no está satisfecho con su compra, contáctenos dentro de este período para obtener más información sobre cómo proceder con la devolución.

Privacidad y Protección de Datos
Respetamos su privacidad y protegemos sus datos personales de acuerdo con las leyes de privacidad aplicables. Utilizaremos su información personal únicamente para fines relacionados con su compra y no la compartiremos con terceros sin su consentimiento.

Contacto
Si tiene alguna pregunta o inquietud relacionada con nuestros Términos y Condiciones, no dude en ponerse en contacto con nosotros a través de los canales de comunicación proporcionados en nuestro sitio web.

Gracias por elegirnos como su proveedor de autos de lujo. Esperamos brindarle una experiencia excepcional.`;

    let index = 0;
    const interval = setInterval(() => {
      setText((prevText) => prevText + termsText[index]);
      index++;
      if (index === termsText.length) {
        clearInterval(interval);
      }
    }, 5);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.coverImage}></div>
      <Link to={"/home"} className={styles.link}><ButtonBack /></Link>
      <div className={styles.content}>
        <h1 className={styles.title}>Términos y Condiciones</h1>
        <div className={styles.paragraphsContainer}>
          <h2 className={styles.subtitle}>Garantía</h2>
          <p>Nuestros autos de lujo vienen con una garantía estándar de [X] años que cubre defectos de fabricación y problemas mecánicos. Sin embargo, tenga en cuenta que la garantía no cubre daños causados por accidentes, mal uso o modificaciones no autorizadas.</p>

          <h2 className={styles.subtitle}>Entrega y Plazos</h2>
          <p>Haremos todo lo posible para entregar su auto de lujo en el menor tiempo posible. Sin embargo, tenga en cuenta que los plazos de entrega pueden variar según la disponibilidad del modelo y otros factores externos. Le mantendremos informado sobre el progreso de su pedido.</p>

          <h2 className={styles.subtitle}>Responsabilidad</h2>
          <p>Al adquirir un auto de lujo, el comprador acepta la responsabilidad de mantener el vehículo en buen estado y seguir las instrucciones de mantenimiento proporcionadas por el fabricante. No nos hacemos responsables de ningún daño o lesión causada por un mal uso del vehículo.</p>

          <h2 className={styles.subtitle}>Temas Legales</h2>
          <p>Es importante que esté familiarizado con las leyes y regulaciones relacionadas con la venta de autos de lujo. Al realizar una compra, acepta cumplir con todas las leyes aplicables, incluidas las relacionadas con la importación y exportación, impuestos, y cualquier otro requisito legal específico de su país o región.</p>

          <h2 className={styles.subtitle}>Política de Devoluciones</h2>
          <p>Ofrecemos una política de devoluciones de [X] días para nuestros autos de lujo. Si no está satisfecho con su compra, contáctenos dentro de este período para obtener más información sobre cómo proceder con la devolución.</p>

          <h2 className={styles.subtitle}>Privacidad y Protección de Datos</h2>
          <p>Respetamos su privacidad y protegemos sus datos personales de acuerdo con las leyes de privacidad aplicables. Utilizaremos su información personal únicamente para fines relacionados con su compra y no la compartiremos con terceros sin su consentimiento.</p>

          <h2 className={styles.subtitle}>Contacto</h2>
          <p>Si tiene alguna pregunta o inquietud relacionada con nuestros Términos y Condiciones, no dude en ponerse en contacto con nosotros a través de los canales de comunicación proporcionados en nuestro sitio web.</p>
        </div>

        <p className={styles.thanks}>Gracias por elegirnos como su proveedor de autos de lujo. Esperamos brindarle una experiencia excepcional.</p>

        <div className={styles.buttonsContainer}>
          <button className={styles.button}>Aceptar</button>
          <button className={styles.button}>Rechazar</button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;