import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LegalLayout } from '@/components/common/LegalLayout';

export function TermsOfUse() {
  return (
    <LegalLayout>
      <div className="container mx-auto py-12 px-4">
        <Card className="bg-white/10 backdrop-blur-lg text-white border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: March 20, 2024</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By accessing and using Talk Master's services, you agree to be bound by these Terms of Use 
                  and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">2. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-300">
                  <li>Maintain accurate and up-to-date account information</li>
                  <li>Respect intellectual property rights</li>
                  <li>Follow community guidelines and conduct policies</li>
                  <li>Attend scheduled sessions or provide timely cancellation notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">3. Service Modifications</h2>
                <p className="text-gray-300">
                  We reserve the right to modify or discontinue our service at any time, with or without notice. 
                  We shall not be liable to you or any third party for any modification, suspension, or discontinuance 
                  of the service.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </LegalLayout>
  );
}