import React, { ReactNode } from 'react';

import * as Unicons from '@iconscout/react-unicons';

import NavLinks from './NavLinks';
import Contact from '../elements/Contact';

import { getYears } from '../../utils/siteFunctions';
import website from '../../config/site-data.json';

import IconFacebook from '../../public/images/icons/social-circles/facebook_social-circles.svg';
import IconInsta from '../../public/images/icons/social-circles/instagram_social-circles.svg';

import styles from './styles/Footer.module.css';

const Footer = (
  show?: boolean,
) => {

  const wrapperClass = styles.wrapper + ' row';
  const containerClass = styles.container;

  const AboutSection = (): any => {
    const about = {
      title: 'About',
      content: website.description,
    }
    const AboutContent = (): any => {
      const label = "About "+website.name;
      return (
      <div aria-label={label} className={containerClass+' col m12 l4'}>
        <h2>{about.title.toUpperCase()}</h2>
        <div className={styles.about}>
          {about.content}
        </div>
      </div>)
    }
    return <AboutContent />
  }

  const ContactSection = (): any => {
    const phoneEl = <Contact element={'phone'} useIcon={true} classes={[styles.element,styles.icon]} />
    const emailEl = <Contact element={'email'} useIcon={true} classes={[styles.element,styles.icon]} />

    const contact = {
      title: 'Contact Us',
      content: {
        phone: {
          icon: <></>,
          element: <>{phoneEl}</>,
        },
        email: {
          icon: <></>,
          element: <>{emailEl}</>,
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

    const label = "Contact "+website.name;

    const ContactContent = () => {
      return (
        <div aria-label={label} className={containerClass+' col s12 m6 l4'}>
          <h2>{contact.title.toUpperCase()}</h2>
          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <div><span className={styles.element}>{phone.element}</span></div>
            </div>
            <div className={styles.contactItem}>
              <div><span className={styles.element}>{email.element}</span></div>
            </div>
            <div className={styles.contactItem}>
              <div><span className={styles.icon}>{address.icon}</span></div>
              <div><span className={styles.element}>{address.element}</span></div>
            </div>
          </div>
        </div>)
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
    return (<>
      <div aria-label={label} className={containerClass+' col s12 m6 l4'}>
        <h2>{online.title.toUpperCase()}</h2>
        <div className={styles.online}>
          {online.content}
        </div>
        <div className={styles.socials}>
          <Icon href={website.facebookUrl}><IconFacebook/></Icon>
          <Icon href={website.instagramUrl}><IconInsta/></Icon>
        </div>
      </div>
    </>)
  }

  const InfoSection = () => {
    const Copyright = () => {
      const year = getYears();
      return <>Copyright © {year} {website.fullname}</>
    }
    const MadeByGravy = () => {
      return (<a href="https://instagram.com/gravydesignco">made with love by grävy design co.</a>)
    }
    return (<>
      <div className={styles.links}>
        <NavLinks location='bottom' />
      </div>
      <div className={styles.copyright}>
        <Copyright />
      </div>
      <div className={styles.designer}>
        <MadeByGravy />
      </div>
    </>)
  }


  return (<>
    { show !== false
    ? <footer className={styles.footer}>
        <div className={wrapperClass}>
          <AboutSection />
          <ContactSection />
          <OnlineSection />
        </div>
        <div className={styles.info}>
          <InfoSection />
        </div>
      </footer>
    : <></> }
  </>)
}

export default Footer;