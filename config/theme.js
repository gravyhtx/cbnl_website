import website from '../config/site-data.json';

export const navlinks = [
  {
    name: 'Home',
    link: '/',
    alt: `Go to the ${website.name} Home Page.`,
    sublinks: false,
  },
  {
    name: 'Services',
    link: '#services',
    alt: `Learn about our expert services.`,
    sublinks: false,
  },
  {
    name: 'Nursery',
    link: '#nursery',
    alt: `Information about Our Nursery.`,
    sublinks: false,
  },
  {
    name: 'Gallery',
    link: '#gallery',
    alt: `Learn more about us.`,
    sublinks: false,
  },
  {
    name: 'Contact Us',
    link: '#contact',
    alt: `Need to request a service? Drop us a line.`,
    sublinks: false,
  }
];

export const metaTags = (title, description, scalable) => {
  
  title = title ? website.name + " | " + title : website.name;
  description = description ? description : website.description;
  
  const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0" + (scalable ? ", user-scalable="+scalable : ", user-scalable=no");
  const themeColor = website.themeColor ? website.themeColor : "#000000";

  return (<>
    <meta name="viewport" content={viewport} />
    <meta name="theme-color" content={themeColor} />

    <meta property="og:site_name" content={title} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={website.url} />
    <meta property="og:image" content={website.image} />

    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:type" content="website" />
    <meta property="twitter:url" content={website.url} />
    <meta property="twitter:image" content={website.image} />

    <meta name="twitter:site" content={website.twitterHandle} />
    <meta name="twitter:creator" content={website.twitterHandle} />
    <meta name="twitter:image:alt" content={website.imageAlt} />
    <meta name="twitter:card" content={website.twitterCard} />
  </>)
}