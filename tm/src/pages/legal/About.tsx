import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LegalLayout } from '@/components/common/LegalLayout';

export function About() {
  return (
    <LegalLayout>
      <div className="container mx-auto py-12 px-4">
        <Card className="bg-white/10 backdrop-blur-lg text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl">About Talk Master</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Talk Master is a premier online platform dedicated to helping individuals master English conversation 
              through personalized, one-on-one sessions with expert instructors.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              We believe that effective communication is key to success in today's global world. Our mission is to 
              empower learners to speak English confidently through interactive, personalized learning experiences.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Why Choose Talk Master?</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>Expert instructors with proven teaching experience</li>
              <li>Flexible scheduling to fit your lifestyle</li>
              <li>Personalized learning paths</li>
              <li>Real-time feedback and progress tracking</li>
              <li>Focus on practical, conversational English</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </LegalLayout>
  );
}