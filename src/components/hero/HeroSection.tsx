import Image from 'next/image';
import Link from 'next/link';

interface Feature {
  title: string;
  image: string;
  url: string;
  excerpt?: string;
}

interface HeroSectionProps {
  mainFeature: Feature;
  secondaryFeatures: Feature[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ mainFeature, secondaryFeatures }) => {
  return (
    <section className="w-full max-w-[1200px] mx-auto mt-[120px] mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Main Feature */}
      <div className="relative col-span-1 md:col-span-2 h-[420px] rounded-lg overflow-hidden shadow-lg">
        <Image src={mainFeature.image} alt={mainFeature.title} fill className="object-cover" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
          <Link href={mainFeature.url}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{mainFeature.title}</h2>
          </Link>
          {mainFeature.excerpt && <p className="text-white/80 text-base">{mainFeature.excerpt}</p>}
        </div>
      </div>
      {/* Secondary Features */}
      <div className="flex flex-col gap-4">
        {secondaryFeatures.map((feature, idx) => (
          <div key={idx} className="relative h-[200px] rounded-md overflow-hidden shadow">
            <Image src={feature.image} alt={feature.title} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
              <Link href={feature.url}>
                <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
              </Link>
              {feature.excerpt && <p className="text-white/80 text-xs">{feature.excerpt}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
