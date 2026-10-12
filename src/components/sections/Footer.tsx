import React from 'react';
import { Heading, Text } from '../ui/Typography';
import { FadeIn } from '../motion/FadeIn';
import { RevealText } from '../motion/RevealText';
import { Button } from '../ui/Button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-32 pb-8">
      <FadeIn>
        <Heading as="h2" className="text-6xl md:text-[8rem] text-center leading-none font-bold tracking-tighter mb-24 overflow-hidden whitespace-nowrap text-brand-text flex justify-center gap-4">
          <RevealText text="Talk" />
          <RevealText text="•" delay={0.1} />
          <RevealText text="Let's Talk" delay={0.2} />
          <RevealText text="•" delay={0.3} />
          <RevealText text="Let's Talk" delay={0.4} />
        </Heading>
      </FadeIn>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-brand-border pt-8">
        <Text className="text-sm font-medium">Designed in <span className="font-bold">Framer by Theoy</span></Text>
        <Text className="text-sm font-medium text-brand-muted">© 2026 All Rights Reserved</Text>
        <Button variant="outline" className="text-xs px-5 py-2.5 rounded-full uppercase tracking-wider" onClick={scrollToTop}>
          Back to top
        </Button>
      </div>
    </footer>
  );
}
