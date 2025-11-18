"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/app/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/app/components/ui/Dialog";
import { Mail, Phone, Linkedin, Github, Star, Globe } from "lucide-react";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [languageOpen, setLanguageOpen] = useState(false);

  // Embla Carousels
  const [servicesEmblaRef, servicesEmblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [portfolioEmblaRef, portfolioEmblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const languages = [
    { name: "English", flag: "🇬🇧", code: "en" as const },
    { name: "Italian", flag: "🇮🇹", code: "it" as const },
    { name: "German", flag: "🇩🇪", code: "de" as const },
    { name: "French", flag: "🇫🇷", code: "fr" as const },
  ];

  const handleLanguageChange = (code: "en" | "it" | "de" | "fr") => {
    i18n.changeLanguage(code);
    setLanguageOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Revolution",
      category: "ecommerce",
      description: "Complete online store with real-time inventory management",
      client: "Fashion Boutique Milano",
      image: "🛍️",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      results: ["350% increase in sales", "95% mobile traffic"],
      featured: true,
    },
    {
      id: 2,
      title: "SaaS Dashboard Analytics",
      category: "saas",
      description: "Advanced analytics dashboard for data visualization",
      client: "TechCorp Solutions",
      image: "📊",
      tags: ["React", "D3.js", "Node.js"],
      results: ["Real-time data sync", "1000+ daily users"],
      featured: true,
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      category: "corporate",
      description: "Modern, responsive corporate website with CMS integration",
      client: "Consulting Firm Italia",
      image: "🏢",
      tags: ["Next.js", "CMS", "SEO"],
      results: ["40% increase in leads", "Top 3 Google ranking"],
      featured: false,
    },
    {
      id: 4,
      title: "Mobile App Landing Page",
      category: "marketing",
      description: "High-converting landing page with animations",
      client: "StartUp Innovators",
      image: "📱",
      tags: ["React", "Framer Motion", "Conversion"],
      results: ["22% conversion rate", "10k+ signups"],
      featured: false,
    },
    {
      id: 5,
      title: "Booking Platform MVP",
      category: "saas",
      description: "Travel booking system with real-time availability",
      client: "Travel Adventures",
      image: "✈️",
      tags: ["Next.js", "MongoDB", "Real-time"],
      results: ["Live bookings daily", "4.8★ user rating"],
      featured: true,
    },
    {
      id: 6,
      title: "Crypto Trading Interface",
      category: "fintech",
      description: "Secure crypto trading platform with wallet integration",
      client: "FinTech Startup",
      image: "💰",
      tags: ["React", "Web3", "Security"],
      results: ["$2M trading volume", "Enterprise-grade security"],
      featured: false,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "CEO, Fashion Boutique Milano",
      content:
        "TecWeb transformed our online presence. The website increased our sales by 350% in just 6 months!",
      rating: 5,
      image: "👨‍💼",
    },
    {
      id: 2,
      name: "Giulia Bianchi",
      role: "Founder, TechCorp Solutions",
      content:
        "Two talented students with professional expertise. They delivered beyond expectations.",
      rating: 5,
      image: "👩‍💼",
    },
    {
      id: 3,
      name: "Andrea Ventura",
      role: "Director, Consulting Firm Italia",
      content:
        "The team understood our vision perfectly and executed it flawlessly. Highly recommended!",
      rating: 5,
      image: "👨‍💼",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "You (Developer/Designer)",
      role: "Full-Stack Developer",
      school: "ITTS Vito Volterra - Specialization: Informatics",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      image: "👨‍💻",
      achievements: [
        "Expert in modern web technologies",
        "UI/UX Design Specialist",
        "Full-stack Development",
        "Performance Optimization",
      ],
    },
    {
      id: 2,
      name: "Your Friend (Designer/Developer)",
      role: "Frontend Specialist",
      school: "ITTS Vito Volterra - Specialization: Informatics",
      skills: [
        "Vue.js",
        "React",
        "Design Systems",
        "UX Research",
        "Animations",
      ],
      image: "👩‍💻",
      achievements: [
        "Creative Design Expert",
        "User Experience Specialist",
        "Brand Strategy",
        "Animation & Interactions",
      ],
    },
  ];

  const categoryLabels: Record<string, string> = {
    all: t("portfolio.categories.all"),
    ecommerce: t("portfolio.categories.ecommerce"),
    saas: t("portfolio.categories.saas"),
    corporate: t("portfolio.categories.corporate"),
    marketing: t("portfolio.categories.marketing"),
    fintech: t("portfolio.categories.fintech"),
  };

  const stats = [
    { label: "15+", description: t("stats.projectsCompleted") },
    { label: "98%", description: t("stats.clientSatisfaction") },
    { label: "2 Years", description: t("stats.yearsExcellence") },
    { label: "50k+", description: t("stats.usersServed") },
  ];

  const services = [
    {
      id: 1,
      title: t("services.webDesign.title"),
      description: t("services.webDesign.description"),
      icon: "✨",
      features: [
        t("services.feature.customUI"),
        t("services.feature.responsive"),
        t("services.feature.brandStrategy"),
      ],
    },
    {
      id: 2,
      title: t("services.development.title"),
      description: t("services.development.description"),
      icon: "⚡",
      features: [
        t("services.feature.fullStack"),
        t("services.feature.performance"),
        t("services.feature.security"),
      ],
    },
    {
      id: 3,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      icon: "🛒",
      features: [
        t("services.feature.paymentIntegration"),
        t("services.feature.inventory"),
        t("services.feature.analytics"),
      ],
    },
    {
      id: 4,
      title: t("services.seo.title"),
      description: t("services.seo.description"),
      icon: "🚀",
      features: [
        t("services.feature.seoStrategy"),
        t("services.feature.performance"),
        t("services.feature.analytics"),
      ],
    },
    {
      id: 5,
      title: t("services.mobile.title"),
      description: t("services.mobile.description"),
      icon: "📱",
      features: [
        t("services.feature.responsive"),
        t("services.feature.fastLoading"),
        t("services.feature.touchFriendly"),
      ],
    },
    {
      id: 6,
      title: t("services.support.title"),
      description: t("services.support.description"),
      icon: "🤝",
      features: [
        t("services.feature.availability"),
        t("services.feature.updates"),
        t("services.feature.security"),
      ],
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormStatus("success");
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          ></motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <Badge>{t("hero.badge")}</Badge>
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {t("hero.title.part1")}{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("hero.title.part2")}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button size="lg" className="w-full sm:w-auto">
                  {t("hero.cta.start")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t("hero.cta.viewWork")}
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex -space-x-3">
                  {["👨‍💼", "👩‍💼", "👨‍💻", "👩‍💻"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-slate-900 flex items-center justify-center text-lg"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-400">{t("hero.trusted")}</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 space-y-6">
                <motion.div
                  className="text-5xl text-center mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🚀
                </motion.div>
                <div className="space-y-3">
                  <div className="h-3 w-20 bg-emerald-400/40 rounded animate-pulse"></div>
                  <div className="h-2 w-full bg-emerald-400/20 rounded"></div>
                  <div className="h-2 w-3/4 bg-emerald-400/20 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-400/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl lg:text-5xl font-bold text-emerald-400">
                  {stat.label}
                </p>
                <p className="text-slate-400 text-sm uppercase tracking-wide">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("services.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("services.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("services.description")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={servicesEmblaRef}>
              <div className="flex gap-6 sm:gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80"
                  >
                    <Card
                      variant="elevated"
                      className="group hover:shadow-emerald-500/20 h-full flex flex-col"
                    >
                      <div className="text-5xl mb-3 sm:mb-4">
                        {service.icon}
                      </div>
                      <CardTitle className="group-hover:text-emerald-400 transition-colors text-sm sm:text-base lg:text-lg overflow-hidden text-ellipsis leading-tight">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="mt-2 sm:mt-3 flex-grow text-xs sm:text-sm">
                        {service.description}
                      </CardDescription>
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                        {service.features.map((feature, i) => (
                          <Badge key={i} variant="info" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 mt-4 mb-0">
              <button
                onClick={() => servicesEmblaApi?.scrollPrev()}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors"
              >
                ← {t("common.previous") || "Prev"}
              </button>
              <button
                onClick={() => servicesEmblaApi?.scrollNext()}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors"
              >
                {t("common.next") || "Next"} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("portfolio.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("portfolio.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("portfolio.description")}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {[
              "all",
              "ecommerce",
              "saas",
              "corporate",
              "marketing",
              "fintech",
            ].map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-xs sm:text-sm"
              >
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </Button>
            ))}
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={portfolioEmblaRef}>
              <div className="flex gap-4 sm:gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-80"
                  >
                    <Card
                      variant={project.featured ? "elevated" : "default"}
                      className="group overflow-hidden relative h-full flex flex-col p-4 sm:p-6"
                    >
                      {project.featured && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full w-32 h-32 blur-2xl opacity-20"></div>
                      )}

                      <div className="relative z-10 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-2 sm:mb-2">
                          <motion.div
                            className="text-3xl sm:text-4xl flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {project.image}
                          </motion.div>
                          {project.featured && (
                            <Badge variant="success" className="text-xs">
                              ⭐
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="group-hover:text-emerald-400 transition-colors text-sm sm:text-base lg:text-base overflow-hidden text-ellipsis leading-tight line-clamp-2">
                          {project.title}
                        </CardTitle>

                        <p className="text-slate-300 mt-2 sm:mt-2 mb-2 sm:mb-2 flex-grow text-xs sm:text-sm line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="default"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 mt-4 mb-0">
              <button
                onClick={() => portfolioEmblaApi?.scrollPrev()}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors"
              >
                ← {t("common.previous") || "Prev"}
              </button>
              <button
                onClick={() => portfolioEmblaApi?.scrollNext()}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 transition-colors"
              >
                {t("common.next") || "Next"} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("team.badge")}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("team.title")}
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
              {t("team.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card variant="glass">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.div
                      className="text-5xl sm:text-6xl flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.image}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-xl lg:text-2xl break-words leading-snug">
                        {member.name}
                      </CardTitle>
                      <p className="text-emerald-400 font-semibold text-xs sm:text-sm truncate">
                        {member.role}
                      </p>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1 truncate">
                        {member.school}
                      </p>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-slate-300 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                          {t("team.skills")}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="info"
                              className="text-xs whitespace-nowrap"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-slate-300 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                          {t("team.achievements")}:
                        </p>
                        <ul className="space-y-0.5">
                          {member.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-400 truncate"
                            >
                              ✓ {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/*<section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="inline-block mb-4">
              {t("testimonials.badge")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {t("testimonials.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} variant="elevated">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-block mb-4">{t("contact.badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("contact.title")}
            </h2>
            <p className="text-slate-400 mt-6 text-sm sm:text-base lg:text-lg">
              {t("contact.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className="h-full">
                <div className="flex flex-col justify-between h-full gap-1.5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.email")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        hello@tecwebstudio.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.phone")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        +39 (XXX) XXX-XXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.linkedin")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {t("contact.connectWithUs")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">
                        {t("contact.github")}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        {t("contact.viewRepositories")}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card variant="glass">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-xs sm:text-sm">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-slate-800/50 border border-emerald-500/20 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-none transition-colors resize-none h-24 sm:h-32"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>

                  {formStatus === "success" && (
                    <p className="text-green-400 text-xs sm:text-sm font-semibold">
                      ✓ {t("contact.form.success")}
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-red-400 text-xs sm:text-sm font-semibold">
                      ✗ {t("contact.form.error")}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="md"
                    className="w-full text-sm sm:text-base"
                    isLoading={formStatus === "loading"}
                  >
                    {formStatus === "loading"
                      ? t("contact.form.sending")
                      : t("contact.form.submit")}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 border-t border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" className="overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  {t("cta.title")}
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  {t("cta.description")}
                </p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button size="lg">{t("cta.startProject")}</Button>
                  <Button variant="outline" size="lg">
                    {t("cta.scheduleCall")}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 border-t border-emerald-500/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-bold mb-4 text-base sm:text-lg">
                TecWeb Studio
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                {t("footer.description")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.services")}
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.webDesign")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.development")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.ecommerce")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.seo")}
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.company")}
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.portfolio")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.contact")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {t("footer.blog")}
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
                {t("footer.connect")}
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-xs sm:text-sm"
                >
                  Twitter
                </a>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-emerald-500/10 pt-8 text-center text-slate-500 text-xs sm:text-sm">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </section>

      {/* Language Switcher Button */}
      <motion.button
        onClick={() => setLanguageOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 text-white font-bold shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center text-xl"
        title="Change Language"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        🌐
      </motion.button>

      {/* Language Dialog */}
      <Dialog open={languageOpen} onOpenChange={setLanguageOpen}>
        <DialogContent onClose={() => setLanguageOpen(false)}>
          <DialogHeader>
            <DialogTitle>Select Language / Seleziona Lingua</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    i18n.language === lang.code
                      ? "bg-emerald-500/30 border border-emerald-400 text-emerald-300"
                      : "bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:border-emerald-500/50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                </motion.button>
              ))}
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
}
