// app/page.tsx (ejemplo básico con shadcn/ui y Tailwind)
import { Button } from "@/components/ui/button"; // ajusta según tu starter
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
      <div className="max-w-4xl text-center space-y-8">
        {/* Tu foto o avatar */}
        <div className="mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/tu-foto.jpg" // subila a /public/tu-foto.jpg
            alt="Joaquín"
            width={160}
            height={160}
            className="object-cover"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Joaquín
        </h1>
        <p className="text-2xl md:text-3xl text-muted-foreground">
          Full Stack Developer | Buenos Aires, Argentina
        </p>

        <p className="text-xl max-w-2xl mx-auto">
          Construyo aplicaciones completas con Next.js, TypeScript, Supabase y AWS. 
          Apasionado por auth segura, bases de datos relacionales y deploys serverless.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Button asChild size="lg">
            <Link href="/projects">Ver Proyectos</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Sobre mí</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="https://github.com/maxomart" target="_blank">GitHub</a>
          </Button>
        </div>
      </div>
    </main>
  );
}