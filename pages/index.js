import { Fragment, useState } from 'react';
import Image from 'next/image';

import * as Unicons from '@iconscout/react-unicons';

import DefaultLayout from '../templates/DefaultLayout';

import Modal from '../components/dynamic/Modal';

import ImageDetails from '../components/containers/ImageDetails';
import Gallery from '../components/containers/Gallery';
import Contact from '../components/elements/Contact';

import { handleTxt } from '../hooks/useData';
import useWindowSize from '../hooks/useWindowSize';

import website from '../config/site-data.json';

import logoLight from '../public/images/logos/cbnl-logo_light.png';

import aboutContent from '../public/content/aboutContent.txt';
import outdoorServices from '../public/content/outdoorServices.txt';
import renovation from '../public/content/renovation.txt';
import ourNursery from '../public/content/ourNursery.txt';

import poolside from '../public/images/projects/poolside1.png';
import poolside2 from '../public/images/projects/poolside2.png';
import poolside3 from '../public/images/projects/poolside3.png';
import img1 from '../public/images/slides/img1.png';
import img2 from '../public/images/slides/img2.png';
import img3 from '../public/images/slides/img3.png';
import img4 from '../public/images/slides/img4.png';
import img5 from '../public/images/slides/img5.png';
import img6 from '../public/images/slides/img6.png';


import styles from './style/Home.module.css';

export default function Home() {
// APP STATE
  const title = 'Home';
  // Set app
  const [sideNav, setSideNav] = useState(false);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal)
  }

  const [popup, setPopup] = useState(false);
  const openPopup = () => {
    setPopup(!popup)
  }

  const winsize = useWindowSize();
  const width = winsize.width;
  const breakpoint = winsize.breakpoint;

  const VerifiedIcon = (index, size) => {
    const Icon = () => {
      switch(index) {
        case 0:
          return <Unicons.UilFileCheckAlt size={size} />
        case 1:
          return <Unicons.UilStar size={size} />
        case 2:
          return <Unicons.UilUserCheck size={size} />
      }
    }
    return Icon(size);
  }

  const content = {
    about: {
      title: "SERVING LOUISIANA'S BAYOU REGION",
      subtitle: 'FOR OVER 20 YEARS',
      content: handleTxt(aboutContent, true),
    },
    services: [
      {
        icon: <Unicons.UilTape size="100" color='#e4e6d9' />,
        name: 'Property Planning'
      },{
        icon: <Unicons.UilMountains size="100" color='#e4e6d9' />,
        name: 'Landscaping Services'
      },{
        icon: <Unicons.UilFlower size="100" color='#e4e6d9' />,
        name: 'Nursery & Garden Center'
      },{
        icon: <Unicons.UilTrees size="100" color='#e4e6d9' />,
        name: 'Full Outdoor Design Services'
      }
    ],
    contact: {
      title: 'CALL US TODAY',
      button: <button />
    },
    details: {
      outdoorServices: handleTxt(outdoorServices, true),
      renovation: handleTxt(renovation, true),
    },
    projects: {
      title: '',
      subtitle: '',
      slides: [ 'img', 'img', 'img' ]
    },
    verified: ['Fully Bonded', 'Reputable', 'Experienced',],
    nursery: {
      content: handleTxt(ourNursery, false),
    }
  }

  const About = () => {
    const data = content.about;

    const heading = <><h1>{data.title}</h1><h2>{data.subtitle}</h2></>

    return (
      <section className={styles.about}>
        <hgroup>
          {heading}
        </hgroup>
        <div className={styles.content}>
          {data.content}
        </div>
      </section>)
  }
  
  const Services = () => {
    const data = content.services;

    const Service = ({ data }) => {
      const colWidth = width > 860 ? '25%' : width <= 860 && width > 600 ? '50%' : '100%';
      return (
        <ul className={styles.item} style={{ width: colWidth }}>
          <div className={styles.icon}>{data.icon?data.icon:''}</div>
          <div className={styles.name}>{data.name}</div>
        </ul>
      )
    }

    const S = () => {
      return (
        data.map((p,i)=>{
          return <Service data={p} key={i} />
        })
      )
    }

    return (<>
      <section className={styles.services+' row'}>
        <h2><span>SERVICES</span></h2>
        <div className={styles.flexWrapper}>
          <div className={styles.container}>
            <S/>
          </div>
        </div>
      </section>
    </>)
  }
  
  const Projects = () => {
    const data = content.details;

    return (
      <section className={styles.projects}>
        {/* <h2 className={styles.header}>PROJECTS</h2> */}
        <div className={styles.details}>
          <ImageDetails
            details={{
              header: "Outdoor Design Services",
              content: handleTxt(outdoorServices, true),
            }}
            alt={"Poolside Image 01"}
            image={poolside}
            position='left' />
          <div className={styles.content}>
          Our services also include all hardscaping design and layout to add form and function to your natural
          landscape. Whether you need a pool, pavilion, or patio we can find the best creative solutions to meet
          the goals for your ultimate home renovation.
          </div>
          <ImageDetails
            details={{
              header: "Renovation and Maintenance",
              content: data.renovation,
            }}
            alt={"Poolside Image 01"}
            image={poolside3}
            position='right' />
        </div>
      </section>
    )
  }

  const CallUs = () => {
    const Content = () => {
      return (
        <div>
          <h2>CALL US TODAY</h2>
          <div className={styles.tel}>
            <Contact element={'phone'} />
          </div>
        </div>
      )
    }
    return (
      <section className={styles.callUs}>
        <Content />
      </section>
    )
  }

  const Nursery = () => {
    const data = content.nursery;
    console.log(content.nursery.content[0]);
    const Content = () => {
      return (
        data.content.map((item, index) => {
          return <div className={styles.content} key={index}>{item}</div>
        })
      )
    }
    return (
      <section className={styles.nursery}>
        <h2 className={styles.header}>OUR NURSERY</h2>
        <div className={styles.details}>
          <Content />
        </div>
      </section>
    )
  }

  const ProjectGallery = () => {
    const slides = [{
      src: img1,
      alt: "Image 1"
    },{
      src: img2,
      alt: "Image 2"
    },{
      src: img3,
      alt: "Image 3"
    },{
      src: img4,
      alt: "Image 4"
    },{
      src: img5,
      alt: "Image 5"
    },{
      src: img6,
      alt: "Image 6"
    },];
    return <Gallery imgObjArray={slides} />
}

  const Verified = () => {
    console.log(logoLight.src)
    const data = content.verified;
    const logo = <Image src={logoLight.src}
      className={styles.logo}
      alt={website.name+" Logo"}
      sizes="100vw"
      fill />

    const iconSize = width > 1400
        ? '200'
      : width <= 1400 && width > 768
        ? '120'
        : '75'
    const Panels = () => {
      return (
        data.map((item, index) => {
          return (
            <div className='col s4' key={index}>
              <div className={styles.icon}>{VerifiedIcon(index, iconSize)}</div>
              <div className={styles.name}>{item}</div>
            </div>)
        }))
    }
    
    return (
      <section className={styles.verified}>
        <div className={styles.logoContainer}>{logo}</div>
        <div className={styles.icons+' row'}>
          <Panels />
        </div>
      </section>
    )
  }


  return (<>
    <DefaultLayout title={title} swipeNav={false}>
      
      <About />
      <Services />
      <Projects />
      <CallUs />
      <Nursery />
      <ProjectGallery />
      <Verified />
    </DefaultLayout>
  </>)
}
