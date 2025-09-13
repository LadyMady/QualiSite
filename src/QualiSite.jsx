import './index.css';
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Accessibility, 
  Palette, 
  Code2,
  ChevronRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Filter
} from "lucide-react";

// ------------------------
// Données de démonstration
// ------------------------
const projects = [
  {
    id: "p1",
    title: "Refonte d'un blog accessible",
    type: "ecole",
    year: 2024,
    tags: ["HTML", "ARIA", "WCAG"],
    cover: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://picsum.photos/id/1015/1200/800",
      "https://picsum.photos/id/1016/1200/800",
      "https://picsum.photos/id/1024/1200/800",
    ],
    summary:
      "Projet d'école : audit d'accessibilité (WCAG 2.2 AA), corrections sémantiques et amélioration du contraste.",
    link: "#",
  },
  {
    id: "p2",
    title: "App To-Do réactive",
    type: "ecole",
    year: 2025,
    tags: ["React", "Vite", "State"],
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://picsum.photos/id/1005/1200/800",
      "https://picsum.photos/id/1006/1200/800",
      "https://picsum.photos/id/1008/1200/800",
    ],
    summary:
      "Petit projet de gestion de tâches avec filtres, persistance locale et design responsive.",
    link: "#",
  },
  {
    id: "p3",
    title: "Mini site vitrine QualiSite (démo)",
    type: "client",
    year: 2025,
    tags: ["UI", "Tailwind", "SEO"],
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://picsum.photos/id/1020/1200/800",
      "https://picsum.photos/id/1021/1200/800",
      "https://picsum.photos/id/1022/1200/800",
    ],
    summary:
      "Démo de landing page moderne optimisée pour la performance et l'accessibilité.",
    link: "#",
  },
];

const services = [
  {
    icon: Accessibility,
    title: "Audit d'accessibilité",
    desc: "Analyse WCAG 2.2, correctifs rapides et plan d'action priorisé.",
  },
  {
    icon: Palette,
    title: "Design inclusif",
    desc: "Interfaces claires, contrastées et utilisables par tous.",
  },
  {
    icon: Code2,
    title: "Développement front",
    desc: "Intégration responsive, SEO technique et bonnes pratiques.",
  },
];

