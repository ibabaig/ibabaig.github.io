import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, FileText } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sparkleEnabled, setSparkleEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'projects', 'writing'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sparkle cursor animation
    if (!sparkleEnabled) return; // Don't run if disabled

    const sparkles = 25;
    let x = 400, y = 300, ox = 400, oy = 300;
    const colours = ['#f62f9c', '#5EE49A', '#5171f2', '#a854f8'];

    const tiny = [];
    const star = [];
    const starv = [];
    const starx = [];
    const stary = [];
    const tinyx = [];
    const tinyy = [];
    const tinyv = [];

    let swide = window.innerWidth;
    let shigh = window.innerHeight;
    let sleft = 0;
    let sdown = 0;

    for (let i = 0; i < sparkles; i++) {
      // Create tiny sparkles (sparkle to dot)
      const tinyDiv = document.createElement("div");
      tinyDiv.style.position = "absolute";
      tinyDiv.style.height = "3px";
      tinyDiv.style.width = "3px";
      tinyDiv.style.borderRadius = "50%";
      tinyDiv.style.visibility = "hidden";
      tinyDiv.style.zIndex = "999";
      tinyDiv.style.pointerEvents = "none";
      document.body.appendChild(tinyDiv);
      tiny[i] = tinyDiv;
      starv[i] = 0;
      tinyv[i] = 0;

      // Create star sparkles (plus sign)
      const starDiv = document.createElement("div");
      starDiv.style.position = "absolute";
      starDiv.style.height = "8px";
      starDiv.style.width = "8px";
      starDiv.style.backgroundColor = "transparent";
      starDiv.style.visibility = "hidden";
      starDiv.style.zIndex = "999";
      starDiv.style.pointerEvents = "none";

      // Vertical line of plus
      const rlef = document.createElement("div");
      rlef.style.position = "absolute";
      rlef.style.height = "8px";
      rlef.style.width = "2px";
      rlef.style.top = "0px";
      rlef.style.left = "3px";
      rlef.style.borderRadius = "1px";

      // Horizontal line of plus
      const rdow = document.createElement("div");
      rdow.style.position = "absolute";
      rdow.style.height = "2px";
      rdow.style.width = "8px";
      rdow.style.top = "3px";
      rdow.style.left = "0px";
      rdow.style.borderRadius = "1px";

      starDiv.appendChild(rlef);
      starDiv.appendChild(rdow);
      document.body.appendChild(starDiv);
      star[i] = starDiv;
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      y = e.pageY;
      x = e.pageX;
    };

    // Scroll handler
    const handleScroll = () => {
      if (typeof self.pageYOffset === 'number') {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
      } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
      }
    };

    // Resize handler
    const handleResize = () => {
      swide = window.innerWidth;
      shigh = window.innerHeight;
    };

    // New color generator
    const newColour = () => {
      return colours[Math.floor(Math.random() * colours.length)];
    };

    // Update star animation
    const updateStar = (i) => {
      if (--starv[i] === 25) {
        star[i].style.clip = "rect(1px, 7px, 7px, 1px)";
      }
      if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
          star[i].style.top = stary[i] + "px";
          star[i].style.left = starx[i] + "px";
        } else {
          star[i].style.visibility = "hidden";
          starv[i] = 0;
          return;
        }
      } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
      }
    };

    // Update tiny sparkles
    const updateTiny = (i) => {
      if (--tinyv[i] === 25) {
        tiny[i].style.width = "1.5px";
        tiny[i].style.height = "1.5px";
      }
      if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
          tiny[i].style.top = tinyy[i] + "px";
          tiny[i].style.left = tinyx[i] + "px";
        } else {
          tiny[i].style.visibility = "hidden";
          tinyv[i] = 0;
          return;
        }
      } else {
        tiny[i].style.visibility = "hidden";
      }
    };

    // Main sparkle animation loop
    const sparkle = () => {
      if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (let c = 0; c < sparkles; c++) {
          if (!starv[c]) {
            star[c].style.left = (starx[c] = x - 4) + "px"; // Center the plus sign
            star[c].style.top = (stary[c] = y - 3) + "px";
            star[c].style.clip = "rect(0px, 8px, 8px, 0px)";
            const color = newColour();
            star[c].childNodes[0].style.backgroundColor = color;
            star[c].childNodes[1].style.backgroundColor = color;
            star[c].style.visibility = "visible";
            starv[c] = 50;
            break;
          }
        }
      }
      for (let c = 0; c < sparkles; c++) {
        if (starv[c]) updateStar(c);
        if (tinyv[c]) updateTiny(c);
      }
    };

    // Start animation
    const sparkleInterval = setInterval(sparkle, 40);

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearInterval(sparkleInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Remove sparkle elements
      tiny.forEach(el => el && el.remove());
      star.forEach(el => el && el.remove());
    };
  }, [sparkleEnabled]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const handleProjectClick = (project) => {
    if (project.linkType === 'external' && project.link) {
      // Open external link in new tab
      window.open(project.link, '_blank');
    } else if (project.linkType === 'modal') {
      // Open modal with project details
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay clearing to allow animation
  };

  const nusci_publications = [
  {
    title: "Quantum tunnelling redefines physics and earns a Nobel prize",
    venue: "Physics, Space",
    year: "December 9, 2025",
    url: "https://nuscimagazine.com/quantum-tunnelling-redefines-physics-and-earns-a-nobel-prize/"
  },
  {
    title: "Predicting the unpredictable: The next frontier in managing epilepsy",
    venue: "Health, Neuroscience",
    year: "November 12, 2025",
    url: "https://nuscimagazine.com/predicting-the-unpredictable-the-next-frontier-in-managing-epilepsy/"
  },
  {
    title: "The mystery of the fate of the universe",
    venue: "Physics, Space",
    year: "March 6, 2025",
    url: "https://nuscimagazine.com/the-mystery-of-the-fate-of-the-universe/"
  },
  {
    title: "3D-printing the brain: Is this the new way to treat brain injuries?",
    venue: "Health, Technology, Neuroscience",
    year: "April 23, 2024",
    url: "https://nuscimagazine.com/3d-printing-the-brain-is-this-the-new-way-to-treat-brain-injuries/"
  },
  {
    title: "A search for the extraterrestrial: Artificial intelligence detects life",
    venue: "Physics, Space",
    year: "December 29, 2023",
    url: "https://nuscimagazine.com/a-search-for-the-extraterrestrial-artificial-intelligence-detects-life/"
  },
];

  const projects = [
    {
      title: "MBTA Rail Ridership",
      description: "Interactive data visualization exploring Boston's public transit ridership patterns and trends for a final project.",
      tags: ["Python", "Plotly", "HTML/CSS/JS", "Altair"],
      link: "https://github.com/ibabaig/ds4200-final",
      linkType: "modal",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/MBTA_Green_Line_B.jpg",
      detailedDescription: `
        <h4>Information Presentation and Visualization DS4200 Final Project</h4>
        <h3>Project Overview</h3>
        <p>An in-depth analysis and interactive visualization of the Massachusetts Bay Transportation Authority (MBTA) rail ridership data. This project explores patterns in Boston's public transit system, identifying trends across different lines, stations, and time periods.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Interactive dashboards built with Plotly and Altair for exploring ridership trends</li>
          <li>Time-series analysis showing ridership patterns</li>
          <li>Station-by-station comparison across all MBTA lines (Red, Orange, Blue, Green)</li>
          <li>Data preprocessing pipeline handling missing values and outliers during construction times</li>
          <li>Heat maps visualizing peak usage times and stations</li>
        </ul>
        
        <h3>Technologies & Tools</h3>
        <p><strong>Data Analysis:</strong> Python, Pandas, NumPy for data cleaning and manipulation</p>
        <p><strong>Visualization:</strong> Plotly, Altair, Matplotlib, Seaborn for creating interactive and static visualizations</p>
        <p><strong>Web Technologies:</strong> HTML, CSS, JavaScript for the interactive dashboard interface</p>
        
        <h3>Insights & Findings</h3>
        <p>The analysis revealed ridership patterns to allow for transit planning and service optimization. Downtown stations showed the highest traffic volumes, while weekend ridership patterns differed notably from weekday commuter trends. The visualizations help transit planners understand usage patterns for service optimization.</p>
        
        <h3>Project Report and Deployed Website</h3>
        <div style="margin: 2rem 0; border: 2px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <iframe 
            src="public/DS4200_project_summary.pdf" 
            width="100%" 
            height="600px"
            style="border: none; display: block;"
            title="MBTA Project Report"
          ></iframe>
        </div>
        
        <h3>Impact</h3>
        <p>This project demonstrates the power of data visualization in understanding urban transit systems. The interactive dashboards make complex ridership data accessible to 
        both technical and non-technical stakeholders, supporting data-driven decision making for public transportation planning.</p>
      `
    },
    {
      title: "Design System",
      description: "Comprehensive component library built with accessibility and scalability at its core.",
      tags: ["TypeScript", "Storybook", "Figma"],
      link: null,
      linkType: "modal",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      detailedDescription: `
        <h3>Project Overview</h3>
        <p>A complete design system created to ensure consistency across all product interfaces.</p>
        
        <h3>Components Included</h3>
        <ul>
          <li>Buttons, forms, and input elements</li>
          <li>Navigation patterns and layouts</li>
          <li>Typography system and color palettes</li>
        </ul>
      `
    },
    {
      title: "Mobile Experience",
      description: "Native mobile application delivering seamless performance and intuitive user journeys.",
      tags: ["React Native", "Firebase", "Redux"],
      link: "https://github.com/yourusername/mobile-app",
      linkType: "external",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      detailedDescription: `
        <h3>About This App</h3>
        <p>A cross-platform mobile application built with React Native...</p>
      `
    }
  ];

  return (
    <div style={{
      fontFamily: "'Fraunces', serif",
      backgroundColor: '#D7DEDF',
      color: '#5A123A',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Fixed sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: '#201b2d',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 900,
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)'
      }} className="desktop-sidebar">
        <div>
          {/* Name */}
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#B9C5F3',
            textAlign: 'center',
            marginBottom: '.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Iba Baig
          </h1>
          <h2 style={{
            fontSize: '.9rem',
            fontWeight: 800,
            color: '#B9C5F3',
            textAlign: 'center',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            (ee-bah)
            she/her
          </h2>

          {/* Short Bio */}
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#D7DEDF',
            marginBottom: '2.5rem',
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            fontWeight: 300,
            opacity: 0.9
          }}>
            Senior at Northeastern University studying Data Science & Behavioral Neuroscience.
            Programmer and scientist.
            Looking for new opportunities.
          </p>
          <p style={{
            fontSize: '1.0rem',
            lineHeight: 1.8,
            fontStyle: 'italic',
            color: '#c4a6b7',
            marginBottom: '2.5rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>
            “I haven't been everywhere, but it's on my list." ― Susan Sontag
          </p>

          {/* Divider */}
          <div style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#701648',
            marginBottom: '2.5rem',
            borderRadius: '2px'
          }} />
        </div>

        {/* Social Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <a
            href="mailto:ibabaig712@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.1)';
              e.currentTarget.style.color = '#B9C5F3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#D7DEDF';
            }}
          >
            <Mail size={20} />
            <span>ibabaig712@gmail.com</span>
          </a>

          <a
            href="https://github.com/ibabaig/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.1)';
              e.currentTarget.style.color = '#B9C5F3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#D7DEDF';
            }}
          >
            <Github size={20} />
            <span>github.com/ibabaig</span>
          </a>

          <a
            href="https://linkedin.com/in/ibabaig"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.1)';
              e.currentTarget.style.color = '#B9C5F3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#D7DEDF';
            }}
          >
            <Linkedin size={20} />
            <span>linkedin.com/in/ibabaig</span>
          </a>

          {/* Sparkle Toggle Button */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(185, 197, 243, 0.2)'
          }}>
            <button
              onClick={() => setSparkleEnabled(!sparkleEnabled)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                color: '#D7DEDF',
                backgroundColor: sparkleEnabled ? 'rgba(185, 197, 243, 0.15)' : 'transparent',
                border: '1px solid rgba(185, 197, 243, 0.3)',
                fontSize: '0.9rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = sparkleEnabled ? 'rgba(185, 197, 243, 0.15)' : 'transparent';
                e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.3)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✨ Sparkle Cursor
              </span>
              <div style={{
                width: '44px',
                height: '24px',
                backgroundColor: sparkleEnabled ? '#701648' : 'rgba(79, 96, 100, 0.5)',
                borderRadius: '100px',
                position: 'relative',
                transition: 'all 0.3s ease',
                boxShadow: sparkleEnabled ? '0 2px 8px rgba(112, 22, 72, 0.3)' : 'none'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#D7DEDF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: sparkleEnabled ? '23px' : '3px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }} />
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 1100,
          background: '#4F6064',
          border: 'none',
          color: '#B9C5F3',
          cursor: 'pointer',
          padding: '0.75rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        className="mobile-sidebar-toggle"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <aside style={{
          display: 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: '#4F6064',
          padding: '5rem 2rem 2rem 2rem',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 1000,
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.2)',
          animation: 'slideInLeft 0.3s ease-out'
        }} className="mobile-sidebar">
          <div>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#B9C5F3',
              marginBottom: '1rem',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Iba Baig
            </h1>

            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#D7DEDF',
              marginBottom: '2rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300
            }}>
              Programmer and scientist.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <a href="mailto:ibabaig712@gmail.com" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: "'Inter', sans-serif",
              padding: '0.5rem'
            }}>
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a href="https://github.com/ibabaig" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: "'Inter', sans-serif",
              padding: '0.5rem'
            }}>
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/ibabaig" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#D7DEDF',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: "'Inter', sans-serif",
              padding: '0.5rem'
            }}>
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>

            {/* Mobile Sparkle Toggle */}
            <button
              onClick={() => setSparkleEnabled(!sparkleEnabled)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                color: '#D7DEDF',
                backgroundColor: sparkleEnabled ? 'rgba(215, 222, 223, 0.1)' : 'transparent',
                border: '1px solid rgba(215, 222, 223, 0.3)',
                fontSize: '0.85rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '0.75rem',
                transition: 'all 0.3s ease'
              }}
            >
              <span>✨ Sparkles</span>
              <div style={{
                width: '38px',
                height: '20px',
                backgroundColor: sparkleEnabled ? '#701648' : 'rgba(79, 96, 100, 0.5)',
                borderRadius: '100px',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#D7DEDF',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '3px',
                  left: sparkleEnabled ? '21px' : '3px',
                  transition: 'all 0.3s ease'
                }} />
              </div>
            </button>
          </div>
        </aside>
      )}

      {/* Overlay for mobile sidebar */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          className="mobile-sidebar-overlay"
        />
      )}

      {/* Main */}
      <div style={{
        marginLeft: '320px',
        minHeight: '100vh'
      }} className="main-content">

        {/* Top Navigation Bar */}
        <nav style={{
          position: 'fixed',
          top: 0,
          left: '320px',
          right: 0,
          zIndex: 800,
          backgroundColor: scrolled ? '#201b2d' : 'rgba(215, 222, 223, 0.95)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: '1px solid rgba(79, 96, 100, 0.2)',
          boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
        }} className="desktop-nav">
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.25rem 3rem',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {['home', 'about', 'projects', 'writing'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: scrolled ? '#D7DEDF' : (activeSection === item ? '#701648' : '#4F6064'),
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: activeSection === item ? 600 : 400,
                  textTransform: 'capitalize',
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.02em',
                  animation: `fadeInDown 0.6s ease-out ${idx * 0.1}s both`
                }}
                onMouseEnter={(e) => e.target.style.color = '#701648'}
                onMouseLeave={(e) => e.target.style.color = scrolled ? '#D7DEDF' : (activeSection === item ? '#701648' : '#4F6064')}
              >
                {item}
                {activeSection === item && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#701648',
                    animation: 'expandWidth 0.3s ease-out'
                  }} />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Top Navigation */}
        <nav style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 800,
          backgroundColor: scrolled ? '#4F6064' : 'rgba(215, 222, 223, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(79, 96, 100, 0.2)',
          padding: '1rem 5rem 1rem 1rem'
        }} className="mobile-nav">
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center'
          }}>
            {['home', 'about', 'projects', 'writing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: scrolled ? '#D7DEDF' : (activeSection === item ? '#701648' : '#4F6064'),
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: activeSection === item ? 600 : 400,
                  textTransform: 'capitalize',
                  padding: '0.5rem 0',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Home Section - Introduction */}
        <section id="home" style={{
          minHeight: '100vh',
          padding: 'clamp(8rem, 15vh, 12rem) 3rem 4rem 3rem',
          backgroundColor: '#D7DEDF',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Introduction */}
            <div style={{
              marginBottom: '4rem',
              animation: 'fadeInUp 1s ease-out'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.5rem',
                color: '#5A123A',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}>
                Welcome! My name is Iba
              </h2>

              <p style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                lineHeight: 1.8,
                color: '#4F6064',
                marginBottom: '1.5rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300
              }}>
                I study data science and behavioral neuroscience. I'm interested in how the two subjects
                intertwine, from quantitative research to computational neuroscience. Inspired by initial pre-med pathway, I intend
                to create human-centered solutions to improve daily life with the help of technology. With expertise in both the brain and technical
                implementation, I value my intuition, intentional problem-solving, creative writing, and communication skills, especially in the age of AI advancement.
              </p>
            </div>

            {/* View Resume Button */}
            <div style={{
              animation: 'fadeInUp 1s ease-out 0.3s both',
              marginBottom: '5rem'
            }}>
              <a
                href="public/Resume 2026 Baig.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: '#701648',
                  color: '#D7DEDF',
                  border: 'none',
                  borderRadius: '100px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: '0 10px 30px rgba(112, 22, 72, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5A123A';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(112, 22, 72, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#701648';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(112, 22, 72, 0.3)';
                }}
              >
                <FileText size={22} />
                View Resume
              </a>
            </div>

            {/* Featured Projects Preview */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                animation: 'fadeIn 1s ease-out 0.5s both'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: '#5A123A',
                  letterSpacing: '-0.01em'
                }}>
                  Featured Work
                </h3>
                <button
                  onClick={() => scrollToSection('projects')}
                  style={{
                    background: 'none',
                    border: '2px solid #701648',
                    color: '#701648',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '100px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Inter', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#701648';
                    e.target.style.color = '#D7DEDF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#701648';
                  }}
                >
                  View All
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem'
              }}>
                {projects.slice(0, 2).map((project, idx) => (
                  <div
                    key={project.title}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(90, 18, 58, 0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `fadeInUp 0.8s ease-out ${0.6 + idx * 0.15}s both`,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 16px 50px rgba(90, 18, 58, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(90, 18, 58, 0.08)';
                    }}
                  >
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        marginBottom: '0.75rem',
                        color: '#5A123A',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {project.title}
                        <ExternalLink size={16} style={{ opacity: 0.6 }} />
                      </h4>

                      <p style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: '#4F6064',
                        marginBottom: '1rem',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300
                      }}>
                        {project.description.substring(0, 100)}...
                      </p>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            style={{
                              padding: '0.35rem 0.85rem',
                              backgroundColor: 'rgba(112, 22, 72, 0.1)',
                              color: '#701648',
                              borderRadius: '100px',
                              fontSize: '0.8rem',
                              fontWeight: 500,
                              fontFamily: "'Inter', sans-serif"
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{
          padding: 'clamp(4rem, 10vh, 8rem) 3rem',
          backgroundColor: '#310a20',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div style={{ animation: 'fadeInLeft 1s ease-out' }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                marginBottom: '2rem',
                color: '#B9C5F3',
                letterSpacing: '-0.02em'
              }}>
                About Me
              </h2>
              <div style={{
                width: '80px',
                height: '4px',
                backgroundColor: '#701648',
                marginBottom: '2rem',
                borderRadius: '2px'
              }} />
              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: '#D7DEDF',
                marginBottom: '1.5rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300
              }}>
                I am eager to take on roles to learn something new, to interact with different types of people,
                and where I'm analytical, autonomous, and vibe coding.
              </p>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: '#D7DEDF',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300
              }}>
                When I'm not on my computer, I enjoy cooking, eating (Beli app enthusiast), watching movies, pilates, learning languages, and exploring.
                I love reading classical philosophy, sci-fi, random essays mainly. Also, I occassionally volunteer at the UMC Free Clinic and
                write for the NU Sci Magazine club.
              </p>
            </div>

            {/* Skills */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              animation: 'fadeInRight 1s ease-out'
            }}>
              {[
                {
                  title: 'Languages',
                  skills: ['Python', 'SQL/NoSQL', 'Java', 'R', 'JavaScript', 'HTML/CSS', 'Swift', 'React']
                },
                {
                  title: 'Libraries & Frameworks',
                  skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
                },
                {
                  title: 'Tools & Platforms',
                  skills: ['Git', 'Figma', 'Jira', 'Jupyter', 'Linux', 'MySQL', 'Excel', 'Adobe CS']
                },
                {
                  title: 'Related Courses',
                  skills: ['Machine Learning I+II', 'Artifical Intelligence', 'Database Design', 'Neural Systems', 'Bioinformatics (Grad)', 'Physics I+II']
                }
              ].map((category, idx) => (
                <div
                  key={category.title}
                  style={{
                    padding: '2rem',
                    backgroundColor: 'rgba(185, 197, 243, 0.1)',
                    borderRadius: '16px',
                    border: '1px solid rgba(185, 197, 243, 0.2)',
                    transition: 'all 0.3s ease',
                    animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(185, 197, 243, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.2)';
                  }}
                >
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: '#B9C5F3'
                  }}>
                    {category.title}
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {category.skills.map(skill => (
                      <li key={skill} style={{
                        color: '#D7DEDF',
                        marginBottom: '0.5rem',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 300
                      }}>
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section Gallery */}
        <section id="projects" style={{
          padding: 'clamp(4rem, 10vh, 8rem) 3rem',
          backgroundColor: '#D7DEDF'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem',
              animation: 'fadeIn 1s ease-out'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#5A123A',
                letterSpacing: '-0.02em'
              }}>
                Projects
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#4F6064',
                maxWidth: '600px',
                margin: '0 auto',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300
              }}>
                Collection of my work showcasing different interests, skills, and approaches.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem'
            }}>
              {projects.map((project, idx) => (
                <div
                  key={project.title}
                  onClick={() => handleProjectClick(project)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(90, 18, 58, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s both`,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(90, 18, 58, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(90, 18, 58, 0.1)';
                  }}
                >
                  <div style={{
                    height: '250px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: '#701648',
                      color: '#D7DEDF',
                      padding: '0.5rem 1rem',
                      borderRadius: '100px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif"
                    }}>
                      Featured
                    </div>
                  </div>

                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      color: '#5A123A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {project.title}
                      <ExternalLink size={20} style={{ opacity: 0.6 }} />
                    </h3>

                    <p style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#4F6064',
                      marginBottom: '1.5rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300
                    }}>
                      {project.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}>
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          style={{
                            padding: '0.4rem 1rem',
                            backgroundColor: 'rgba(112, 22, 72, 0.1)',
                            color: '#701648',
                            borderRadius: '100px',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            fontFamily: "'Inter', sans-serif"
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

         <section id="writing" style={{
          padding: 'clamp(4rem, 10vh, 8rem) 3rem',
          backgroundColor: '#201b2d',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem',
              animation: 'fadeIn 1s ease-out'
            }}>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#B9C5F3',
                letterSpacing: '-0.02em'
              }}>
                Publications at NU SCI Magazine
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#D7DEDF',
                maxWidth: '850px',
                margin: '0 auto',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300
              }}>
                Science literacy can be achieved through creative writing to effectively communicate the significance of research to both scientific and public audiences.
                I enjoy writing for the NU Science Magazine, from particle physics to health. Here are some of my pieces:
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {nusci_publications.map((pub, idx) => (
                <a
                  key={pub.title}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'rgba(215, 222, 223, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid rgba(185, 197, 243, 0.2)',
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s both`,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(215, 222, 223, 0.15)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(215, 222, 223, 0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(185, 197, 243, 0.2)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.75rem',
                        color: '#B9C5F3',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        lineHeight: 1.0
                      }}>
                        {pub.title}
                        <ExternalLink size={18} style={{ opacity: 0.7, flexShrink: 0 }} />
                      </h3>

                      <p style={{
                        fontSize: '1rem',
                        color: '#D7DEDF',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.6
                      }}>
                        {pub.authors}
                      </p>

                      <p style={{
                        fontSize: '1rem',
                        color: '#B9C5F3',
                        marginBottom: '0rem',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontStyle: 'italic'
                      }}>
                        {pub.venue} • {pub.year}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer style={{
          padding: '2.5rem 3rem',
          backgroundColor: '#5A123A',
          textAlign: 'center',
          color: '#D7DEDF',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 300
        }}>
          <p>© 2026 Iba Baig.</p>
        </footer>
      </div>

      {/* Projects Modal */}
      {isModalOpen && selectedProject && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 9998,
              animation: 'fadeIn 0.3s ease-out'
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '900px',
              maxHeight: '85vh',
              backgroundColor: '#fff',
              borderRadius: '20px',
              zIndex: 9999,
              overflow: 'hidden',
              animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              position: 'relative',
              height: '250px',
              overflow: 'hidden'
            }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem'
              }}>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {selectedProject.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {selectedProject.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.35rem 0.85rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          color: '#fff',
                          borderRadius: '100px',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <X size={24} color="#5A123A" />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '2.5rem',
              overflowY: 'auto',
              maxHeight: 'calc(85vh - 250px)',
              fontFamily: "'Inter', sans-serif"
            }}>
              <div
                className="modal-content"
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: '#4F6064'
                }}
                dangerouslySetInnerHTML={{ __html: selectedProject.detailedDescription }}
              />
              
              {/* GitHub Link Button (if external link exists) */}
              {selectedProject.link && (
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#701648',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#5A123A';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#701648';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <Github size={20} />
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        /* Modal Content Styling */
        .modal-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #5A123A;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .modal-content p {
          margin-bottom: 1rem;
        }

        .modal-content ul {
          margin: 1rem 0 1.5rem 1.5rem;
          list-style-type: disc;
        }

        .modal-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }

        .modal-content strong {
          color: #701648;
          font-weight: 600;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .desktop-sidebar {
            display: none !important;
          }

          .mobile-sidebar-toggle {
            display: block !important;
          }

          .mobile-sidebar {
            display: flex !important;
          }

          .mobile-sidebar-overlay {
            display: block !important;
          }

          .main-content {
            margin-left: 0 !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .mobile-nav {
            display: block !important;
          }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;