import { useRef, useState } from 'react';
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

import { gallerySlides } from '../config/site-images.config';

import poolside from '../public/images/projects/poolside1.png';
import poolside2 from '../public/images/projects/poolside2.png';
import poolside3 from '../public/images/projects/poolside3.png';
import blueprint from '../public/images/projects/blueprint.jpg';

import styles from './style/Home.module.css';
import { elementIsVisible } from '../hooks/useClientRect';
import useSWR from 'swr';

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

  const lorem = () => {
    const ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, "+
                  "sed do eiusmod tempor incididunt ut labore et dolore magna "+
                  "aliqua. Ut enim ad minim veniam, quis nostrud exercitation "+
                  "ullamco laboris nisi ut aliquip ex ea commodo consequat. "+
                  "Duis aute irure dolor in reprehenderit in voluptate velit"+
                  "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint "+
                  "occaecat cupidatat non proident, sunt in culpa qui officia "+
                  "deserunt mollit anim id est laborum."
    return ipsum
  }

  const charLimit = (len, string, opts) => {
    // Trim string to chararcter limit
    let trim = string.substr(0, len);

    if(opts.completeWords === true) {
      // If character is cut off in middle of word continue final word
      trim = trim.substr(0, Math.min(trim.length, trim.lastIndexOf(" ")))
    }
    if(opts.ellipsis === true && len < string.length) {
      trim = trim.endsWith('.') ? trim += '..' : trim += '...'
    }
    return trim;
  }

  const wordLimit = (len, string, opts) => {
    const split = string.trim().split(' ');
    const arr = split.slice(0, len);
    console.log(split.length)
    let output = arr.join(' ');
    if(opts.ellipsis && len < split.length) {
      return output.endsWith('.') ? output += '..' : output += '...';
    }
    return output;
  }

  const opts = {
    ellipsis: true
  }

  console.log(wordLimit(70, lorem(), opts))

  const About = () => {
    const data = content.about;

    const heading = <><h1>{data.title}</h1><h2>{data.subtitle}</h2></>

    return (
      <section className={styles.about} id="about">
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
      <section className={styles.services+' row'} id="services">
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
      <section className={styles.projects} id="projects">
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

  const callusRef = useRef(null);
    
  const CallUs = () => {

    // const bkgImg = {
    //   background: `url("${blueprint.src}") no-repeat fixed center`,
    //   backgroundSize: 'cover',
    // };

    const Content = () => {
      return (
        <div className={styles.container}>
          {/* <div className={styles.image} style={bkgImg}/> */}
          <div className={styles.content}>
            <h2>CALL US TODAY</h2>
            <div className={styles.tel}>
              <Contact element={'phone'} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <section ref={callusRef} className={styles.callUs} id="call-us">
        <Content />
      </section>
    )
  }

  const Nursery = () => {
    const data = content.nursery;
    const Content = () => {
      return (
        data.content.map((item, index) => {
          return <div className={styles.content} key={index}>{item}</div>
        })
      )
    }
    return (
      <section className={styles.nursery} id="nursery">
        <h2 className={styles.header}>OUR NURSERY</h2>
        <div className={styles.details}>
          <Content />
        </div>
      </section>
    )
  }

  const Verified = () => {
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
      <section className={styles.verified} id="worthy">
        <div className={styles.logoContainer}>{logo}</div>
        <div className={styles.icons+' row'}>
          <Panels />
        </div>
      </section>
    )
  }

  const galleryHeader = <>
    <div className={styles.galleryHeader}>
      <h2>GALLERY</h2>
    </div>
  </>

  return (<>
    <DefaultLayout title={title} swipeNav={false}>
      <About />
      <Services />
      <Projects />
      {/* <CallUs /> */}
      <Nursery />
      <Gallery
      classes={styles.gallery}
        header={ galleryHeader } />
      <Verified />
    </DefaultLayout>
  </>)
}
