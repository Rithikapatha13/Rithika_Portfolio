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
  ArrowRight,
  Phone
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
                <a href="https://github.com/Rithikapatha13" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
                  <Github size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/rithika-patha-a795b3227/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
                  <Linkedin size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:rithikapatha1310@gmail.com" className="w-12 h-12 glass rounded-full flex items-center justify-center glass-hover border border-white/10 text-white/70 hover:text-primary transition-colors">
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
          <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/10 to-secondary/10 glass flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80')] bg-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" />
            <Code2 size={140} className="text-primary/30 relative z-10 group-hover:text-primary/60 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass p-8 rounded-[2rem] border border-white/10 shadow-2xl group animate-float">
            <span className="text-5xl font-black text-primary block mb-1">6+</span>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Months Experience</p>
          </div>
        </motion.div>

        <div>
          <SectionHeading subtitle="Based in Hyderabad, Telangana, I build digital products that balance technical precision with human-centric design.">
            The Person Behind the Code
          </SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <p className="text-white/60 text-lg leading-relaxed font-medium">
              I'm a <span className="text-white font-bold">MERN Stack Developer</span> who loves turning abstract ideas into scalable digital realities. I specialize in building high-performance applications that handle complex data flows with ease.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                <div className="text-primary mb-3"><Zap size={24} /></div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Clean Code</h4>
                <p className="text-[11px] text-white/40 leading-relaxed">Prioritizing maintainable, readable, and efficient architectures.</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 hover:border-secondary/20 transition-all group">
                <div className="text-secondary mb-3"><Layers size={24} /></div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Scalability</h4>
                <p className="text-[11px] text-white/40 leading-relaxed">Designing systems that grow seamlessly with your business needs.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {['AI Integration', 'Cloud Native', 'UX Engineering', 'Real-time Systems'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5 hover:text-primary transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => {
  const row1 = [
    { name: "React JS", icon: <Code2 />, color: "#61DAFB" },
    { name: "Node JS", icon: <Layers />, color: "#339933" },
    { name: "PostgreSQL", icon: <Database />, color: "#4169E1" },
    { name: "Tailwind CSS", icon: <Zap />, color: "#06B6D4" },
    { name: "Prisma", icon: <Database />, color: "#2D3748" }
  ];
  const row2 = [
    { name: "JavaScript", icon: <Code2 />, color: "#F7DF1E" },
    { name: "Django", icon: <Code2 />, color: "#092E20" },
    { name: "React Native", icon: <Layers />, color: "#61DAFB" },
    { name: "Git/GitHub", icon: <Github />, color: "#F05032" },
    { name: "Figma", icon: <Layers />, color: "#F24E1E" }
  ];

  return (
    <section id="skills" className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <SectionHeading subtitle="My technical toolkit is constantly evolving to stay ahead of modern web standards.">
          Technical Expertise
        </SectionHeading>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...row1, ...row1, ...row1].map((skill, i) => (
              <div
                key={i}
                className="glass px-10 py-6 rounded-3xl flex items-center gap-5 group hover:border-primary/50 transition-all cursor-default min-w-[200px]"
              >
                <div className="text-primary group-hover:scale-125 transition-transform duration-500">{skill.icon}</div>
                <span className="text-xl font-black italic tracking-tighter">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex whitespace-nowrap">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...row2, ...row2, ...row2].map((skill, i) => (
              <div
                key={i}
                className="glass px-10 py-6 rounded-3xl flex items-center gap-5 group hover:border-secondary/50 transition-all cursor-default min-w-[200px]"
              >
                <div className="text-secondary group-hover:scale-125 transition-transform duration-500">{skill.icon}</div>
                <span className="text-xl font-black italic tracking-tighter">{skill.name}</span>
              </div>
            ))}
          </motion.div>
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
      <div className="max-w-4xl mx-auto relative">
        {/* Glowing Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent opacity-20 hidden md:block" />

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 rounded-3xl border-l-4 border-primary relative overflow-hidden group hover:bg-white/[0.05] transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={120} />
            </div>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 rounded-full mb-4 inline-block">Current Role</span>
                <h3 className="text-3xl font-black mb-1">MERN Stack Developer</h3>
                <p className="text-white/80 font-bold text-lg italic">BRANDWAR</p>
              </div>
              <div className="text-right">
                <p className="text-white font-black text-xl">6 MONTHS</p>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Full-time • DEC- 2025 - Present</p>
              </div>
            </div>

            <p className="mt-8 text-white/60 leading-relaxed max-w-2xl mb-10 text-lg">
              Spearheading full-stack development for high-performance applications. I focus on creating scalable architectures and intuitive user experiences using the modern MERN stack.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-5 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all duration-500">
                <div className="text-primary mb-3"><Code2 size={24} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">Engineering</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">Designing scalable RESTful APIs and optimized database schemas using PostgreSQL & Prisma.</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5 group-hover:border-secondary/20 transition-all duration-500">
                <div className="text-secondary mb-3"><Layers size={24} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">Feature Ownership</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">Implementing secure JWT authentication, real-time data sync, and dynamic admin dashboards.</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all duration-500">
                <div className="text-primary mb-3"><Zap size={24} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">Optimization</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">Boosting application performance through advanced caching, lazy loading, and code refactoring.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass p-8 rounded-3xl border-l-4 border-white/20 relative opacity-80 hover:opacity-100 transition-all group hover:bg-white/[0.05]"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h3 className="text-3xl font-black mb-1">Intern</h3>
                <p className="text-white/80 font-bold text-lg italic uppercase">ROBOWAVES</p>
              </div>
              <div className="text-right">
                <p className="text-white font-black text-xl">2 MONTHS</p>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest italic">Internship • OCT - NOV 2025</p>
              </div>
            </div>
            <p className="mt-6 text-white/60 leading-relaxed max-w-2xl text-lg">
              Gained hands-on experience in full-stack development, assisting in the creation of responsive UIs and learning the fundamentals of the MERN ecosystem in a fast-paced environment.
            </p>
          </motion.div>
        </div>
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
      tags: ["Python", "Scikit-Learn", "TensorFlow"],
      category: "ML",
      image: "/cardio.png"
    },
    {
      title: "Employee Registry System",
      description: "A comprehensive management tool for tracking employee data, performance, and organizational hierarchy with secure access.",
      tags: ["React JS", "API", "Tailwind CSS"],
      category: "Full Stack",
      image: "/employee.png"
    },
    {
      title: "Women's Wear E-commerce",
      description: "A specialized e-commerce platform for women's fashion featuring advanced filtering, user reviews, and a streamlined checkout process.",
      tags: ["React", "Redux", "Tailwind CSS", "Node js", "API"],
      category: "Full Stack",
      github: "https://github.com/Rithikapatha13/Womens-Wear",
      image: "/womens_wear.png"
    },
    {
      title: "Book Finder Application",
      description: "A lightweight web tool that integrates with external APIs to search and catalog books with real-time availability.",
      tags: ["JavaScript", "REST API", "CSS3", "HTML", "Tailwind CSS"],
      category: "Web App",
      github: "https://github.com/Rithikapatha13/book-finder-app",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Heavenly Bakes",
      description: "An elegant e-commerce platform for a bakery, featuring product catalogs, cart management, and a seamless checkout experience.",
      tags: ["HTML", "CSS", "JavaScript"],
      category: "Web App",
      image: "/bakery.png"
    },
    {
      title: "Aurra - Blog Application",
      description: "A full-featured blogging platform built during internship, featuring content management and responsive reading interfaces.",
      tags: ["React", "Firebase", "Styled Components"],
      category: "Full Stack",
      github: "https://github.com/BallaGanesh/Robo-Aurra",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
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
            <div className="glass rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl min-h-[450px] flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-slate-900 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-1.5 bg-primary/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-widest text-primary border border-primary/20">
                    {project.category}
                  </span>
                </div>
                <Sparkles className="text-white/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 relative z-10" size={80} />
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-black mb-4 flex items-center justify-between group-hover:text-primary transition-all duration-500 tracking-tight text-white uppercase">
                  {project.title}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 hover:bg-primary/20"
                    >
                      <ExternalLink size={18} className="text-primary" />
                    </a>
                  )}
                </h3>
                <p className="text-white/50 text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.2em] font-black px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-white/30 group-hover:text-white/60 transition-colors">
                      {tag}
                    </span>
                  ))}
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
      title: "Full Stack Development Training",
      issuer: "QSpiders",
      date: "2025",
      description: "Advanced training in software development fundamentals, core technical skills, and industry-standard practices."
    },
    {
      title: "React JS Intern",
      issuer: "Robowaves",
      date: "2025",
      description: "Successfully completed a hands-on internship focusing on the MERN stack, responsive UI design, and collaborative development."
    },
    {
      title: "RPA Specialization Certification",
      issuer: "Robotic Process Automation",
      date: "2024",
      description: "Certified expertise in automating business processes using industry-standard RPA tools and workflows."
    }
  ];

  return (
    <section id="certifications" className="py-20 relative overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6">
        <SectionHeading subtitle="Professional validation of my technical skills, presented with distinction.">
          Professional Credentials
        </SectionHeading>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="relative group perspective-1000"
            >
              {/* Animated Border/Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-700 animate-border-flow" />

              <div className="glass h-full p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col group-hover:bg-white/[0.08] transition-all duration-700 border border-white/5">
                {/* Holographic Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                {/* Floating Icon with Deep Parallax */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.7
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500"
                >
                  <Zap size={36} className="group-hover:animate-pulse" />
                </motion.div>

                <div className="space-y-4 flex-grow relative z-10">
                  <h3 className="text-2xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors duration-500">
                    {cert.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-[2px] bg-primary/50" />
                    <p className="text-primary text-xs font-black uppercase tracking-[0.2em]">
                      {cert.issuer}
                    </p>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-1">Issue Date</p>
                    <span className="text-white font-black text-sm">{cert.date}</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
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
                  <p className="text-white font-medium">rithikapatha1310@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 glass p-4 rounded-2xl">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><Linkedin size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">LinkedIn</p>
                  <p className="text-white font-medium">rithika-patha-a795b3227</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 glass p-4 rounded-2xl">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone size={20} /></div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Phone</p>
                  <a href="tel:+918309663919" className="text-white font-medium hover:text-primary transition-colors">+91 8309663919</a>
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
          <a href="mailto:rithikapatha1310@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all">
            Say Hello
          </a>
          <div className="flex items-center space-x-2">
            <a href="https://github.com/Rithikapatha13" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full glass-hover text-white/70 hover:text-primary"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/rithika-patha-a795b3227/" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full glass-hover text-white/70 hover:text-primary"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>© 2026 Patha Rithika.</p>
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