// ------------------------
// Composants utiles
// ------------------------
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </motion.div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold">{project.title}</span>
          <Badge variant="secondary" className="uppercase">{project.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">{project.year}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => onOpen(project)}>
            Voir le projet <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsGallery() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [active, setActive] = useState<any | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects.filter((p) => {
      const matchesTab = tab === "all" || p.type === tab;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTab && matchesQuery;
    });
  }, [query, tab]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Tabs value={tab} onValueChange={setTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 md:inline-flex w-full md:w-auto">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="ecole">Projets d'école</TabsTrigger>
              <TabsTrigger value="client">Projets clients</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="md:ml-auto w-full md:w-80">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par titre ou techno…"
            aria-label="Rechercher un projet"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setActive} />
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-3xl">
          {active && (
            <div>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {active.title}
                  <Badge variant="secondary" className="uppercase">{active.type}</Badge>
                </DialogTitle>
                <DialogDescription className="text-base">
                  {active.summary}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                  <span className="ml-auto text-sm text-muted-foreground">{active.year}</span>
                </div>

                <div className="overflow-x-auto rounded-xl border">
                  <div className="flex gap-2 p-2 min-w-max">
                    {active.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${active.title} visuel ${i + 1}`}
                        className="h-56 w-auto rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button variant="secondary">
                  <a href={active.link} target="_blank" rel="noreferrer" className="flex items-center">
                    Ouvrir le projet <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ------------------------
// Page principale
// ------------------------
export default function QualiSite() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur border-b bg-background/70">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center gap-6">
          <a href="#home" className="font-bold tracking-tight text-xl">QualiSite</a>
          <div className="ml-auto hidden md:flex gap-6 text-sm">
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#projets">Projets</a>
            <a className="hover:underline" href="#apropos">À propos</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
          <div className="ml-auto md:ml-0">
            <Button size="sm" as="a" href="#contact">
              Demander un devis
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Sites accessibles & élégants pour booster votre visibilité
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Vitrine moderne, performance soignée, et respect des bonnes pratiques d'accessibilité. Présentez vos
              projets d'école et missions client en toute clarté.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as="a" href="#projets">
                Voir mes projets
              </Button>
              <Button as="a" href="#services" variant="secondary">
                Découvrir les services
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Pourquoi QualiSite ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>• Approche centrée utilisateur et inclusive</p>
                <p>• Code propre, SEO-friendly, performances élevées</p>
                <p>• Mise en avant simple de vos projets d'école et de vos réalisations</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <Section id="services" title="Services" subtitle="Un accompagnement de A à Z pour un site vitrine impeccable.">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-2xl border flex items-center justify-center mb-2">
                  <s.icon className="h-6 w-6" />
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projets */}
      <Section id="projets" title="Projets" subtitle="Filtrez et explorez mes travaux. Les projets d'école sont indiqués par l'étiquette 'Projets d'école'.">
        <ProjectsGallery />
      </Section>

      {/* À propos */}
      <Section id="apropos" title="À propos" subtitle="Entrepreneuse passionnée par l'accessibilité et la communication.">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-muted-foreground">
              Je m'appelle Déborah Franchet. J'aide les indépendants et petites entreprises à créer des sites vitrines
              accessibles, sobres et efficaces. Mon approche mêle marketing, design inclusif et développement web.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Audit", "UI/UX", "Accessibilité", "React", "Tailwind", "SEO"].map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Chiffres clés</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold">10+ </div>
                <div className="text-sm text-muted-foreground">ans d'expérience en gestion locative</div>
              </div>
              <div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">pôles : audit, design, dev</div>
              </div>
              <div>
                <div className="text-3xl font-bold">AA</div>
                <div className="text-sm text-muted-foreground">Objectif WCAG</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100</div>
                <div className="text-sm text-muted-foreground">perf Lighthouse visée</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" subtitle="Parlez-moi de votre projet. Réponse sous 24h ouvrées.">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Me contacter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <a className="underline" href="mailto:contact@qualisite.fr">contact@qualisite.fr</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <a className="underline" href="tel:+33600000000">+33 6 00 00 00 00</a>
              </div>
              <Separator />
              <div className="flex gap-3">
                <Button variant="outline" as="a" href="https://www.linkedin.com/in/deborahfranchet/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                </Button>
                <Button variant="outline" as="a" href="https://github.com/LadyMady/QualiSite" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4 mr-2" /> GitHub
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faire une demande</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Votre nom" required aria-label="Votre nom" />
                  <Input type="email" placeholder="Votre email" required aria-label="Votre email" />
                </div>
                <Input placeholder="Sujet" required aria-label="Sujet" />
                <Textarea placeholder="Décrivez votre besoin…" rows={5} aria-label="Message" />
                <Button type="submit">Envoyer</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-3 justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} QualiSite — Tous droits réservés.</p>
          <div className="flex gap-4">
            <a className="hover:underline" href="#">Mentions légales</a>
            <a className="hover:underline" href="#">Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ------------------------
// Notes d'édition
// ------------------------
// 1) Remplacez les liens, emails et numéros dans la section Contact.
// 2) Ajoutez/éditez vos projets dans le tableau "projects" en haut du fichier.
//    - type: "ecole" pour vos projets d'école, "client" pour missions réelles.
//    - cover: image mise en avant, images: galerie dans la modale.
//    - link: URL du dépôt GitHub, du site en ligne ou d'une fiche projet.
// 3) Les styles utilisent Tailwind + shadcn/ui (boutons, cartes, badges, etc.).
// 4) Le composant est exporté par défaut : vous pouvez l'intégrer dans une app React/Vite/Next.
// 5) Accessibilité : labels ARIA, contrastes et hiérarchie sémantique soignés.
