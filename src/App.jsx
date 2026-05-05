import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Layers,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

const Magnetic = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    mouseX.set(x * 0.3);
    mouseY.set(y * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setWidth((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-primary z-[100] transition-all duration-100" style={{ width: `${width}%` }} />;
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const hoverables = document.querySelectorAll('a, button, .glass');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div
        className="cursor-outline"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 1.8 : 1})`,
          backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
          borderColor: isHovering ? 'var(--primary)' : 'var(--primary-glow)',
        }}
      />
    </>
  );
};

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="blob w-[500px] h-[500px] bg-primary/20 top-[-10%] left-[-10%]" />
    <div className="blob w-[400px] h-[400px] bg-secondary/20 bottom-[-10%] right-[-10%] animate-float" style={{ animationDelay: '-5s' }} />
    <div className="blob w-[300px] h-[300px] bg-primary/10 top-[40%] right-[20%]" style={{ animationDelay: '-2s' }} />
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'About', 'Skills', 'Experience', 'Education', 'Certifications', 'Projects', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-display"
        >
          Rithika<span className="text-primary">.</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/70"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle }) => (
  <div className="mb-12 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold font-display mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);


const ProjectCard = ({ title, description, tags, category }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -10 }}
    className="glass rounded-3xl overflow-hidden group"
  >
    <div className="h-56 bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
          {category}
        </span>
      </div>
      <Sparkles className="text-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" size={64} />
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold mb-3 flex items-center justify-between">
        {title}
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
          <ExternalLink size={16} className="text-white/40 group-hover:text-primary transition-colors" />
        </div>
      </h3>
      <p className="text-white/60 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-white/5 rounded-full border border-white/5 text-white/40">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Hero = () => (
  <section id="home" className="min-h-screen pt-32 pb-20 flex items-center">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Sparkles size={14} />
          <span>Available for New Opportunities</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight"
        >
          I build digital <span className="text-gradient">experiences</span> that matter.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed"
        >
          Hi, I'm <span className="text-white font-medium">Patha Rithika</span>, a passionate MERN Stack Developer specializing in building high-performance web and mobile applications with modern technologies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-4">
              <Magnetic>
                <a href="#contact" className="px-8 py-4 bg-primary rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                  <span>Get in Touch</span>
                  <ChevronRight size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <button className="px-8 py-4 glass rounded-full font-bold glass-hover transition-all border border-white/10">
                  Download CV
                </button>
              </Magnetic>
            </div>
            <div className="flex items-center gap-4">
              <Magnetic>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
                  <Github size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
                  <Mail size={20} />
                </a>
              </Magnetic>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center space-x-8 text-white/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Main Tech Stack</span>
            <div className="h-px w-12 bg-white/10" />
            <div className="flex space-x-6">
              {['React', 'Node.js', 'Tailwind', 'PostgreSQL'].map(tech => (
                <span key={tech} className="text-sm font-medium hover:text-primary transition-colors cursor-default">{tech}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 glass flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
            <Code2 size={120} className="text-primary/40 relative z-10" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl animate-float">
            <span className="text-4xl font-bold text-primary">6 months</span>
            <p className="text-xs text-white/60 font-bold uppercase tracking-widest">of Experience</p>
          </div>
        </motion.div>

        <div>
          <SectionHeading subtitle="Based in India, I focus on building products that bridge the gap between complex problems and intuitive solutions.">
            The Person Behind the Code
          </SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6 text-white/60 leading-relaxed"
          >
            <p>
              My journey into the world of development started with a curiosity for how things work under the hood. Today, I'm a specialized <span className="text-white font-medium">MERN Stack Developer</span> who loves turning abstract ideas into scalable digital realities.
            </p>
            <p>
              I believe that great code isn't just about functionality—it's about creating meaningful human experiences. Whether it's a mobile app or a complex web dashboard, I strive for performance, accessibility, and clean design.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass p-4 rounded-2xl">
                <h4 className="text-white font-bold mb-1">Fast Learner</h4>
                <p className="text-xs">Quick to adopt new tech stacks.</p>
              </div>
              <div className="glass p-4 rounded-2xl">
                <h4 className="text-white font-bold mb-1">Detail Oriented</h4>
                <p className="text-xs">Focused on pixel-perfect UI.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const skillGroups = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React JS", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Figma"]
    },
    {
      title: "Backend",
      icon: Database,
      skills: ["Node JS", "Django", "SQL", "PostgreSQL", "Neon", "Prisma"]
    },
    {
      title: "Tools & Others",
      icon: Layers,
      skills: ["Git/GitHub", "Sequelize", "ORMs", "React Native", "Mobile Dev"]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="My technical toolkit is constantly evolving to stay ahead of modern web standards.">
          Technical Expertise
        </SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <group.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{group.title}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {group.skills.map(skill => (
                  <div key={skill} className="flex items-center space-x-2 text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section id="experience" className="py-20 bg-white/[0.02]">
    <div className="container mx-auto px-6">
      <SectionHeading subtitle="My professional growth and the companies I've helped build.">
        Professional Journey
      </SectionHeading>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl border-l-4 border-primary relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap size={120} />
          </div>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full mb-3 inline-block">Current Role</span>
              <h3 className="text-2xl font-bold">MERN Stack Developer</h3>
              <p className="text-white/80 font-medium">BRANDWAR</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">6 MONTHS</p>
              <p className="text-white/40 text-xs">Full-time</p>
            </div>
          </div>
          <p className="mt-6 text-white/60 leading-relaxed max-w-2xl">
            Leading the development of scalable web applications using the MERN stack. Focused on optimizing database performance with PostgreSQL and Prisma, and building highly interactive frontends with React and Framer Motion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-3xl border-l-4 border-white/20 relative opacity-80 hover:opacity-100 transition-opacity"
        >
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold">Intern</h3>
              <p className="text-white/80 font-medium">ROBOWAVES</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">1 MONTH</p>
              <p className="text-white/40 text-xs">Internship</p>
            </div>
          </div>
          <p className="mt-6 text-white/60 leading-relaxed max-w-2xl">
            Gained hands-on experience in full-stack development, assisting in the creation of responsive UIs and learning the fundamentals of the MERN ecosystem in a fast-paced environment.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      title: "Cardiovascular Disease Detection",
      description: "Developed a robust ML model to predict heart-related ailments using clinical data, achieving high accuracy in pattern recognition.",
      tags: ["Python", "Scikit-Learn", "Data Science"],
      category: "ML"
    },
    {
      title: "Employee Registry System",
      description: "A comprehensive management tool for tracking employee data, performance, and organizational hierarchy with secure access.",
      tags: ["MERN Stack", "Auth", "Dashboard"],
      category: "Full Stack"
    },
    {
      title: "Modern E-commerce Platform",
      description: "A secondary e-commerce solution featuring advanced filtering, user reviews, and a streamlined checkout process.",
      tags: ["React", "Redux", "Node.js"],
      category: "Full Stack"
    },
    {
      title: "Book Finder Application",
      description: "A lightweight web tool that integrates with external APIs to search and catalog books with real-time availability.",
      tags: ["JavaScript", "REST API", "CSS3"],
      category: "Web App"
    },
    {
      title: "Heavenly Bakes",
      description: "An elegant e-commerce platform for a bakery, featuring product catalogs, cart management, and a seamless checkout experience.",
      tags: ["React JS", "Node JS", "CSS3"],
      category: "Web App"
    },
    {
      title: "React Blog Application",
      description: "A full-featured blogging platform built during internship, featuring content management and responsive reading interfaces.",
      tags: ["React", "Firebase", "Styled Components"],
      category: "Web App"
    }
  ];

  const categories = ['All', 'Full Stack', 'Web App', 'ML'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6 mb-20">
        <SectionHeading subtitle="A curated selection of my technical projects, stacked and layered.">
          Featured Projects
        </SectionHeading>
        
        <div className="flex justify-center flex-wrap gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-20 pb-40">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="sticky top-32"
          >
            <div className="glass rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-widest text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                  <Sparkles className="text-white/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700" size={80} />
                </div>
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-black mb-4 flex items-center justify-between group-hover:text-primary transition-colors">
                    {project.title}
                    <ExternalLink size={24} className="text-white/20 group-hover:text-primary transition-all translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] uppercase tracking-widest font-black px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-white/30 group-hover:text-white/60 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const EducationModal = ({ item, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="glass max-w-lg w-full p-8 rounded-3xl relative overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles size={120} />
      </div>
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <X size={20} />
      </button>

      <div className="mb-8">
        <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full mb-4 inline-block">
          {item.year}
        </span>
        <h3 className="text-3xl font-bold mb-2">{item.degree}</h3>
        <p className="text-primary font-medium">{item.school}</p>
        <p className="text-white/40 text-sm mt-1 flex items-center gap-2">
          <Layers size={14} /> {item.location}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-2xl">
            <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Score / GPA</p>
            <p className="text-xl font-bold text-white">{item.score}</p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Major</p>
            <p className="text-lg font-bold text-white">{item.major || 'General'}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-white/40 uppercase font-bold tracking-widest mb-3">Academic Focus</p>
          <p className="text-white/70 leading-relaxed text-sm">
            {item.fullDescription}
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Education = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const edu = [
    {
      degree: "B.Tech in CSE (AI & ML)",
      school: "Kommuri Pratap Reddy Institute of Technology",
      year: "2021 - 2025",
      location: "Ghatkesar, Hyderabad",
      score: "7.3 CGPA",
      major: "CSE-(AIML)",
      description: "Graduated in Computer Science with a specialization in AI & Machine Learning.",
      fullDescription: "Completed a degree in Computer Science and Engineering with a focused specialization in Artificial Intelligence and Machine Learning. Mastered core subjects like Neural Networks, Data Science, and Modern Software Architectures."
    },
    {
      degree: "Intermediate (MPC)",
      school: "Sri Gayatri Junior College",
      year: "2019 - 2021",
      location: "Dilsukhnagar, Hyderabad",
      score: "800 / 1000",
      major: "MPC",
      description: "Rigorous focus on Mathematics, Physics, and Chemistry with a foundation in logical reasoning.",
      fullDescription: "Completed Intermediate education with a major in MPC. Developed a strong analytical background and problem-solving skills through a rigorous academic curriculum focused on science and engineering foundations."
    },
    {
      degree: "10th Standard",
      school: "Krishnaveni Talent School",
      year: "2018 - 2019",
      location: "New Maruthi Nagar, Hyderabad",
      score: "9.5 GPA",
      description: "Broad academic foundation with consistent excellence in Mathematics and Sciences.",
      fullDescription: "Graduated with honors from Krishnaveni Talent School. Maintained high academic standards across all subjects, with a particular interest and strength in Mathematics and Computer fundamentals."
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Click on any card to see full academic details and scores.">
          Education
        </SectionHeading>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {edu.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="glass p-8 rounded-3xl border-t-2 border-primary/20 hover:border-primary transition-all group cursor-pointer hover:bg-white/[0.07] active:scale-95"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-primary font-bold text-xs bg-primary/5 px-3 py-1 rounded-full">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 leading-tight">{item.degree}</h3>
                <p className="text-white font-medium mb-4 text-sm">{item.school}</p>
                <p className="text-white/50 text-xs leading-relaxed mt-auto line-clamp-3">{item.description}</p>
                <div className="mt-6 flex items-center text-primary text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ChevronRight size={12} className="ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedItem && (
          <EducationModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    {
      title: "Full Stack Technical Training",
      issuer: "QSpiders",
      date: "2024",
      description: "Advanced training in software development fundamentals, core technical skills, and industry-standard practices."
    },
    {
      title: "Bachelor of Technology",
      issuer: "JNTUH",
      date: "2025",
      description: "Successfully completed graduation in Computer Science and Engineering (AI & ML) with core academic excellence."
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Professional validation of my technical skills.">
          Certifications
        </SectionHeading>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border-t-2 border-primary/20 flex gap-6 items-start group"
            >
              <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:rotate-12 transition-transform">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                <p className="text-primary text-sm font-bold mb-2">{cert.issuer}</p>
                <p className="text-white/50 text-xs leading-relaxed">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => (
  <section id="contact" className="py-20 bg-white/[0.02]">
    <div className="container mx-auto px-6">
      <SectionHeading subtitle="Ready to bring your next big idea to life?">
        Let's Connect
      </SectionHeading>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-white/60 mb-8">Feel free to reach out for collaborations or just a friendly hello.</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 glass p-4 rounded-2xl">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Email</p>
                  <p className="text-white font-medium">hello@rithika.dev</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 glass p-4 rounded-2xl">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><Linkedin size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">LinkedIn</p>
                  <p className="text-white font-medium">rithika-patha</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-2">Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-2">Subject</label>
            <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-2">Message</label>
            <textarea placeholder="Tell me about your project..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-colors resize-none"></textarea>
          </div>
          <button className="w-full py-4 bg-primary rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="py-20 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold font-display mb-2">Let's work together.</h2>
          <p className="text-white/60">Currently available for freelance and full-time roles.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all">
            Say Hello
          </a>
          <div className="flex items-center space-x-2">
            <a href="#" className="p-4 glass rounded-full glass-hover"><Github size={20} /></a>
            <a href="#" className="p-4 glass rounded-full glass-hover"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>© 2024 Patha Rithika. Built with React & Tailwind.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 relative mesh-gradient">
      <ScrollProgress />
      <CustomCursor />
      <BackgroundBlobs />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;
