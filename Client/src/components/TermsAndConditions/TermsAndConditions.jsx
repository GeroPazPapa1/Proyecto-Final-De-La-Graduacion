
import React, { useState } from 'react';
import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  const termsText = `Bienvenido a nuestra sección de Términos y Condiciones para la venta de autos de lujo. A continuación, encontrarás información importante para garantizar una experiencia satisfactoria al adquirir uno de nuestros vehículos.

Garantía
Nuestros autos de lujo vienen con una garantía estándar de [X] años que cubre defectos de fabricación y problemas mecánicos. Sin embargo, tenga en cuenta que la garantía no cubre daños causados por accidentes, mal uso o modificaciones no autorizadas.

Responsabilidad:
Al adquirir un auto de lujo, el comprador acepta la responsabilidad de mantener el vehículo en buen estado y seguir las instrucciones de mantenimiento proporcionadas por el fabricante. No nos hacemos responsables de ningún daño o lesión causada por un mal uso del vehículo.

Entrega y Plazos:
Haremos todo lo posible para entregar su auto de lujo en el menor tiempo posible. Sin embargo, tenga en cuenta que los plazos de entrega pueden variar según la disponibilidad del modelo y otros factores externos. Le mantendremos informado sobre el progreso de su pedido.

Temas Legales:
Es importante que esté familiarizado con las leyes y regulaciones relacionadas con la venta de autos de lujo. Al realizar una compra, acepta cumplir con todas las leyes aplicables, incluidas las relacionadas con la importación y exportación, impuestos, y cualquier otro requisito legal específico de su país o región.

Política de Devoluciones:
Ofrecemos una política de devoluciones de [X] días para nuestros autos de lujo. Si no está satisfecho con su compra, contáctenos dentro de este período para obtener más información sobre cómo proceder con la devolución.

Privacidad y Protección de Datos:
Respetamos su privacidad y protegemos sus datos personales de acuerdo con las leyes de privacidad aplicables. Utilizaremos su información personal únicamente para fines relacionados con su compra y no la compartiremos con terceros sin su consentimiento.

Contacto:
Si tiene alguna pregunta o inquietud relacionada con nuestros Términos y Condiciones, no dude en ponerse en contacto con nosotros a través de los canales de comunicación proporcionados en nuestro sitio web.

Gracias por elegirnos como su proveedor de autos de lujo. Esperamos brindarle una experiencia excepcional.`;

  const [activeSection, setActiveSection] = useState('Garantía');

  const handleButtonClick = (section) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Términos y Condiciones</h1>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${activeSection === 'Garantía' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Garantía')}
          >
            Garantía
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Responsabilidad' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Responsabilidad')}
          >
            Responsabilidad
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Entrega y Plazos' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Entrega y Plazos')}
          >
            Entrega y Plazos
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Temas Legales' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Temas Legales')}
          >
            Temas Legales
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Política de Devoluciones' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Política de Devoluciones')}
          >
            Política de Devoluciones
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Privacidad y Protección de Datos' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Privacidad y Protección de Datos')}
          >
            Privacidad y Protección de Datos
          </button>
          <button
            className={`${styles.button} ${activeSection === 'Contacto' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Contacto')}
          >
            Contacto
          </button>
        </div>
        <div className={styles.paragraphsContainer}>
          <h2 className={styles.subtitle} id="Garantía">
            Garantía
          </h2>
          <p>{termsText.substring(0, termsText.indexOf('Responsabilidad'))}</p>
          <h2 className={styles.subtitle} id="Responsabilidad">
            Responsabilidad
          </h2>
          <p>{termsText.substring(termsText.indexOf('Responsabilidad'), termsText.indexOf('Entrega y Plazos'))}</p>
          <h2 className={styles.subtitle} id="Entrega y Plazos">
            Entrega y Plazos
          </h2>
          <p>{termsText.substring(termsText.indexOf('Entrega y Plazos'), termsText.indexOf('Temas Legales'))}</p>
          <h2 className={styles.subtitle} id="Temas Legales">
            Temas Legales
          </h2>
          <p>{termsText.substring(termsText.indexOf('Temas Legales'), termsText.indexOf('Política de Devoluciones'))}</p>
          <h2 className={styles.subtitle} id="Política de Devoluciones">
            Política de Devoluciones
          </h2>
          <p>{termsText.substring(termsText.indexOf('Política de Devoluciones'), termsText.indexOf('Privacidad y Protección de Datos'))}</p>
          <h2 className={styles.subtitle} id="Privacidad y Protección de Datos">
            Privacidad y Protección de Datos
          </h2>
          <p>{termsText.substring(termsText.indexOf('Privacidad y Protección de Datos'), termsText.indexOf('Contacto'))}</p>
          <h2 className={styles.subtitle} id="Contacto">
            Contacto
          </h2>
          <p>{termsText.substring(termsText.indexOf('Contacto'))}</p>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src="../../../public/frontal.jpg" alt="Auto 1" />
            <p>(No cubre choques frontales)</p>
          </div>
          <div className={styles.card}>
            <img src="../../../public/lateral.jpg" alt="Auto 2" />
            <p>(No cubre choques laterales)</p>
          </div>
          <div className={styles.card}>
            <img src="../../../public/trasero.jpg" alt="Auto 3" />
            <p>(No cubre choques traseros)</p>
          </div>
        </div>
        <p className={styles.thanks}>Gracias por elegirnos como su proveedor de autos de lujo. Esperamos brindarle una experiencia excepcional.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;