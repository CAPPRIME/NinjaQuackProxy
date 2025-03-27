import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentFilterSettings } from '@/components/settings/ContentFilterSettings';
import { BackgroundSettings } from '@/components/settings/BackgroundSettings';
import ThemeSelector from '@/components/theme/ThemeSelector';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4 -ml-3 gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize NinjaQuack to suit your preferences
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Appearance</h2>
          <ThemeSelector />
        </section>

        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Background</h2>
          <BackgroundSettings />
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-6">Content Filtering</h2>
          <ContentFilterSettings />
        </section>
      </div>
    </div>
  );
}