import React, { ReactNode } from 'react';

import * as Unicons from '@iconscout/react-unicons';

import NavLinks from './NavLinks';
import Contact from '../elements/Contact';

import { getYears } from '../../utils/siteFunctions';
import website from '../../config/site-data.json';

import IconFacebook from '../../public/images/icons/social-circles/facebook_social-circles.svg';
import IconInsta from '../../public/images/icons/social-circles/instagram_social-circles.svg';

// @ts-ignore // Ignore "Cannot find module" error, no module is needed.
import * as footerAbout from '../../public/content/footerAbout.txt';

import styles from './styles/Footer.module.css';
import { handleTxt } from '../../hooks/useData';

const Footer = (
  isMobile: boolean,
  show?: boolean,
) => {

  const wrapperClass = styles.wrapper + ' row';
  const containerClass = styles.container;

  const AboutSection = (): any => {
    const about = {
      title: 'About',
      content: handleTxt(footerAbout, false),
    }
    const AboutContent = (): any => {
      const label = "About "+website.name;
      return (
      <section aria-label={label} className={containerClass+' col m12 l4'} id="about">
        <h2>{about.title.toUpperCase()}</h2>
        <div className={styles.about}>
          {about.content}
        </div>
      </section>)
    }
    return <AboutContent />
  }

  const ContactSection = (): any => {
    const phoneEl = <Contact isMobile={isMobile}
      element={'phone'}
      useIcon={false}
      classes={[styles.element,styles.icon]} />
    const emailEl = <Contact isMobile={isMobile}
      element={'email'}
      useIcon={false}
      classes={[styles.element,styles.icon]} />

    const contact = {
      title: 'Contact Us',
      content: {
        phone: {
          icon: <Unicons.UilMobileAndroidAlt />,
          element: <div>{phoneEl}</div>,
        },
        email: {
          icon: <Unicons.UilEnvelope />,
          element: <div>{emailEl}</div>,
        },
        address: {
          icon: <Unicons.UilLocationPoint />,
          element: <><div>{website.addressPtA}</div><div>{website.addressPtB}</div></>,
        },
      },
    }

    const phone = contact.content.phone;
    const email = contact.content.email;
    const address = contact.content.address;
    const addressLink = "https://www.google.com/maps/place/837+LA-20,+Thibodaux,+LA+70301/"+
      "data=!4m2!3m1!1s0x86213b7996ffa019:0xf475b48c668305b0?sa=X&ved=2ahUKEwjHxY_D_"+
      "YH8AhXInGoFHWA4BwMQ8gF6BAgKEAE";
    const openMap = () => {

    }

    const label = "Contact "+website.name;


    const ContactContent = () => {
      const phoneClasses = isMobile ? styles.contactItem+' '+styles.mobile : styles.contactItem;
      return (
        <section aria-label={label} className={containerClass+' col s12 m6 l4'} id="contact">
          <h2>{contact.title.toUpperCase()}</h2>
          <div className={styles.contact}>
            <div className={phoneClasses}>
              <div><span className={styles.icon}>{phone.icon}</span></div>
              <div><span className={styles.element}>{phone.element}</span></div>
            </div>
            <div className={styles.contactItem}>
              <div><span className={styles.icon}>{email.icon}</span></div>
              <div><span className={styles.element}>{email.element}</span></div>
            </div>
            <div className={styles.contactItem} onClick={()=> window.open(addressLink, "_blank")}>
              <div><span className={styles.icon}>{address.icon}</span></div>
              <div><span className={styles.element}>{address.element}</span></div>
            </div>
          </div>
        </section>)
    }

    return <ContactContent />
  }

  const OnlineSection = () => {
    const online = {
      title: 'Follow Us',
      content: <>Keep track of our latest projects and updates! Follow us on our social media accounts today.</>,
      socials: '',
    }
    const label = website.url + " Online";
    const Icon = ({ children, href }) => {
      return (
        <div className={styles.icon}>
          <a href={href}>{children}</a>
        </div>)
    }
    return (
      <section aria-label={label} className={containerClass+' col s12 m6 l4'} id="online">
        <h2>{online.title.toUpperCase()}</h2>
        <div className={styles.online}>
          {online.content}
        </div>
        <div className={styles.socials}>
          <Icon href={website.facebookUrl}><IconFacebook/></Icon>
          <Icon href={website.instagramUrl}><IconInsta/></Icon>
        </div>
      </section>)
  }

  const CopyrightSection = () => {
    const Copyright = () => {
      const year = getYears();
      return <>Copyright © {year} {website.fullname}</>
    }
    const MadeByGravy = () => {
      return (<a href="https://instagram.com/gravydesignco">made with love by grävy design co.</a>)
    }
    return (
      <section id="copyright">
        <div className={styles.links}>
          <NavLinks location='bottom' />
        </div>
        <div className={styles.copyright}>
          <Copyright />
        </div>
        <div className={styles.designer}>
          <MadeByGravy />
        </div>
      </section>)
  }


  return (<>
    { show !== false
    ? <footer className={styles.footer} id="footer">
        <div className={wrapperClass} id="info">
          <AboutSection />
          <ContactSection />
          <OnlineSection />
        </div>
        <div className={styles.info} id="copyright">
          <CopyrightSection />
        </div>
      </footer>
    : <></> }
  </>)
}

export default Footer;